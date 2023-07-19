/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { Log } from '../../utils/Log';
import { Constants } from './Constants';
import { UiUtil } from '../../utils/UiUtil';
import { BroadCast } from '../../utils/BroadCast';
import type window from '@ohos.window';

const TAG: string = 'common_ScreenManager';

type SystemBarKeys = 'status' | 'navigation';

export enum ColumnSize {
  COLUMN_ONE_POINT_FIVE = 1.5,
  COLUMN_TWO = 2,
  COLUMN_FOUR = 4,
  COLUMN_SIX = 6,
  COLUMN_EIGHT = 8,
  COLUMN_TWELVE = 12
}

enum ScreenWidth {
  WIDTH_MEDIUM = 520,
  WIDTH_LARGE = 840
}

enum WindowMode {
  UNDEFINED = 1,
  FULLSCREEN,
  PRIMARY,
  SECONDARY,
  FLOATING
}

export class ScreenManager {
  static readonly ON_WIN_SIZE_CHANGED: string = 'on_win_size_changed';
  static readonly ON_SPLIT_MODE_CHANGED: string = 'on_split_mode_changed';
  static readonly ON_LEFT_BLANK_CHANGED: string = 'on_left_blank_changed';
  static readonly DEFAULT_WIDTH: number = 1920;
  static readonly DEFAULT_HEIGHT: number = 1080;

  // no interface is available to obtain the height of WindowDecor. WindowDecor px Height: 56.
  static readonly WIN_DECOR_HEIGHT_PX: number = 56;

  private winWidth: number = 0.0;
  private winHeight: number = 0.0;
  private statusBarHeight: number = 0;
  private naviBarHeight: number = 0;
  private leftBlank: [number, number, number, number] = [0, 0, 0, 0];
  private broadcast: BroadCast = new BroadCast();
  private mainWindow: window.Window = undefined;
  private columns: number = ColumnSize.COLUMN_FOUR;

  // Default orientation for Pc
  private horizontal: boolean = true;

  // Default sidebar for Pc
  private sidebar: boolean = true;
  private windowMode: WindowMode = WindowMode.UNDEFINED;
  private isFullScreen: boolean = true;

  private constructor() {
    Log.info(TAG, 'constructor');
    UiUtil.getResourceString($r('app.string.init_horizontal')).then((value: string) => {
      this.horizontal = 'true' === value;
    })
    UiUtil.getResourceString($r('app.string.init_sidebar')).then((value: string) => {
      this.sidebar = 'true' === value;
    })
  }

  static getInstance(): ScreenManager {
    if (AppStorage.Get(Constants.APP_KEY_SCREEN_MANAGER) == null) {
      AppStorage.SetOrCreate(Constants.APP_KEY_SCREEN_MANAGER, new ScreenManager());
    }
    let manager: ScreenManager = AppStorage.Get(Constants.APP_KEY_SCREEN_MANAGER);
    return manager;
  }

  initializationSize(win: window.Window): Promise<void> {
    this.mainWindow = win;
    let properties: window.WindowProperties = win.getWindowProperties();
    this.isFullScreen = properties.isFullScreen;

    // Area data obtained through the system interface,
    // There is a possibility that the area data is incorrect.
    const statusBarHeight: number = properties && properties.windowRect ? properties.windowRect.top : this.statusBarHeight;
    AppStorage.SetOrCreate<number>('statusBarHeight', statusBarHeight);
    return new Promise<void>((resolve, reject) => {
      if (!properties || !properties.windowRect) {
        reject();
      }
      let size: window.Rect = properties.windowRect;
      Log.info(TAG, `display screen windowRect: ${JSON.stringify(size)}`);
      this.winWidth = px2vp(size.width);
      this.winHeight = px2vp(size.height);
      Log.info(TAG, `init winSize: ${size.width}*${size.height} px, ${this.winWidth}*${this.winHeight} vp`);
      if (this.winWidth < ScreenWidth.WIDTH_MEDIUM) {
        this.columns = ColumnSize.COLUMN_FOUR;
      } else if (this.winWidth >= ScreenWidth.WIDTH_MEDIUM && this.winWidth < ScreenWidth.WIDTH_LARGE) {
        this.columns = ColumnSize.COLUMN_EIGHT;
      } else {
        this.columns = ColumnSize.COLUMN_TWELVE;
      }
      this.emit(ScreenManager.ON_WIN_SIZE_CHANGED, [size]);
      resolve();
    });
  }

