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
import { Logger } from '../utils/Logger'
import { SelectUtil } from '../../../common/model/browser/photo/SelectUtil'
import { ImageGridItemComponent } from '../../../common/view/ImageGridItemComponent'
import { Action } from '../../../common/view/browserOperation/Action'
import { ActionBar } from '../../../common/view/actionbar/ActionBar';
import { BroadCast } from '../../../common/utils/BroadCast'
import { BroadCastConstants } from '../../../common/model/common/BroadCastConstants'
import { Constants } from '../../../common/model/common/Constants'
import { MediaDataSource } from '../../../common/model/browser/photo/MediaDataSource'
import { PhotoDataImpl } from '../../../common/model/browser/photo/PhotoDataImpl'
import { MediaItem } from '../../../common/model/browser/photo/MediaItem'
import { ThirdSelectManager } from '../../../common/model/browser/SelectManager'
import { NoPhotoComponent } from '../../../common/view/NoPhotoComponent'
import { ScreenManager } from '../../../common/model/common/ScreenManager'
import { GridScrollBar } from '../../../common/view/GridScrollBar';
import { BroadCastManager } from '../../../common/model/common/BroadCastManager'
import { UiUtil } from '../../../common/utils/UiUtil';
import { ThirdSelectBarModel } from '../model/ThirdSelectBarModel';
// Third Select Album Page
@Entry
@Component
export struct ThirdSelectPhotoGridPage {
    @Provide selectedCount: number = 0;
    @Provide('isSelectedMode') isMultiPick: boolean = false;
    @Provide moreMenuList: Array<Action> = new Array<Action>();
    PhotoDataImpl: PhotoDataImpl;
    dataSource: MediaDataSource = new MediaDataSource(Constants.DEFAULT_SLIDING_WIN_SIZE);
    @Provide broadCast: BroadCast = new BroadCast();
    @Provide isShow: boolean = true;
    logger: Logger = new Logger('ThirdSelectPhotoGridPage');
    selectManager: ThirdSelectManager;
    isActive = false;
    title: any;
    @State isEmpty: boolean = false;
    @StorageLink('isSplitMode') isSplitMode: boolean = ScreenManager.getInstance().isSplitMode();
    @StorageLink('leftBlank') leftBlank: [number, number, number, number]
        = [0, ScreenManager.getInstance().getStatusBarHeight(), 0, ScreenManager.getInstance().getNaviBarHeight()];
    DEFAULT_TOAST_DURATION = 2000;
    isFromWallpaper: boolean;
    @Provide maxSelectCount: number = Constants.DEFAULT_MAX_THIRD_SELECT_COUNT;
    @State gridRowCount: number = 0;
    @Provide isHideScrollBar: boolean = true;
    isFromFa: boolean = false;
    scroller: Scroller = new Scroller();
    private appBroadCast: BroadCast = BroadCastManager.getInstance().getBroadCast();
    private barModel: ThirdSelectBarModel = new ThirdSelectBarModel()

    onMenuClicked(action: Action) {
        this.logger.info(`onMenuClicked, action: ${action.actionID}`);
        switch (action) {
            case Action.BACK:
                router.back();
                break;
            case Action.OK:
                this.setPickResult();
                break;
            default:
                break;
        }
    }

    private initGridRowCount(): void {
        let contentWidth = ScreenManager.getInstance().getWinWidth();
        let margin = 0;
        let maxThumbWidth = px2vp(Constants.GRID_IMAGE_SIZE) * Constants.GRID_MAX_SIZE_RATIO;
        this.gridRowCount = Math.max(Constants.GRID_MIN_COUNT, Math.ceil(((contentWidth - Constants.NUMBER_2 * margin)
        + Constants.GRID_GUTTER) / (maxThumbWidth + Constants.GRID_GUTTER)));
        this.logger.info(`initGridRowCount contentWidth: ${contentWidth}`);
    }

