/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import FormExtension from '@ohos.application.FormExtension';
import { Logger } from './common/Logger'
import { FormControllerManager } from './controller/FormControllerManager'
import { FormController } from './controller/FormController'
import { Constants } from './common/Constants'
import mediaModel from '@ohos/base/src/main/ets/model/MediaModel'

export default class FormAbility extends FormExtension {
    private logger: Logger = new Logger('FormAbility');

    onCreate(want) {
        this.logger.info(`form onCreate. want ${JSON.stringify(want)}`);
        mediaModel.onCreate(this.context)
        globalThis.appContext = this.context
        let param = want.parameters;
        let formId = param['ohos.extra.param.key.form_identity'];
        this.logger.info(`form onCreate formId: ${formId}`);
        let formControllerManager: FormControllerManager = FormControllerManager.getInstance();
        formControllerManager.initData(formId, Constants.PHOTOS_FORM_OPERATION_MODE_NONE).then(() => {
            let formController: FormController = formControllerManager.getController(formId);
            this.logger.info(`form onCreate. formController ${formController}`);
            formController = (formController == null) ? formControllerManager.createFormController(formId,
                Constants.PHOTOS_FORM_OPERATION_MODE_NONE) : formController;
            if (formController == null) {
                this.logger.error(`Get null controller. formId: ${formId}`);
                return null;
            }
            return formController.bindFormData(formId);
        }).catch((err) => {
            this.logger.error(`init err ${err}`);
        })
        return null;
    }

    onCastToNormal(formId) {
        this.logger.info(`onCastToNormal, formId: ${formId}`);
    }

    onUpdate(formId) {
        this.logger.info(`onUpdate, formId: ${formId} context ${JSON.stringify(this.context)}`);
        // 经常起来后可能直接走onUpdate， 所以要初始化一下mediaModel
        mediaModel.onCreate(this.context)
        let formControllerManager: FormControllerManager = FormControllerManager.getInstance();
        formControllerManager.updateController(formId);
    }

    onVisibilityChange(newStatus) {
        this.logger.info(`onVisibilityChange, newStatus: ${JSON.stringify(newStatus)}`);
        // 经常起来后可能直接走onVisibilityChange， 所以要初始化一下mediaModel
        mediaModel.onCreate(this.context)
        let formControllerManager: FormControllerManager = FormControllerManager.getInstance();
        for (let key in newStatus) {
            this.logger.info(`onVisibilityChange, key:${key}  value ${newStatus[key]}`);
            let formId = key;
            formControllerManager.initData(formId, Constants.PHOTOS_FORM_OPERATION_MODE_NONE);
        }
    }

    onEvent(formId, message) {
        this.logger.info(`onEvent, formId: ${formId}, message: ${message}`);
        // 经常起来后可能直接走onEvent， 所以要初始化一下mediaModel
        mediaModel.onCreate(this.context)
        let formControllerManager: FormControllerManager = FormControllerManager.getInstance();
        formControllerManager.onEvent(formId, message);
    }

    onDestroy(formId) {
        this.logger.info(`onDestroy, formId: ${formId}`);
        // 经常起来后可能直接走onDestroy， 所以要初始化一下mediaModel
        mediaModel.onCreate(this.context)
        let formControllerManager: FormControllerManager = FormControllerManager.getInstance();
        formControllerManager.destroyController(formId);
    }
};