  /**
   * Add Listeners
   *
   * @param event
   * @param fn
   */
  on(event: string, fn: Function): void {
    this.broadcast.on(event, fn);
  }

  /**
   * Delete Listeners
   *
   * @param event
   * @param fn
   */
  off(event: string, fn: Function): void {
    this.broadcast.off(event, fn);
  }

  // Unit：vp
  getWinWidth(): number {
    return this.winWidth;
  }

  // Unit：vp
  getWinHeight(): number {
    return this.winHeight;
  }

  // Returns the width of the layout area (LayoutWidth = WindowWidth).
  getWinLayoutWidth(): number {
    return this.winWidth;
  }

  // Returns the height of the layout area (LayoutHeight = WindowHeight - WindowDecorHeight).
  getWinLayoutHeight(): number {
    let deviceTp: string = AppStorage.Get('deviceType') as string;
    Log.debug(TAG, `deviceTp=${deviceTp}, isFull=${this.isFullScreen}, winH=${this.winHeight}`);
    if (deviceTp === Constants.DEFAULT_DEVICE_TYPE) {
      return this.winHeight;
    }
    let winDecorHeight: number = this.isFullScreen ? 0 : px2vp(ScreenManager.WIN_DECOR_HEIGHT_PX);
    return this.winHeight - winDecorHeight;
  }

  getStatusBarHeight(): number {
    return this.statusBarHeight;
  }

  getNaviBarHeight(): number {
    return this.naviBarHeight;
  }

  initWindowMode(): void {
    Log.debug(TAG, `start to initialize photos application window mode: ${this.windowMode}`);
    this.checkWindowMode();
    this.mainWindow && this.setMainWindow();
  }

  destroyWindowMode(): void {
    Log.debug(TAG, `start to destory photos application window mode: ${this.windowMode}`);
    this.mainWindow && this.destroyMainWindow();
  }

  isSplitMode(): boolean {
    return (WindowMode.PRIMARY === this.windowMode || WindowMode.SECONDARY === this.windowMode);
  }

  async checkWindowMode(): Promise<void> {
    let before = this.windowMode;
    let mode = await globalThis.photosWindowStage.getWindowMode();
    Log.info(TAG, `photos application before/current window mode: ${before}/${mode}`);

    if (before == mode) {
      return;
    }
    this.windowMode = mode;
    if (WindowMode.FULLSCREEN == this.windowMode) {
      this.setFullScreen();
    } else {
      this.setSplitScreen();
    }
  }

  setMainWindow(): void {
    Log.debug(TAG, 'setMainWindow');
    this.mainWindow.on('windowSizeChange', (data: window.Size) => {
      Log.debug(TAG, `windowSizeChange ${JSON.stringify(data)}`);
      try {
        let properties: window.WindowProperties = this.mainWindow.getWindowProperties();
        this.isFullScreen = properties.isFullScreen;
      } catch (exception) {
        Log.error(TAG, 'Failed to obtain the area. Cause:' + JSON.stringify(exception));
      }
      this.onWinSizeChanged(data);
    })
    this.mainWindow.getProperties().then((prop: window.WindowProperties) => {
      Log.info(TAG, `Window prop: ${JSON.stringify(prop)}`);
      this.onWinSizeChanged(prop.windowRect);
    });
  }

  destroyMainWindow(): void {
    this.mainWindow.off('windowSizeChange');
  }

  getAvoidArea(): void {
    let topWindow: window.Window = this.getMainWindow();
    topWindow.getAvoidArea(0, (err, data: window.AvoidArea) => {
      Log.info(TAG, 'Succeeded in obtaining the area. Data:' + JSON.stringify(data));
      this.onLeftBlankChanged(data);
    });
  }

  setFullScreen(): void {
    let topWindow: window.Window = this.getMainWindow();
    Log.debug(TAG, 'getTopWindow start');
    try {
      topWindow.setLayoutFullScreen(true, () => {
        Log.debug(TAG, 'setFullScreen true Succeeded');
        if (AppStorage.Get('deviceType') as string !== Constants.DEFAULT_DEVICE_TYPE) {
          this.hideStatusBar();
        } else {
          this.setWindowBackgroundColorDefault(true);
        }
      });
    } catch (err) {
      Log.error(TAG, `setFullScreen err: ${err}`);
    }
  }

