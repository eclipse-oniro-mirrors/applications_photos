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
 * @file: 主入口
 */

import router from '@system.router';
import prompt from '@system.prompt';
import medialibrary from '@ohos.multimedia.medialibrary';
import featureAbility from '@ohos.ability.featureAbility';

let media = medialibrary.getMediaLibraryHelper();

export default {
    data: {
        headTitle: '',
        showEmptyDiv: true,
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/close.svg',
            rightSrc: '/common/image/svg/add.svg',
            isShowLeft: false,
            isShowRight: true
        },
        bottomBarSource: [
            {
                id: 1,
                src: '/common/image/svg/rename.svg',
                name: '',
                disabled: false,
                visible: true,
            },
            {
                id: 2,
                src: '/common/image/svg/delete.svg',
                name: '',
                disabled: false,
                visible: true,
            },
        ],
        listData: [],
        gridData: [],
        headSource: null,
        selectMode: false,
        isShowBottomBar: false,
        gridItemStyle: {
            width: '336px',
            padding: '8px',
            height: '490px',
            radius: '32px'
        },
        consoleInfo: '',
        gridItemCheckedStyle: {
            height: '38px',
            width: '38px',
            padding: '8px',
        },
        gridCopyData: [],
        cacheAlbums: [],
        inputName: ''
    },
    onInit() {
        this.initNational();

        // 判断是否从相机跳转过来
        featureAbility.getWant().then(r => {
            if (r && r.parameters && r.parameters.uri) {
                router.replace(
                    {
                        uri: 'pages/photodetail/photodetail',
                        params: {
                            album: {
                                name: 'camera',
                                list: []
                            }
                        },
                    }
                );
            }
        });
    },
    initNational() {
        this.headTitle = this.$t('strings.albums');
        this.bottomBarSource[0].name = this.$t('strings.rename');
        this.bottomBarSource[1].name = this.$t('strings.delete');
    },
    onShow() {
        if (this.$app.$def.datamanage.getRefreshed()) {
            this.loadData();
        }
    },
    onBackPress() {
        if (this.selectMode) {
            this.topBarLeftClick();
            return true;
        } else {
            return false;
        }
    },
    // 根据是否开启选择模式，初始化选中效果
    initChecked() {
        let self = this;
        let gridList = self.list;
        // 宫格数据
        for (let index = 0; index < gridList.length; index++) {
            let item = gridList[index];
            if (self.selectMode) {
                item.icon = self.$app.$def.utils.getIcon('unselected');
            } else {
                item.icon = '';
            }
            item.checked = false;
        }
    },
    loadData() {
        let self = this;
        self.selectMode = false;
        self.getAllPhotos().then(allRes => {
            if (allRes) {
                self.showEmptyDiv = false;
                self.headSource = allRes;
                self.getAlbums().then(albumRes => {
                    if (albumRes) {
                        self.gridData = albumRes.grid;
                        self.listData = albumRes.list;
                        self.getVideoAlbum().then(videoRes => {
                            self.cacheAlbums.push(videoRes);
                            self.gridData.push(videoRes);
                        });
                    }
                });
            }
        });
        self.$app.$def.datamanage.isRefreshed(false);
    },

    // 所有照片
    getAllPhotos() {
        let self = this;
        return new Promise(function (resolve, reject) {
            media.getMediaAssets((error, value) => {
                if (value && value.length > 0) {
                    let obj = {
                        name: self.$t('strings.allPhotos'),
                        id: -1,
                        icon: '',
                        checked: false,
                        type: 'system',
                        src: 'file://' + value[0].URI,
                        list: value
                    };
                    resolve(obj);
                } else {
                    reject(null);
                }
            });
        });
    },

    // 所有相册
    getAlbums() {
        let self = this;
        let args = {
            selections: '',
            selectionArgs: ['imagealbum'],
        };
        return new Promise(function (resolve, reject) {
            media.getImageAlbums(args, (error, albums) => {
                if (albums) {
                    self.cacheAlbums = albums;
                    let list = [];
                    let grid = [];
                    for (let i = 0; i < albums.length; i++) {
                        let album = albums[i];
                        setTimeout(() => {
                            self.getAlbumImage(album).then((res) => {
                                let gridObj = {
                                    name: album.albumName,
                                    id: album.albumId,
                                    icon: '',
                                    checked: false,
                                    type: '',
                                    kind: '',
                                    src: 'file://' + res[0].URI,
                                    list: res
                                };
                                if (album.albumName === 'camera') {
                                    gridObj.type = 'system';
                                    grid.push(gridObj);
                                } else {
                                    list.push(gridObj);
                                }

                                if (i === albums.length - 1) {
                                    resolve({
                                        list: list,
                                        grid: grid
                                    });
                                }
                            });
                        }, (i + 1) * 50);
                    }
                } else {
                    reject(null);
                }
            });
        });
    },
    getAlbumImage(album) {
        let args = {
            selections: album.albumName,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        return new Promise(function (resolve, reject) {
            media.getMediaAssets(args, (error, images) => {
                if (images) {
                    resolve(images);
                } else {
                    reject(null);
                }
            });
        });
    },

    // 获取视频数据创建视频相册
    getVideoAlbum() {
        let self = this;
        let args = {
            selections: '',
            selectionArgs: ['videoalbum'],
        };
        return new Promise(function (resolve, reject) {
            media.getVideoAssets(args, (error, albums) => {
                if (error) {
                    reject(null);
                }
                if (albums && albums.length > 0) {
                    let album = albums[0];
                    let videoObj = {
                        name: self.$t('strings.video'),
                        id: -2,
                        icon: '',
                        checked: false,
                        type: 'system',
                        kind: 'video',
                        src: 'file://' + album.URI,
                        list: albums
                    };
                    resolve(videoObj);
                }
            });
        });
    },
    createDialogAlbum(value) {
        let name = value.detail;
        if (!this.isRepeatName(name)) {
            this.createAlbum(value.detail);
        }
    },

    // 新增
    createAlbum(albumName) {
        let self = this;
        self.$element('create_dailog').close();
        media.createAlbum((err, album) => {
            if (album) {
                album.albumName = albumName + Math.round(Math.random() * 10);
                album.commitCreate((err, fcommitFlag) => {
                    if (fcommitFlag) {
                        router.push({
                            uri: 'pages/selectalbum/selectalbum',
                            params: {
                                createParams: {
                                    name: albumName,
                                    type: 'createAlbum'
                                }
                            }
                        });
                    }
                });
            }
        });
    },
    renameDialogAlbum(value) {
        let name = value.detail;
        if (!this.isRepeatName(name)) {
            this.modifyAlbumName(name);
        }
    },

    // 判断是否重复相册名
    isRepeatName(name) {
        let list = this.cacheAlbums || [];
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.albumName === name) {
                prompt.showToast({
                    message: this.$t('strings.repeateName'),
                    duration: 1000
                });
                flag = true;
                break;
            }
        }
        return flag;
    },

    // 修改
    modifyAlbumName(albumName) {
        let self = this;
        let list = self.cacheAlbums || [];
        self.$element('rename_dialog').close();
        let checkedItem = self.getCheckedData()[0];
        let args = {
            selections: '',
            selectionArgs: ['imagealbum'],
        };
        media.getImageAlbums(args, (error, albums) => {
            if (albums) {
                for (let j = 0; j < albums.length; j++) {
                    let item = albums[j];
                    if (checkedItem.name === item.albumName) {
                        item.albumName = albumName;
                        item.commitModify((err, fcommitFlag) => {
                            if (fcommitFlag) {
                                self.$app.$def.datamanage.isRefreshed(true);
                                self.loadData();
                                self.onCheckedChange();
                            }
                        });
                    }
                }
            }
        });
    },

    // 顶部左侧按钮
    topBarLeftClick() {
        let self = this;
        self.listData.forEach(item => {
            item.checked = false;
            item.icon = '';
        });
        self.gridData.forEach(item => {
            item.icon = self.$app.$def.utils.getIcon(item.kind);
        });
        self.headSource.checked = false;
        self.headSource.icon = '';
        self.selectMode = false;
        self.topBarSource.isShowLeft = false;
        self.topBarSource.isShowRight = true;
        self.isShowBottomBar = false;
    },

    // 顶部右侧按钮
    topBarRightClick() {
        this.$element('create_dailog').show();
    },

    // 底部菜单
    bottomTabClick(item) {
        let length = this.getCheckedData().length;
        if (item.detail.id === 2) {
            if (length === 0) {
                return false;
            }
            let child = this.$child('delete_dialog');
            child.setTitle(this.$t('strings.deleteInfo') + length + this.$t('strings.items'));
            child.show();
        } else if (item.detail.id === 1) {
            if (length !== 1) {
                return false;
            }
            this.inputName = this.getCheckedData()[0].name + Math.round(Math.random() * 10);
            this.$element('rename_dialog').show();
        }
    },
    itemClick(obj) {
        let item = obj.detail.item;
        let uri = 'pages/photolist/photolist';
        if (item.kind === 'video') {
            uri = 'pages/videolist/videolist';
        }
        router.push(
            {
                uri: uri,
                params: {
                    album: item
                },
            }
        );
    },

    // 长按事件
    longPress() {
        let self = this;
        let topbar = self.$element('topBar');
        self.selectMode = true;
        self.topBarSource.isShowLeft = true;
        self.topBarSource.isShowRight = false;
        self.topBarSource.title = self.$t('strings.unChoose');
        self.isShowBottomBar = true;
        self.onCheckedChange();
    },

    // 选中发生改变
    onCheckedChange(obj) {
        let self = this;
        let length = this.getCheckedData().length;
        if (self.selectMode) {
            if (length === 0) {
                self.topBarSource.title = self.$t('strings.unChoose');
                for (let i = 0; i < self.bottomBarSource.length; i++) {
                    let item = self.bottomBarSource[i];
                    item.disabled = true;
                }
            } else {
                for (let i = 0; i < self.bottomBarSource.length; i++) {
                    let item = self.bottomBarSource[i];
                    item.disabled = false;
                }
                self.topBarSource.title = self.$t('strings.selected') + length + self.$t('strings.items');
            }
        } else {
            self.topBarSource.isShowLeft = false;
            self.isShowBottomBar = false;
            self.topBarSource.isShowRight = true;
        }
    },

    // 选中数据
    getCheckedData() {
        let self = this;
        let list = [];
        self.listData.forEach(item => {
            if (item.checked) {
                list.push(item);
            }
        });
        self.gridData.forEach(item => {
            if (item.checked) {
                list.push(item);
            }
        });
        return list;
    },
    deleteQuery() {
        this.deletePhotos();
    },

    // 删除相册
    deletePhotos() {
        let self = this;
        let choose = self.getCheckedData();
        for (let j = 0; j < choose.length; j++) {
            let chooseItem = choose[j];
            for (let i = 0; i < self.cacheAlbums.length; i++) {
                let item = self.cacheAlbums[i];
                if (item.albumName === chooseItem.name) {
                    item.commitDelete((err, deleteFlag) => {
                        if (deleteFlag) {
                            self.$app.$def.datamanage.isRefreshed(true);

                            if (j === choose.length - 1) {
                                if (choose.length === self.listData.length) {
                                    self.listData = [];
                                } else {
                                    setTimeout(() => {
                                        self.loadData();
                                        self.onCheckedChange();
                                    }, 200);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
};
