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
import app from '@system.app';

export default {
    data: {
        headTitle: '',
        gridData: [],
        showHead: false,
        gridItemStyle: {
            width: '332px',
            padding: '8px',
            height: '380px',
            radius: '32px'
        },
        gridImageStyle: {},
        gridItemCheckedStyle: {
            height: '',
            width: '',
            padding: ''
        },
        listItemStyle: {
            height: '160px',
        },
        longPressFlag: true,
        listTitle: '',
        listData: [],
        showListTitle: false,
        selectMode: false,
        touchStartTime: 0,
        touchEndTime: 0,
        headSource: null
    },
    computed: {
        gridSource() {
            for (let index = 0; index < this.gridData.length; index++) {
                let item = this.gridData[index];
                if (this.selectMode) {
                    item.icon = this.$app.$def.utils.getIcon('unselected');
                } else {
                    item.icon = this.$app.$def.utils.getIcon(item.kind);
                }

            }
            return this.gridData;
        },
        listSource() {
            for (let index = 0; index < this.listData.length; index++) {
                let item = this.listData[index];
                if (this.selectMode) {
                    item.icon = this.$app.$def.utils.getIcon('unselected_black');
                }
            }
            return this.listData;
        },
    },
    onInit() {
        setTimeout(() => {
            this.gridImageStyle = Object.assign({}, this.gridItemStyle);

        }, 50);
    },
    initData() {

    },
    onShow() {

    },
    photoClick(item, index, type) {
        let self = this;
        let obj = {
            item: item,
            index: index
        };
        if (self.selectMode && item.type !== 'system') {
            item.checked = !item.checked;
            if (item.checked) {
                item.icon = self.$app.$def.utils.getIcon('selected');
            } else if (type === 'grid') {
                item.icon = self.$app.$def.utils.getIcon('unselected');
            } else {
                item.icon = self.$app.$def.utils.getIcon('unselected_black');
            }

            self.$emit('onCheckedChange', obj);
        }

        if (!self.selectMode) {
            self.$emit('onClick', obj);
        }
    },
    parentLongpress(item, index, type) {
        let self = this;
        if (!self.longPressFlag) {
            return false;
        }

        // 宫格数据
        for (let index = 0; index < self.gridData.length; index++) {
            let item = self.gridData[index];
            item.icon = self.$app.$def.utils.getIcon('unselected');
        }

        // 垂直列表数据
        for (let index = 0; index < self.listData.length; index++) {
            let obj = self.listData[index];
            obj.icon = self.$app.$def.utils.getIcon('unselected_black');
        }

        self.headSource.icon = self.$app.$def.utils.getIcon('unselected');
        self.$emit('longPress', item);

        self.photoClick(item, index, type);

    },
    getSelectMode() {
        return this.selectMode;
    }
};
