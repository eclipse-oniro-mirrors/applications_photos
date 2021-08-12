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
 * @file: 新建相册弹框
 */

import prompt from '@system.prompt';

export default {
    data: {
        inputName: ''
    },
    onReady() {
        let str = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 5; i++) {
            this.inputName += str[this.getRandomInt(0, 5)];
        }
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    onInit() {

    },
    onHide() {

    },
    show() {
        this.$element('createDialog').show();
    },
    close() {
        this.$element('createDialog').close();
    },
    valueChange(value) {
        this.inputName = value.value;
    },
    setInputName(inputName) {
        this.inputName = inputName;
    },
    getInputName() {
        return this.inputName;
    },
    query() {
        if (!this.inputName) {
            prompt.showToast({
                message: this.$t('strings.inputPlaceholder')
            });
            return false;
        }
        this.$emit('createDialogAlbum', this.inputName);
    },
    cancel() {
        this.close();
    }
};
