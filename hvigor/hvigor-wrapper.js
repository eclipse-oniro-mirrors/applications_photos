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

"use strict";
var u = require("fs"), e = require("path"), t = require("os"), r = require("crypto"), n = require("child_process"),
  i = require("constants"), o = require("stream"), D = require("util"), c = require("assert");

function a(u) {
  return u && "object" == typeof u && "default" in u ? u : { default: u }
}

var s = a(u), E = a(e), f = a(t), l = a(r), C = a(n), F = a(i), d = a(o), A = a(D), p = a(c),
  y = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {
                                                                                                                                                                          },
  h = {}, m = {}, B = {}, _ = y && y.__importDefault || function (u) {
    return u && u.__esModule ? u : { default: u }
  };
Object.defineProperty(B, "__esModule", { value: !0 }), B.isMac = B.isLinux = B.isWindows = void 0;
const O = _(f.default), S = "Windows_NT", v = "Linux", w = "Darwin";
B.isWindows = function () {
  return O.default.type() === S
}, B.isLinux = function () {
  return O.default.type() === v
}, B.isMac = function () {
  return O.default.type() === w
};
var P = {}, g = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
  void 0 === r && (r = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
    return e[t]
  } }), Object.defineProperty(u, r, n)
} : function (u, e, t, r) {
  void 0 === r && (r = t), u[r] = e[t]
}), b = y && y.__setModuleDefault || (Object.create ? function (u, e) {
  Object.defineProperty(u, "default", { enumerable: !0, value: e })
} : function (u, e) {
  u.default = e
}), N = y && y.__importStar || function (u) {
  if (u && u.__esModule) return u;
  var e = {};
  if (null != u) for (var t in u) "default" !== t && Object.prototype.hasOwnProperty.call(u, t) && g(e, u, t);
  return b(e, u), e
};
Object.defineProperty(P, "__esModule", { value: !0 }), P.hash = void 0;
const R = N(l.default);
P.hash = function (u, e = "md5") {
  return R.createHash(e).update(u, "utf-8").digest("hex")
}, function(u){
  var e = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
    void 0 === r && (r = t);
    var n = Object.getOwnPropertyDescriptor(e, t);
    n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
      return e[t]
    } }), Object.defineProperty(u, r, n)
  } : function (u, e, t, r) {
    void 0 === r && (r = t), u[r] = e[t]
  }), t = y && y.__setModuleDefault || (Object.create ? function (u, e) {
    Object.defineProperty(u, "default", { enumerable: !0, value: e })
  } : function (u, e) {
    u.default = e
  }), r = y && y.__importStar || function (u) {
    if (u && u.__esModule) return u;
    var r = {};
    if (null != u) for (var n in u) "default" !== n && Object.prototype.hasOwnProperty.call(u, n) && e(r, u, n);
    return t(r, u), r
  };
  Object.defineProperty(u, "__esModule", {
    value: !0
  }), u.HVIGOR_BOOT_JS_FILE_PATH = u.HVIGOR_PROJECT_DEPENDENCY_PACKAGE_JSON_PATH = u.HVIGOR_PROJECT_DEPENDENCIES_HOME = u.HVIGOR_PROJECT_WRAPPER_HOME = u.HVIGOR_PROJECT_NAME = u.HVIGOR_PROJECT_ROOT_DIR = u.HVIGOR_PROJECT_CACHES_HOME = u.HVIGOR_PNPM_STORE_PATH = u.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = u.HVIGOR_WRAPPER_TOOLS_HOME = u.HVIGOR_USER_HOME = u.DEFAULT_PACKAGE_JSON = u.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = u.NPM_TOOL = u.PNPM_TOOL = u.HVIGOR_ENGINE_PACKAGE_NAME = void 0;
  const n = r(E.default), i = r(f.default), o = B, D = P;
  u.HVIGOR_ENGINE_PACKAGE_NAME = "@ohos/hvigor", u.PNPM_TOOL = (0, o.isWindows)() ? "pnpm.cmd" : "pnpm", u.NPM_TOOL = (0, o.isWindows)() ? "npm.cmd" : "npm", u.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME = "hvigor-config.json5", u.DEFAULT_PACKAGE_JSON = "package.json", u.HVIGOR_USER_HOME = n.resolve(i.homedir(), ".hvigor"), u.HVIGOR_WRAPPER_TOOLS_HOME = n.resolve(u.HVIGOR_USER_HOME, "wrapper", "tools"), u.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH = n.resolve(u.HVIGOR_WRAPPER_TOOLS_HOME, "node_modules", ".bin", u.PNPM_TOOL), u.HVIGOR_PNPM_STORE_PATH = n.resolve(u.HVIGOR_USER_HOME, "caches"), u.HVIGOR_PROJECT_CACHES_HOME = n.resolve(u.HVIGOR_USER_HOME, "project_caches"), u.HVIGOR_PROJECT_ROOT_DIR = process.cwd(), u.HVIGOR_PROJECT_NAME = n.basename((0, D.hash)(u.HVIGOR_PROJECT_ROOT_DIR)), u.HVIGOR_PROJECT_WRAPPER_HOME = n.resolve(u.HVIGOR_PROJECT_ROOT_DIR, "hvigor"), u.HVIGOR_PROJECT_DEPENDENCIES_HOME = n.resolve(u.HVIGOR_PROJECT_CACHES_HOME, u.HVIGOR_PROJECT_NAME, "workspace"), u.HVIGOR_PROJECT_DEPENDENCY_PACKAGE_JSON_PATH = n.resolve(u.HVIGOR_PROJECT_DEPENDENCIES_HOME, u.DEFAULT_PACKAGE_JSON), u.HVIGOR_BOOT_JS_FILE_PATH = n.resolve(u.HVIGOR_PROJECT_DEPENDENCIES_HOME, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js")
}(m);
var I = {}, T = {};
Object.defineProperty(T, "__esModule", { value: !0 }), T.logErrorAndExit = void 0, T.logErrorAndExit = function (u) {
    u instanceof Error ? console.error(u.message) : console.error(u), process.exit(-1)
};
var k = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
  void 0 === r && (r = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
    return e[t]
  } }), Object.defineProperty(u, r, n)
} : function (u, e, t, r) {
  void 0 === r && (r = t), u[r] = e[t]
}), H = y && y.__setModuleDefault || (Object.create ? function (u, e) {
  Object.defineProperty(u, "default", { enumerable: !0, value: e })
} : function (u, e) {
  u.default = e
}), x = y && y.__importStar || function (u) {
  if (u && u.__esModule) return u;
  var e = {};
  if (null != u) for (var t in u) "default" !== t && Object.prototype.hasOwnProperty.call(u, t) && k(e, u, t);
  return H(e, u), e
};
Object.defineProperty(I, "__esModule", {
  value: !0
}), I.parseJsonText = I.executeCommand = I.getNpmPath = I.hasNpmPackInPaths = void 0;
const M = C.default, J = x(f.default), j = x(E.default), G = m, L = T;
I.hasNpmPackInPaths = function (u, e) {
  try {
    return require.resolve(u, { paths: [...e] }),!0
  } catch (u) {
    return !1
  }
}, I.getNpmPath = function () {
  const u = process.execPath;
  return j.join(j.dirname(u), G.NPM_TOOL)
}, I.executeCommand = function (u, e, t) {
  0 !== (0, M.spawnSync)(u, e, t).status && (0, L.logErrorAndExit)(`Error: ${u} ${e} execute failed.See above for details.`)
}, I.parseJsonText = function (u, e) {
  try {
    return JSON.parse(u)
  } catch (u) {
    const t = `Error: ${e} is not the correct JSON/JSON5 format.`;
    if (u instanceof SyntaxError) {
      const r = u.message.split("at ");
      2 === r.length && t.concat(`${r[0].trim()}${J.EOL}\t at ${e}:${r[1].trim()}`)
    }
    (0, L.logErrorAndExit)(t)
  }
};
var V = {}, $ = {}, U = {};
Object.defineProperty(U, "__esModule", { value: !0 }), U.Unicode = void 0;

class W {
}