  setWindowBackgroundColorDefault(defaultColor: boolean): void {
    this.getMainWindow().setWindowBackgroundColor(defaultColor ? '#F1F3F5' : '#000000');
  }

  setSplitScreen(): void {
    try {
      this.statusBarHeight = 0;
      this.naviBarHeight = 0;
      this.leftBlank = [0, 0, 0, 0];
      this.emit(ScreenManager.ON_LEFT_BLANK_CHANGED, [this.leftBlank]);
    } catch (err) {
      Log.error(TAG, `setSplitScreen err: ${err}`);
    }
  }

  hideStatusBar(): void {
    Log.debug(TAG, 'hideStatusBar start');
    let topWindow: window.Window = this.getMainWindow();
    Log.debug(TAG, 'getTopWindow start');
    let names: Array<SystemBarKeys> = new Array<SystemBarKeys>('navigation');
    Log.debug(TAG, `getTopWindow names: ${names} end`);
    try {
      topWindow.setSystemBarEnable(names, () => {
        Log.debug(TAG, 'hideStatusBar Succeeded');
        topWindow.getAvoidArea(0, async (err, data: window.AvoidArea) => {
          Log.info(TAG, `Succeeded in obtaining the area. Data: ${JSON.stringify(data)}`);
          this.onLeftBlankChanged(data);
          let barColor: string = await UiUtil.getResourceString($r('app.color.transparent'));
          if (!barColor) {
            barColor = '#00000000';
          }
          topWindow.setSystemBarProperties({ navigationBarColor: barColor }, () => {
            Log.info(TAG, 'setStatusBarColor done');
          });
        });
      });
    } catch (err) {
      Log.error(TAG, `hideStatusBar err: ${err}`);
    }
  }

  async setDefaultStatusBarProperties(): Promise<void> {
    Log.debug(TAG, 'setStatusBarColor start');
    let topWindow: window.Window = this.getMainWindow();
    try {
      topWindow.setSystemBarProperties(
        { statusBarColor: Constants.STATUS_BAR_BACKGROUND_COLOR,
          statusBarContentColor: Constants.STATUS_BAR_CONTENT_COLOR }, () => {
        Log.info(TAG, 'setStatusBarColor done');
      });
    } catch (err) {
      Log.error(TAG, `setStatusBarColor err: ${err}`);
    }
  }

  setSystemUi(isShowBar: boolean): void {
    let deviceTp: string = AppStorage.Get('deviceType') as string;
    Log.debug(TAG, `setSystemUi start, isShowBar=${isShowBar}, deviceType=${deviceTp}`);
    let topWindow: window.Window = this.getMainWindow();
    Log.debug(TAG, 'getTopWindow start');
    let names: Array<SystemBarKeys> = new Array<SystemBarKeys>('status', 'navigation');
    if (deviceTp === Constants.PC_DEVICE_TYPE || deviceTp === Constants.PAD_DEVICE_TYPE) {
      names = new Array<SystemBarKeys>('navigation');
    }
    if (!isShowBar) {
      names = [];
    }
    Log.debug(TAG, `getTopWindow names: ${names} end`);
    try {
      topWindow.setSystemBarEnable(names, () => {
        Log.debug(TAG, `setSystemUi Succeeded: ${names}`);
        if (isShowBar) {
          topWindow.getAvoidArea(0, (err, data: window.AvoidArea) => {
            Log.info(TAG, 'Succeeded in obtaining the area. Data:' + JSON.stringify(data));
            this.onLeftBlankChanged(data);
          });
        }
      })
    } catch (err) {
      Log.error(TAG, `setSystemUi err: ${err}`);
    }
  }

  isHorizontal(): boolean {
    if (AppStorage.Get(Constants.SCREEN_ORIENTATION_HORIZONTAL) == null) {
      AppStorage.SetOrCreate(Constants.SCREEN_ORIENTATION_HORIZONTAL, this.horizontal);
    }
    return AppStorage.Get(Constants.SCREEN_ORIENTATION_HORIZONTAL);
  }

  isSidebar(): boolean {
    if (AppStorage.Get(Constants.SCREEN_SIDEBAR) == null) {
      AppStorage.SetOrCreate(Constants.SCREEN_SIDEBAR, this.sidebar);
    }
    return AppStorage.Get(Constants.SCREEN_SIDEBAR);
  }

