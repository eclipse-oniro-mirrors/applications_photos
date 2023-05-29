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
import { Log } from '../utils/Log';
import { GroupDataImpl } from '../model/GroupDataImpl';
import { LazyItem, ItemDataSource } from '../vm/ItemDataSource';
import { MediaDataItem } from '../data/MediaDataItem';

const TAG = "GroupItemDataSource"

export class GroupItemDataSource extends ItemDataSource {
    groupDataItem: MediaDataItem[] = [];
    private groupDataImpl: GroupDataImpl = new GroupDataImpl();

    constructor() {
        super()
    }

    setSelectType(selectType: number): void {
        this.groupDataImpl.setSelectType(selectType);
    }

    setAlbumId(id: string): void {
        Log.info(TAG, "setAlbumId: " + id);
        this.groupDataImpl.setAlbumId(id);
    }

    setDeviceId(id: string): void {
        Log.info(TAG, "setDeviceId: " + id);
        this.groupDataImpl.setDeviceId(id);
    }

    totalCount(): number {
        return this.groupDataItem.length;
    }

    getIndexByItem(item: MediaDataItem): number {
        let index = -1;
        let length = this.groupDataItem.length;
        for (let i = 0;i < length; i++) {
            if (this.groupDataItem[i].uri == item.uri) {
                index = i;
                break;
            }
        }
        return index;
    }

    getData(index: number): LazyItem<MediaDataItem> {
        if (index < 0 || index >= this.groupDataItem.length) {
            Log.warn(TAG, index + "/" + this.groupDataItem.length);
            return undefined;
        }
        if (this.groupDataItem[index] != null && this.groupDataItem[index] != undefined) {
            this.groupDataItem[index].index = index;
        }
        return new LazyItem<MediaDataItem>(this.groupDataItem[index], index, this.onDataUpdate.bind(this));
    }

    getDataByIndex(index: number): MediaDataItem {
        if (index < 0 || index >= this.groupDataItem.length) {
            Log.warn(TAG, index + "/" + this.groupDataItem.length);
            return undefined;
        }
        if (this.groupDataItem[index] != null && this.groupDataItem[index] != undefined) {
            this.groupDataItem[index].index = index;
        }
        return this.groupDataItem[index];
    }

    isSelect(): boolean {
        let isSelect = true;
        for (let i = 0;i < this.groupDataItem.length; i++) {
            if (!this.groupDataItem[i].isSelect) {
                isSelect = false;
                break;
            }
        }
        return isSelect;
    }

    getSelectedCount(): number {
        let count = 0;
        this.groupDataItem.forEach((item: MediaDataItem): void => {
            if (item.isSelect) {
                count++;
            }
        })
        return count;
    }

    getItems(): MediaDataItem[] {
        let items: MediaDataItem[] = [];
        this.groupDataItem.forEach((item: MediaDataItem): void => {
            items.push(item);
        })
        return items;
    }

    getSelectedItems(): Object[] {
        let items: MediaDataItem[] = [];
        this.groupDataItem.forEach((item: MediaDataItem): void => {
            if (item.isSelect) {
                items.push(item);
            }
        })
        return items;
    }

    getSelectedUris(): string[] {
        let uris: string[] = [];
        this.groupDataItem.forEach((item: MediaDataItem): void => {
            if (item.isSelect) {
                uris.push(item.uri);
            }
        })
        return uris;
    }

    setSelect(isSelect: boolean): void {
        this.groupDataItem.forEach((item: MediaDataItem): void => {
            item.setSelect(isSelect);
        })
        this.notifyDataReload();
    }

    async reloadGroupItemData(isGrid: boolean): Promise<boolean> {
        this.groupDataItem = await this.groupDataImpl.reloadGroupItemData(isGrid);
        return this.groupDataItem.length == 0;
    }
    
    onDataUpdate(index: number): void {
        Log.debug(TAG, "onDataUpdate " + index);
        if (index != -1) {
            this.notifyDataChange(index);
        }
    }

    dataReload(isGrid: boolean): void {
        this.reloadGroupItemData(isGrid).then((isEmpty: boolean): void => {
            this.notifyDataReload();
        })
    }

    dataRemove(): void {
        for (let i = this.groupDataItem.length - 1;i >= 0; i--) {
            if (this.groupDataItem[i] != undefined && this.groupDataItem[i].isDeleted()) {
                this.groupDataItem.splice(i, 1);
                super.notifyDataDelete(i);
            }
        }
    }

    dataDelete(uri: string): void {
        const mediaDataItemIndex = this.groupDataItem.findIndex((item: MediaDataItem): boolean => {
            return item.uri === uri;
        })
        if (mediaDataItemIndex != -1 && this.groupDataItem[mediaDataItemIndex].isDeleted()) {
            this.groupDataItem.splice(mediaDataItemIndex, 1);
            super.notifyDataDelete(mediaDataItemIndex);
        }
    }
}
