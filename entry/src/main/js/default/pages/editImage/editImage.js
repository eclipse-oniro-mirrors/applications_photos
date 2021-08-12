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
 * @file: 图片旋转
 */

import router from '@system.router';

let image = new Image();
export default {
    data: {
        formData: null,
        canvas: null,
        ctx: null,
        topBarSource: {
            title: '',
            leftSrc: '/common/image/svg/back.svg',
            rightSrc: '',
            isShowLeft: true,
            isShowRight: false
        },
        bottomBarSource: [
            {
                id: 1,
                src: '/common/image/svg/rotate.svg',
                name: ''
            },
        ],
        rotate: 0
    },
    onInit() {
        this.canvas = this.$element('edit_canvas');
        this.ctx = this.canvas.getContext('2d');
        image.src = this.formData.src;
        this.initCanvas();
    },
    topBarLeftClick() {
        router.back();
    },
    bottomTabClick(item) {
        if (item.detail.id === 1) {
            if (this.rotate === 0) {
                this.rotate1();
            } else if (this.rotate === 90) {
                this.rotate2();
            } else if (this.rotate === 180) {
                this.rotate3();
            } else {
                this.rotate4();
            }
        }
    },
    initCanvas() {
        this.ctx.save(); // 保存画布
        this.ctx.translate(0, 0); // 移动坐标系原点
        this.ctx.drawImage(image, 0, 0, 720, 720);
        this.ctx.restore(); // 恢复画布
    },
    rotate1() {
        this.ctx.save(); // 保存画布
        this.ctx.translate(720, 0); // 移动坐标系原点
        this.ctx.rotate(90 * Math.PI / 180); // 旋转坐标系
        this.ctx.drawImage(image, 0, 0, 720, 720);
        this.ctx.restore(); // 恢复画布
        this.rotate = 90;
    },
    rotate2() {
        this.ctx.save(); // 保存画布
        this.ctx.translate(720, 720); // 移动坐标系原点
        this.ctx.rotate(180 * Math.PI / 180); // 旋转坐标系
        this.ctx.drawImage(image, 0, 0, 720, 720);
        this.ctx.restore(); // 恢复画布
        this.rotate = 180;
    },
    rotate3() {
        this.ctx.save(); // 保存画布
        this.ctx.translate(0, 720); // 移动坐标系原点
        this.ctx.rotate(270 * Math.PI / 180); // 旋转坐标系
        this.ctx.drawImage(image, 0, 0, 720, 720);
        this.ctx.restore(); // 恢复画布
        this.rotate = 270;
    },
    rotate4() {
        this.ctx.save(); // 保存画布
        this.ctx.translate(0, 0); // 移动坐标系原点
        this.ctx.drawImage(image, 0, 0, 720, 720);
        this.ctx.restore(); // 恢复画布
        this.rotate = 0;
    },
};
