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
 * @file: 图片列表界面
 */

import router from '@system.router';
import medialibrary from '@ohos.multimedia.medialibrary';

let media = medialibrary.getMediaLibraryHelper();

export default {
    data: {
        album: null,
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '/common/image/icon/selected.png',
            isShowLeft: true,
            isShowRight: false
        },
        bottomBarSource: [
            {
                id: 1,
                src: '/common/image/svg/move.svg',
                disabled: false,
                visible: true,
                name: ''
            },
            {
                id: 2,
                src: '/common/image/svg/delete.svg',
                disabled: false,
                visible: true,
                name: ''
            },
            {
                id: 3,
                src: '/common/image/svg/select_all.svg',
                disabled: false,
                visible: true,
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
        gridImageStyle: {
            width: '176px',
            height: '180px'
        },
        isShowBottomBar: false,
        list: [],
        cacheList: [],

        // 是否开启选择模式
        selectMode: false,

        // 是否全选
        isAllChecked: false,

        // 弹窗详细信息
        detailData: {},
        deleteDialogTitle: '',
        consoleInfo: '',
        popVisible: false
    },
    onInit() {
        this.initNational();
    },
    onDestroy() {
        this.$app.$def.datamanage.setPhotoList([]);
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
        if (this.selectMode) {
            this.onCheckedChange();
        }
    },
    onHide() {
        this.$app.$def.datamanage.setPhotoList(this.list);
    },
    onBackPress() {
        if (this.selectMode) {
            this.selectMode = false;
            this.onCheckedChange();
            return true;
        } else {
            return false;
        }
    },
    loadData() {
        let self = this;
        if (self.album) {
            self.topBarSource.title = self.album.name;
            if (self.album.name === self.$t('strings.allPhotos')) {
                self.getAllPhotos();
            } else {
                self.getAlbumPhotos();
            }
        }
    },
    getAlbumPhotos() {
        let self = this;

        //  用来保存从详情的选中数据
        let shareList = self.$app.$def.datamanage.getPhotoList() || [];
        let args = {
            selections: self.album.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        media.getMediaAssets(args, (error, images) => {
            let list = [];
            if (error) {
                console.info(' MediaLibraryTest: getImageAssets error ' + error);
            }
            if (images) {
                self.cacheList = images;
                for (let i = 0; i < images.length; i++) {
                    let item = images[i];
                    let obj = {
                        mediaType: item.mediaType,
                        size: item.size,
                        dateAdded: item.dateAdded,
                        dateModified: item.dateModified,
                        name: item.name,
                        albumName: item.albumName,
                        albumId: item.albumId,
                        id: item.id,
                        src: 'file://' + item.URI,
                        URI: item.URI,
                        icon: '',
                        checked: false,
                        rotate: 0,
                        scale: 1,
                        itemStyle: {
                            width: '176px',
                            height: '180px'
                        },
                        imageStyle: {
                            width: '176px',
                            height: '180px'
                        }
                    };
                    if (self.selectMode) {
                        obj.icon = self.$app.$def.utils.getIcon('unselected');
                        for (let j = 0; j < shareList.length; j++) {
                            let shareItem = shareList[j];
                            if (item.name === shareItem.name && item.id === shareItem.id) {
                                obj.checked = shareItem.checked;
                                if (shareItem.checked) {
                                    obj.icon = self.$app.$def.utils.getIcon('selected');
                                } else {
                                    obj.icon = self.$app.$def.utils.getIcon('unselected');
                                }
                            }
                        }
                    }
                    list.push(obj);
                }
                self.list = list;
                self.onCheckedChange();
            }
        });
    },
    getAllPhotos() {
        let self = this;

        // 用来保存从详情的选中数据
        let shareList = self.$app.$def.datamanage.getPhotoList() || [];
        media.getMediaAssets((error, images) => {
            self.cacheList = images;
            if (images) {
                let list = [];
                for (let i = 0; i < images.length; i++) {
                    let item = images[i];
                    let obj = {
                        mediaType: item.mediaType,
                        size: item.size,
                        dateAdded: item.dateAdded,
                        dateModified: item.dateModified,
                        name: item.name,
                        albumName: item.albumName,
                        albumId: item.albumId,
                        id: item.id,
                        src: 'file://' + item.URI,
                        URI: item.URI,
                        icon: '',
                        checked: false,
                        rotate: 0,
                        scale: 1,
                        itemStyle: {
                            width: '176px',
                            height: '180px'
                        },
                        imageStyle: {
                            width: '176px',
                            height: '180px'
                        }
                    };
                    if (self.selectMode) {
                        obj.icon = self.$app.$def.utils.getIcon('unselected');
                        for (let j = 0; j < shareList.length; j++) {
                            let shareItem = shareList[j];
                            if (item.name === shareItem.name && item.id === shareItem.id) {
                                obj.checked = shareItem.checked;
                                if (shareItem.checked) {
                                    obj.icon = self.$app.$def.utils.getIcon('selected');
                                } else {
                                    obj.icon = self.$app.$def.utils.getIcon('unselected');
                                }
                            }
                        }
                    }
                    list.push(obj);
                }
                self.list = list;
                self.onCheckedChange();
            }
        });
    },

    //  顶部左侧按钮
    topBarLeftClick() {
        let self = this;
        if (self.selectMode) {
            self.selectMode = false;
        } else {
            router.back();
        }
        self.onCheckedChange();
    },

    //  顶部右侧按钮
    topBarRightClick() {
        let self = this;
        let checkedList = self.getCheckedData();

        //  添加方式弹出操作窗
        if (checkedList.length > 0) {
            self.$element('add_type_dailog').show();
        }

    },

    //  底部菜单
    bottomTabClick(item) {
        let self = this;
        if (item.detail.id === 1) {
            self.movePhotos();
        } else if (item.detail.id === 2) {
            self.deletePhotos();
        } else if (item.detail.id === 3) {
            self.setListChecked();
        }
    },

    //  弹出提示框点击事件
    popupItemClick(item) {
        let self = this;
        if (item.detail.id === 2) {
            self.copyPhotos();
        } else if (item.detail.id === 1) {
            let list = self.getCheckedData();
            let size = 0;
            for (let i = 0; i < list.length; i++) {
                size += Number(list[i].size);
            }
            size = size / 1024 / 1024;
            self.detailData = {
                number: list.length,
                size: size.toFixed(4)
            };
            self.$element('detail_dialog').show();
        }
    },

    // 选中发生改变
    onCheckedChange() {
        let self = this;
        if (!self.selectMode) {
            self.topBarSource.isShowLeft = true;
            self.topBarSource.title = self.album.name;
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('back');
            self.isShowBottomBar = false;
            self.isAllChecked = false;
            self.initChecked();
            return false;
        }
        if (self.getCheckedData().length === 0) {
            self.topBarSource.title = self.$t('strings.unChoose');
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('close');
            self.bottomBarSource[2].name = self.$t('strings.selectAll');
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
            self.topBarSource.title = self.$t('strings.selected')
            + self.getCheckedData().length + self.$t('strings.items');
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('close');
            if (self.getCheckedData().length === self.list.length) {
                self.isAllChecked = true;
                self.bottomBarSource[2].name = self.$t('strings.unSelectAll');
                self.bottomBarSource[2].src = '/common/image/svg/unselect_all.svg';
            } else {
                self.isAllChecked = false;
                self.bottomBarSource[2].name = self.$t('strings.selectAll');
                self.bottomBarSource[2].src = '/common/image/svg/select_all.svg';
            }
        }
    },
    // 放大按钮点击事件
    scaleImgClick(item, index) {
        this.goDetail(item, index);
    },

    //  点击事件
    photoClick(item, index) {
        let self = this;
        self.hideBottomPop();
        if (self.selectMode) {
            item.checked = !item.checked;
            if (item.checked) {
                item.icon = self.$app.$def.utils.getIcon('selected');
            } else {
                item.icon = self.$app.$def.utils.getIcon('unselected');
            }
            self.onCheckedChange();
        }

        if (!self.selectMode) {
            self.goDetail(item, index);
        }
    },

    // 跳转详情页面
    goDetail(item, index) {
        let self = this;
        router.push(
            {
                uri: 'pages/photodetail/photodetail',
                params: {
                    list: self.list,
                    album: self.album,
                    selectMode: self.selectMode,
                    sharetIndex: index
                },
            }
        );
    },

    // 长按事件
    parentLongpress(item, index) {
        let self = this;
        if (self.selectMode) {
            return false;
        }
        let gridList = self.list;

        // 宫格数据
        for (let index = 0; index < gridList.length; index++) {
            let item = gridList[index];
            item.icon = self.$app.$def.utils.getIcon('unselected');
        }

        self.selectMode = true;
        self.topBarSource.leftSrc = this.$app.$def.utils.getIcon('close');

        self.photoClick(item, index);
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

    // 设置全选/全不选
    setListChecked() {
        let self = this;
        let list = self.list;

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

    // 添加方式弹窗点击事件
    addTypeDialogClick(obj) {
        if (obj.detail === '复制') {
            this.copyPhotos();
        } else if (obj.detail === '移动') {
            this.movePhotos();
        }
    },
    deleteDialogCommit() {
        let self = this;
        let choose = this.getCheckedData();
        let list = self.cacheList;
        for (let i = 0; i < choose.length; i++) {
            let checkItem = choose[i];
            for (let j = 0; j < list.length; j++) {
                let item = list[j];

                // 由于查询所有返回的图片id 跟查询单个相册返回的图片id 对应不上，所以不能只以id判断
                if (item.name === checkItem.name && item.id === checkItem.id) {
                    item.commitDelete((error, commitFlag) => {
                        if (commitFlag) {
                            self.$app.$def.datamanage.isRefreshed(true);
                            self.selectMode = false;

                            setTimeout(() => {
                                if (choose.length === self.list.length) {
                                    self.list = [];
                                    self.onCheckedChange();
                                } else {
                                    self.loadData();
                                }
                            }, 200);
                        }
                    });
                }
            }
        }
    },
    deleteQuery() {
        this.deleteDialogCommit();
    },

    //  删除图片
    deletePhotos() {
        let length = this.getCheckedData().length;
        if (length === 0) {
            return false;
        }
        let child = this.$child('delete_dialog');
        child.setTitle(this.$t('strings.deleteInfo') + length + this.$t('strings.items'));
        child.show();
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
    touchstart(item, e) {
        let self = this;
        let width = item.itemStyle.width.replace('px', '');
        let height = item.itemStyle.height.replace('px', '');

        item.imageStyle.width = 0.9 * width;
        item.imageStyle.height = 0.9 * height;
    },
    touchcancel(item, e) {
        item.imageStyle.width = item.itemStyle.width;
        item.imageStyle.height = item.itemStyle.height;
    },
    touchend(item, e) {
        item.imageStyle.width = item.itemStyle.width;
        item.imageStyle.height = item.itemStyle.height;
    },
    hideBottomPop() {
        this.popVisible = false;
    },
    changePopVisible(e) {
        this.popVisible = e.detail;
    }
};