U.Unicode = W, W.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, W.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, W.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Object.defineProperty($, "__esModule", {
  value: !0
}), $.JudgeUtil = void 0;
const q = U;
$.JudgeUtil = class {
  static isIgnoreChar(u) {
    return "string" == typeof u && ("\t" === u || "\v" === u || "\f" === u || " " === u || " " === u || "\ufeff" === u || "\n" === u || "\r" === u || "\u2028" === u || "\u2029" === u)
  }

  static isSpaceSeparator(u) {
    return "string" == typeof u && q.Unicode.Space_Separator.test(u)
  }

  static isIdStartChar(u) {
    return "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || "$" === u || "_" === u || q.Unicode.ID_Start.test(u))
  }

  static isIdContinueChar(u) {
    return "string" == typeof u && (u >= "a" && u <= "z" || u >= "A" && u <= "Z" || u >= "0" && u <= "9" || "$" === u || "_" === u || "‌" === u || "‍" === u || q.Unicode.ID_Continue.test(u))
  }

  static isDigitWithoutZero(u) {
    return /[1-9]/.test(u)
  }

  static isDigit(u) {
    return "string" == typeof u && /[0-9]/.test(u)
  }

  static isHexDigit(u) {
    return "string" == typeof u && /[0-9A-Fa-f]/.test(u)
  }
};
var K = {}, Y = { fromCallback: function (u) {
  return Object.defineProperty((function (...e) {
    if ("function" != typeof e[e.length-1]) return new Promise(((t, r) => {
      u.call(this, ...e, ((u, e) => null != u ? r(u) : t(e)))
    }));
    u.apply(this, e)
  }), "name", { value: u.name })
}, fromPromise: function (u) {
  return Object.defineProperty((function (...e) {
    const t = e[e.length-1];
    if ("function" != typeof t) return u.apply(this, e);
    u.apply(this, e.slice(0, -1)).then((u => t(null, u)), t)
  }), "name", { value: u.name })
} }, z = F.default, Z = process.cwd, X = null, Q = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function () {
  return X || (X = Z.call(process)), X
};
try {
  process.cwd()
} catch (u) {
}
if ("function" == typeof process.chdir) {
  var uu = process.chdir;
  process.chdir = function (u) {
    X = null, uu.call(process, u)
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, uu)
}
var eu = function (u) {
  z.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && function(u){
    u.lchmod = function (e, t, r) {
      u.open(e, z.O_WRONLY | z.O_SYMLINK, t, (function (e, n) {
          e ? r && r(e) : u.fchmod(n, t, (function (e) {
          u.close(n, (function (u) {
            r && r(e || u)
          }))
        }))
      }))
    }, u.lchmodSync = function (e, t) {
      var r, n = u.openSync(e, z.O_WRONLY | z.O_SYMLINK, t), i = !0;
      try {
        r = u.fchmodSync(n, t), i = !1
      } finally {
        if (i) try {
          u.closeSync(n)
        } catch (u) {
        } else u.closeSync(n)
      }
      return r
    }
  }(u);
  u.lutimes || function(u){
      z.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function (e, t, r, n) {
      u.open(e, z.O_SYMLINK, (function (e, i) {
          e ? n && n(e) : u.futimes(i, t, r, (function (e) {
          u.close(i, (function (u) {
            n && n(e || u)
          }))
        }))
      }))
    }, u.lutimesSync = function (e, t, r) {
      var n, i = u.openSync(e, z.O_SYMLINK), o = !0;
      try {
        n = u.futimesSync(i, t, r), o = !1
      } finally {
        if (o) try {
          u.closeSync(i)
        } catch (u) {
        } else u.closeSync(i)
      }
      return n
    }) : u.futimes && (u.lutimes = function (u, e, t, r) {
      r && process.nextTick(r)
    }, u.lutimesSync = function () {
    })
  }(u);
  u.chown = r(u.chown), u.fchown = r(u.fchown), u.lchown = r(u.lchown), u.chmod = e(u.chmod), u.fchmod = e(u.fchmod), u.lchmod = e(u.lchmod), u.chownSync = n(u.chownSync), u.fchownSync = n(u.fchownSync), u.lchownSync = n(u.lchownSync), u.chmodSync = t(u.chmodSync), u.fchmodSync = t(u.fchmodSync), u.lchmodSync = t(u.lchmodSync), u.stat = i(u.stat), u.fstat = i(u.fstat), u.lstat = i(u.lstat), u.statSync = o(u.statSync), u.fstatSync = o(u.fstatSync), u.lstatSync = o(u.lstatSync), u.chmod && !u.lchmod && (u.lchmod = function (u, e, t) {
    t && process.nextTick(t)
  }, u.lchmodSync = function () {
  });
  u.chown && !u.lchown && (u.lchown = function (u, e, t, r) {
    r && process.nextTick(r)
  }, u.lchownSync = function () {
  });
  "win32" === Q && (u.rename = "function" != typeof u.rename ? u.rename : function(e){

    function t(t, r, n) {
      var i = Date.now(), o = 0;
      e(t, r, (function D(c) {
        if (c && ("EACCES" === c.code || "EPERM" === c.code) && Date.now() - i < 6e4) return setTimeout((function () {
          u.stat(r, (function (u, i) {
              u && "ENOENT" === u.code ? e(t, r, D) : n(c)
          }))
        }), o), void (o < 100 && (o += 10));
        n && n(c)
      }))
    }

    return Object.setPrototypeOf && Object.setPrototypeOf(t, e), t
  }(u.rename));

  function e(e) {
    return e ? function (t, r, n) {
      return e.call(u, t, r, (function (u) {
        D(u) && (u = null), n && n.apply(this, arguments)
      }))
    } : e
  }

  function t(e) {
    return e ? function (t, r) {
      try {
        return e.call(u, t, r)
      } catch (u) {
        if (!D(u)) throw u
      }
    } : e
  }

  function r(e) {
    return e ? function (t, r, n, i) {
      return e.call(u, t, r, n, (function (u) {
        D(u) && (u = null), i && i.apply(this, arguments)
      }))
    } : e
  }

  function n(e) {
    return e ? function (t, r, n) {
      try {
        return e.call(u, t, r, n)
      } catch (u) {
        if (!D(u)) throw u
      }
    } : e
  }

  function i(e) {
    return e ? function (t, r, n) {

      function i(u, e) {
        e && (e.uid < 0 && (e.uid += 4294967296), e.gid < 0 && (e.gid += 4294967296)), n && n.apply(this, arguments)
      }

      return "function" == typeof r && (n = r, r = null), r ? e.call(u, t, r, i) : e.call(u, t, i)
    } : e
  }

  function o(e) {
    return e ? function (t, r) {
      var n = r ? e.call(u, t, r) : e.call(u, t);
      return n && (n.uid < 0 && (n.uid += 4294967296), n.gid < 0 && (n.gid += 4294967296)), n
    } : e
  }

  function D(u) {
    return!u || ("ENOSYS" === u.code || !(process.getuid && 0 === process.getuid() || "EINVAL" !== u.code && "EPERM" !== u.code))
  }

  u.read = "function" != typeof u.read ? u.read : function(e){

    function t(t, r, n, i, o, D) {
      var c;
      if (D && "function" == typeof D) {
        var a = 0;
        c = function (s, E, f) {
          if (s && "EAGAIN" === s.code && a < 10) return a++, e.call(u, t, r, n, i, o, c);
          D.apply(this, arguments)
        }
      }
      return e.call(u, t, r, n, i, o, c)
    }

    return Object.setPrototypeOf && Object.setPrototypeOf(t, e), t
  }(u.read), u.readSync = "function" != typeof u.readSync ? u.readSync : (c = u.readSync, function (e, t, r, n, i) {
    for (var o = 0;; ) try {
      return c.call(u, e, t, r, n, i)
    } catch (u) {
      if ("EAGAIN" === u.code && o < 10) {
        o++;
        continue
      }
      throw u
    }
  });
  var c
};
var tu = d.default.Stream, ru = function (u) {
  return { ReadStream: function e(t, r) {
    if (!(this instanceof e)) return new e(t, r);
    tu.call(this);
    var n = this;
    this.path = t, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 65536, r = r || {
    };
    for (var i = Object.keys(r), o = 0, D = i.length;o < D; o++) {
      var c = i[o];
      this[c] = r[c]
    }
    this.encoding && this.setEncoding(this.encoding);
    if (void 0 !== this.start) {
      if ("number" != typeof this.start) throw TypeError("start must be a Number");
      if (void 0 === this.end) this.end = 1 / 0; else if ("number" != typeof this.end) throw TypeError("end must be a Number");
      if (this.start > this.end) throw new Error("start must be <= end");
      this.pos = this.start
    }
    if (null !== this.fd) return void process.nextTick((function () {
      n._read()
    }));
    u.open(this.path, this.flags, this.mode, (function (u, e) {
      if (u) return n.emit("error", u), void (n.readable = !1);
      n.fd = e, n.emit("open", e), n._read()
    }))
  }, WriteStream: function e(t, r) {
    if (!(this instanceof e)) return new e(t, r);
    tu.call(this), this.path = t, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {
    };
    for (var n = Object.keys(r), i = 0, o = n.length;i < o; i++) {
      var D = n[i];
      this[D] = r[D]
    }
    if (void 0 !== this.start) {
      if ("number" != typeof this.start) throw TypeError("start must be a Number");
      if (this.start < 0) throw new Error("start must be >= zero");
      this.pos = this.start
    }
    this.busy = !1, this._queue = [], null === this.fd && (this._open = u.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush())
  } }
};
var nu = function (u) {
  if (null === u || "object" != typeof u) return u;
  if (u instanceof Object) var e = { __proto__: iu(u) }; else e = Object.create(null);
  return Object.getOwnPropertyNames(u).forEach((function (t) {
    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(u, t))
  })), e
}, iu = Object.getPrototypeOf || function (u) {
  return u.__proto__
};
var ou, Du, cu = s.default, au = eu, su = ru, Eu = nu, fu = A.default;

function lu(u, e) {
  Object.defineProperty(u, ou, { get: function () {
    return e
  } })
}

"function" == typeof Symbol && "function" == typeof Symbol.for ? (ou = Symbol.for("graceful-fs.queue"), Du = Symbol.for("graceful-fs.previous")) : (ou = "___graceful-fs.queue", Du = "___graceful-fs.previous");
var Cu = function () {
};
if (fu.debuglog ? Cu = fu.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Cu = function () {
  var u = fu.format.apply(fu, arguments);
  u = "GFS4: " + u.split(/\n/).join("\nGFS4: "), console.error(u)
}),!cu[ou]) {
  var Fu = y[ou] || [];
  lu(cu, Fu), cu.close = function(u){

    function e(e, t) {
      return u.call(cu, e, (function (u) {
        u || hu(), "function" == typeof t && t.apply(this, arguments)
      }))
    }

    return Object.defineProperty(e, Du, { value: u }), e
  }(cu.close), cu.closeSync = function(u){

    function e(e) {
      u.apply(cu, arguments), hu()
    }

    return Object.defineProperty(e, Du, { value: u }), e
  }(cu.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", (function () {
    Cu(cu[ou]), p.default.equal(cu[ou].length, 0)
  }))
}
y[ou] || lu(y, cu[ou]);
var du, Au = pu(Eu(cu));

