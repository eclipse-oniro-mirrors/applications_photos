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
 * @file: 缓存数据
 */

let listData = [];
let gridData = [];

// 用来缓存相册列表与详情数据
let photoList = [];

// 用来缓存首页相册数据
let mainAlbumList = [];
let isRefreshed = true;
export default {
    getListData() {
        return listData;
    },
    getGridData() {
        return gridData;
    },
    setPhotoList(list) {
        photoList = list;
    },
    getPhotoList() {
        return photoList;
    },
    setMainAlbumList(list) {
        mainAlbumList = list;
    },
    getMainAlbumList() {
        return mainAlbumList;
    },
    isRefreshed(flag) {
        isRefreshed = flag;
    },
    getRefreshed() {
        return isRefreshed;
    },
};