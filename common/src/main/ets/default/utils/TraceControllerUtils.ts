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

import hiTraceMeter from '@ohos.hiTraceMeter';

export class TraceControllerUtils {
  // Used to track the start of sequential tasks
  public static startTrace(name: string): void {
    hiTraceMeter.startTrace(name, 1);
  }

  // Used to track the end of sequential tasks. The name must be the same as that at start
  public static finishTrace(name: string): void {
    hiTraceMeter.finishTrace(name, 1);
  }

  // Used to track the start of cross tasks
  // (scenarios where the next task starts before the previous task is finished)
  public static startTraceWithTaskId(name: string, taskId: number): void {
    hiTraceMeter.startTrace(name, taskId);
  }

  // Used to track the end of cross tasks. The name and taskid must be the same as at start
  public static finishTraceWithTaskId(name: string, taskId: number): void {
    hiTraceMeter.finishTrace(name, taskId);
  }
}