function pu(u) {
  au(u), u.gracefulify = pu, u.createReadStream = function (e, t) {
    return new u.ReadStream(e, t)
  }, u.createWriteStream = function (e, t) {
    return new u.WriteStream(e, t)
  };
  var e = u.readFile;
  u.readFile = function (u, t, r) {
    "function" == typeof t && (r = t, t = null);
    return function u(t, r, n, i){
      return e(t, r, (function (e) {
          !e || "EMFILE" !== e.code && "ENFILE" !== e.code ? "function" == typeof n && n.apply(this, arguments) : yu([u, [t, r, n], e, i || Date.now(), Date.now()])
      }))
    }(u, t, r)
  };
  var t = u.writeFile;
  u.writeFile = function (u, e, r, n) {
    "function" == typeof r && (n = r, r = null);
    return function u(e, r, n, i, o){
      return t(e, r, n, (function (t) {
          !t || "EMFILE" !== t.code && "ENFILE" !== t.code ? "function" == typeof i && i.apply(this, arguments) : yu([u, [e, r, n, i], t, o || Date.now(), Date.now()])
      }))
    }(u, e, r, n)
  };
  var r = u.appendFile;
  r && (u.appendFile = function (u, e, t, n) {
    "function" == typeof t && (n = t, t = null);
    return function u(e, t, n, i, o){
      return r(e, t, n, (function (r) {
          !r || "EMFILE" !== r.code && "ENFILE" !== r.code ? "function" == typeof i && i.apply(this, arguments) : yu([u, [e, t, n, i], r, o || Date.now(), Date.now()])
      }))
    }(u, e, t, n)
  });
  var n = u.copyFile;
  n && (u.copyFile = function (u, e, t, r) {
    "function" == typeof t && (r = t, t = 0);
    return function u(e, t, r, i, o){
      return n(e, t, r, (function (n) {
          !n || "EMFILE" !== n.code && "ENFILE" !== n.code ? "function" == typeof i && i.apply(this, arguments) : yu([u, [e, t, r, i], n, o || Date.now(), Date.now()])
      }))
    }(u, e, t, r)
  });
  var i = u.readdir;
  u.readdir = function (u, e, t) {
    "function" == typeof e && (t = e, e = null);
    var r = o.test(process.version) ? function (u, e, t, r) {
      return i(u, n(u, e, t, r))
    } : function (u, e, t, r) {
      return i(u, e, n(u, e, t, r))
    };
    return r(u, e, t);

    function n(u, e, t, n) {
      return function (i, o) {
          !i || "EMFILE" !== i.code && "ENFILE" !== i.code ? (o && o.sort && o.sort(), "function" == typeof t && t.call(this, i, o)) : yu([r, [u, e, t], i, n || Date.now(), Date.now()])
      }
    }
  };
  var o = /^v[0-5]\./;
  if ("v0.8" === process.version.substr(0, 4)) {
    var D = su(u);
    f = D.ReadStream, l = D.WriteStream
  }
  var c = u.ReadStream;
  c && (f.prototype = Object.create(c.prototype), f.prototype.open = function () {
    var u = this;
    F(u.path, u.flags, u.mode, (function (e, t) {
        e ? (u.autoClose && u.destroy(), u.emit("error", e)) : (u.fd = t, u.emit("open", t), u.read())
    }))
  });
  var a = u.WriteStream;
  a && (l.prototype = Object.create(a.prototype), l.prototype.open = function () {
    var u = this;
    F(u.path, u.flags, u.mode, (function (e, t) {
        e ? (u.destroy(), u.emit("error", e)) : (u.fd = t, u.emit("open", t))
    }))
  }), Object.defineProperty(u, "ReadStream", { get: function () {
    return f
  }, set: function (u) {
    f = u
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(u, "WriteStream", { get: function () {
    return l
  }, set: function (u) {
    l = u
  }, enumerable: !0, configurable: !0 });
  var s = f;
  Object.defineProperty(u, "FileReadStream", { get: function () {
    return s
  }, set: function (u) {
    s = u
  }, enumerable: !0, configurable: !0 });
  var E = l;

  function f(u, e) {
    return this instanceof f ? (c.apply(this, arguments), this) : f.apply(Object.create(f.prototype), arguments)
  }

  function l(u, e) {
    return this instanceof l ? (a.apply(this, arguments), this) : l.apply(Object.create(l.prototype), arguments)
  }

  Object.defineProperty(u, "FileWriteStream", { get: function () {
    return E
  }, set: function (u) {
    E = u
  }, enumerable: !0, configurable: !0 });
  var C = u.open;

  function F(u, e, t, r) {
    return "function" == typeof t && (r = t, t = null), function u(e, t, r, n, i){
      return C(e, t, r, (function (o, D) {
          !o || "EMFILE" !== o.code && "ENFILE" !== o.code ? "function" == typeof n && n.apply(this, arguments) : yu([u, [e, t, r, n], o, i || Date.now(), Date.now()])
      }))
    }(u, e, t, r)
  }

  return u.open = F, u
}

function yu(u) {
  Cu("ENQUEUE", u[0].name, u[1]), cu[ou].push(u), mu()
}

function hu() {
  for (var u = Date.now(), e = 0;e < cu[ou].length; ++e) cu[ou][e].length > 2 && (cu[ou][e][3] = u, cu[ou][e][4] = u);
  mu()
}

function mu() {
  if (clearTimeout(du), du = void 0, 0 !== cu[ou].length) {
    var u = cu[ou].shift(), e = u[0], t = u[1], r = u[2], n = u[3], i = u[4];
    if (void 0 === n) Cu("RETRY", e.name, t), e.apply(null, t); else if (Date.now() - n >= 6e4) {
      Cu("TIMEOUT", e.name, t);
      var o = t.pop();
      "function" == typeof o && o.call(null, r)
    } else {
      var D = Date.now() - i, c = Math.max(i - n, 1);
        D >= Math.min(1.2 * c, 100) ? (Cu("RETRY", e.name, t), e.apply(null, t.concat([n]))) : cu[ou].push(u)
    }
    void 0 === du && (du = setTimeout(mu, 0))
  }
}

process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !cu.__patched && (Au = pu(cu), cu.__patched = !0), function(u){
  const e = Y.fromCallback, t = Au,
    r = ["access", "appendFile", "chmod", "chown", "close", "copyFile", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "lchmod", "lchown", "link", "lstat", "mkdir", "mkdtemp", "open", "opendir", "readdir", "readFile", "readlink", "realpath", "rename", "rm", "rmdir", "stat", "symlink", "truncate", "unlink", "utimes", "writeFile"].filter((u => "function" == typeof t[u]));
  Object.assign(u, t), r.forEach((r => {
    u[r] = e(t[r])
  })), u.exists = function (u, e) {
    return "function" == typeof e ? t.exists(u, e) : new Promise((e => t.exists(u, e)))
  }, u.read = function (u, e, r, n, i, o) {
    return "function" == typeof o ? t.read(u, e, r, n, i, o) : new Promise(((o, D) => {
      t.read(u, e, r, n, i, ((u, e, t) => {
        if (u) return D(u);
        o({ bytesRead: e, buffer: t })
      }))
    }))
  }, u.write = function (u, e, ...r) {
    return "function" == typeof r[r.length-1] ? t.write(u, e, ...r) : new Promise(((n, i) => {
      t.write(u, e, ...r, ((u, e, t) => {
        if (u) return i(u);
        n({ bytesWritten: e, buffer: t })
      }))
    }))
  }, "function" == typeof t.writev && (u.writev = function (u, e, ...r) {
    return "function" == typeof r[r.length-1] ? t.writev(u, e, ...r) : new Promise(((n, i) => {
      t.writev(u, e, ...r, ((u, e, t) => {
        if (u) return i(u);
        n({ bytesWritten: e, buffers: t })
      }))
    }))
  }), "function" == typeof t.realpath.native ? u.realpath.native = e(t.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003")
}(K);
var Bu = {}, _u = {};
const Ou = E.default;
_u.checkPath = function (u) {
  if ("win32" === process.platform) {
    if (/[<>:"|?*]/.test(u.replace(Ou.parse(u).root, ""))) {
      const e = new Error(`Path contains invalid characters: ${u}`);
      throw e.code = "EINVAL", e
    }
  }
};
const Su = K, {checkPath:vu} = _u, wu = u => "number" == typeof u ? u : {mode: 511,...u}.mode;
Bu.makeDir = async (u, e) => (vu(u), Su.mkdir(u, {
  mode: wu(e),
  recursive: !0
})), Bu.makeDirSync = (u, e) => (vu(u), Su.mkdirSync(u, { mode: wu(e), recursive: !0 }));
const Pu = Y.fromPromise, {makeDir:gu,makeDirSync:bu} = Bu, Nu = Pu(gu);
var Ru = {
  mkdirs: Nu,
  mkdirsSync: bu,
  mkdirp: Nu,
  mkdirpSync: bu,
  ensureDir: Nu,
  ensureDirSync: bu
};
const Iu = Y.fromPromise, Tu = K;
var ku = { pathExists: Iu((function (u) {
  return Tu.access(u).then((() =>!0)).catch((() =>!1))
})), pathExistsSync: Tu.existsSync };
const Hu = Au;
var xu = function (u, e, t, r) {
  Hu.open(u, "r+", ((u, n) => {
    if (u) return r(u);
    Hu.futimes(n, e, t, (u => {
      Hu.close(n, (e => {
        r && r(u || e)
      }))
    }))
  }))
}, Mu = function (u, e, t) {
  const r = Hu.openSync(u, "r+");
  return Hu.futimesSync(r, e, t), Hu.closeSync(r)
};
const Ju = K, ju = E.default, Gu = A.default;

function Lu(u, e, t) {
  const r = t.dereference ? u => Ju.stat(u, { bigint: !0 }) : u => Ju.lstat(u, { bigint: !0 });
  return Promise.all([r(u), r(e).catch((u => {
    if ("ENOENT" === u.code) return null;
    throw u
  }))]).then((([u, e]) => ({ srcStat: u, destStat: e })))
}

function Vu(u, e) {
  return e.ino && e.dev && e.ino === u.ino && e.dev === u.dev
}

function $u(u, e) {
  const t = ju.resolve(u).split(ju.sep).filter((u => u)), r = ju.resolve(e).split(ju.sep).filter((u => u));
  return t.reduce(((u, e, t) => u && r[t] === e),!0)
}

function Uu(u, e, t) {
  return `Cannot ${t} '${u}' to a subdirectory of itself, '${e}'.`
}

var Wu = {
  checkPaths: function (u, e, t, r, n) {
    Gu.callbackify(Lu)(u, e, r, ((r, i) => {
      if (r) return n(r);
      const {srcStat:o,destStat:D} = i;
      if (D) {
        if (Vu(o, D)) {
          const r = ju.basename(u), i = ju.basename(e);
          return "move" === t && r !== i && r.toLowerCase() === i.toLowerCase() ? n(null, {
            srcStat: o,
            destStat: D,
            isChangingCase: !0
          }) : n(new Error("Source and destination must not be the same."))
        }
        if (o.isDirectory() && !D.isDirectory()) return n(new Error(`Cannot overwrite non-directory '${e}' with directory '${u}'.`));
        if (!o.isDirectory() && D.isDirectory()) return n(new Error(`Cannot overwrite directory '${e}' with non-directory '${u}'.`))
      }
      return o.isDirectory() && $u(u, e) ? n(new Error(Uu(u, e, t))) : n(null, { srcStat: o, destStat: D })
    }))
  },
  checkPathsSync: function (u, e, t, r) {
    const {srcStat:n,destStat:i} = function(u, e, t){
      let r;
      const n = t.dereference ? u => Ju.statSync(u, { bigint: !0 }) : u => Ju.lstatSync(u, { bigint: !0 }), i = n(u);
      try {
        r = n(e)
      } catch (u) {
        if ("ENOENT" === u.code) return { srcStat: i, destStat: null };
        throw u
      }
      return { srcStat: i, destStat: r }
    }(u, e, r);
    if (i) {
      if (Vu(n, i)) {
        const r = ju.basename(u), o = ju.basename(e);
        if ("move" === t && r !== o && r.toLowerCase() === o.toLowerCase()) return {
          srcStat: n,
          destStat: i,
          isChangingCase: !0
        };
        throw new Error("Source and destination must not be the same.")
      }
      if (n.isDirectory() && !i.isDirectory()) throw new Error(`Cannot overwrite non-directory '${e}' with directory '${u}'.`);
      if (!n.isDirectory() && i.isDirectory()) throw new Error(`Cannot overwrite directory '${e}' with non-directory '${u}'.`)
    }
    if (n.isDirectory() && $u(u, e)) throw new Error(Uu(u, e, t));
    return { srcStat: n, destStat: i }
  },
  checkParentPaths: function u(e, t, r, n, i) {
    const o = ju.resolve(ju.dirname(e)), D = ju.resolve(ju.dirname(r));
    if (D === o || D === ju.parse(D).root) return i();
    Ju.stat(D, {
      bigint: !0
    }, ((o, c) => o ? "ENOENT" === o.code ? i() : i(o) : Vu(t, c) ? i(new Error(Uu(e, r, n))) : u(e, t, D, n, i)))
  },
  checkParentPathsSync: function u(e, t, r, n) {
    const i = ju.resolve(ju.dirname(e)), o = ju.resolve(ju.dirname(r));
    if (o === i || o === ju.parse(o).root) return;
    let D;
    try {
      D = Ju.statSync(o, { bigint: !0 })
    } catch (u) {
      if ("ENOENT" === u.code) return;
      throw u
    }
    if (Vu(t, D)) throw new Error(Uu(e, r, n));
    return u(e, t, o, n)
  },
  isSrcSubdir: $u,
  areIdentical: Vu
};
const qu = Au, Ku = E.default, Yu = Ru.mkdirs, zu = ku.pathExists, Zu = xu, Xu = Wu;

function Qu(u, e, t, r, n) {
  const i = Ku.dirname(t);
  zu(i, ((o, D) => o ? n(o) : D ? ee(u, e, t, r, n) : void Yu(i, (i => i ? n(i) : ee(u, e, t, r, n)))))
}

function ue(u, e, t, r, n, i) {
  Promise.resolve(n.filter(t, r)).then((o => o ? u(e, t, r, n, i) : i()), (u => i(u)))
}

function ee(u, e, t, r, n) {
  (r.dereference ? qu.stat : qu.lstat)(e, ((i, o) => i ? n(i) : o.isDirectory() ? function(u, e, t, r, n, i){
    return e ? ie(t, r, n, i) : function(u, e, t, r, n){
      qu.mkdir(t, (i => {
        if (i) return n(i);
        ie(e, t, r, (e => e ? n(e) : ne(t, u, n)))
      }))
    }(u.mode, t, r, n, i)
  }(o, u, e, t, r, n) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? function(u, e, t, r, n, i){
    return e ? function(u, e, t, r, n){
      if (!r.overwrite) return r.errorOnExist ? n(new Error(`'${t}' already exists`)) : n();
      qu.unlink(t, (i => i ? n(i) : te(u, e, t, r, n)))
    }(u, t, r, n, i) : te(u, t, r, n, i)
  }(o, u, e, t, r, n) : o.isSymbolicLink() ? function(u, e, t, r, n){
    qu.readlink(e, ((e, i) => e ? n(e) : (r.dereference && (i = Ku.resolve(process.cwd(), i)), u ? void qu.readlink(t, ((e, o) => e ? "EINVAL" === e.code || "UNKNOWN" === e.code ? qu.symlink(i, t, n) : n(e) : (r.dereference && (o = Ku.resolve(process.cwd(), o)), Xu.isSrcSubdir(i, o) ? n(new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`)) : u.isDirectory() && Xu.isSrcSubdir(o, i) ? n(new Error(`Cannot overwrite '${o}' with '${i}'.`)) : function(u, e, t){
      qu.unlink(e, (r => r ? t(r) : qu.symlink(u, e, t)))
    }(i, t, n)))) : qu.symlink(i, t, n))))
  }(u, e, t, r, n) : o.isSocket() ? n(new Error(`Cannot copy a socket file: ${e}`)) : o.isFIFO() ? n(new Error(`Cannot copy a FIFO pipe: ${e}`)) : n(new Error(`Unknown file: ${e}`))))
}

function te(u, e, t, r, n) {
  qu.copyFile(e, t, (i => i ? n(i) : r.preserveTimestamps ? function(u, e, t, r){
    if (function(u){
      return 0 == (128 & u)
    }(u)) return function(u, e, t){
      return ne(u, 128 | e, t)
    }(t, u, (n => n ? r(n) : re(u, e, t, r)));
    return re(u, e, t, r)
  }(u.mode, e, t, n) : ne(t, u.mode, n)))
}

function re(u, e, t, r) {
  !function(u, e, t){
    qu.stat(u, ((u, r) => u ? t(u) : Zu(e, r.atime, r.mtime, t)))
  }(e, t, (e => e ? r(e) : ne(t, u, r)))
}

function ne(u, e, t) {
  return qu.chmod(u, e, t)
}

function ie(u, e, t, r) {
  qu.readdir(u, ((n, i) => n ? r(n) : oe(i, u, e, t, r)))
}

function oe(u, e, t, r, n) {
  const i = u.pop();
  return i ? function(u, e, t, r, n, i){
    const o = Ku.join(t, e), D = Ku.join(r, e);
    Xu.checkPaths(o, D, "copy", n, ((e, c) => {
      if (e) return i(e);
      const {destStat:a} = c;
      !function(u, e, t, r, n){
        r.filter ? ue(ee, u, e, t, r, n) : ee(u, e, t, r, n)
      }(a, o, D, n, (e => e ? i(e) : oe(u, t, r, n, i)))
    }))
  }(u, i, e, t, r, n) : n()
}

var De = function (u, e, t, r) {
    "function" != typeof t || r ? "function" == typeof t && (t = { filter: t }) : (r = t, t = {
  }), r = r || function () {
  }, (t = t || {
  }).clobber = !("clobber" in t) || !!t.clobber, t.overwrite = "overwrite" in t ? !!t.overwrite : t.clobber, t.preserveTimestamps && "ia32" === process.arch && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001"), Xu.checkPaths(u, e, "copy", t, ((n, i) => {
    if (n) return r(n);
    const {srcStat:o,destStat:D} = i;
    Xu.checkParentPaths(u, o, e, "copy", (n => n ? r(n) : t.filter ? ue(Qu, D, u, e, t, r) : Qu(D, u, e, t, r)))
  }))
};
const ce = Au, ae = E.default, se = Ru.mkdirsSync, Ee = Mu, fe = Wu;

function le(u, e, t, r) {
  const n = (r.dereference ? ce.statSync : ce.lstatSync)(e);
  if (n.isDirectory()) return function(u, e, t, r, n){
    return e ? de(t, r, n) : function(u, e, t, r){
      return ce.mkdirSync(t), de(e, t, r), Fe(t, u)
    }(u.mode, t, r, n)
  }(n, u, e, t, r);
  if (n.isFile() || n.isCharacterDevice() || n.isBlockDevice()) return function(u, e, t, r, n){
    return e ? function(u, e, t, r){
      if (r.overwrite) return ce.unlinkSync(t), Ce(u, e, t, r);
      if (r.errorOnExist) throw new Error(`'${t}' already exists`)
    }(u, t, r, n) : Ce(u, t, r, n)
  }(n, u, e, t, r);
  if (n.isSymbolicLink()) return function(u, e, t, r){
    let n = ce.readlinkSync(e);
    r.dereference && (n = ae.resolve(process.cwd(), n));
    if (u) {
      let u;
      try {
        u = ce.readlinkSync(t)
      } catch (u) {
        if ("EINVAL" === u.code || "UNKNOWN" === u.code) return ce.symlinkSync(n, t);
        throw u
      }
      if (r.dereference && (u = ae.resolve(process.cwd(), u)), fe.isSrcSubdir(n, u)) throw new Error(`Cannot copy '${n}' to a subdirectory of itself, '${u}'.`);
      if (ce.statSync(t).isDirectory() && fe.isSrcSubdir(u, n)) throw new Error(`Cannot overwrite '${u}' with '${n}'.`);
      return function(u, e){
        return ce.unlinkSync(e), ce.symlinkSync(u, e)
      }(n, t)
    }
    return ce.symlinkSync(n, t)
  }(u, e, t, r);
  if (n.isSocket()) throw new Error(`Cannot copy a socket file: ${e}`);
  if (n.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${e}`);
  throw new Error(`Unknown file: ${e}`)
}

function Ce(u, e, t, r) {
  return ce.copyFileSync(e, t), r.preserveTimestamps && function(u, e, t){
    (function (u) {
      return 0 == (128 & u)
    })(u) && function(u, e){
      Fe(u, 128 | e)
    }(t, u);
    (function (u, e) {
      const t = ce.statSync(u);
      Ee(e, t.atime, t.mtime)
    })(e, t)
  }(u.mode, e, t), Fe(t, u.mode)
}

function Fe(u, e) {
  return ce.chmodSync(u, e)
}

function de(u, e, t) {
  ce.readdirSync(u).forEach((r => function(u, e, t, r){
    const n = ae.join(e, u), i = ae.join(t, u), {destStat:o} = fe.checkPathsSync(n, i, "copy", r);
    return function(u, e, t, r){
      if (!r.filter || r.filter(e, t)) return le(u, e, t, r)
    }(o, n, i, r)
  }(r, u, e, t)))
}

var Ae = function (u, e, t) {
  "function" == typeof t && (t = { filter: t }), (t = t || {
  }).clobber = !("clobber" in t) || !!t.clobber, t.overwrite = "overwrite" in t ? !!t.overwrite : t.clobber, t.preserveTimestamps && "ia32" === process.arch && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
  const {srcStat:r,destStat:n} = fe.checkPathsSync(u, e, "copy", t);
  return fe.checkParentPathsSync(u, r, e, "copy"), function(u, e, t, r){
    if (r.filter && !r.filter(e, t)) return;
    const n = ae.dirname(t);
    ce.existsSync(n) || se(n);
    return le(u, e, t, r)
  }(n, u, e, t)
};
var pe = { copy: (0, Y.fromCallback)(De), copySync: Ae };
const ye = Au, he = E.default, me = p.default, Be = "win32" === process.platform;

function _e(u) {
  ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach((e => {
    u[e] = u[e] || ye[e], u[e+="Sync"] = u[e] || ye[e]
  })), u.maxBusyTries = u.maxBusyTries || 3
}

function Oe(u, e, t) {
  let r = 0;
  "function" == typeof e && (t = e, e = {
  }), me(u, "rimraf: missing path"), me.strictEqual(typeof u, "string", "rimraf: path should be a string"), me.strictEqual(typeof t, "function", "rimraf: callback function required"), me(e, "rimraf: invalid options argument provided"), me.strictEqual(typeof e, "object", "rimraf: options should be object"), _e(e), Se(u, e, (function n(i) {
    if (i) {
      if (("EBUSY" === i.code || "ENOTEMPTY" === i.code || "EPERM" === i.code) && r < e.maxBusyTries) {
        r++;
        return setTimeout((() => Se(u, e, n)), 100 * r)
      }
      "ENOENT" === i.code && (i = null)
    }
    t(i)
  }))
}

function Se(u, e, t) {
  me(u), me(e), me("function" == typeof t), e.lstat(u, ((r, n) => r && "ENOENT" === r.code ? t(null) : r && "EPERM" === r.code && Be ? ve(u, e, r, t) : n && n.isDirectory() ? Pe(u, e, r, t) : void e.unlink(u, (r => {
    if (r) {
      if ("ENOENT" === r.code) return t(null);
      if ("EPERM" === r.code) return Be ? ve(u, e, r, t) : Pe(u, e, r, t);
      if ("EISDIR" === r.code) return Pe(u, e, r, t)
    }
    return t(r)
  }))))
}

function ve(u, e, t, r) {
  me(u), me(e), me("function" == typeof r), e.chmod(u, 438, (n => {
      n ? r("ENOENT" === n.code ? null : t) : e.stat(u, ((n, i) => {
        n ? r("ENOENT" === n.code ? null : t) : i.isDirectory() ? Pe(u, e, t, r) : e.unlink(u, r)
    }))
  }))
}

function we(u, e, t) {
  let r;
  me(u), me(e);
  try {
    e.chmodSync(u, 438)
  } catch (u) {
    if ("ENOENT" === u.code) return;
    throw t
  }
  try {
    r = e.statSync(u)
  } catch (u) {
    if ("ENOENT" === u.code) return;
    throw t
  }
  r.isDirectory() ? be(u, e, t) : e.unlinkSync(u)
}

function Pe(u, e, t, r) {
  me(u), me(e), me("function" == typeof r), e.rmdir(u, (n => {
      !n || "ENOTEMPTY" !== n.code && "EEXIST" !== n.code && "EPERM" !== n.code ? n && "ENOTDIR" === n.code ? r(t) : r(n) : function(u, e, t){
      me(u), me(e), me("function" == typeof t), e.readdir(u, ((r, n) => {
        if (r) return t(r);
        let i, o = n.length;
        if (0 === o) return e.rmdir(u, t);
        n.forEach((r => {
          Oe(he.join(u, r), e, (r => {
            if (!i) return r ? t(i = r) : void (0 == --o && e.rmdir(u, t))
          }))
        }))
      }))
    }(u, e, r)
  }))
}

function ge(u, e) {
  let t;
  _e(e = e || {
  }), me(u, "rimraf: missing path"), me.strictEqual(typeof u, "string", "rimraf: path should be a string"), me(e, "rimraf: missing options"), me.strictEqual(typeof e, "object", "rimraf: options should be object");
  try {
    t = e.lstatSync(u)
  } catch (t) {
    if ("ENOENT" === t.code) return;
    "EPERM" === t.code && Be && we(u, e, t)
  }
  try {
      t && t.isDirectory() ? be(u, e, null) : e.unlinkSync(u)
  } catch (t) {
    if ("ENOENT" === t.code) return;
    if ("EPERM" === t.code) return Be ? we(u, e, t) : be(u, e, t);
    if ("EISDIR" !== t.code) throw t;
    be(u, e, t)
  }
}

function be(u, e, t) {
  me(u), me(e);
  try {
    e.rmdirSync(u)
  } catch (r) {
    if ("ENOTDIR" === r.code) throw t;
    if ("ENOTEMPTY" === r.code || "EEXIST" === r.code || "EPERM" === r.code) !function(u, e){
      if (me(u), me(e), e.readdirSync(u).forEach((t => ge(he.join(u, t), e))),!Be) {
        return e.rmdirSync(u, e)
      }
      {
        const t = Date.now();
        do {
          try {
            return e.rmdirSync(u, e)
          } catch {
          }
        } while (Date.now() - t < 500)
      }
    }(u, e); else if ("ENOENT" !== r.code) throw r
  }
}

var Ne = Oe;
Oe.sync = ge;
const Re = Au, Ie = Y.fromCallback, Te = Ne;
var ke = { remove: Ie((function (u, e) {
  if (Re.rm) return Re.rm(u, { recursive: !0, force: !0 }, e);
  Te(u, e)
})), removeSync: function (u) {
  if (Re.rmSync) return Re.rmSync(u, { recursive: !0, force: !0 });
  Te.sync(u)
} };
const He = Y.fromPromise, xe = K, Me = E.default, Je = Ru, je = ke, Ge = He((async function (u) {
  let e;
  try {
    e = await xe.readdir(u)
  } catch {
    return Je.mkdirs(u)
  }
  return Promise.all(e.map((e => je.remove(Me.join(u, e)))))
}));

function Le(u) {
  let e;
  try {
    e = xe.readdirSync(u)
  } catch {
    return Je.mkdirsSync(u)
  }
  e.forEach((e => {
    e = Me.join(u, e), je.removeSync(e)
  }))
}

var Ve = { emptyDirSync: Le, emptydirSync: Le, emptyDir: Ge, emptydir: Ge };
const $e = Y.fromCallback, Ue = E.default, We = Au, qe = Ru;
var Ke = { createFile: $e((function (u, e) {

  function t() {
    We.writeFile(u, "", (u => {
      if (u) return e(u);
      e()
    }))
  }

  We.stat(u, ((r, n) => {
    if (!r && n.isFile()) return e();
    const i = Ue.dirname(u);
    We.stat(i, ((u, r) => {
      if (u) return "ENOENT" === u.code ? qe.mkdirs(i, (u => {
        if (u) return e(u);
        t()
      })) : e(u);
      r.isDirectory() ? t() : We.readdir(i, (u => {
        if (u) return e(u)
      }))
    }))
  }))
})), createFileSync: function (u) {
  let e;
  try {
    e = We.statSync(u)
  } catch {
  }
  if (e && e.isFile()) return;
  const t = Ue.dirname(u);
  try {
    We.statSync(t).isDirectory() || We.readdirSync(t)
  } catch (u) {
    if (!u || "ENOENT" !== u.code) throw u;
    qe.mkdirsSync(t)
  }
  We.writeFileSync(u, "")
} };
const Ye = Y.fromCallback, ze = E.default, Ze = Au, Xe = Ru, Qe = ku.pathExists, {areIdentical:ut} = Wu;
var et = { createLink: Ye((function (u, e, t) {

  function r(u, e) {
    Ze.link(u, e, (u => {
      if (u) return t(u);
      t(null)
    }))
  }

  Ze.lstat(e, ((n, i) => {
    Ze.lstat(u, ((n, o) => {
      if (n) return n.message = n.message.replace("lstat", "ensureLink"), t(n);
      if (i && ut(o, i)) return t(null);
      const D = ze.dirname(e);
      Qe(D, ((n, i) => n ? t(n) : i ? r(u, e) : void Xe.mkdirs(D, (n => {
        if (n) return t(n);
        r(u, e)
      }))))
    }))
  }))
})), createLinkSync: function (u, e) {
  let t;
  try {
    t = Ze.lstatSync(e)
  } catch {
  }
  try {
    const e = Ze.lstatSync(u);
    if (t && ut(e, t)) return
  } catch (u) {
    throw u.message = u.message.replace("lstat", "ensureLink"), u
  }
  const r = ze.dirname(e);
  return Ze.existsSync(r) || Xe.mkdirsSync(r), Ze.linkSync(u, e)
} };
const tt = E.default, rt = Au, nt = ku.pathExists;
var it = { symlinkPaths: function (u, e, t) {
  if (tt.isAbsolute(u)) return rt.lstat(u, (e => e ? (e.message = e.message.replace("lstat", "ensureSymlink"), t(e)) : t(null, {
    toCwd: u,
    toDst: u
  })));
  {
    const r = tt.dirname(e), n = tt.join(r, u);
    return nt(n, ((e, i) => e ? t(e) : i ? t(null, {
      toCwd: n,
      toDst: u
    }) : rt.lstat(u, (e => e ? (e.message = e.message.replace("lstat", "ensureSymlink"), t(e)) : t(null, {
      toCwd: u,
      toDst: tt.relative(r, u)
    })))))
  }
}, symlinkPathsSync: function (u, e) {
  let t;
  if (tt.isAbsolute(u)) {
    if (t = rt.existsSync(u),!t) throw new Error("absolute srcpath does not exist");
    return { toCwd: u, toDst: u }
  }
  {
    const r = tt.dirname(e), n = tt.join(r, u);
    if (t = rt.existsSync(n), t) return { toCwd: n, toDst: u };
    if (t = rt.existsSync(u),!t) throw new Error("relative srcpath does not exist");
    return { toCwd: u, toDst: tt.relative(r, u) }
  }
} };
const ot = Au;
var Dt = { symlinkType: function (u, e, t) {
  if (t = "function" == typeof e ? e : t, e = "function" != typeof e && e) return t(null, e);
  ot.lstat(u, ((u, r) => {
    if (u) return t(null, "file");
    e = r && r.isDirectory() ? "dir" : "file", t(null, e)
  }))
}, symlinkTypeSync: function (u, e) {
  let t;
  if (e) return e;
  try {
    t = ot.lstatSync(u)
  } catch {
    return "file"
  }
  return t && t.isDirectory() ? "dir" : "file"
} };
const ct = Y.fromCallback, at = E.default, st = K, Et = Ru.mkdirs, ft = Ru.mkdirsSync, lt = it.symlinkPaths,
  Ct = it.symlinkPathsSync, Ft = Dt.symlinkType, dt = Dt.symlinkTypeSync, At = ku.pathExists, {areIdentical:pt} = Wu;

function yt(u, e, t, r) {
  lt(u, e, ((n, i) => {
    if (n) return r(n);
    u = i.toDst, Ft(i.toCwd, t, ((t, n) => {
      if (t) return r(t);
      const i = at.dirname(e);
      At(i, ((t, o) => t ? r(t) : o ? st.symlink(u, e, n, r) : void Et(i, (t => {
        if (t) return r(t);
        st.symlink(u, e, n, r)
      }))))
    }))
  }))
}

var ht = { createSymlink: ct((function (u, e, t, r) {
  r = "function" == typeof t ? t : r, t = "function" != typeof t && t, st.lstat(e, ((n, i) => {
      !n && i.isSymbolicLink() ? Promise.all([st.stat(u), st.stat(e)]).then((([n, i]) => {
      if (pt(n, i)) return r(null);
      yt(u, e, t, r)
    })) : yt(u, e, t, r)
  }))
})), createSymlinkSync: function (u, e, t) {
  let r;
  try {
    r = st.lstatSync(e)
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const t = st.statSync(u), r = st.statSync(e);
    if (pt(t, r)) return
  }
  const n = Ct(u, e);
  u = n.toDst, t = dt(n.toCwd, t);
  const i = at.dirname(e);
  return st.existsSync(i) || ft(i), st.symlinkSync(u, e, t)
} };
const {createFile:mt,createFileSync:Bt} = Ke, {createLink:_t,createLinkSync:Ot} = et,
  {createSymlink:St,createSymlinkSync:vt} = ht;
var wt = {
  createFile: mt,
  createFileSync: Bt,
  ensureFile: mt,
  ensureFileSync: Bt,
  createLink: _t,
  createLinkSync: Ot,
  ensureLink: _t,
  ensureLinkSync: Ot,
  createSymlink: St,
  createSymlinkSync: vt,
  ensureSymlink: St,
  ensureSymlinkSync: vt
};
var Pt = { stringify: function (u, {EOL:e = "\n",finalEOL:t = !0,replacer:r = null,spaces:n}={}) {
  const i = t ? e : "";
  return JSON.stringify(u, r, n).replace(/\n/g, e) + i
}, stripBom: function (u) {
  return Buffer.isBuffer(u) && (u = u.toString("utf8")), u.replace(/^\uFEFF/, "")
} };
let gt;
try {
  gt = Au
} catch (u) {
  gt = s.default
}
const bt = Y, {stringify:Nt,stripBom:Rt} = Pt;
const It = bt.fromPromise((async function (u, e = {}) {
  "string" == typeof e && (e = { encoding: e });
  const t = e.fs || gt, r = !("throws" in e) || e.throws;
  let n, i = await bt.fromCallback(t.readFile)(u, e);
  i = Rt(i);
  try {
    n = JSON.parse(i, e ? e.reviver : null)
  } catch (e) {
    if (r) throw e.message = `${u}: ${e.message}`, e;
    return null
  }
  return n
}));
const Tt = bt.fromPromise((async function (u, e, t = {}) {
  const r = t.fs || gt, n = Nt(e, t);
  await bt.fromCallback(r.writeFile)(u, n, t)
}));
const kt = { readFile: It, readFileSync: function (u, e = {}) {
  "string" == typeof e && (e = { encoding: e });
  const t = e.fs || gt, r = !("throws" in e) || e.throws;
  try {
    let r = t.readFileSync(u, e);
    return r = Rt(r), JSON.parse(r, e.reviver)
  } catch (e) {
    if (r) throw e.message = `${u}: ${e.message}`, e;
    return null
  }
}, writeFile: Tt, writeFileSync: function (u, e, t = {}) {
  const r = t.fs || gt, n = Nt(e, t);
  return r.writeFileSync(u, n, t)
} };
var Ht = {
  readJson: kt.readFile,
  readJsonSync: kt.readFileSync,
  writeJson: kt.writeFile,
  writeJsonSync: kt.writeFileSync
};
const xt = Y.fromCallback, Mt = Au, Jt = E.default, jt = Ru, Gt = ku.pathExists;
var Lt = { outputFile: xt((function (u, e, t, r) {
  "function" == typeof t && (r = t, t = "utf8");
  const n = Jt.dirname(u);
  Gt(n, ((i, o) => i ? r(i) : o ? Mt.writeFile(u, e, t, r) : void jt.mkdirs(n, (n => {
    if (n) return r(n);
    Mt.writeFile(u, e, t, r)
  }))))
})), outputFileSync: function (u, ...e) {
  const t = Jt.dirname(u);
  if (Mt.existsSync(t)) return Mt.writeFileSync(u, ...e);
  jt.mkdirsSync(t), Mt.writeFileSync(u, ...e)
} };
const {stringify:Vt} = Pt, {outputFile:$t} = Lt;
var Ut = async function (u, e, t = {}) {
  const r = Vt(e, t);
  await $t(u, r, t)
};
const {stringify:Wt} = Pt, {outputFileSync:qt} = Lt;
var Kt = function (u, e, t) {
  const r = Wt(e, t);
  qt(u, r, t)
};
const Yt = Y.fromPromise, zt = Ht;
zt.outputJson = Yt(Ut), zt.outputJsonSync = Kt, zt.outputJSON = zt.outputJson, zt.outputJSONSync = zt.outputJsonSync, zt.writeJSON = zt.writeJson, zt.writeJSONSync = zt.writeJsonSync, zt.readJSON = zt.readJson, zt.readJSONSync = zt.readJsonSync;
var Zt = zt;
const Xt = Au, Qt = E.default, ur = pe.copy, er = ke.remove, tr = Ru.mkdirp, rr = ku.pathExists, nr = Wu;

function ir(u, e, t, r, n) {
  return r ? or(u, e, t, n) : t ? er(e, (r => r ? n(r) : or(u, e, t, n))) : void rr(e, ((r, i) => r ? n(r) : i ? n(new Error("dest already exists.")) : or(u, e, t, n)))
}

function or(u, e, t, r) {
  Xt.rename(u, e, (n => n ? "EXDEV" !== n.code ? r(n) : function(u, e, t, r){
    const n = { overwrite: t, errorOnExist: !0 };
    ur(u, e, n, (e => e ? r(e) : er(u, r)))
  }(u, e, t, r) : r()))
}

var Dr = function (u, e, t, r) {
  "function" == typeof t && (r = t, t = {});
  const n = (t = t || {}).overwrite || t.clobber || !1;
  nr.checkPaths(u, e, "move", t, ((t, i) => {
    if (t) return r(t);
    const {srcStat:o,isChangingCase:D = !1} = i;
    nr.checkParentPaths(u, o, e, "move", (t => t ? r(t) : function(u){
      const e = Qt.dirname(u);
      return Qt.parse(e).root === e
    }(e) ? ir(u, e, n, D, r) : void tr(Qt.dirname(e), (t => t ? r(t) : ir(u, e, n, D, r)))))
  }))
};
const cr = Au, ar = E.default, sr = pe.copySync, Er = ke.removeSync, fr = Ru.mkdirpSync, lr = Wu;

function Cr(u, e, t) {
  try {
    cr.renameSync(u, e)
  } catch (r) {
    if ("EXDEV" !== r.code) throw r;
    return function(u, e, t){
      const r = { overwrite: t, errorOnExist: !0 };
      return sr(u, e, r), Er(u)
    }(u, e, t)
  }
}

var Fr = function (u, e, t) {
  const r = (t = t || {}).overwrite || t.clobber || !1,
    {srcStat:n,isChangingCase:i = !1} = lr.checkPathsSync(u, e, "move", t);
  return lr.checkParentPathsSync(u, n, e, "move"), function(u){
    const e = ar.dirname(u);
    return ar.parse(e).root === e
  }(e) || fr(ar.dirname(e)), function(u, e, t, r){
    if (r) return Cr(u, e, t);
    if (t) return Er(e), Cr(u, e, t);
    if (cr.existsSync(e)) throw new Error("dest already exists.");
    return Cr(u, e, t)
  }(u, e, r, i)
};
var dr = { move: (0, Y.fromCallback)(Dr), moveSync: Fr }, Ar = {
  ...K,
  ...pe,
  ...Ve,
  ...wt,
  ...Zt,
  ...Ru,
  ...dr,
  ...Lt,
  ...ku,
  ...ke
}, pr = y && y.__importDefault || function (u) {
  return u && u.__esModule ? u : { default: u }
};
Object.defineProperty(V, "__esModule", { value: !0 }), V.parseJsonText = V.parseJsonFile = void 0;
const yr = $, hr = pr(Ar), mr = pr(E.default), Br = pr(f.default), _r = T;
var Or;
!function(u){
  u[u.Char=0] = "Char", u[u.EOF=1] = "EOF", u[u.Identifier=2] = "Identifier"
}(Or || (Or = {}));
let Sr, vr, wr, Pr, gr, br, Nr = "start", Rr = [], Ir = 0, Tr = 1, kr = 0, Hr = !1, xr = "default", Mr = "'", Jr = 1;

function jr(u, e = !1) {
  vr = String(u), Nr = "start", Rr = [], Ir = 0, Tr = 1, kr = 0, Pr = void 0, Hr = e;
  do {
    Sr = Gr(), Kr[Nr]()
  } while ("eof" !== Sr.type);
  return Pr
}

function Gr() {
  for (xr = "default", gr = "", Mr = "'", Jr = 1;; ) {
    br = Lr();
    const u = $r[xr]();
    if (u) return u
  }
}

function Lr() {
  if (vr[Ir]) return String.fromCodePoint(vr.codePointAt(Ir))
}

function Vr() {
  const u = Lr();
  return "\n" === u ? (Tr++, kr = 0) : u ? kr += u.length : kr++, u && (Ir += u.length), u
}

V.parseJsonFile = function (u, e = !1, t = "utf-8") {
  const r = hr.default.readFileSync(mr.default.resolve(u), { encoding: t });
  try {
    return jr(r, e)
  } catch (e) {
    if (e instanceof SyntaxError) {
      const t = e.message.split("at");
      2 === t.length && (0, _r.logErrorAndExit)(`${t[0].trim()}${Br.default.EOL}\t at ${u}:${t[1].trim()}`)
    }
    (0, _r.logErrorAndExit)(`${u} is not in valid JSON/JSON5 format.`)
  }
}, V.parseJsonText = jr;
const $r = {
  default() {
    switch (br) {
      case "/":
        return Vr(), void (xr = "comment");
      case void 0:
        return Vr(), Ur("eof")
    }
    if (!yr.JudgeUtil.isIgnoreChar(br) && !yr.JudgeUtil.isSpaceSeparator(br)) return $r[Nr]();
    Vr()
  },
  start() {
    xr = "value"
  },
  beforePropertyName() {
    switch (br) {
      case "$":
      case "_":
        return gr = Vr(), void (xr = "identifierName");
      case "\\":
        return Vr(), void (xr = "identifierNameStartEscape");
      case "}":
        return Ur("punctuator", Vr());
      case '"':
      case "'":
        return Mr = br, Vr(), void (xr = "string")
    }
    if (yr.JudgeUtil.isIdStartChar(br)) return gr += Vr(), void (xr = "identifierName");
    throw Xr(Or.Char, Vr())
  },
  afterPropertyName() {
    if (":" === br) return Ur("punctuator", Vr());
    throw Xr(Or.Char, Vr())
  },
  beforePropertyValue() {
    xr = "value"
  },
  afterPropertyValue() {
    switch (br) {
      case ",":
      case "}":
        return Ur("punctuator", Vr())
    }
    throw Xr(Or.Char, Vr())
  },
  beforeArrayValue() {
    if ("]" === br) return Ur("punctuator", Vr());
    xr = "value"
  },
  afterArrayValue() {
    switch (br) {
      case ",":
      case "]":
        return Ur("punctuator", Vr())
    }
    throw Xr(Or.Char, Vr())
  },
  end() {
    throw Xr(Or.Char, Vr())
  },
  comment() {
    switch (br) {
      case "*":
        return Vr(), void (xr = "multiLineComment");
      case "/":
        return Vr(), void (xr = "singleLineComment")
    }
    throw Xr(Or.Char, Vr())
  },
  multiLineComment() {
    switch (br) {
      case "*":
        return Vr(), void (xr = "multiLineCommentAsterisk");
      case void 0:
        throw Xr(Or.Char, Vr())
    }
    Vr()
  },
  multiLineCommentAsterisk() {
    switch (br) {
      case "*":
        return void Vr();
      case "/":
        return Vr(), void (xr = "default");
      case void 0:
        throw Xr(Or.Char, Vr())
    }
    Vr(), xr = "multiLineComment"
  },
  singleLineComment() {
    switch (br) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return Vr(), void (xr = "default");
      case void 0:
        return Vr(), Ur("eof")
    }
    Vr()
  },
  value() {
    switch (br) {
      case "{":
      case "[":
        return Ur("punctuator", Vr());
      case "n":
        return Vr(), Wr("ull"), Ur("null", null);
      case "t":
        return Vr(), Wr("rue"), Ur("boolean",!0);
      case "f":
        return Vr(), Wr("alse"), Ur("boolean",!1);
      case "-":
      case "+":
        return "-" === Vr() && (Jr = -1), void (xr = "numerical");
      case ".":
      case "0":
      case "I":
      case "N":
        return void (xr = "numerical");
      case '"':
      case "'":
        return Mr = br, Vr(), gr = "", void (xr = "string")
    }
    if (void 0 === br || !yr.JudgeUtil.isDigitWithoutZero(br)) throw Xr(Or.Char, Vr());
    xr = "numerical"
  },
  numerical() {
    switch (br) {
      case ".":
        return gr = Vr(), void (xr = "decimalPointLeading");
      case "0":
        return gr = Vr(), void (xr = "zero");
      case "I":
        return Vr(), Wr("nfinity"), Ur("numeric", Jr * (1 / 0));
      case "N":
        return Vr(), Wr("aN"), Ur("numeric", NaN)
    }
    if (void 0 !== br && yr.JudgeUtil.isDigitWithoutZero(br)) return gr = Vr(), void (xr = "decimalInteger");
    throw Xr(Or.Char, Vr())
  },
  zero() {
    switch (br) {
      case ".":
      case "e":
      case "E":
        return void (xr = "decimal");
      case "x":
      case "X":
        return gr += Vr(), void (xr = "hexadecimal")
    }
    return Ur("numeric", 0)
  },
  decimalInteger() {
    switch (br) {
      case ".":
      case "e":
      case "E":
        return void (xr = "decimal")
    }
    if (!yr.JudgeUtil.isDigit(br)) return Ur("numeric", Jr * Number(gr));
    gr += Vr()
  },
  decimal() {
    switch (br) {
      case ".":
        gr += Vr(), xr = "decimalFraction";
        break;
      case "e":
      case "E":
        gr += Vr(), xr = "decimalExponent"
    }
  },
  decimalPointLeading() {
    if (yr.JudgeUtil.isDigit(br)) return gr += Vr(), void (xr = "decimalFraction");
    throw Xr(Or.Char, Vr())
  },
  decimalFraction() {
    switch (br) {
      case "e":
      case "E":
        return gr += Vr(), void (xr = "decimalExponent")
    }
    if (!yr.JudgeUtil.isDigit(br)) return Ur("numeric", Jr * Number(gr));
    gr += Vr()
  },
  decimalExponent() {
    switch (br) {
      case "+":
      case "-":
        return gr += Vr(), void (xr = "decimalExponentSign")
    }
    if (yr.JudgeUtil.isDigit(br)) return gr += Vr(), void (xr = "decimalExponentInteger");
    throw Xr(Or.Char, Vr())
  },
  decimalExponentSign() {
    if (yr.JudgeUtil.isDigit(br)) return gr += Vr(), void (xr = "decimalExponentInteger");
    throw Xr(Or.Char, Vr())
  },
  decimalExponentInteger() {
    if (!yr.JudgeUtil.isDigit(br)) return Ur("numeric", Jr * Number(gr));
    gr += Vr()
  },
  hexadecimal() {
    if (yr.JudgeUtil.isHexDigit(br)) return gr += Vr(), void (xr = "hexadecimalInteger");
    throw Xr(Or.Char, Vr())
  },
  hexadecimalInteger() {
    if (!yr.JudgeUtil.isHexDigit(br)) return Ur("numeric", Jr * Number(gr));
    gr += Vr()
  },
  identifierNameStartEscape() {
    if ("u" !== br) throw Xr(Or.Char, Vr());
    Vr();
    const u = qr();
    switch (u) {
      case "$":
      case "_":
        break;
      default:
        if (!yr.JudgeUtil.isIdStartChar(u)) throw Xr(Or.Identifier)
    }
    gr += u, xr = "identifierName"
  },
  identifierName() {
    switch (br) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        return void (gr += Vr());
      case "\\":
        return Vr(), void (xr = "identifierNameEscape")
    }
    if (!yr.JudgeUtil.isIdContinueChar(br)) return Ur("identifier", gr);
    gr += Vr()
  },
  identifierNameEscape() {
    if ("u" !== br) throw Xr(Or.Char, Vr());
    Vr();
    const u = qr();
    switch (u) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!yr.JudgeUtil.isIdContinueChar(u)) throw Xr(Or.Identifier)
    }
    gr += u, xr = "identifierName"
  },
  string() {
    switch (br) {
      case "\\":
        return Vr(), void (gr += function(){
          const u = Lr(), e = function(){
            switch (Lr()) {
              case "b":
                return Vr(), "\b";
              case "f":
                return Vr(), "\f";
              case "n":
                return Vr(), "\n";
              case "r":
                return Vr(), "\r";
              case "t":
                return Vr(), "\t";
              case "v":
                return Vr(), "\v"
            }
            return
          }();
          if (e) return e;
          switch (u) {
            case "0":
              if (Vr(), yr.JudgeUtil.isDigit(Lr())) throw Xr(Or.Char, Vr());
              return "\0";
            case "x":
              return Vr(), function(){
                let u = "", e = Lr();
                if (!yr.JudgeUtil.isHexDigit(e)) throw Xr(Or.Char, Vr());
                if (u += Vr(), e = Lr(),!yr.JudgeUtil.isHexDigit(e)) throw Xr(Or.Char, Vr());
                return u += Vr(), String.fromCodePoint(parseInt(u, 16))
              }();
            case "u":
              return Vr(), qr();
            case "\n":
            case "\u2028":
            case "\u2029":
              return Vr(), "";
            case "\r":
              return Vr(), "\n" === Lr() && Vr(), ""
          }
          if (void 0 === u || yr.JudgeUtil.isDigitWithoutZero(u)) throw Xr(Or.Char, Vr());
          return Vr()
        }());
      case '"':
      case "'":
        if (br === Mr) {
          const u = Ur("string", gr);
          return Vr(), u
        }
        return void (gr += Vr());
      case "\n":
      case "\r":
      case void 0:
        throw Xr(Or.Char, Vr());
      case "\u2028":
      case "\u2029":
        !function(u){
          (0, _r.logErrorAndExit)(`JSON5: '${Zr(u)}' in strings is not valid ECMAScript; consider escaping.`)
        }(br)
    }
    gr += Vr()
  }
};

function Ur(u, e) {
  return { type: u, value: e, line: Tr, column: kr }
}

function Wr(u) {
  for (const e of u) {
    if (Lr() !== e) throw Xr(Or.Char, Vr());
    Vr()
  }
}

function qr() {
  let u = "", e = 4;
  for (; e-- > 0; ) {
    const e = Lr();
    if (!yr.JudgeUtil.isHexDigit(e)) throw Xr(Or.Char, Vr());
    u += Vr()
  }
  return String.fromCodePoint(parseInt(u, 16))
}

const Kr = {
  start() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
    Yr()
  },
  beforePropertyName() {
    switch (Sr.type) {
      case "identifier":
      case "string":
        return wr = Sr.value, void (Nr = "afterPropertyName");
      case "punctuator":
        return void zr();
      case "eof":
        throw Xr(Or.EOF)
    }
  },
  afterPropertyName() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
    Nr = "beforePropertyValue"
  },
  beforePropertyValue() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
    Yr()
  },
  afterPropertyValue() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
    switch (Sr.value) {
      case ",":
        return void (Nr = "beforePropertyName");
      case "}":
        zr()
    }
  },
  beforeArrayValue() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
      "punctuator" !== Sr.type || "]" !== Sr.value ? Yr() : zr()
  },
  afterArrayValue() {
    if ("eof" === Sr.type) throw Xr(Or.EOF);
    switch (Sr.value) {
      case ",":
        return void (Nr = "beforeArrayValue");
      case "]":
        zr()
    }
  },
  end() {
  }
};

function Yr() {
  const u = function(){
    let u;
    switch (Sr.type) {
      case "punctuator":
        switch (Sr.value) {
          case "{":
            u = {};
            break;
          case "[":
            u = []
        }
        break;
      case "null":
      case "boolean":
      case "numeric":
      case "string":
        u = Sr.value
    }
    return u
  }();
  if (Hr && "object" == typeof u && (u._line = Tr, u._column = kr), void 0 === Pr) Pr = u; else {
    const e = Rr[Rr.length-1];
    Array.isArray(e) ? Hr && "object" != typeof u ? e.push({
      value: u,
      _line: Tr,
      _column: kr
    }) : e.push(u) : e[wr] = Hr && "object" != typeof u ? { value: u, _line: Tr, _column: kr } : u
  }
  !function(u){
    if (u && "object" == typeof u) Rr.push(u), Nr = Array.isArray(u) ? "beforeArrayValue" : "beforePropertyName"; else {
      const u = Rr[Rr.length-1];
      Nr = u ? Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue" : "end"
    }
  }(u)
}

function zr() {
  Rr.pop();
  const u = Rr[Rr.length-1];
  Nr = u ? Array.isArray(u) ? "afterArrayValue" : "afterPropertyValue" : "end"
}

function Zr(u) {
  const e = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (e[u]) return e[u];
  if (u < " ") {
    const e = u.charCodeAt(0).toString(16);
    return `\\x${`00${e}`.substring(e.length)}`
  }
  return u
}

function Xr(u, e) {
  let t = "";
  switch (u) {
    case Or.Char:
      t = void 0 === e ? `JSON5: invalid end of input at ${Tr}:${kr}` : `JSON5: invalid character '${Zr(e)}' at ${Tr}:${kr}`;
      break;
    case Or.EOF:
      t = `JSON5: invalid end of input at ${Tr}:${kr}`;
      break;
    case Or.Identifier:
      kr -= 5, t = `JSON5: invalid identifier character at ${Tr}:${kr}`
  }
  const r = new Qr(t);
  return r.lineNumber = Tr, r.columnNumber = kr, r
}

class Qr extends SyntaxError {
}

var un = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
  void 0 === r && (r = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
    return e[t]
  } }), Object.defineProperty(u, r, n)
} : function (u, e, t, r) {
  void 0 === r && (r = t), u[r] = e[t]
}), en = y && y.__setModuleDefault || (Object.create ? function (u, e) {
  Object.defineProperty(u, "default", { enumerable: !0, value: e })
} : function (u, e) {
  u.default = e
}), tn = y && y.__importStar || function (u) {
  if (u && u.__esModule) return u;
  var e = {};
  if (null != u) for (var t in u) "default" !== t && Object.prototype.hasOwnProperty.call(u, t) && un(e, u, t);
  return en(e, u), e
};
Object.defineProperty(h, "__esModule", { value: !0 });
var rn = h.executeInstallPnpm = ln = h.isPnpmAvailable = fn = h.checkNpmConifg = void 0;
const nn = tn(s.default), on = m, Dn = I, cn = tn(E.default), an = T, sn = C.default, En = V;
var fn = h.checkNpmConifg = function () {
  const u = (0, Dn.getNpmPath)(),
    e = (0, sn.spawnSync)(u, ["config", "list", "--json"], { cwd: on.HVIGOR_WRAPPER_TOOLS_HOME });
  if (0 === e.status && e.stdout) {
    const u = (0, En.parseJsonText)(`${e.stdout}`);
    u.userconfig && !nn.existsSync(u.userconfig) && (0, an.logErrorAndExit)(`Error: The hvigor depends on the npmrc file. Configure the npmrc file first.\n at ${u.userconfig}`)
  } else (0, an.logErrorAndExit)("Error: The hvigor depends on the npmrc file. Configure the npmrc file first.");
  return (0, Dn.hasNpmPackInPaths)("pnpm", [on.HVIGOR_WRAPPER_TOOLS_HOME])
};
var ln = h.isPnpmAvailable = function () {
  return!!nn.existsSync(on.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH) && (0, Dn.hasNpmPackInPaths)("pnpm", [on.HVIGOR_WRAPPER_TOOLS_HOME])
};
rn = h.executeInstallPnpm = function () {
  const u = (0, Dn.getNpmPath)();
  !function(){
    const u = cn.resolve(on.HVIGOR_WRAPPER_TOOLS_HOME, on.DEFAULT_PACKAGE_JSON);
    try {
      nn.existsSync(on.HVIGOR_WRAPPER_TOOLS_HOME) || nn.mkdirSync(on.HVIGOR_WRAPPER_TOOLS_HOME, { recursive: !0 });
      const e = { dependencies: {} };
      nn.writeFileSync(u, JSON.stringify(e))
    } catch (e) {
      (0, an.logErrorAndExit)(`Error: EPERM: operation not permitted,create ${u} failed.`)
    }
  }(), (0, Dn.executeCommand)(u, ["install", "pnpm"], {
    cwd: on.HVIGOR_WRAPPER_TOOLS_HOME,
    stdio: ["inherit", "inherit", "inherit"]
  })
};
var Cn = {}, Fn = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
  void 0 === r && (r = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
    return e[t]
  } }), Object.defineProperty(u, r, n)
} : function (u, e, t, r) {
  void 0 === r && (r = t), u[r] = e[t]
}), dn = y && y.__setModuleDefault || (Object.create ? function (u, e) {
  Object.defineProperty(u, "default", { enumerable: !0, value: e })
} : function (u, e) {
  u.default = e
}), An = y && y.__importStar || function (u) {
  if (u && u.__esModule) return u;
  var e = {};
  if (null != u) for (var t in u) "default" !== t && Object.prototype.hasOwnProperty.call(u, t) && Fn(e, u, t);
  return dn(e, u), e
};
Object.defineProperty(Cn, "__esModule", { value: !0 });
var pn = Cn.cleanWorkSpace = Nn = Cn.executeInstallHvigor = gn = Cn.isHvigorInstalled = wn = Cn.isAllDependenciesInstalled = void 0;
const yn = An(s.default), hn = An(E.default), mn = m, Bn = I, _n = T, On = V;
let Sn, vn;
var wn = Cn.isAllDependenciesInstalled = function () {

  function u(u) {
    const e = null == u ? void 0 : u.dependencies;
    return void 0 === e ? 0 : Object.getOwnPropertyNames(e).length
  }

  if (Sn = Rn(), vn = In(), u(Sn) + 1 !== u(vn)) return !1;
  for (const u in null == Sn ? void 0 : Sn.dependencies) if (!(0, Bn.hasNpmPackInPaths)(u, [mn.HVIGOR_PROJECT_DEPENDENCIES_HOME]) || !Pn(u, Sn, vn)) return !1;
  return !0
};

