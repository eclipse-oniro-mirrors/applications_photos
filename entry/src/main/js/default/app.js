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
import utils from './common/utils/utils.js';
import datamanage from './common/utils/datamanage.js';

export default {
    utils,
    datamanage,
    onCreate() {
        console.info('AceApplication onCreate');
        utils.initIcon();
    },
    onDestroy() {
        console.info('AceApplication onDestroy');
    },
};
