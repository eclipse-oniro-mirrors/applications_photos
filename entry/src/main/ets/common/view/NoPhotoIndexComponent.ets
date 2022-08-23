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

import { ScreenManager } from '../model/common/ScreenManager'
import { Constants } from '../model/common/Constants'
import { Logger } from '../utils/Logger'

const IMAGE_SCREEN_RATIO = 0.8

@Component
export struct NoPhotoIndexComponent {
    index: number;
    logger: Logger = new Logger('NoPhotoIndexComponent');

    // set an initial value temporarily, later change to 0.
    @State imageSize: number = 0;
    private reSizeFunc = this.reSizeLayout.bind(this);

    aboutToAppear(): void {
        this.logger.info('aboutToAppear');
        ScreenManager.getInstance().on(ScreenManager.ON_WIN_SIZE_CHANGED, this.reSizeFunc);
        this.updateImageSize();
    }

    reSizeLayout() {
        this.updateImageSize();
    }

    updateImageSize() {
        let winWidth = ScreenManager.getInstance().getWinWidth();
        let winHeightHalf = ScreenManager.getInstance().getWinHeight() / 2;
        this.imageSize
        = (winWidth < winHeightHalf) ? (winWidth * IMAGE_SCREEN_RATIO) : (winHeightHalf * IMAGE_SCREEN_RATIO)
        this.logger.info(`window size: ${winWidth}, ${winHeightHalf}  ,empty photos or album picture size = ${this.imageSize}`);
    }

    build() {
        Row() {
            Column() {
                Image((this.index == Constants.TIMELINE_PAGE_INDEX) ? $r("app.media.photo_empty") : $r("app.media.album_empty"))
                    .height(this.imageSize)
                    .width(this.imageSize)
                    .margin({
                        bottom: $r('app.float.image_margin_horizontal'),
                    })
                if (Constants.DISTRIBUTED_ALBUM_PAGE_INDEX == this.index) {
                    Text($r('app.string.no_distributed_photo_head_title_album'))
                        .fontSize($r('sys.float.ohos_id_text_size_headline8'))
                        .fontFamily($r('app.string.id_text_font_family_regular'))
                        .fontColor($r('sys.color.ohos_id_color_text_primary'))
                        .margin({
                            left: $r('app.float.max_padding_start'),
                            right: $r('app.float.max_padding_start'),
                            bottom: $r('sys.float.ohos_id_text_paragraph_margin_s'),
                        })
                } else {
                    Text((this.index == Constants.TIMELINE_PAGE_INDEX) ? $r('app.string.no_photo_head_title_timeline')
                                                                       : $r('app.string.no_photo_head_title_album'))
                        .fontSize($r('sys.float.ohos_id_text_size_headline8'))
                        .fontWeight(FontWeight.Medium)
                        .fontColor($r('sys.color.ohos_id_color_text_primary'))
                        .margin({
                            left: $r('app.float.max_padding_start'),
                            right: $r('app.float.max_padding_start'),
                            bottom: $r('sys.float.ohos_id_text_paragraph_margin_s'),
                        })
                    Text((this.index == Constants.TIMELINE_PAGE_INDEX) ? $r('app.string.no_photo_sub_title_timeline')
                                                                       : $r('app.string.no_photo_sub_title_album'))
                        .fontSize($r('sys.float.ohos_id_text_size_body2'))
                        .fontFamily($r('app.string.id_text_font_family_regular'))
                        .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                        .margin({
                            left: $r('app.float.max_padding_start'),
                            right: $r('app.float.max_padding_start'),
                            bottom: $r('sys.float.ohos_id_text_paragraph_margin_s'),
                        })
                }
            }
            .width('100%')
            .margin({ top: $r('app.float.appbar_max_height') })
        }
        .width('100%')
        .height('100%')
        .alignItems(VerticalAlign.Top)
        .justifyContent(FlexAlign.Start)
    }
}