function Pn(u, e, t) {
  return void 0 !== t.dependencies && e.dependencies[u] === t.dependencies[u]
}

var gn = Cn.isHvigorInstalled = function () {
  return Sn = Rn(), vn = In(),!(!(0, Bn.hasNpmPackInPaths)(mn.HVIGOR_ENGINE_PACKAGE_NAME, [mn.HVIGOR_PROJECT_DEPENDENCIES_HOME]) || Sn.hvigorVersion !== vn.dependencies[mn.HVIGOR_ENGINE_PACKAGE_NAME]) || (console.log("Hvigor installing..."),!1)
};
const bn = { cwd: mn.HVIGOR_PROJECT_DEPENDENCIES_HOME, stdio: ["inherit", "inherit", "inherit"] };
var Nn = Cn.executeInstallHvigor = function () {
  const u = { dependencies: {} };
  u.dependencies[mn.HVIGOR_ENGINE_PACKAGE_NAME] = Sn.hvigorVersion;
  try {
    yn.mkdirSync(mn.HVIGOR_PROJECT_DEPENDENCIES_HOME, { recursive: !0 });
    const e = hn.resolve(mn.HVIGOR_PROJECT_DEPENDENCIES_HOME, mn.DEFAULT_PACKAGE_JSON);
    yn.writeFileSync(e, JSON.stringify(u))
  } catch (u) {
    (0, _n.logErrorAndExit)(u)
  }
  !function(){
    const u = ["config", "set", "store-dir", mn.HVIGOR_PNPM_STORE_PATH];
    (0, Bn.executeCommand)(mn.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, u, bn)
  }(), (0, Bn.executeCommand)(mn.HVIGOR_WRAPPER_PNPM_SCRIPT_PATH, ["install"], bn)
};

