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
 * @file: 工具类方法
 */

let iconCache = {};

export default {
    getIcon(type) {
        return iconCache[type];
    },
    initIcon() {
        iconCache['camera'] = '/common/image/svg/camera.svg';
        iconCache['selected'] = '/common/image/svg/checkbox_filled.svg';
        iconCache['unselected'] = '/common/image/svg/checkbox_white.svg';
        iconCache['collection'] = '/common/image/svg/favorite_white_filled.svg';
        iconCache['friend'] = '/common/image/svg/shared_album_white_filled.svg';
        iconCache['video'] = '/common/image/svg/video_white_filled.svg';
        iconCache['rename'] = '/common/image/svg/rename.svg';
        iconCache['rename_black'] = '/common/image/svg/rename_filled_black.svg';
        iconCache['delete'] = '/common/image/svg/delete.svg';
        iconCache['delete_black'] = '/common/image/svg/delete_filled_black.svg';
        iconCache['more'] = '/common/image/svg/more.svg';
        iconCache['select_all'] = '/common/image/svg/select_all.svg';
        iconCache['move'] = '/common/image/svg/move.svg';
        iconCache['copy'] = '/common/image/svg/copy.svg';
        iconCache['back'] = '/common/image/svg/back.svg';
        iconCache['close'] = '/common/image/svg/close.svg';
        iconCache['info'] = '/common/image/svg/info.svg';
        iconCache['unselected_black'] = '/common/image/svg/unchecked_black.svg';
        iconCache['enlarge'] = '/common/image/svg/enlarge.svg';
        iconCache['narrow'] = '/common/image/svg/narrow.svg';
        iconCache['scaleadd'] = '/common/image/svg/scaleadd.svg';
        iconCache['scaleminus'] = '/common/image/svg/scaleminus.svg';
    },
    pxTodp(value, density) {
        return value / density * 2;
    },

    // 以下函数返回 min（包含）～ max（包含）之间的数字：
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '年';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        let D = date.getDate() + '日';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D;
    }
};