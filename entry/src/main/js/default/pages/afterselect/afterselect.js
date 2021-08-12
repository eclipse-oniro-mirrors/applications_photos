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
import mediaLibrary from '@ohos.multimedia.medialibrary';

let media = mediaLibrary.getMediaLibraryHelper();

// 进度条
const PROGRESS = 100;

// 调用operations延时
const OPERATION_TIME = 50;

// 照片类型
const PHOTO_TYPE = 3;

// 视频类型
const VIDEO_TYPE = 4;

export default {
    data: {
        topBarSource: {
            title: '',
            leftSrc: '',
            rightSrc: '',
            isShowLeft: true,
            isShowRight: false
        },
        isShowBottomBar: false,
        list: [],
        gridItemWidth: '174px',

        // 操作方式
        operationType: '',
        progress: 0,
        progressTitle: '',
        operateType: '',
        fromAlbum: null,
        toAlbum: null,
        utils: null,
        videoType: VIDEO_TYPE,
        photoType: PHOTO_TYPE
    },

/**
    * 初始化数据
    */
    onInit() {
        this.utils = this.$app.$def.utils;
        this.utils.logDebug('afterSelect => onInit');
        this.topBarSource.leftSrc = this.utils.getIcon('back');
        this.topBarSource.rightSrc = this.utils.getIcon('select');
        this.progressTitle = this.topBarSource.title;
    },

/**
    * 初始化数据
    */
    onReady() {
        this.utils.logDebug('afterSelect => onReady');
        let self = this;
        setTimeout(() => {
            self.progress = PROGRESS;
            self.$element('progress_dialog').close();
        }, self.list.length * PROGRESS);
        setTimeout(() => {
            self.operations();
        }, OPERATION_TIME);
    },

/**
    * 操作后调用方法
    */
    operations() {
        this.utils.logDebug('afterSelect => operations');
        let self = this;
        self.initData();
        if (self.operationType === 'move') {
            self.operateType = self.$t('strings.moving');
            if (self.fromAlbum.name === self.$t('strings.allPhotos')
            || self.fromAlbum.name === self.$t('strings.video')) {
                self.mediaAllAlbumMove();
            } else {
                self.mediaMove();
            }
            self.$element('progress_dialog').show();
        } else if (self.operationType === 'copy') {
            self.operateType = self.$t('strings.copying');
            if (self.fromAlbum.name === self.$t('strings.allPhotos')
            || self.fromAlbum.name === self.$t('strings.video')) {
                self.mediaAllAlbumCopy();
            } else {
                self.mediaCopy();
            }
            self.$element('progress_dialog').show();
        } else {
            self.$element('progress_dialog').close();
            self.loadData();
        }
        self.$app.$def.dataManage.isRefreshed(true);
    },

/**
    * 所有相册入口复制
    */
    mediaAllAlbumCopy() {
        this.utils.logDebug('afterSelect => mediaAllAlbumCopy => startTime');
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
                                                self.progress += Math.ceil(PROGRESS / self.list.length - 1);
                                                if (i === self.list.length - 1) {
                                                    self.loadData();
                                                    self.utils.logDebug('afterSelect => mediaAllAlbumCopy => endTime');
                                                }
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

/**
    * 复制功能
    */
    mediaCopy() {
        this.utils.logDebug('afterSelect => mediaCopy => startTime');
        let self = this;
        let args = {
            selections: self.fromAlbum.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        let num = 0;
        media.getMediaAssets(args, (error, images) => {
            if (images) {
                for (let j = 0; j < images.length; j++) {
                    let fromItem = images[j];
                    for (let i = 0; i < self.list.length; i++) {
                        let item = self.list[i];
                        if (fromItem.name === item.name) {
                            num++;
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            newImage.albumName = self.topBarSource.title;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                self.progress += Math.ceil(PROGRESS / self.list.length - 1);
                                                if (i === self.list.length - 1 && num === self.list.length) {
                                                    self.loadData();
                                                    self.utils.logDebug('afterSelect => mediaCopy => endTime');
                                                }
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

/**
    * 查询
    */
    loadData() {
        this.utils.logDebug('afterSelect => loadData => startTime');
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
                self.utils.logDebug('afterSelect => loadData => endTime');
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

/**
    * 所有相册入口移动功能
    */
    mediaAllAlbumMove() {
        this.utils.logDebug('afterSelect => mediaAllAlbumMove => startTime');
        let self = this;
        for (let i = 0; i < self.list.length; i++) {
            let item = self.list[i];
            let arrData = item.URI.split('/');
            let albumName = arrData[arrData.length - 2];
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
                                                fromItem.commitDelete((error, commitFlag) => {
                                                    self.progress += Math.ceil(PROGRESS / self.list.length - 1);
                                                    if (commitFlag) {
                                                        if (i === self.list.length - 1) {
                                                            self.loadData();
                                                            self.utils.logDebug(
                                                                'afterSelect => mediaAllAlbumMove => endTime');
                                                        }
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

/**
    * 移动功能
    */
    mediaMove() {
        this.utils.logDebug('afterSelect => mediaMove => startTime');
        let self = this;
        let args = {
            selections: self.fromAlbum.name,
            selectionArgs: ['imagealbum', 'videoalbum'],
        };
        let num = 0;
        media.getMediaAssets(args, (error, images) => {
            if (images) {
                for (let j = 0; j < images.length; j++) {
                    let fromItem = images[j];
                    for (let i = 0; i < self.list.length; i++) {
                        let item = self.list[i];
                        if (fromItem.name === item.name) {
                            num++;
                            media.createImageAsset((error, newImage) => {
                                if (newImage) {
                                    newImage.startCreate((error, startFlag) => {
                                        if (startFlag) {
                                            newImage.albumName = self.topBarSource.title;
                                            fromItem.commitCopy(newImage, (err, data) => {
                                                fromItem.commitDelete((error, commitFlag) => {
                                                    self.progress += Math.ceil(PROGRESS / self.list.length - 1);
                                                    if (commitFlag) {
                                                        if (i === self.list.length - 1 && num === self.list.length) {
                                                            self.loadData();
                                                            self.utils.logDebug('afterSelect => mediaMove => endTime');
                                                        }
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

/**
    * 初始化数据
    */
    initData() {
        this.utils.logDebug('afterSelect => initData');
        let list = this.list;
        for (let index = 0; index < list.length; index++) {
            let item = list[index];
            item.icon = '';
            item.checked = false;
        }
    },

/**
    * 顶部左侧按钮
    */
    topBarLeftClick() {
        this.utils.logDebug('afterSelect => topBarLeftClick');
        router.back();
    }
};
