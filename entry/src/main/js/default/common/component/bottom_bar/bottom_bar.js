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
 * @file: 底部操作栏
 */

export default {
    data: {
        isShow: true,
        dataSource: [],
        popupList: [],
        popVisible: false
    },
    computed: {
        popHeight() {
            let length = 0;
            this.popList = [];
            for (let i = 0; i < this.popupList.length; i++) {
                const item = this.popupList[i];
                if (item.visible) {
                    length++;
                }
            }
            return (length * 100) + 'px';
        }
    },
    tabClick(item, index) {
        let self = this;
        if (!item.disabled) {
            if (item.id === -10) {
                setTimeout(() => {
                    self.popVisible = !self.popVisible;
                    self.$emit('changePopVisible', self.popVisible);
                }, 50);
            } else {
                setTimeout(() => {
                    self.popVisible = false;
                }, 50);
                self.$emit('bottomTabClick', item);
            }
        }
    },
    popupItemClick(item) {
        let self = this;
        setTimeout(() => {
            self.popVisible = false;
        }, 50);

        setTimeout(() => {
            if (!item.disabled) {
                self.$emit('popupItemClick', item);
            }
        }, 200);
    },
    popupVisible() {
        this.popVisible = !this.popVisible;
    },
    getPopVisible() {
        return this.popVisible;
    }
};