    aboutToAppear(): void {
        let param = router.getParams();
        if (param != null) {
            this.logger.info(`itemId: ${param.itemId}`);
            this.title = param.itemDisplayName;
            param.itemId && this.dataSource.setAlbumId(param.itemId.toString());
            this.isMultiPick = new Boolean(param.isMultiPick).valueOf();
            this.isFromFa = new Boolean(param.isFromFa).valueOf();
            if (param.isFromWallpaper) {
                this.maxSelectCount = new Number(param.maxSelectCount).valueOf() || 0
            }
            this.logger.info(`ThirdSelectPhotoGridPage isMultiPick: ${this.isMultiPick},\
                isFromWallpaper: ${param.isFromWallpaper}, maxSelectCount: ${this.maxSelectCount}`);
        }
        if (this.isFromFa) {
            AppStorage.SetOrCreate(Constants.FROM_FORM_PHOTO_EDITOR, true);
            AppStorage.SetOrCreate(Constants.FORM_ITEM_NAME, param.itemName);
            AppStorage.SetOrCreate(Constants.FORM_ITEM_ALBUM_ID, param.itemId);
            AppStorage.SetOrCreate(Constants.FORM_ITEM_DISPLAY_NAME, param.itemDisplayName);
        } else {
            AppStorage.SetOrCreate(Constants.FROM_FORM_PHOTO_EDITOR, false);
        }
        this.selectManager = AppStorage.Get(Constants.THIRD_SELECT_MANAGER);
        this.initGridRowCount();

        let self = this;
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.dataSource.setBroadCast(this.broadCast);
        this.broadCast.on(BroadCastConstants.SELECT,
            (position: number, key: string, value: boolean, callback: Function) => {
                if (value && self.selectedCount >= self.maxSelectCount) {
                    UiUtil.showToast($r('app.string.up_to_limit_tips'))
                    return;
                }
                if (self.selectManager.toggle(key, value)) {
                    self.logger.info('enter event process');
                    callback();
                }
            });
        this.broadCast.on(BroadCastConstants.JUMP_THIRD_PHOTO_BROWSER,
            (name: string, item: MediaItem) => {
                let targetIndex = self.dataSource.getDataIndex(item);
                self.logger.info(`jump to photo browser at index: ${targetIndex}, transition: ${name}`);
                AppStorage.SetOrCreate(Constants.APP_KEY_PHOTO_BROWSER, self.dataSource);
                router.push({
                    uri: 'feature/thirdSelect/view/ThirdSelectPhotoBrowser',
                    params: {
                        position: targetIndex,
                        transition: name,
                    }
                });
            })
        this.broadCast.on(Constants.ON_LOADING_FINISHED,
            (size: number) => {
                this.logger.info(`ON_LOADING_FINISHED size: ${size}`);
                this.isEmpty = size == 0;
                this.logger.info(`isEmpty: ${this.isEmpty}`)
            });
        this.broadCast.on(BroadCastConstants.ON_DATA_RELOADED,
            () => {
                this.logger.info('ON_DATA_RELOADED');
                this.dataSource.onDataReloaded();
            });
        this.selectManager.registerCallback('updateCount',
            (newState: number) => {
                self.logger.info(`updateSelectedCount ${newState}`);
                self.selectedCount = newState;
                self.selectManager.emitCallback('thirdSelectUpdateCount', [newState]);
            });
        this.dataSource.registerCallback('updateCount',
            (newState: number) => {
                self.logger.info(`updateTotalCount ${newState}`);
                self.isHideScrollBar = (newState <= Constants.SCROLL_BAR_VISIBLE_THRESHOLD);
                self.selectManager.setTotalCount(newState);
            })
        this.isActive = true;
    }

    onPageShow() {
        this.appBroadCast.emit(BroadCastConstants.THIRD_ROUTE_PAGE, []);
        this.isShow = true;
        this.onActive();
    }

    onPageHide() {
        this.isShow = false;
        this.onInActive();
    }

    private onActive() {
        if (!this.isActive) {
            this.logger.info('onActive');
            this.isActive = true;
            this.dataSource && this.dataSource.onActive();
            if (this.isMultiPick) {
                this.dataSource.forceUpdate();
            }
        }
    }

    private onInActive() {
        if (this.isActive) {
            this.logger.info('onInActive');
            this.isActive = false;
            this.dataSource && this.dataSource.onInActive();
        }
    }

    aboutToDisappear(): void {
        this.broadCast.off(null, null);
    }

    build() {
        Column() {
            ActionBar({
                actionBarProp: this.barModel.createActionBar(
                    Action.BACK,
                    this.title,
                    this.isMultiPick,
                    this.selectedCount,
                    this.maxSelectCount),
                onMenuClicked: this.onMenuClicked
            })
            if (this.isEmpty) {
                NoPhotoComponent({ title: $r('app.string.no_distributed_photo_head_title_album') })
            }
            Grid(this.scroller) {
                LazyForEach(this.dataSource, (item) => {
                    GridItem() {
                        ImageGridItemComponent({ item: item.mediaItem,
                            isSelected: this.selectManager.isItemSelected(item.mediaItem.uri),
                            pageName: Constants.PHOTO_TRANSITION_ALBUM,
                            isThird: true
                        })
                    }
                }, item => JSON.stringify(item))
            }
            .columnsTemplate('1fr '.repeat(this.gridRowCount))
            .columnsGap(Constants.GRID_GUTTER)
            .rowsGap(Constants.GRID_GUTTER)
            .cachedCount(Constants.GRID_CACHE_ROW_COUNT)
            .layoutWeight(1)

            GridScrollBar({ scroller: this.scroller });
        }
        .backgroundColor($r('app.color.default_background_color'))
        .padding({
            top: this.leftBlank[1],
            bottom: this.leftBlank[3]
        })
    }

    private setPickResult(): void {
        let uriArray = SelectUtil.getUriArray(this.selectManager.clickedSet)
        let abilityResult = {
            'resultCode': 0,
            'want': {
                'parameters': {
                    'select-item-list': uriArray
                }
            }
        };
        this.logger.info(`uri: ${uriArray}`)
        globalThis.photosAbilityContext.terminateSelfWithResult(abilityResult).then((result) => {
            this.logger.info(`terminateSelfWithResult result: ${result}`);
        });
    }
}