function Rn() {
  const u = hn.resolve(mn.HVIGOR_PROJECT_WRAPPER_HOME, mn.DEFAULT_HVIGOR_CONFIG_JSON_FILE_NAME);
  return yn.existsSync(u) || (0, _n.logErrorAndExit)(`Error: Hvigor config file ${u} does not exist.`), (0, On.parseJsonFile)(u)
}

function In() {
  return yn.existsSync(mn.HVIGOR_PROJECT_DEPENDENCY_PACKAGE_JSON_PATH) ? (0, On.parseJsonFile)(mn.HVIGOR_PROJECT_DEPENDENCY_PACKAGE_JSON_PATH) : {
                                                                                                                                                   dependencies: {
                                                                                                                                                   }
                                                                                                                                                 }
}

pn = Cn.cleanWorkSpace = function () {
  if (console.log("Hvigor cleaning..."),!yn.existsSync(mn.HVIGOR_PROJECT_DEPENDENCIES_HOME)) return;
  const u = yn.readdirSync(mn.HVIGOR_PROJECT_DEPENDENCIES_HOME);
  if (u && 0 !== u.length) {
    yn.existsSync(mn.HVIGOR_BOOT_JS_FILE_PATH) && (0, Bn.executeCommand)(process.argv[0], [mn.HVIGOR_BOOT_JS_FILE_PATH, "--stop-daemon"], {
    });
    try {
      u.forEach((u => {
        yn.rmSync(hn.resolve(mn.HVIGOR_PROJECT_DEPENDENCIES_HOME, u), { recursive: !0 })
      }))
    } catch (u) {
      (0, _n.logErrorAndExit)(`The hvigor build tool cannot be installed. Please manually clear the workspace directory and synchronize the project again.\n\n      Workspace Path: ${mn.HVIGOR_PROJECT_DEPENDENCIES_HOME}.`)
    }
  }
};
var Tn = {}, kn = y && y.__createBinding || (Object.create ? function (u, e, t, r) {
  void 0 === r && (r = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  n && !("get" in n ? !e.__esModule : n.writable || n.configurable) || (n = { enumerable: !0, get: function () {
    return e[t]
  } }), Object.defineProperty(u, r, n)
} : function (u, e, t, r) {
  void 0 === r && (r = t), u[r] = e[t]
}), Hn = y && y.__setModuleDefault || (Object.create ? function (u, e) {
  Object.defineProperty(u, "default", { enumerable: !0, value: e })
} : function (u, e) {
  u.default = e
}), xn = y && y.__importStar || function (u) {
  if (u && u.__esModule) return u;
  var e = {};
  if (null != u) for (var t in u) "default" !== t && Object.prototype.hasOwnProperty.call(u, t) && kn(e, u, t);
  return Hn(e, u), e
};
Object.defineProperty(Tn, "__esModule", { value: !0 });
var Mn = Tn.executeBuild = void 0;
const Jn = m, jn = xn(s.default), Gn = xn(E.default), Ln = T;
Mn = Tn.executeBuild = function () {
  const u = Gn.resolve(Jn.HVIGOR_PROJECT_DEPENDENCIES_HOME, "node_modules", "@ohos", "hvigor", "bin", "hvigor.js");
  try {
    const e = jn.realpathSync(u);
    require(e)
  } catch (e) {
    (0, Ln.logErrorAndExit)(`Error: ENOENT: no such file ${u},delete ${Jn.HVIGOR_PROJECT_DEPENDENCIES_HOME} and retry.`)
  }
}, function(){
  if (fn(), ln() || rn(), gn() && wn()) Mn(); else {
    pn();
    try {
      Nn()
    } catch (u) {
      return void pn()
    }
    Mn()
  }
}();