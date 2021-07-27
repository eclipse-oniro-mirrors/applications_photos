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

/**
 * @file: 图片、视频选择界面
 */

import router from '@system.router';
import medialibrary from '@ohos.multimedia.medialibrary';

let media = medialibrary.getMediaLibraryHelper();

export default {
    data: {
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '/common/image/icon/selected.png',
            isShowLeft: true,
            isShowRight: false
        },
        isShowBottomBar: false,
        list: [],
        gridItemWidth: '174px',

        // 操作方式
        operationType: '',
        progress: 0,
        progressTilte: '',
        oprateType: '',
        fromAlbum: null,
        toAlbum: null,
        consoleInfo: '',
    },
    onInit() {
        this.progressTilte = this.$t('strings.albums');
    },
    onReady() {
        let self = this;
        for (let i = 0; i < self.list.length; i++) {
            setTimeout(() => {
                self.progress += Math.floor(100 / self.list.length);
                if (i === self.list.length - 1) {
                    self.$element('progress_dialog').close();
                }
            }, (i + 1) * 300);
        }
        setTimeout(() => {
            self.$element('progress_dialog').show();
            self.operations();
        }, 50);
    },

    // 如果是从操作项过来
    operations() {
        let self = this;
        self.initData();
        if (self.operationType === 'move') {
            self.oprateType = self.$t('strings.move');
            if (self.fromAlbum.name === self.$t('strings.allPhotos')
                || self.fromAlbum.name === self.$t('strings.video')) {
                self.mediaAllAlbumMove();
            } else {
                self.mediaMove();
            }

        } else if (self.operationType === 'copy') {
            self.oprateType = self.$t('strings.copy');
            if (self.fromAlbum.name === self.$t('strings.allPhotos')
                || self.fromAlbum.name === self.$t('strings.video')) {
                self.mediaAllAlbumCopy();
            } else {
                self.mediaCopy();
            }
        } else {
            self.$element('progress_dialog').close();
            self.loadData();
        }
    },

    // 所有相册入口复制
    mediaAllAlbumCopy() {
        let self = this;
        for (let i = 0; i < self.list.length; i++) {
            let item = self.list[i];
            let arrs = item.URI.split('/');
            let albumName = arrs[arrs.length - 2];
            let args = {
                selections: albumName,
                selectionArgs: ['imagealbum', 'videoalbum'],
            };
            media.getMediaAssets(args, (error, images) => {
                if (images) {
                    for (let j = 0; j < images.length; j++) {
                        let fromItem = images[j];
                        if (fromItem.name === item.name) {
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            self.$element('progress_dialog').close();
                                            newImage.albumName = self.toAlbum.name;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                self.$app.$def.datamanage.isRefreshed(true);
                                                self.loadData();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    },

    // 复制功能
    mediaCopy() {
        let self = this;
        let args = {
            selections: self.fromAlbum.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        media.getMediaAssets(args, (error, images) => {
            if (images) {
                for (let j = 0; j < images.length; j++) {
                    let fromItem = images[j];
                    for (let i = 0; i < self.list.length; i++) {
                        let item = self.list[i];
                        if (fromItem.name === item.name) {
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            self.$element('progress_dialog').close();
                                            newImage.albumName = self.topBarSource.title;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                self.$app.$def.datamanage.isRefreshed(true);
                                                self.loadData();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    },

    // 查询
    loadData() {
        let self = this;
        if (self.album) {
            let args = {
                selections: self.topBarSource.title,
                selectionArgs: ['imagealbum', 'videoalbum'],
            };

            if (self.album.name === self.$t('strings.allPhotos')) {
                args.selections = '';
                self.topBarSource.title = self.$t('strings.allPhotos');
            }
            media.getMediaAssets(args, (error, images) => {
                if (images) {
                    for (let i = 0; i < images.length; i++) {
                        let item = images[i];
                        item.src = 'file://' + item.URI;
                        item.icon = '';
                        item.checked = false;
                    }
                    self.list = images;
                }
            });
        }
    },

    // 所有相册入口移动功能
    mediaAllAlbumMove() {
        let self = this;
        for (let i = 0; i < self.list.length; i++) {
            let item = self.list[i];
            let arrs = item.URI.split('/');
            let albumName = arrs[arrs.length - 2];
            let args = {
                selections: albumName,
                selectionArgs: ['imagealbum', 'videoalbum'],
            };
            media.getMediaAssets(args, (error, images) => {
                if (images) {
                    for (let j = 0; j < images.length; j++) {
                        let fromItem = images[j];
                        if (fromItem.name === item.name) {
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            newImage.albumName = self.toAlbum.name;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                self.$element('progress_dialog').close();
                                                self.loadData();
                                                fromItem.commitDelete((error, commitFlag) => {
                                                    if (commitFlag) {
                                                        self.$app.$def.datamanage.isRefreshed(true);
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    },

    // 移动功能
    mediaMove() {
        let self = this;
        let args = {
            selections: self.fromAlbum.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        media.getMediaAssets(args, (error, images) => {
            if (images) {
                for (let j = 0; j < images.length; j++) {
                    let fromItem = images[j];
                    for (let i = 0; i < self.list.length; i++) {
                        let item = self.list[i];
                        if (fromItem.name === item.name) {
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            newImage.albumName = self.topBarSource.title;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                self.$element('progress_dialog').close();
                                                self.loadData();
                                                fromItem.commitDelete((error, commitFlag) => {
                                                    if (commitFlag) {
                                                        self.$app.$def.datamanage.isRefreshed(true);
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    },
    initData() {
        let list = this.list;
        for (let index = 0; index < list.length; index++) {
            let item = list[index];
            item.icon = '';
            item.checked = false;
        }
    },

    // 顶部左侧按钮
    topBarLeftClick() {
        router.back();
    },

    // 顶部右侧按钮
    topBarRightClick() {

    },
    itemClick(item, index) {

    }
};
