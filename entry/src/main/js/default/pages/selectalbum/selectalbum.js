/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import prompt from '@system.prompt';
import router from '@system.router';
import medialibrary from '@ohos.multimedia.medialibrary';

let media = medialibrary.getMediaLibraryHelper();

export default {
    data: {
        listData: [],
        otherList: [],
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '/common/image/svg/add.svg',
            isShowLeft: true,
            isShowRight: false
        },

        // 是否是操作后 跳进来的(移动，复制等)
        isOperationFrom: false,

        // 是否是操作后 操作类型(移动，复制等)
        operationType: '',
        createParams: null,
        checkedList: [],
        fromAlbum: null,
        consoleInfo: '',
        listItemStyle: {
            height: '160px'
        }
    },
    onInit() {
        this.initNational();
    },
    initNational() {
        this.topBarSource.title = this.$t('strings.chooseAlbums');
    },
    onShow() {
        if (this.operationType) {
            this.topBarSource.title = this.$t('strings.operateTitle');
        }
        this.getAlbums();
    },
    getAlbums() {
        let self = this;
        let args = {
            selections: '',
            selectionArgs: ['imagealbum'],
        };
        media.getImageAlbums(args, (error, albums) => {
            if (albums) {
                let list = [];
                let others = [];
                for (let i = 0; i < albums.length; i++) {
                    let album = albums[i];
                    setTimeout(() => {
                        let args = {
                            selections: album.albumName,
                            selectionArgs: ['imagealbum', 'videoalbum'],
                        };
                        media.getMediaAssets(args, (error, images) => {
                            if (images) {
                                let gridObj = {
                                    name: album.albumName,
                                    id: album.albumId,
                                    icon: '/common/image/svg/arrow-right.svg',
                                    checked: false,
                                    showNumber: true,
                                    src: 'file://' + images[0].URI,
                                    list: images
                                };

                                // 判断是新建选相册  还是操作选相册
                                if (self.createParams && self.createParams.type === 'createAlbum') {
                                    if (album.albumName === 'camera') {
                                        gridObj.type = 'system';
                                        list.push(gridObj);
                                    } else {
                                        others.push(gridObj);
                                    }

                                    // 剔除掉当前选中的相册， 由于查询出来是全部相册，避免移动/复制到当前选中相册

                                } else if (self.isOperationFrom && self.fromAlbum.name !== album.albumName) {
                                    if (album.albumName === 'camera') {
                                        gridObj.type = 'system';
                                        list.push(gridObj);
                                    } else {
                                        others.push(gridObj);
                                    }
                                }
                            }
                        });
                    }, (i + 1) * 50);
                }
                self.listData = list;
                self.otherList = others;
            }
        });
    },
    getOtherAlbums(args) {
        let self = this;
        media.getMediaAssets((error, albums) => {
            if (error) {
                return false;
            }
            if (albums) {
                for (let i = 0; i < albums.length; i++) {
                    let item = albums[i];
                    item.showNumber = true;
                    item.getImageAssets().then(function (image) {
                        if (!image) {
                            item.list = [];
                        } else {
                            item.list = image;
                        }
                    });
                }
                self.otherList = albums;
            }
        });
    },

    // 顶部左侧按钮
    topBarLeftClick() {
        router.back();
    },

    // 顶部右侧按钮
    topBarRightClick() {

    },
    listClick(obj) {
        let self = this;
        let detail = obj.detail.item;
        if (self.createParams) {
            self.createParams.album = detail;
        }

        let routerParams = {
            uri: 'pages/selectalbumphoto/selectalbumphoto',
            params: {
                album: detail,
                isOperationFrom: self.isOperationFrom,
                createParams: self.createParams
            }
        };
        if (self.isOperationFrom) {
            routerParams.params.operationType = self.operationType;
            if (self.fromAlbum.name === self.$t('strings.allPhotos') && self.isRepeatAlbum(detail)) {
                routerParams.params.operationType = '';
            }
            routerParams.uri = 'pages/afterselect/afterselect';
            routerParams.params.list = self.checkedList;
            routerParams.params.fromAlbum = self.fromAlbum;
            routerParams.params.toAlbum = detail;
            routerParams.params.topBarSource = {
                title: detail.name,
                leftSrc: '/common/image/svg/back.svg',
                rightSrc: '/common/image/icon/selected.png',
                isShowLeft: true,
                isShowRight: false
            };
        }

        router.replace(routerParams);
    },

    // 判断所有照片入口进来 是否操作了自身相册
    isRepeatAlbum(detail) {
        let self = this;
        let list = self.checkedList;
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let arrs = item.URI.split('/');
            let albumName = arrs[arrs.length - 2];
            self.consoleInfo = albumName;
            if (albumName === detail.name) {
                flag = true;
                break;
            }
        }
        return flag;
    }
};
