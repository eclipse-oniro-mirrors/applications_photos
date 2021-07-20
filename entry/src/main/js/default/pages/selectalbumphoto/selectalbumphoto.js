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

import device from '@system.device';
import router from '@system.router';
import prompt from '@system.prompt';
import medialibrary from '@ohos.multimedia.medialibrary';

let media = medialibrary.getMediaLibraryHelper();

export default {
    data: {
        album: null,
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/close.svg',
            rightSrc: '/common/image/icon/selected.png',
            isShowLeft: true,
            isShowRight: false
        },
        gridImageStyle: {},
        list: [],
        gridItemStyle: {
            height: '180px'
        },

        // 是否开启选择模式
        selectMode: true,

        // 是否全选
        isAllChecked: false,

        // 弹窗详细信息
        detailData: {},

        // 操作方式
        operationType: '',

        // 新建相册对象
        createParams: null
    },
    onShow() {
        this.loadData();
    },
    onHide() {
        this.$app.$def.datamanage.setPhotoList(this.list);
    },

    // 动态设置item宽度
    loadData() {
        let self = this;
        if (self.album) {
            let args = {
                selections: self.album.name,
                selectionArgs: ['imagealbum'],
            };
            let shareList = self.$app.$def.datamanage.getPhotoList() || [];
            media.getImageAssets(args, (error, images) => {
                if (images) {
                    for (let i = 0; i < images.length; i++) {
                        let item = images[i];
                        item.src = 'file://' + item.URI;
                        item.icon = self.$app.$def.utils.getIcon('unselected');
                        item.checked = false;
                        if (shareList.length > 0) {
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
                        }
                    }

                    self.list = images;
                    self.onCheckedChange();
                }
            });
        }
    },

    // 顶部左侧按钮
    topBarLeftClick() {
        router.back();
    },

    // 顶部右侧按钮
    topBarRightClick() {
        let self = this;
        let checkedList = self.getCheckedData();

        // 添加方式弹出操作窗
        if (checkedList.length > 0) {
            self.$element('add_type_dailog').show();
        }
    },

    // 新建相册
    createAlbum(checkList) {
        let self = this;
        router.push(
            {
                uri: 'pages/afterselect/afterselect',
                params: {
                    fromAlbum: self.album,
                    list: checkList,
                    operationType: 'create',
                    topBarSource: {
                        title: self.createParams.name,
                        leftSrc: '/common/image/svg/back.svg',
                        rightSrc: '/common/image/icon/selected.png',
                        isShowLeft: true,
                        isShowRight: false
                    },
                },
            }
        );
    },

    // 选中发生改变
    onCheckedChange() {
        let self = this;
        let length = self.getCheckedData().length;
        if (length === 0) {
            self.topBarSource.title = self.$t('strings.unChoose');
            self.topBarSource.isShowRight = false;
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('close');
            self.isAllChecked = false;
        } else {
            self.topBarSource.title = self.$t('strings.selected') + length + self.$t('strings.items');
            self.topBarSource.isShowRight = true;
            self.topBarSource.leftSrc = self.$app.$def.utils.getIcon('close');
            if (self.getCheckedData().length === self.list.length) {
                self.isAllChecked = true;
            } else {
                self.isAllChecked = false;
            }
        }
    },

    // 放大按钮点击事件
    scaleImgClick(item, index) {
        this.goDetail(item, index);
    },

    // 点击事件
    photoClick(item, index) {
        let self = this;
        item.checked = !item.checked;
        if (item.checked) {
            item.icon = self.$app.$def.utils.getIcon('selected');
        } else {
            item.icon = self.$app.$def.utils.getIcon('unselected');
        }
        self.onCheckedChange();

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

    // 根据是否开启选择模式，初始化选中效果
    initChecked() {
        let self = this;
        let gridList = self.list;

        // 宫格数据
        for (let index = 0; index < gridList.length; index++) {
            let item = gridList[index];
            item.icon = self.$app.$def.utils.getIcon('unselected');
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

    // 移动
    movePhotos() {
        let self = this;
        let choose = self.getCheckedData();
        if (choose.length === 0) {
            return false;
        }
        router.replace(
            {
                uri: 'pages/afterselect/afterselect',
                params: {
                    isOperationFrom: true,
                    operationType: 'move',
                    fromAlbum: self.album,
                    list: choose,
                    topBarSource: {
                        title: self.createParams.name,
                        leftSrc: '/common/image/svg/back.svg',
                        rightSrc: '/common/image/icon/selected.png',
                        isShowLeft: true,
                        isShowRight: false
                    },
                }
            }
        );
    },

    //  复制
    copyPhotos() {
        let self = this;
        let choose = self.getCheckedData();
        if (choose.length === 0) {
            return false;
        }
        router.replace(
            {
                uri: 'pages/afterselect/afterselect',
                params: {
                    isOperationFrom: true,
                    operationType: 'copy',
                    fromAlbum: self.album,
                    list: choose,
                    topBarSource: {
                        title: self.createParams.name,
                        leftSrc: '/common/image/svg/back.svg',
                        rightSrc: '/common/image/icon/selected.png',
                        isShowLeft: true,
                        isShowRight: false
                    },
                }
            }
        );
    },
    touchstart(e) {

    },
    touchcancel(e) {

    },
    touchend(e) {

    }
};