  getColumnsWidth(count: number): number {
    Log.info(TAG, `getColumnsWidth count is ${count} colunms is ${this.columns}`);
    let columnWidth: number = (this.winWidth - Constants.COLUMN_MARGIN) / this.columns;
    return parseInt((columnWidth * count - Constants.COLUMN_GUTTER) + '');
  }

  getScreenColumns(): number {
    return this.columns;
  }

  onRotationAngleChanged(isH: boolean): void {
    Log.info(TAG, `onRotationAngleChanged horizontal: ${isH}`);
    if (isH === null || isH === undefined) {
      return;
    }
    this.horizontal = isH;
    AppStorage.SetOrCreate(Constants.SCREEN_ORIENTATION_HORIZONTAL, this.horizontal);
  }

  private getMainWindow(): window.Window {
    return AppStorage.Get<window.Window>('mainWindow');
  }

  private emit(event: string, argument: unknown[]): void {
    this.broadcast.emit(event, argument);
  }

  private isLeftBlankInitialized(): boolean {
    return this.leftBlank[0] != 0 || this.leftBlank[1] != 0 || this.leftBlank[2] != 0 || this.leftBlank[3] != 0;
  }

  private onLeftBlankChanged(area: window.AvoidArea): void {
    if (area === null || area === undefined || (area.bottomRect.height === 0 && area.topRect.height === 0)) {
      return;
    }
    let leftBlankBefore = {
      status: this.statusBarHeight,
      navi: this.naviBarHeight
    };
    // Area data obtained through the system interface,
    // There is a possibility that the area data is incorrect.
    AppStorage.SetOrCreate<number>('statusBarHeight', area.topRect.height);
    this.statusBarHeight = px2vp(area.topRect.height);
    this.naviBarHeight = px2vp(area.bottomRect.height);
    this.leftBlank = [this.leftBlank[0], this.leftBlank[1], this.leftBlank[2], px2vp(area.bottomRect.height)];
    if (leftBlankBefore.status != this.statusBarHeight || leftBlankBefore.navi != this.naviBarHeight) {
      Log.info(TAG, `leftBlank changed: ${JSON.stringify(leftBlankBefore)}-${JSON.stringify(this.leftBlank)}`);
      this.emit(ScreenManager.ON_LEFT_BLANK_CHANGED, [this.leftBlank]);
    }
  }

  private onWinSizeChanged(size: window.Size | window.Rect): void {
    Log.info(TAG, `onWinSizeChanged ${JSON.stringify(size)}`);
    if (size == null || size == undefined) {
      return;
    }
    let isSplitModeBefore: boolean = this.isSplitMode();
    this.checkWindowMode();
    let sizeBefore = {
      width: this.winWidth,
      height: this.winHeight
    };
    this.winWidth = px2vp(size.width);
    this.winHeight = px2vp(size.height);
    Log.info(TAG, `onChanged winSize: ${size.width}*${size.height} px, ${this.winWidth}*${this.winHeight} vp`);
    if (this.winWidth < ScreenWidth.WIDTH_MEDIUM) {
      this.columns = ColumnSize.COLUMN_FOUR;
    } else if (this.winWidth >= ScreenWidth.WIDTH_MEDIUM && this.winWidth < ScreenWidth.WIDTH_LARGE) {
      this.columns = ColumnSize.COLUMN_EIGHT;
    } else {
      this.columns = ColumnSize.COLUMN_TWELVE;
    }
    let isSplitModeNow: boolean = this.isSplitMode();
    if (isSplitModeBefore != isSplitModeNow) {
      Log.info(TAG, `splitMode changed: ${isSplitModeBefore} -> ${isSplitModeNow}`);
      this.emit(ScreenManager.ON_SPLIT_MODE_CHANGED, [isSplitModeNow]);
    }
    if (sizeBefore.width != this.winWidth || sizeBefore.height != this.winHeight) {
      let newSize = {
        width: this.winWidth,
        height: this.winHeight
      };
      Log.info(TAG, `winSize changed: ${JSON.stringify(sizeBefore)} -> ${JSON.stringify(newSize)}`);
      this.emit(ScreenManager.ON_WIN_SIZE_CHANGED, [size]);
    }
  }
}