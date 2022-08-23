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

import router from '@system.router'
import { ScreenManager } from '../../model/common/ScreenManager'
import { Constants } from '../../model/common/Constants'

@Observed
export class EditExitDialogCallback {
    discardCallback: Function
}

@CustomDialog
export struct EditExitDialog {
    @Consume editExitDialogCallback: EditExitDialogCallback;
    @StorageLink('isHorizontal') isHorizontal: boolean = ScreenManager.getInstance().isHorizontal();
    @StorageLink('isSidebar') isSidebar: boolean = ScreenManager.getInstance().isSidebar();
    @StorageLink('leftBlank') leftBlank: [number, number, number, number]
        = [0, ScreenManager.getInstance().getStatusBarHeight(), 0, ScreenManager.getInstance().getNaviBarHeight()];
    controller: CustomDialogController;

    build() {
        Column() {
            Stack({ alignContent: Alignment.Center }) {
                Text($r('app.string.edit_exit_dialog_context_text'))
                    .fontSize($r('sys.float.ohos_id_text_size_body1'))
                    .fontColor($r('sys.color.ohos_id_color_text_primary'))
            }.width('100%')
            .margin({
                top: $r('app.float.dialog_content_margin'),
                bottom: $r('sys.float.ohos_id_text_paragraph_margin_s')
            })

            Stack({ alignContent: Alignment.Top }) {
                Row() {
                    Button() {
                        Text($r('app.string.save_dialog_cancel_text'))
                            .fontSize($r('sys.float.ohos_id_text_size_button1'))
                            .fontColor($r('app.color.color_control_highlight'))
                            .fontWeight(FontWeight.Medium)
                            .width('50%')
                            .textAlign(TextAlign.Center)
                    }
                    .margin({
                        left: $r('app.float.details_dialog_button_margin_left'),
                        right: $r('app.float.details_dialog_button_margin_right')
                    })
                    .backgroundColor($r('app.color.transparent'))
                    .height($r('app.float.details_dialog_button_height'))
                    .onClick(() => {
                        this.controller.close();
                    })

                    Row() {
                        Divider()
                            .vertical(true)
                            .height($r('app.float.dialog_divider_height'))
                            .color($r('app.color.divider_vertical_color'))
                    }
                    .height($r('app.float.details_dialog_button_height'))
                    .alignItems(VerticalAlign.Center)

                    Button() {
                        Text($r('app.string.edit_exit_dialog_discard_text'))
                            .fontSize($r('sys.float.ohos_id_text_size_button1'))
                            .fontColor($r('app.color.color_control_highlight'))
                            .fontWeight(FontWeight.Medium)
                            .width('50%')
                            .textAlign(TextAlign.Center)
                    }
                    .margin({
                        left: $r('app.float.details_dialog_button_margin_left'),
                        right: $r('app.float.details_dialog_button_margin_right')
                    })
                    .backgroundColor($r('app.color.transparent'))
                    .height($r('app.float.details_dialog_button_height'))
                    .onClick(() => {
                        this.controller.close();
                        this.editExitDialogCallback && this.editExitDialogCallback.discardCallback();
                        router.back()
                    })
                }
            }
            .width('100%')
            .height($r('app.float.details_dialog_button_area_height'))
        }
        .borderRadius($r('app.float.dialog_border_radius'))
        .width(ScreenManager.getInstance().getColumnsWidth(4))
        .backgroundColor($r('app.color.white'))
        .margin({
            right: $r('app.float.dialog_window_margin'),
            left: $r('app.float.dialog_window_margin'),
            bottom: this.isHorizontal || this.isSidebar ? 0 : Constants.DIALOG_BOTTOM_OFFSET + this.leftBlank[3]
        })
        .padding({ left: $r('app.float.dialog_content_margin'), right: $r('app.float.dialog_content_margin') })
        .alignItems(HorizontalAlign.Start)
    }
}