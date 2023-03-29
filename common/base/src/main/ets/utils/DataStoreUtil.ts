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
import preferences from '@ohos.data.preferences';
import { Log } from '../utils/Log';
import createOrGet from './SingleInstanceUtils';

const TAG = "DataStoreUtil"

class DataStoreUtil {
    private preferences: any = undefined;
    private static readonly PREFERENCES_KEY_MY_FORM_STORE = 'myFormStore';
    private static readonly FROM_DATA_STORE_UTIL = 'form_data_store_util';

    constructor() {
        Log.info(TAG, 'constructor');
    }

    public  getInstance(): DataStoreUtil {
        if (AppStorage.Get( DataStoreUtil.FROM_DATA_STORE_UTIL) == null) {
            AppStorage.SetOrCreate( DataStoreUtil.FROM_DATA_STORE_UTIL, new DataStoreUtil());
        }
        return AppStorage.Get( DataStoreUtil.FROM_DATA_STORE_UTIL);
    }

    public async init(): Promise<void> {
        Log.info(TAG, 'init start!');
        if (this.preferences != undefined) {
            Log.info(TAG, `init preferences before`);
            return;
        }
        try {
            let context = globalThis.applicationContext;
            this.preferences = await preferences.getPreferences(context, DataStoreUtil.PREFERENCES_KEY_MY_FORM_STORE);
            Log.info(TAG, `init preferences ${preferences}`);
        } catch (err) {
            Log.error(TAG, `init err ${err}`);
        }
        Log.info(TAG, 'init end!');
    }

    public async getData(key: string, defValue) {
        Log.info(TAG, 'getData start!');
        if (this.preferences == undefined) {
            Log.warn(TAG, `getData preferences is undefined`);
            await this.init();
        }
        let temValue = defValue;
        try {
            temValue = await this.preferences.get(key, defValue);
            Log.info(TAG, "The value of startup is " + temValue);
        } catch (err) {
            Log.error(TAG, `Get the value failed with err: ${err}`);
        }
        return temValue;
    }

    public async putData(key: string, value) {
        Log.info(TAG, 'putData start!');
        if (this.preferences == undefined) {
            Log.warn(TAG, 'putData preferences is undefined');
            await this.init();
        }

        try {
            await this.preferences.put(key, value);
            Log.info(TAG, 'Put the value successfully.');
        } catch (err) {
            Log.error(TAG, `Put the value failed with err: ${err}`);
        }
    }

    public async delData(key: string) {
        Log.info(TAG, 'delData start!');
        if (this.preferences == undefined) {
            Log.warn(TAG, `delData preferences is undefined`);
            await this.init();
        }
        try {
            await this.preferences.delete(key);
            Log.info(TAG, "Delete the value successfully.");
        } catch (err) {
            Log.error(TAG, `Delete the value failed with err: ${err}`);
        }
    }

    public async flush() {
        Log.info(TAG, 'flush start!');
        if (this.preferences == undefined) {
            Log.warn(TAG, `flush preferences is undefined`);
            await this.init();
        }
        await this.preferences.flush();
    }

    public async hasData(key: string) {
        Log.info(TAG, `hasData start! preferences ${this.preferences}`);
        let ret = false;
        if (this.preferences == undefined) {
            Log.warn(TAG, `hasData preferences is undefined`);
            await this.init();
        }
        try {
            ret = await this.preferences.has(key);
            Log.info(TAG, "hasData the value successfully.");
        } catch (err) {
            ret = false;
            Log.error(TAG, `hasData the value failed with err: ${err}`);
        }
        return ret;
    }

    public async  removeCache() {
        Log.info(TAG,'removeCache start!');
        let context = globalThis.applicationContext;
        await preferences.removePreferencesFromCache(context, DataStoreUtil.PREFERENCES_KEY_MY_FORM_STORE).then(() => {
            Log.info(TAG,`this.preferences = ${this.preferences}`);
            this.preferences = undefined;
            Log.info(TAG,"removeCache successfully.")
        }).catch((err) => {
            Log.info(TAG,"removeCache failed with err: " + err)
        })
    }

}

let dataStore = createOrGet(DataStoreUtil, TAG);

export default dataStore as DataStoreUtil;

