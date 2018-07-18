window.bytedPlayerService = function (e) {
    function t(n) {
        if (r[n])return r[n].exports;
        var o = r[n] = {i: n, l: !1, exports: {}};
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }

    var r = {};
    return t.m = e, t.c = r, t.d = function (e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {configurable: !1, enumerable: !0, get: n})
    }, t.n = function (e) {
        var r = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 10)
}([function (e, t, r) {
    "use strict";
    function n(e) {
        return"[object Array]" === E.call(e)
    }

    function o(e) {
        return"[object ArrayBuffer]" === E.call(e)
    }

    function i(e) {
        return"undefined" != typeof FormData && e instanceof FormData
    }

    function a(e) {
        return"undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
    }

    function u(e) {
        return"string" == typeof e
    }

    function s(e) {
        return"number" == typeof e
    }

    function c(e) {
        return void 0 === e
    }

    function f(e) {
        return null !== e && "object" === (void 0 === e ? "undefined" : x(e))
    }

    function d(e) {
        return"[object Date]" === E.call(e)
    }

    function l(e) {
        return"[object File]" === E.call(e)
    }

    function p(e) {
        return"[object Blob]" === E.call(e)
    }

    function h(e) {
        return"[object Function]" === E.call(e)
    }

    function m(e) {
        return f(e) && h(e.pipe)
    }

    function v(e) {
        return"undefined" != typeof URLSearchParams && e instanceof URLSearchParams
    }

    function y(e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "")
    }

    function g() {
        return("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
    }

    function w(e, t) {
        if (null !== e && void 0 !== e)if ("object" !== (void 0 === e ? "undefined" : x(e)) && (e = [e]), n(e))for (var r = 0, o = e.length; r < o; r++)t.call(null, e[r], r, e); else for (var i in e)Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
    }

    function b() {
        function e(e, r) {
            "object" === x(t[r]) && "object" === (void 0 === e ? "undefined" : x(e)) ? t[r] = b(t[r], e) : t[r] = e
        }

        for (var t = {}, r = 0, n = arguments.length; r < n; r++)w(arguments[r], e);
        return t
    }

    function C(e, t, r) {
        return w(t, function (t, n) {
            e[n] = r && "function" == typeof t ? A(t, r) : t
        }), e
    }

    var x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, A = r(4), S = r(14), E = Object.prototype.toString;
    e.exports = {isArray: n, isArrayBuffer: o, isBuffer: S, isFormData: i, isArrayBufferView: a, isString: u, isNumber: s, isObject: f, isUndefined: c, isDate: d, isFile: l, isBlob: p, isFunction: h, isStream: m, isURLSearchParams: v, isStandardBrowserEnv: g, forEach: w, merge: b, extend: C, trim: y}
}, function (e, t, r) {
    "use strict";
    (function (t) {
        function n(e, t) {
            !o.isUndefined(e) && o.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
        }

        var o = r(0), i = r(16), a = {"Content-Type": "application/x-www-form-urlencoded"}, u = {adapter: function () {
            var e;
            return"undefined" != typeof XMLHttpRequest ? e = r(6) : void 0 !== t && (e = r(6)), e
        }(), transformRequest: [function (e, t) {
            return i(t, "Content-Type"), o.isFormData(e) || o.isArrayBuffer(e) || o.isBuffer(e) || o.isStream(e) || o.isFile(e) || o.isBlob(e) ? e : o.isArrayBufferView(e) ? e.buffer : o.isURLSearchParams(e) ? (n(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : o.isObject(e) ? (n(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
        }], transformResponse: [function (e) {
            if ("string" == typeof e)try {
                e = JSON.parse(e)
            } catch (e) {
            }
            return e
        }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function (e) {
            return e >= 200 && e < 300
        }};
        u.headers = {common: {Accept: "application/json, text/plain, */*"}}, o.forEach(["delete", "get", "head"], function (e) {
            u.headers[e] = {}
        }), o.forEach(["post", "put", "patch"], function (e) {
            u.headers[e] = o.merge(a)
        }), e.exports = u
    }).call(t, r(5))
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.default = function (e) {
        var t = document.createElement("a");
        t.href = e;
        var r = function () {
            for (var e = 0, t = new Array(256), r = 0; 256 !== r; ++r)e = r, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1, t[r] = e;
            return"undefined" != typeof Int32Array ? new Int32Array(t) : t
        }(), n = t.pathname + "?r=" + Math.random().toString(10).substring(2);
        "/" !== n[0] && (n = "/" + n);
        var o = function (e) {
            for (var t, n, o = -1, i = 0, a = e.length; i < a;)t = e.charCodeAt(i++), t < 128 ? o = o >>> 8 ^ r[255 & (o ^ t)] : t < 2048 ? (o = o >>> 8 ^ r[255 & (o ^ (192 | t >> 6 & 31))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & t))]) : t >= 55296 && t < 57344 ? (t = 64 + (1023 & t), n = 1023 & e.charCodeAt(i++), o = o >>> 8 ^ r[255 & (o ^ (240 | t >> 8 & 7))], o = o >>> 8 ^ r[255 & (o ^ (128 | t >> 2 & 63))], o = o >>> 8 ^ r[255 & (o ^ (128 | n >> 6 & 15 | (3 & t) << 4))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & n))]) : (o = o >>> 8 ^ r[255 & (o ^ (224 | t >> 12 & 15))], o = o >>> 8 ^ r[255 & (o ^ (128 | t >> 6 & 63))], o = o >>> 8 ^ r[255 & (o ^ (128 | 63 & t))]);
            return-1 ^ o
        }(n) >>> 0;
        return(location.protocol.indexOf("http") > -1 ? [location.protocol, t.hostname] : ["http:", t.hostname]).join("//") + n + "&s=" + o
    }, e.exports = t.default
}, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var n = {};
    n.base64encode = function (e) {
        var t, r, n, o, i, a, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (n = e.length, r = 0, t = ""; r < n;) {
            if (o = 255 & e.charCodeAt(r++), r === n) {
                t += u.charAt(o >> 2), t += u.charAt((3 & o) << 4), t += "==";
                break
            }
            if (i = e.charCodeAt(r++), r === n) {
                t += u.charAt(o >> 2), t += u.charAt((3 & o) << 4 | (240 & i) >> 4), t += u.charAt((15 & i) << 2), t += "=";
                break
            }
            a = e.charCodeAt(r++), t += u.charAt(o >> 2), t += u.charAt((3 & o) << 4 | (240 & i) >> 4), t += u.charAt((15 & i) << 2 | (192 & a) >> 6), t += u.charAt(63 & a)
        }
        return t
    }, n.base64decode = function (e) {
        var t, r, n, o, i, a, u, s = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
        for (a = e.length, i = 0, u = ""; i < a;) {
            do {
                t = s[255 & e.charCodeAt(i++)]
            } while (i < a && -1 === t);
            if (-1 === t)break;
            do {
                r = s[255 & e.charCodeAt(i++)]
            } while (i < a && -1 === r);
            if (-1 === r)break;
            u += String.fromCharCode(t << 2 | (48 & r) >> 4);
            do {
                if (61 === (n = 255 & e.charCodeAt(i++)))return u;
                n = s[n]
            } while (i < a && -1 === n);
            if (-1 === n)break;
            u += String.fromCharCode((15 & r) << 4 | (60 & n) >> 2);
            do {
                if (61 === (o = 255 & e.charCodeAt(i++)))return u;
                o = s[o]
            } while (i < a && -1 === o);
            if (-1 === o)break;
            u += String.fromCharCode((3 & n) << 6 | o)
        }
        return u
    }, n.utf16to8 = function (e) {
        var t, r, n, o;
        for (t = "", n = e.length, r = 0; r < n; r++)o = e.charCodeAt(r), o >= 1 && o <= 127 ? t += e.charAt(r) : o > 2047 ? (t += String.fromCharCode(224 | o >> 12 & 15), t += String.fromCharCode(128 | o >> 6 & 63), t += String.fromCharCode(128 | o >> 0 & 63)) : (t += String.fromCharCode(192 | o >> 6 & 31), t += String.fromCharCode(128 | o >> 0 & 63));
        return t
    }, n.utf8to16 = function (e) {
        var t, r, n, o, i, a;
        for (t = "", n = e.length, r = 0; r < n;)switch ((o = e.charCodeAt(r++)) >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t += e.charAt(r - 1);
                break;
            case 12:
            case 13:
                i = e.charCodeAt(r++), t += String.fromCharCode((31 & o) << 6 | 63 & i);
                break;
            case 14:
                i = e.charCodeAt(r++), a = e.charCodeAt(r++), t += String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | (63 & a) << 0)
        }
        return t
    }, t.default = n, e.exports = t.default
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
        return function () {
            for (var r = new Array(arguments.length), n = 0; n < r.length; n++)r[n] = arguments[n];
            return e.apply(t, r)
        }
    }
}, function (e, t) {
    function r() {
        throw new Error("setTimeout has not been defined")
    }

    function n() {
        throw new Error("clearTimeout has not been defined")
    }

    function o(e) {
        if (f === setTimeout)return setTimeout(e, 0);
        if ((f === r || !f) && setTimeout)return f = setTimeout, setTimeout(e, 0);
        try {
            return f(e, 0)
        } catch (t) {
            try {
                return f.call(null, e, 0)
            } catch (t) {
                return f.call(this, e, 0)
            }
        }
    }

    function i(e) {
        if (d === clearTimeout)return clearTimeout(e);
        if ((d === n || !d) && clearTimeout)return d = clearTimeout, clearTimeout(e);
        try {
            return d(e)
        } catch (t) {
            try {
                return d.call(null, e)
            } catch (t) {
                return d.call(this, e)
            }
        }
    }

    function a() {
        m && p && (m = !1, p.length ? h = p.concat(h) : v = -1, h.length && u())
    }

    function u() {
        if (!m) {
            var e = o(a);
            m = !0;
            for (var t = h.length; t;) {
                for (p = h, h = []; ++v < t;)p && p[v].run();
                v = -1, t = h.length
            }
            p = null, m = !1, i(e)
        }
    }

    function s(e, t) {
        this.fun = e, this.array = t
    }

    function c() {
    }

    var f, d, l = e.exports = {};
    !function () {
        try {
            f = "function" == typeof setTimeout ? setTimeout : r
        } catch (e) {
            f = r
        }
        try {
            d = "function" == typeof clearTimeout ? clearTimeout : n
        } catch (e) {
            d = n
        }
    }();
    var p, h = [], m = !1, v = -1;
    l.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)for (var r = 1; r < arguments.length; r++)t[r - 1] = arguments[r];
        h.push(new s(e, t)), 1 !== h.length || m || o(u)
    }, s.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = c, l.addListener = c, l.once = c, l.off = c, l.removeListener = c, l.removeAllListeners = c, l.emit = c, l.prependListener = c, l.prependOnceListener = c, l.listeners = function (e) {
        return[]
    }, l.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, l.cwd = function () {
        return"/"
    }, l.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, l.umask = function () {
        return 0
    }
}, function (e, t, r) {
    "use strict";
    (function (t) {
        var n = r(0), o = r(17), i = r(19), a = r(20), u = r(21), s = r(7), c = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || r(22);
        e.exports = function (e) {
            return new Promise(function (f, d) {
                var l = e.data, p = e.headers;
                n.isFormData(l) && delete p["Content-Type"];
                var h = new XMLHttpRequest, m = "onreadystatechange", v = !1;
                if ("test" === t.env.NODE_ENV || "undefined" == typeof window || !window.XDomainRequest || "withCredentials"in h || u(e.url) || (h = new window.XDomainRequest, m = "onload", v = !0, h.onprogress = function () {
                }, h.ontimeout = function () {
                }), e.auth) {
                    var y = e.auth.username || "", g = e.auth.password || "";
                    p.Authorization = "Basic " + c(y + ":" + g)
                }
                if (h.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0), h.timeout = e.timeout, h[m] = function () {
                    if (h && (4 === h.readyState || v) && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:"))) {
                        var t = "getAllResponseHeaders"in h ? a(h.getAllResponseHeaders()) : null, r = e.responseType && "text" !== e.responseType ? h.response : h.responseText, n = {data: r, status: 1223 === h.status ? 204 : h.status, statusText: 1223 === h.status ? "No Content" : h.statusText, headers: t, config: e, request: h};
                        o(f, d, n), h = null
                    }
                }, h.onerror = function () {
                    d(s("Network Error", e, null, h)), h = null
                }, h.ontimeout = function () {
                    d(s("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", h)), h = null
                }, n.isStandardBrowserEnv()) {
                    var w = r(23), b = (e.withCredentials || u(e.url)) && e.xsrfCookieName ? w.read(e.xsrfCookieName) : void 0;
                    b && (p[e.xsrfHeaderName] = b)
                }
                if ("setRequestHeader"in h && n.forEach(p, function (e, t) {
                    void 0 === l && "content-type" === t.toLowerCase() ? delete p[t] : h.setRequestHeader(t, e)
                }), e.withCredentials && (h.withCredentials = !0), e.responseType)try {
                    h.responseType = e.responseType
                } catch (t) {
                    if ("json" !== e.responseType)throw t
                }
                "function" == typeof e.onDownloadProgress && h.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && h.upload && h.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
                    h && (h.abort(), d(e), h = null)
                }), void 0 === l && (l = null), h.send(l)
            })
        }
    }).call(t, r(5))
}, function (e, t, r) {
    "use strict";
    var n = r(18);
    e.exports = function (e, t, r, o, i) {
        var a = new Error(e);
        return n(a, t, r, o, i)
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return!(!e || !e.__CANCEL__)
    }
}, function (e, t, r) {
    "use strict";
    function n(e) {
        this.message = e
    }

    n.prototype.toString = function () {
        return"Cancel" + (this.message ? ": " + this.message : "")
    }, n.prototype.__CANCEL__ = !0, e.exports = n
}, function (e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {default: e}
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var o = r(2), i = n(o), a = r(3), u = n(a), s = r(11), c = n(s);
    t.default = {crc32: i.default, endecoder: u.default, url: c.default, uid: /tt_webid=(\d+)/gi.test(document.cookie) ? RegExp.$1 : ""}, e.exports = t.default
}, function (e, t, r) {
    "use strict";
    function n(e) {
        return e && e.__esModule ? e : {default: e}
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.default = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "//ib.365yg.com/video/urls/v/1/toutiao/mp4/", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e) {
            var n = {url: (0, c.default)(t + e), adapter: u.default, params: r};
            return(0, i.default)(n).then(function (e) {
                e = e.data;
                var t = {};
                if (0 === e.code) {
                    if (e.data.video_list) {
                        var r = [], n = e.data.video_list, o = {"360p": "极速", "480p": "高清", "720p": "超清", origin: "源片"};
                        for (var i in n)r.push({src: d.default.base64decode(n[i].main_url).replace(/^http:/, ""), type: "video/" + n[i].vtype, definition: n[i].definition, format: n[i].definition, label: o[n[i].definition] || n[i].definition, res: n[i].vheight, backup: d.default.base64decode(n[i].backup_url_1).replace(/^http:/, "")});
                        t.url_list = r.sort(function (e, t) {
                            return e.definition.replace("p", "") - t.definition.replace("p", "") < 0
                        })
                    }
                    t.data = e.data
                }
                return t._source = e, t
            })
        }
        return Promise.reject("vid can't be empty")
    };
    var o = r(12), i = n(o), a = r(31), u = n(a), s = r(2), c = n(s), f = r(3), d = n(f);
    e.exports = t.default
}, function (e, t, r) {
    "use strict";
    e.exports = r(13)
}, function (e, t, r) {
    "use strict";
    function n(e) {
        var t = new a(e), r = i(a.prototype.request, t);
        return o.extend(r, a.prototype, t), o.extend(r, t), r
    }

    var o = r(0), i = r(4), a = r(15), u = r(1), s = n(u);
    s.Axios = a, s.create = function (e) {
        return n(o.merge(u, e))
    }, s.Cancel = r(9), s.CancelToken = r(29), s.isCancel = r(8), s.all = function (e) {
        return Promise.all(e)
    }, s.spread = r(30), e.exports = s, e.exports.default = s
}, function (e, t, r) {
    "use strict";
    function n(e) {
        return!!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    }

    function o(e) {
        return"function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
    }

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    e.exports = function (e) {
        return null != e && (n(e) || o(e) || !!e._isBuffer)
    }
}, function (e, t, r) {
    "use strict";
    function n(e) {
        this.defaults = e, this.interceptors = {request: new a, response: new a}
    }

    var o = r(1), i = r(0), a = r(24), u = r(25);
    n.prototype.request = function (e) {
        "string" == typeof e && (e = i.merge({url: arguments[0]}, arguments[1])), e = i.merge(o, this.defaults, {method: "get"}, e), e.method = e.method.toLowerCase();
        var t = [u, void 0], r = Promise.resolve(e);
        for (this.interceptors.request.forEach(function (e) {
            t.unshift(e.fulfilled, e.rejected)
        }), this.interceptors.response.forEach(function (e) {
            t.push(e.fulfilled, e.rejected)
        }); t.length;)r = r.then(t.shift(), t.shift());
        return r
    }, i.forEach(["delete", "get", "head", "options"], function (e) {
        n.prototype[e] = function (t, r) {
            return this.request(i.merge(r || {}, {method: e, url: t}))
        }
    }), i.forEach(["post", "put", "patch"], function (e) {
        n.prototype[e] = function (t, r, n) {
            return this.request(i.merge(n || {}, {method: e, url: t, data: r}))
        }
    }), e.exports = n
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function (e, t) {
        n.forEach(e, function (r, n) {
            n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n])
        })
    }
}, function (e, t, r) {
    "use strict";
    var n = r(7);
    e.exports = function (e, t, r) {
        var o = r.config.validateStatus;
        r.status && o && !o(r.status) ? t(n("Request failed with status code " + r.status, r.config, null, r.request, r)) : e(r)
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t, r, n, o) {
        return e.config = t, r && (e.code = r), e.request = n, e.response = o, e
    }
}, function (e, t, r) {
    "use strict";
    function n(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }

    var o = r(0);
    e.exports = function (e, t, r) {
        if (!t)return e;
        var i;
        if (r)i = r(t); else if (o.isURLSearchParams(t))i = t.toString(); else {
            var a = [];
            o.forEach(t, function (e, t) {
                null !== e && void 0 !== e && (o.isArray(e) && (t += "[]"), o.isArray(e) || (e = [e]), o.forEach(e, function (e) {
                    o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), a.push(n(t) + "=" + n(e))
                }))
            }), i = a.join("&")
        }
        return i && (e += (-1 === e.indexOf("?") ? "?" : "&") + i), e
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0), o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    e.exports = function (e) {
        var t, r, i, a = {};
        return e ? (n.forEach(e.split("\n"), function (e) {
            if (i = e.indexOf(":"), t = n.trim(e.substr(0, i)).toLowerCase(), r = n.trim(e.substr(i + 1)), t) {
                if (a[t] && o.indexOf(t) >= 0)return;
                a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([r]) : a[t] ? a[t] + ", " + r : r
            }
        }), a) : a
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = n.isStandardBrowserEnv() ? function () {
        function e(e) {
            var t = e;
            return r && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), {href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname}
        }

        var t, r = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a");
        return t = e(window.location.href), function (r) {
            var o = n.isString(r) ? e(r) : r;
            return o.protocol === t.protocol && o.host === t.host
        }
    }() : function () {
        return function () {
            return!0
        }
    }()
}, function (e, t, r) {
    "use strict";
    function n() {
        this.message = "String contains an invalid character"
    }

    function o(e) {
        for (var t, r, o = String(e), a = "", u = 0, s = i; o.charAt(0 | u) || (s = "=", u % 1); a += s.charAt(63 & t >> 8 - u % 1 * 8)) {
            if ((r = o.charCodeAt(u += .75)) > 255)throw new n;
            t = t << 8 | r
        }
        return a
    }

    var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    n.prototype = new Error, n.prototype.code = 5, n.prototype.name = "InvalidCharacterError", e.exports = o
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = n.isStandardBrowserEnv() ? function () {
        return{write: function (e, t, r, o, i, a) {
            var u = [];
            u.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && u.push("expires=" + new Date(r).toGMTString()), n.isString(o) && u.push("path=" + o), n.isString(i) && u.push("domain=" + i), !0 === a && u.push("secure"), document.cookie = u.join("; ")
        }, read: function (e) {
            var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        }, remove: function (e) {
            this.write(e, "", Date.now() - 864e5)
        }}
    }() : function () {
        return{write: function () {
        }, read: function () {
            return null
        }, remove: function () {
        }}
    }()
}, function (e, t, r) {
    "use strict";
    function n() {
        this.handlers = []
    }

    var o = r(0);
    n.prototype.use = function (e, t) {
        return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
    }, n.prototype.eject = function (e) {
        this.handlers[e] && (this.handlers[e] = null)
    }, n.prototype.forEach = function (e) {
        o.forEach(this.handlers, function (t) {
            null !== t && e(t)
        })
    }, e.exports = n
}, function (e, t, r) {
    "use strict";
    function n(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }

    var o = r(0), i = r(26), a = r(8), u = r(1), s = r(27), c = r(28);
    e.exports = function (e) {
        return n(e), e.baseURL && !s(e.url) && (e.url = c(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
            delete e.headers[t]
        }), (e.adapter || u.adapter)(e).then(function (t) {
            return n(e), t.data = i(t.data, t.headers, e.transformResponse), t
        }, function (t) {
            return a(t) || (n(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
        })
    }
}, function (e, t, r) {
    "use strict";
    var n = r(0);
    e.exports = function (e, t, r) {
        return n.forEach(r, function (r) {
            e = r(e, t)
        }), e
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
    }
}, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
        return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
    }
}, function (e, t, r) {
    "use strict";
    function n(e) {
        if ("function" != typeof e)throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function (e) {
            t = e
        });
        var r = this;
        e(function (e) {
            r.reason || (r.reason = new o(e), t(r.reason))
        })
    }

    var o = r(9);
    n.prototype.throwIfRequested = function () {
        if (this.reason)throw this.reason
    }, n.source = function () {
        var e;
        return{token: new n(function (t) {
            e = t
        }), cancel: e}
    }, e.exports = n
}, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
        return function (t) {
            return e.apply(null, t)
        }
    }
}, function (e, t, r) {
    "use strict";
    function n(e) {
        var t = [];
        for (var r in e)t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
        return t.join("&")
    }

    var o = 1;
    e.exports = function (e) {
        return new Promise(function (t, r) {
            var i = document.createElement("script"), a = e.url;
            if (e.params) {
                var u = n(e.params);
                u && (a += (a.indexOf("?") >= 0 ? "&" : "?") + u)
            }
            i.async = !0;
            var s = "axiosJsonpCallback" + o++, c = window[s], f = !1;
            window[s] = function (e) {
                if (window[s] = c, !f) {
                    t({data: e, status: 200})
                }
            }, a += (a.indexOf("?") >= 0 ? "&" : "?") + n({callback: s, _: (new Date).getTime()}), i.onload = i.onreadystatechange = function () {
                i.readyState && !/loaded|complete/.test(i.readyState) || (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null)
            }, e.cancelToken && e.cancelToken.promise.then(function (e) {
                i && (f = !0, r(e))
            }), i.src = a, document.head.appendChild(i)
        })
    }
}]);