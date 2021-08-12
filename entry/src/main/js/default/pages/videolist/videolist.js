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
 * @file: 视频列表界面
 */

import router from '@system.router';
import mediaLibrary from '@ohos.multimedia.medialibrary';

let media = mediaLibrary.getMediaLibraryHelper();
export default {
    data: {
        listData: [],
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '/common/image/svg/add.svg',
            isShowLeft: true,
            isShowRight: false
        },
        isShowBottomBar: false,
        bottomBarSource: [
            {
                id: 1,
                src: '/common/image/svg/move.svg',
                disabled: true,
                name: ''
            },
            {
                id: 2,
                src: '/common/image/svg/delete.svg',
                disabled: true,
                name: ''
            },
            {
                id: 3,
                src: '/common/image/svg/select_all.svg',
                disabled: true,
                name: ''
            },
            {
                id: -10,
                src: '/common/image/svg/more.svg',
                disabled: false,
                visible: true,
                name: ''
            },
        ],
        bottomBarPopList: [
            {
                id: 1,
                src: '/common/image/svg/about.svg',
                disabled: false,
                visible: true,
                name: ''
            },
            {
                id: 2,
                src: '/common/image/svg/copy.svg',
                disabled: false,
                visible: true,
                name: ''
            }
        ],
        popVisible: false,
        videoWidth: '360px',
        videoDuration: '00:00',
        selectMode: false,
        detailData: [],
        isAllChecked: false,
        album: null,
        deleteDialogTitle: ''
    },
    onInit() {
        this.initNational();
    },
    initNational() {
        this.bottomBarSource[0].name = this.$t('strings.move');
        this.bottomBarSource[1].name = this.$t('strings.delete');
        this.bottomBarSource[2].name = this.$t('strings.selectAll');
        this.bottomBarSource[3].name = this.$t('strings.more');
        this.bottomBarPopList[0].name = this.$t('strings.detailInfo');
        this.bottomBarPopList[1].name = this.$t('strings.copy');
    },
    onShow() {
        this.loadData();
    },
    onBackPress() {
        if (this.selectMode) {
            this.topBarSource.leftSrc = this.$app.$def.utils.getIcon('back');
            this.topBarSource.title = this.$t('strings.video');
            this.isShowBottomBar = false;
            this.selectMode = false;
            this.initListChecked();
            return true;
        } else {
            return false;
        }
    },
    loadData() {
        let self = this;
        let arg = {
            selections: '',
            selectionArgs: ['videoalbum'],
        };

        // 用来保存从详情的选中数据
        let shareList = self.$app.$def.datamanage.getPhotoList() || [];
        media.getVideoAssets(arg, (error, videos) => {
            if (videos) {
                videos.forEach((item, index) => {
                    item.src = 'file://' + item.URI;
                    if (self.selectMode) {
                        item.icon = self.$app.$def.utils.getIcon('unselected');
                        for (let j = 0; j < shareList.length; j++) {
                            let shareItem = shareList[j];
                            if (item.name === shareItem.name && item.id === shareItem.id) {
                                item.checked = shareItem.checked;
                                if (shareItem.checked) {
                                    item.icon = self.$app.$def.utils.getIcon('selected');
                                } else {
                                    item.icon = self.$app.$def.utils.getIcon('unselected');
                                }
                            }
                        }
                    } else {
                        item.icon = '';
                        item.checked = false;
                    }
                    item.poster = '/common/image/internet' + index + 1 + '.jpg';
                });
                self.listData = videos;
                self.onCheckedChange();
            }
        });
    },

    // 顶部左侧按钮
    topBarLeftClick() {
        if (this.selectMode) {
            this.topBarSource.leftSrc = this.$app.$def.utils.getIcon('back');
            this.topBarSource.title = this.$t('strings.video');
            this.isShowBottomBar = false;
            this.selectMode = false;
            this.initListChecked();
            return false;
        }
        router.back();
    },

    // 顶部右侧按钮
    topBarRightClick() {

    },
    videoPrepare(e) {
        this.videoDuration = e.duration;
    },
    scaleClick(item, index) {
        router.push(
            {
                uri: 'pages/photodetail/photodetail',
                params: {
                    list: this.listData,
                    album: this.album,
                    selectMode: this.selectMode,
                    sharetIndex: index
                },
            }
        );
    },
    videoClick(item, index) {
        this.hideBottomPop();
        if (this.selectMode) {
            item.checked = !item.checked;
            if (item.checked) {
                item.icon = this.$app.$def.utils.getIcon('selected');
            } else {
                item.icon = this.$app.$def.utils.getIcon('unselected');
            }
            this.onCheckedChange();
            return false;
        }
        router.push(
            {
                uri: 'pages/photodetail/photodetail',
                params: {
                    list: this.listData,
                    album: this.album,
                    selectMode: this.selectMode,
                    sharetIndex: index
                },
            }
        );
    },
    longpress(item, index) {
        this.selectMode = true;
        this.topBarSource.leftSrc = this.$app.$def.utils.getIcon('close');
        this.topBarSource.title = this.$t('strings.unChoose');
        this.isShowBottomBar = true;
        this.initListChecked();

        this.videoClick(item, index);
    },
    onCheckedChange() {
        let self = this;
        let checkList = self.getCheckedData();
        if (!self.selectMode) {
            self.topBarSource.isShowLeft = true;
            self.topBarSource.title = self.album.name;
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('back');
            self.isShowBottomBar = false;
            self.isAllChecked = false;
            self.initListChecked();
            return false;
        }
        if (checkList.length === 0) {
            self.topBarSource.title = this.$t('strings.unChoose');
            self.bottomBarSource[2].name = this.$t('strings.selectAll');
            self.bottomBarSource[2].src = '/common/image/svg/select_all.svg';
            self.isAllChecked = false;
            for (let i = 0; i < self.bottomBarSource.length; i++) {
                const item = self.bottomBarSource[i];
                if (item.id !== 3) {
                    item.disabled = true;
                }
            }
        } else {
            for (let i = 0; i < self.bottomBarSource.length; i++) {
                const item = self.bottomBarSource[i];
                item.disabled = false;
            }
            self.isShowBottomBar = true;
            self.topBarSource.title = self.$t('strings.selected') + checkList.length + self.$t('strings.items');
            if (self.getCheckedData().length === self.listData.length) {
                self.isAllChecked = true;
                self.bottomBarSource[2].name = this.$t('strings.unSelectAll');
                self.bottomBarSource[2].src = '/common/image/svg/unselect_all.svg';
            } else {
                self.isAllChecked = false;
                self.bottomBarSource[2].name = this.$t('strings.selectAll');
                self.bottomBarSource[2].src = '/common/image/svg/select_all.svg';
            }
        }
    },
    initListChecked() {
        this.listData.forEach(item => {
            item.checked = false;
            item.icon = this.$app.$def.utils.getIcon('unselected');
        });
    },

    // 获取选中数据
    getCheckedData() {
        let self = this;
        let list = [];
        self.listData.forEach(item => {
            if (item.checked) {
                list.push(item);
            }
        });
        return list;
    },

    // 底部菜单
    bottomTabClick(item) {
        if (item.detail.id === 1) {
            this.movePhotos();
        } else if (item.detail.id === 2) {
            this.deletePhotos();
        } else if (item.detail.id === 3) {
            this.setListChecked();
        }
    },

    // 设置全选
    setListChecked() {
        let self = this;
        let list = self.listData;

        // 宫格数据
        for (let index = 0; index < list.length; index++) {
            let item = list[index];
            if (self.isAllChecked) {
                item.checked = false;
                item.icon = self.$app.$def.utils.getIcon('unselected');
            } else {
                item.checked = true;
                item.icon = self.$app.$def.utils.getIcon('selected');
            }
        }
        self.onCheckedChange();

    },

    // 弹出提示框点击事件
    popupItemClick(item) {
        if (item.detail.id === 2) {
            this.copyPhotos();
        } else if (item.detail.id === 1) {
            let list = this.getCheckedData();
            if (list.length === 0) {
                return false;
            }
            let size = 0;
            for (let i = 0; i < list.length; i++) {
                size += Number(list[i].size);
            }
            size = size / 1024 / 1024;
            this.detailData = {
                number: list.length,
                size: size.toFixed(4)
            };
            this.$element('detail_dialog').show();
        }
    },
    deleteQuery() {
        this.deleteDialogCommit();
    },

    // 删除图片
    deletePhotos() {
        let length = this.getCheckedData().length;
        if (length === 0) {
            return false;
        }
        let child = this.$child('delete_dialog');
        child.setTitle(this.$t('strings.selected') + length + this.$t('strings.items'));
        child.show();
    },
    deleteDialogCommit() {
        let self = this;
        let choose = self.getCheckedData();
        let arg = {
            selections: '',
            selectionArgs: ['videoalbum'],
        };
        media.getVideoAssets(arg, (error, videos) => {
            if (videos) {
                for (let j = 0; j < choose.length; j++) {
                    let shareItem = choose[j];
                    videos.forEach((item, index) => {
                        if (item.name === shareItem.name && item.id === shareItem.id) {
                            item.commitDelete((error, commitFlag) => {
                                if (commitFlag) {
                                    self.$app.$def.datamanage.isRefreshed(true);
                                    self.selectMode = false;
                                    setTimeout(() => {
                                        if (choose.length === self.listData.length) {
                                            self.listData = [];
                                            self.onCheckedChange();
                                        } else {
                                            self.loadData();
                                        }
                                    }, 200);
                                }
                            });
                        }
                    });
                }
            }
        });
    },

    // 移动
    movePhotos() {
        let self = this;
        let choose = self.getCheckedData();
        router.push(
            {
                uri: 'pages/selectalbum/selectalbum',
                params: {
                    isOperationFrom: true,
                    operationType: 'move',
                    fromAlbum: self.album,
                    checkedList: choose
                }
            }
        );
    },

    // 复制
    copyPhotos() {
        let self = this;
        let choose = self.getCheckedData();
        router.push(
            {
                uri: 'pages/selectalbum/selectalbum',
                params: {
                    isOperationFrom: true,
                    operationType: 'copy',
                    fromAlbum: self.album,
                    checkedList: choose
                }
            }
        );
    },
    hideBottomPop() {
        this.popVisible = false;
    },
    changePopVisible(e) {
        this.popVisible = e.detail;
    }
};
