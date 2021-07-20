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
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '',
            isShowLeft: true,
            isShowRight: true
        },
        sharetIndex: 0,
        album: null,
        list: [],
        selectMode: false,
        isShowBottom: false,
        popVisible: false,
        bottomBarSource: [
            {
                id: 1,
                src: '/common/image/svg/move.svg',
                name: '',
                visible: true,
                disabled:false
            },
            {
                id: 2,
                src: '/common/image/svg/copy.svg',
                name: '',
                visible: true,
                disabled:false
            },
            {
                id: 3,
                src: '/common/image/svg/delete.svg',
                name: '',
                visible: true,
                disabled:false
            },
            {
                id: -10,
                src: '/common/image/svg/more.svg',
                name: '',
                visible: true,
                disabled:false
            },
        ],
        bottomBarPopList: [
            {
                id: 1,
                src: '/common/image/svg/rename.svg',
                name: '',
                visible: true,
                disabled:false
            }, {
                id: 2,
                src: '/common/image/svg/rotate.svg',
                name: '',
                visible: true,
                disabled:false
            }
        ],
        currentItem: {},
        cacheList: [],
        inputName: '',
        refreshType: -1,
        detailData: {
            size: 0,
            name: ''
        },
        transFormType: 0,
        showScale:true,
        isScaleMinusDisable:false,
        isScaleAddDisable:false
    },
    onInit() {
        this.initNational();
    },
    onBackPress() {
        this.topBarLeftClick();
        return true;
    },
    initNational() {
        this.headTitle = this.$t('strings.albums');
        this.bottomBarSource[0].name = this.$t('strings.move');
        this.bottomBarSource[1].name = this.$t('strings.copy');
        this.bottomBarSource[2].name = this.$t('strings.delete');
        this.bottomBarSource[3].name = this.$t('strings.more');
        this.bottomBarPopList[0].name = this.$t('strings.rename');
        this.bottomBarPopList[1].name = this.$t('strings.rotate');
    },
    onShow() {
        let self = this;
        if (self.list.length > 0) {
            let item = self.list[self.sharetIndex];
            self.currentItem = item;
            self.topBarSource.title = self.currentItem.name;
            if(self.currentItem.mediaType === 4) {
                self.showScale = false;
                self.bottomBarPopList[1].visible = false;
            } else {
                self.showScale = true;
                self.bottomBarPopList[1].visible = true;
            }
            if (self.selectMode) {
                self.isShowBottom = false;
                self.changeRightIcon(item);
            } else {
                self.topBarSource.rightSrc = this.$app.$def.utils.getIcon('info');
                self.isShowBottom = true;
            }
        }
        self.loadData();
    },
    loadData() {
        let self = this;
        if (self.album) {
            if (self.album.name === self.$t('strings.video')) {
                self.getVideoAsset();
                return false;
            } else {
                self.getAlbumAsset();
            }
        }
    },

    // 获取视频数据
    getVideoAsset() {
        let self = this;
        let args = {
            selections: '',
            selectionArgs: ['videoalbum'],
        };
        media.getVideoAssets(args, (error, videos) => {
            let list = [];
            for (let i = 0; i < videos.length; i++) {
                let item = videos[i];
                item.icon = '';
                item.src = 'file://' + item.URI;
                item.rotate = 0;
                item.scale = 1;
                list.push(item);
            }
            if (self.refreshType === 1 ) {
                if (self.sharetIndex > 0) {
                    self.sharetIndex--;
                } else {
                    self.sharetIndex = 0;
                }
            } else if (self.refreshType ===2) {
                self.sharetIndex = 0;
            }
            self.currentItem = list[self.sharetIndex];
            self.topBarSource.title = self.currentItem.name;
            self.list = list || [];

            self.isRrefreshed = -1;
            self.cacheList = list || [];
        });
    },

    // 获取图片及所有照片数据
    getAlbumAsset() {
        let self = this;
        let args = {
            selections: self.album.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };

        //  表示直接从相机到主页面跳转过来
        if (self.list.length === 0) {
            self.topBarSource.title = 'camera';
            self.topBarSource.rightSrc = self.$app.$def.utils.getIcon('info');
            args.selections = 'camera';
            self.isShowBottom = true;
        }

        //  由于查询到的图片相册名返回的全是unknow 这里要获取路径截取一下

        //  判断是否是所有照片， 获取当前图片所在相册
        if (self.album.name === self.$t('strings.allPhotos')) {
            args.selections = '';
        }
        media.getMediaAssets(args, (error, images) => {
            if (self.list.length === 0 || self.refreshType !== -1) {
                let list = [];
                for (let i = 0; i < images.length; i++) {
                    let item = images[i];
                    item.icon = '';
                    item.src = 'file://' + item.URI;
                    item.rotate = 0;
                    item.scale = 1;
                    list.push(item);
                }
                if (self.refreshType === 1) {
                    if (self.sharetIndex > 0) {
                        self.sharetIndex--;
                    } else {
                        self.sharetIndex = 0;
                    }
                } else if (self.refreshType ===2) {
                    self.sharetIndex = 0;
                }
                self.list = list;
                self.currentItem = list[self.sharetIndex];
                self.topBarSource.title = self.currentItem.name;
                self.refreshType = -1;
            }
            self.cacheList = images || [];
        });
    },

    // 选中发生改变
    onCheckedChange() {
        let self = this;
        let length = self.getCheckedData().length;
        if (length === 0) {
            self.topBarSource.title = self.$t('strings.unChoose');
        } else {
            self.topBarSource.title = self.$t('strings.selected') + length + self.$t('strings.items');
        }
    },

    // 获取选中数据
    getCheckedData() {
        let self = this;
        let list = [];
        self.list.forEach(item => {
            if (item.checked) {
                list.push(item);
            }
        });
        return list;
    },
    swiperChange(item) {
        this.currentItem.scale = 1;
        this.currentItem.rotate = 0;
        let obj = this.list[item.index];
        this.currentItem = obj;
        if(this.currentItem.mediaType === 4) {
            this.showScale = false;
            this.bottomBarPopList[1].visible = false;
        } else {
            this.showScale = true;
            this.bottomBarPopList[1].visible = true;
        }
        if (this.selectMode) {
            this.changeRightIcon(obj);
        } else {
            this.topBarSource.title = this.currentItem.name;
        }
    },
    changeRightIcon(item) {
        if (item.checked) {
            this.topBarSource.rightSrc = this.$app.$def.utils.getIcon('selected');
        } else {
            this.topBarSource.rightSrc = this.$app.$def.utils.getIcon('unselected_black');
        }
        this.onCheckedChange();
    },
    topBarRightClick() {
        if (this.selectMode) {
            this.currentItem.checked = !this.currentItem.checked;
            this.changeRightIcon(this.currentItem);
        } else {
            this.detailData.size = (Number(this.currentItem.size) / 1024 / 1024).toFixed(4);
            this.detailData.name = this.currentItem.name;
            this.$element('photo_detail_dialog').show();
        }
    },
    dialogCancel() {
        this.$element('photo_detail_dialog').close();
    },
    topBarLeftClick() {
        this.$app.$def.datamanage.setPhotoList(this.list);
        router.back({
            uri: 'pages/photolist/photolist',
            params: {
                list: this.list,
                selectMode: this.selectMode
            },
        });
    },
    bottomTabClick(item) {
        if (item.detail.id === 1) {
            this.movePhotos();
        } else if (item.detail.id === 2) {
            this.copyPhotos();
        } else if (item.detail.id === 3) {
            this.deletePhotos();
        }
    },

    //  弹出提示框点击事件
    popupItemClick(item) {
        let self = this;
        if (item.detail.id === 1) {
            let arrs = self.currentItem.name.split('.');
            let fname = arrs[0];
            let lname = arrs[1];
            if (self.currentItem.mediaType === 3) {
                self.inputName = fname + Math.round(Math.random() * 100) + '.' + lname;
            } else if (self.currentItem.mediaType === 4) {
                self.inputName = fname + Math.round(Math.random() * 100) + '.' + lname;
            }
            self.$element('rename_dialog').show();
        } else if (item.detail.id === 2) {
            if(self.transFormType !== 0) {
                self.currentItem.scale = 1;
            }
            self.transFormType = 0;
            if(self.currentItem.rotate === 270 ) {
                self.currentItem.rotate = 0;
            } else {
                self.currentItem.rotate += 90;
            }
        }
    },
    renameDialogAlbum(value) {
        let name = value.detail;
        if (!this.isRepeatName(name)) {
            this.modifyName(name);
        }

    },
    modifyName(albumName) {
        let self = this;
        self.$element('rename_dialog').close();
        if (self.album.name === self.$t('strings.video')) {
            self.modifyVideoName(albumName);
        } else {
            self.modifyPhotoName(albumName);
        }
    },

    // 修改图片名称
    modifyPhotoName(albumName) {
        let self = this;
        let checkItem = self.currentItem;
        let args = {
            selections: self.album.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };

        // 由于查询到的图片相册名返回的全是unknow 这里要获取路径截取一下

        // 判断是否是所有照片， 获取当前图片所在相册
        if (self.album.name === self.$t('strings.allPhotos')) {
            args.selections = '';
        }
        media.getMediaAssets(args, (error, images) => {
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    let item = images[i];
                    if (item.id === checkItem.id) {
                        item.startModify((error, startFlag) => {
                            if (startFlag) {
                                item.name = albumName;
                                item.commitModify((error, commitFlag) => {
                                    if (commitFlag) {
                                        self.refreshType = 2;

                                        setTimeout(() => {
                                            self.loadData();
                                        }, 200);
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
    },

    //  修改视频名称
    modifyVideoName(albumName) {
        let self = this;
        let checkItem = self.currentItem;
        let args = {
            selections: '',
            selectionArgs: ['videoalbum'],
        };
        media.getVideoAssets(args, (error, videos) => {
            for (let i = 0; i < videos.length; i++) {
                let video = videos[i];
                if (video.id === checkItem.id) {
                    video.startModify((error, startFlag) => {
                        if (startFlag) {
                            video.name = albumName;
                            video.commitModify((error, commitFlag) => {
                                if (commitFlag) {
                                    self.refreshType = 2;
                                    setTimeout(() => {
                                        self.loadData();
                                    }, 200);
                                }
                            });
                        }
                    });
                }
            }
        });
    },

    //  判断是否重复相册名
    isRepeatName(name) {
        let list = this.cacheList || [];
        let flag = false;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.name === name) {
                prompt.showToast({
                    message: this.$t('string.repeateName'),
                    duration: 1000
                });
                flag = true;
                break;
            }
        }
        return flag;
    },
    deleteQuery() {
        let self = this;
        let currentItem = self.list[self.sharetIndex];
        let list = self.cacheList || [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];

            // 由于查询所有返回的图片id 跟查询单个相册返回的图片id 对应不上，所以不能只以id判断
            if (item.id === currentItem.id && item.name === currentItem.name) {
                item.commitDelete((error, commitFlag) => {
                    if (commitFlag) {
                        self.refreshType = 1;
                        setTimeout(() => {
                            self.loadData();
                        }, 200);
                        self.$app.$def.datamanage.isRefreshed(true);

                    }
                });
            }
        }
    },
    // 删除图片
    deletePhotos() {
        let child = this.$child('delete_dialog');
        child.setTitle(this.$t('strings.isDeleteChooseItem'));
        child.show();
    },

    //  移动
    movePhotos() {
        let self = this;
        if (self.album.name === self.$t('strings.allPhotos')) {
            let arrs = self.currentItem.URI.split('/');
            self.album.name = arrs[arrs.length - 2];
        }
        router.replace(
            {
                uri: 'pages/selectalbum/selectalbum',
                params: {
                    isOperationFrom: true,
                    operationType: 'move',
                    fromAlbum: self.album,
                    checkedList: [self.currentItem]
                }
            }
        );
    },

    //  复制
    copyPhotos() {
        let self = this;

        //  判断是否是所有照片， 获取当前图片所在相册
        if (self.album.name === self.$t('strings.allPhotos')) {
            let arrs = self.currentItem.URI.split('/');
            self.album.name = arrs[arrs.length - 2];
        }
        router.replace(
            {
                uri: 'pages/selectalbum/selectalbum',
                params: {
                    isOperationFrom: true,
                    operationType: 'copy',
                    fromAlbum: self.album,
                    checkedList: [self.currentItem]
                }
            }
        );
    },
    hideBottomPop() {
        this.popVisible = false;
    },
    changePopVisible(e) {
        this.popVisible = e.detail;
    },
    leftScale(){
        if(this.transFormType !== 1){
            this.currentItem.rotate = 0;
        }
        this.transFormType = 1;
        this.currentItem.scale += 0.5;
        this.isScaleMinusDisable = false
        if(this.currentItem.scale > 2) {
            this.currentItem.scale = 2 ;
            this.isScaleAddDisable = true;
            this.isScaleMinusDisable = false;
        }
    },
    rightScale(){
        if(this.transFormType !== 1){
            this.currentItem.rotate = 0;
        }
        this.transFormType = 1;
        this.currentItem.scale -= 0.25;
        this.isScaleAddDisable = false;
        if(this.currentItem.scale < 0.5) {
            this.currentItem.scale  = 0.5;
            this.isScaleMinusDisable = true;
            this.isScaleAddDisable = false;
        }
    }
};
