var Zepto = function () {
    function t(t) {
        return null == t ? String(t) : Q[H.call(t)] || "object"
    }

    function e(e) {
        return"function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function i(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function r(e) {
        return"object" == t(e)
    }

    function o(t) {
        return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function a(t) {
        return"number" == typeof t.length
    }

    function s(t) {
        return j.call(t, function (t) {
            return null != t
        })
    }

    function u(t) {
        return t.length > 0 ? _.fn.concat.apply([], t) : t
    }

    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in O ? O[t] : O[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function f(t, e) {
        return"number" != typeof e || D[c(t)] ? e : e + "px"
    }

    function h(t) {
        var e, n;
        return N[t] || (e = C.createElement(t), C.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), N[t] = n), N[t]
    }

    function p(t) {
        return"children"in t ? P.call(t.children) : _.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e, n) {
        for (x in e)n && (o(e[x]) || X(e[x])) ? (o(e[x]) && !o(t[x]) && (t[x] = {}), X(e[x]) && !X(t[x]) && (t[x] = []), d(t[x], e[x], n)) : e[x] !== b && (t[x] = e[x])
    }

    function m(t, e) {
        return null == e ? _(t) : _(t).filter(e)
    }

    function g(t, n, i, r) {
        return e(n) ? n.call(t, i, r) : n
    }

    function v(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function y(t, e) {
        var n = t.className, i = n && n.baseVal !== b;
        return e === b ? i ? n.baseVal : n : void(i ? n.baseVal = e : t.className = e)
    }

    function A(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? _.parseJSON(t) : t : e) : t
        } catch (n) {
            return t
        }
    }

    function w(t, e) {
        e(t);
        for (var n in t.childNodes)w(t.childNodes[n], e)
    }

    var b, x, _, T, S, E, M = [], P = M.slice, j = M.filter, C = window.document, N = {}, O = {}, D = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1}, I = /^\s*<(\w+|!)[^>]*>/, R = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, $ = /^(?:body|html)$/i, L = /([A-Z])/g, U = ["val", "css", "html", "text", "data", "width", "height", "offset"], F = ["after", "prepend", "before", "append"], B = C.createElement("table"), W = C.createElement("tr"), Z = {tr: C.createElement("tbody"), tbody: B, thead: B, tfoot: B, td: W, th: W, "*": C.createElement("div")}, z = /complete|loaded|interactive/, V = /^[\w-]*$/, Q = {}, H = Q.toString, J = {}, Y = C.createElement("div"), q = {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, X = Array.isArray || function (t) {
        return t instanceof Array
    };
    return J.matches = function (t, e) {
        if (!e || !t || 1 !== t.nodeType)return!1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n)return n.call(t, e);
        var i, r = t.parentNode, o = !r;
        return o && (r = Y).appendChild(t), i = ~J.qsa(r, e).indexOf(t), o && Y.removeChild(t), i
    }, S = function (t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, E = function (t) {
        return j.call(t, function (e, n) {
            return t.indexOf(e) == n
        })
    }, J.fragment = function (t, e, n) {
        var i, r, a;
        return R.test(t) && (i = _(C.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(k, "<$1></$2>")), e === b && (e = I.test(t) && RegExp.$1), e in Z || (e = "*"), a = Z[e], a.innerHTML = "" + t, i = _.each(P.call(a.childNodes), function () {
            a.removeChild(this)
        })), o(n) && (r = _(i), _.each(n, function (t, e) {
            U.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
        })), i
    }, J.Z = function (t, e) {
        return t = t || [], t.__proto__ = _.fn, t.selector = e || "", t
    }, J.isZ = function (t) {
        return t instanceof J.Z
    }, J.init = function (t, n) {
        var i;
        if (!t)return J.Z();
        if ("string" == typeof t)if (t = t.trim(), "<" == t[0] && I.test(t))i = J.fragment(t, RegExp.$1, n), t = null; else {
            if (n !== b)return _(n).find(t);
            i = J.qsa(C, t)
        } else {
            if (e(t))return _(C).ready(t);
            if (J.isZ(t))return t;
            if (X(t))i = s(t); else if (r(t))i = [t], t = null; else if (I.test(t))i = J.fragment(t.trim(), RegExp.$1, n), t = null; else {
                if (n !== b)return _(n).find(t);
                i = J.qsa(C, t)
            }
        }
        return J.Z(i, t)
    }, _ = function (t, e) {
        return J.init(t, e)
    }, _.extend = function (t) {
        var e, n = P.call(arguments, 1);
        return"boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
            d(t, n, e)
        }), t
    }, J.qsa = function (t, e) {
        var n, r = "#" == e[0], o = !r && "." == e[0], a = r || o ? e.slice(1) : e, s = V.test(a);
        return i(t) && s && r ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : P.call(s && !r ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, _.contains = function (t, e) {
        return t !== e && t.contains(e)
    }, _.type = t, _.isFunction = e, _.isWindow = n, _.isArray = X, _.isPlainObject = o, _.isEmptyObject = function (t) {
        var e;
        for (e in t)return!1;
        return!0
    }, _.inArray = function (t, e, n) {
        return M.indexOf.call(e, t, n)
    }, _.camelCase = S, _.trim = function (t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, _.uuid = 0, _.support = {}, _.expr = {}, _.map = function (t, e) {
        var n, i, r, o = [];
        if (a(t))for (i = 0; i < t.length; i++)n = e(t[i], i), null != n && o.push(n); else for (r in t)n = e(t[r], r), null != n && o.push(n);
        return u(o)
    }, _.each = function (t, e) {
        var n, i;
        if (a(t)) {
            for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1)return t
        } else for (i in t)if (e.call(t[i], i, t[i]) === !1)return t;
        return t
    }, _.grep = function (t, e) {
        return j.call(t, e)
    }, window.JSON && (_.parseJSON = JSON.parse), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        Q["[object " + e + "]"] = e.toLowerCase()
    }), _.fn = {forEach: M.forEach, reduce: M.reduce, push: M.push, sort: M.sort, indexOf: M.indexOf, concat: M.concat, map: function (t) {
        return _(_.map(this, function (e, n) {
            return t.call(e, n, e)
        }))
    }, slice: function () {
        return _(P.apply(this, arguments))
    }, ready: function (t) {
        return z.test(C.readyState) && C.body ? t(_) : C.addEventListener("DOMContentLoaded", function () {
            t(_)
        }, !1), this
    }, get: function (t) {
        return t === b ? P.call(this) : this[t >= 0 ? t : t + this.length]
    }, toArray: function () {
        return this.get()
    }, size: function () {
        return this.length
    }, remove: function () {
        return this.each(function () {
            null != this.parentNode && this.parentNode.removeChild(this)
        })
    }, each: function (t) {
        return M.every.call(this, function (e, n) {
            return t.call(e, n, e) !== !1
        }), this
    }, filter: function (t) {
        return e(t) ? this.not(this.not(t)) : _(j.call(this, function (e) {
            return J.matches(e, t)
        }))
    }, add: function (t, e) {
        return _(E(this.concat(_(t, e))))
    }, is: function (t) {
        return this.length > 0 && J.matches(this[0], t)
    }, not: function (t) {
        var n = [];
        if (e(t) && t.call !== b)this.each(function (e) {
            t.call(this, e) || n.push(this)
        }); else {
            var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? P.call(t) : _(t);
            this.forEach(function (t) {
                i.indexOf(t) < 0 && n.push(t)
            })
        }
        return _(n)
    }, has: function (t) {
        return this.filter(function () {
            return r(t) ? _.contains(this, t) : _(this).find(t).size()
        })
    }, eq: function (t) {
        return-1 === t ? this.slice(t) : this.slice(t, +t + 1)
    }, first: function () {
        var t = this[0];
        return t && !r(t) ? t : _(t)
    }, last: function () {
        var t = this[this.length - 1];
        return t && !r(t) ? t : _(t)
    }, find: function (t) {
        var e, n = this;
        return e = "object" == typeof t ? _(t).filter(function () {
            var t = this;
            return M.some.call(n, function (e) {
                return _.contains(e, t)
            })
        }) : 1 == this.length ? _(J.qsa(this[0], t)) : this.map(function () {
            return J.qsa(this, t)
        })
    }, closest: function (t, e) {
        var n = this[0], r = !1;
        for ("object" == typeof t && (r = _(t)); n && !(r ? r.indexOf(n) >= 0 : J.matches(n, t));)n = n !== e && !i(n) && n.parentNode;
        return _(n)
    }, parents: function (t) {
        for (var e = [], n = this; n.length > 0;)n = _.map(n, function (t) {
            return(t = t.parentNode) && !i(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
        });
        return m(e, t)
    }, parent: function (t) {
        return m(E(this.pluck("parentNode")), t)
    }, children: function (t) {
        return m(this.map(function () {
            return p(this)
        }), t)
    }, contents: function () {
        return this.map(function () {
            return P.call(this.childNodes)
        })
    }, siblings: function (t) {
        return m(this.map(function (t, e) {
            return j.call(p(e.parentNode), function (t) {
                return t !== e
            })
        }), t)
    }, empty: function () {
        return this.each(function () {
            this.innerHTML = ""
        })
    }, pluck: function (t) {
        return _.map(this, function (e) {
            return e[t]
        })
    }, show: function () {
        return this.each(function () {
            "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
        })
    }, replaceWith: function (t) {
        return this.before(t).remove()
    }, wrap: function (t) {
        var n = e(t);
        if (this[0] && !n)var i = _(t).get(0), r = i.parentNode || this.length > 1;
        return this.each(function (e) {
            _(this).wrapAll(n ? t.call(this, e) : r ? i.cloneNode(!0) : i)
        })
    }, wrapAll: function (t) {
        if (this[0]) {
            _(this[0]).before(t = _(t));
            for (var e; (e = t.children()).length;)t = e.first();
            _(t).append(this)
        }
        return this
    }, wrapInner: function (t) {
        var n = e(t);
        return this.each(function (e) {
            var i = _(this), r = i.contents(), o = n ? t.call(this, e) : t;
            r.length ? r.wrapAll(o) : i.append(o)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            _(this).replaceWith(_(this).children())
        }), this
    }, clone: function () {
        return this.map(function () {
            return this.cloneNode(!0)
        })
    }, hide: function () {
        return this.css("display", "none")
    }, toggle: function (t) {
        return this.each(function () {
            var e = _(this);
            (t === b ? "none" == e.css("display") : t) ? e.show() : e.hide()
        })
    }, prev: function (t) {
        return _(this.pluck("previousElementSibling")).filter(t || "*")
    }, next: function (t) {
        return _(this.pluck("nextElementSibling")).filter(t || "*")
    }, html: function (t) {
        return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (e) {
            var n = this.innerHTML;
            _(this).empty().append(g(this, t, e, n))
        })
    }, text: function (t) {
        return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
            this.textContent = t === b ? "" : "" + t
        })
    }, attr: function (t, e) {
        var n;
        return"string" == typeof t && e === b ? 0 == this.length || 1 !== this[0].nodeType ? b : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : this.each(function (n) {
            if (1 === this.nodeType)if (r(t))for (x in t)v(this, x, t[x]); else v(this, t, g(this, e, n, this.getAttribute(t)))
        })
    }, removeAttr: function (t) {
        return this.each(function () {
            1 === this.nodeType && v(this, t)
        })
    }, prop: function (t, e) {
        return t = q[t] || t, e === b ? this[0] && this[0][t] : this.each(function (n) {
            this[t] = g(this, e, n, this[t])
        })
    }, data: function (t, e) {
        var n = this.attr("data-" + t.replace(L, "-$1").toLowerCase(), e);
        return null !== n ? A(n) : b
    }, val: function (t) {
        return 0 === arguments.length ? this[0] && (this[0].multiple ? _(this[0]).find("option").filter(function () {
            return this.selected
        }).pluck("value") : this[0].value) : this.each(function (e) {
            this.value = g(this, t, e, this.value)
        })
    }, offset: function (t) {
        if (t)return this.each(function (e) {
            var n = _(this), i = g(this, t, e, n.offset()), r = n.offsetParent().offset(), o = {top: i.top - r.top, left: i.left - r.left};
            "static" == n.css("position") && (o.position = "relative"), n.css(o)
        });
        if (0 == this.length)return null;
        var e = this[0].getBoundingClientRect();
        return{left: e.left + window.pageXOffset, top: e.top + window.pageYOffset, width: Math.round(e.width), height: Math.round(e.height)}
    }, css: function (e, n) {
        if (arguments.length < 2) {
            var i = this[0], r = getComputedStyle(i, "");
            if (!i)return;
            if ("string" == typeof e)return i.style[S(e)] || r.getPropertyValue(e);
            if (X(e)) {
                var o = {};
                return _.each(X(e) ? e : [e], function (t, e) {
                    o[e] = i.style[S(e)] || r.getPropertyValue(e)
                }), o
            }
        }
        var a = "";
        if ("string" == t(e))n || 0 === n ? a = c(e) + ":" + f(e, n) : this.each(function () {
            this.style.removeProperty(c(e))
        }); else for (x in e)e[x] || 0 === e[x] ? a += c(x) + ":" + f(x, e[x]) + ";" : this.each(function () {
            this.style.removeProperty(c(x))
        });
        return this.each(function () {
            this.style.cssText += ";" + a
        })
    }, index: function (t) {
        return t ? this.indexOf(_(t)[0]) : this.parent().children().indexOf(this[0])
    }, hasClass: function (t) {
        return t ? M.some.call(this, function (t) {
            return this.test(y(t))
        }, l(t)) : !1
    }, addClass: function (t) {
        return t ? this.each(function (e) {
            T = [];
            var n = y(this), i = g(this, t, e, n);
            i.split(/\s+/g).forEach(function (t) {
                _(this).hasClass(t) || T.push(t)
            }, this), T.length && y(this, n + (n ? " " : "") + T.join(" "))
        }) : this
    }, removeClass: function (t) {
        return this.each(function (e) {
            return t === b ? y(this, "") : (T = y(this), g(this, t, e, T).split(/\s+/g).forEach(function (t) {
                T = T.replace(l(t), " ")
            }), void y(this, T.trim()))
        })
    }, toggleClass: function (t, e) {
        return t ? this.each(function (n) {
            var i = _(this), r = g(this, t, n, y(this));
            r.split(/\s+/g).forEach(function (t) {
                (e === b ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t)
            })
        }) : this
    }, scrollTop: function (t) {
        if (this.length) {
            var e = "scrollTop"in this[0];
            return t === b ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                this.scrollTop = t
            } : function () {
                this.scrollTo(this.scrollX, t)
            })
        }
    }, scrollLeft: function (t) {
        if (this.length) {
            var e = "scrollLeft"in this[0];
            return t === b ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                this.scrollLeft = t
            } : function () {
                this.scrollTo(t, this.scrollY)
            })
        }
    }, position: function () {
        if (this.length) {
            var t = this[0], e = this.offsetParent(), n = this.offset(), i = $.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
            return n.top -= parseFloat(_(t).css("margin-top")) || 0, n.left -= parseFloat(_(t).css("margin-left")) || 0, i.top += parseFloat(_(e[0]).css("border-top-width")) || 0, i.left += parseFloat(_(e[0]).css("border-left-width")) || 0, {top: n.top - i.top, left: n.left - i.left}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var t = this.offsetParent || C.body; t && !$.test(t.nodeName) && "static" == _(t).css("position");)t = t.offsetParent;
            return t
        })
    }}, _.fn.detach = _.fn.remove, ["width", "height"].forEach(function (t) {
        var e = t.replace(/./, function (t) {
            return t[0].toUpperCase()
        });
        _.fn[t] = function (r) {
            var o, a = this[0];
            return r === b ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
                a = _(this), a.css(t, g(this, r, e, a[t]()))
            })
        }
    }), F.forEach(function (e, n) {
        var i = n % 2;
        _.fn[e] = function () {
            var e, r, o = _.map(arguments, function (n) {
                return e = t(n), "object" == e || "array" == e || null == n ? n : J.fragment(n)
            }), a = this.length > 1;
            return o.length < 1 ? this : this.each(function (t, e) {
                r = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null, o.forEach(function (t) {
                    if (a)t = t.cloneNode(!0); else if (!r)return _(t).remove();
                    w(r.insertBefore(t, e), function (t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, _.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
            return _(t)[e](this), this
        }
    }), J.Z.prototype = _.fn, J.uniq = E, J.deserializeValue = A, _.zepto = J, _
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
    function e(t) {
        return t._zid || (t._zid = h++)
    }

    function n(t, n, o, a) {
        if (n = i(n), n.ns)var s = r(n.ns);
        return(g[e(t)] || []).filter(function (t) {
            return!(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a)
        })
    }

    function i(t) {
        var e = ("" + t).split(".");
        return{e: e[0], ns: e.slice(1).sort().join(" ")}
    }

    function r(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function o(t, e) {
        return t.del && !y && t.e in A || !!e
    }

    function a(t) {
        return w[t] || y && A[t] || t
    }

    function s(n, r, s, u, l, h, p) {
        var d = e(n), m = g[d] || (g[d] = []);
        r.split(/\s/).forEach(function (e) {
            if ("ready" == e)return t(document).ready(s);
            var r = i(e);
            r.fn = s, r.sel = l, r.e in w && (s = function (e) {
                var n = e.relatedTarget;
                return!n || n !== this && !t.contains(this, n) ? r.fn.apply(this, arguments) : void 0
            }), r.del = h;
            var d = h || s;
            r.proxy = function (t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                }
            }, r.i = m.length, m.push(r), "addEventListener"in n && n.addEventListener(a(r.e), r.proxy, o(r, p))
        })
    }

    function u(t, i, r, s, u) {
        var c = e(t);
        (i || "").split(/\s/).forEach(function (e) {
            n(t, e, r, s).forEach(function (e) {
                delete g[c][e.i], "removeEventListener"in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
            })
        })
    }

    function c(e, n) {
        return(n || !e.isDefaultPrevented) && (n || (n = e), t.each(T, function (t, i) {
            var r = n[t];
            e[t] = function () {
                return this[i] = b, r && r.apply(n, arguments)
            }, e[i] = x
        }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = b)), e
    }
m
    function l(t) {
        var e, n = {originalEvent: t};
        for (e in t)_.test(e) || t[e] === f || (n[e] = t[e]);
        return c(n, t)
    }

    var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function (t) {
        return"string" == typeof t
    }, g = {}, v = {}, y = "onfocusin"in window, A = {focus: "focusin", blur: "focusout"}, w = {mouseenter: "mouseover", mouseleave: "mouseout"};
    v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {add: s, remove: u}, t.proxy = function (n, i) {
        if (d(n)) {
            var r = function () {
                return n.apply(i, arguments)
            };
            return r._zid = e(n), r
        }
        if (m(i))return t.proxy(n[i], n);
        throw new TypeError("expected function")
    }, t.fn.bind = function (t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function (t, e) {
        return this.off(t, e)
    }, t.fn.one = function (t, e, n, i) {
        return this.on(t, e, n, i, 1)
    };
    var b = function () {
        return!0
    }, x = function () {
        return!1
    }, _ = /^([A-Z]|returnValue$|layer[XY]$)/, T = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};
    t.fn.delegate = function (t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function (e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function (e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function (e, n, i, r, o) {
        var a, c, h = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            h.on(t, n, i, e, o)
        }), h) : (m(n) || d(r) || r === !1 || (r = i, i = n, n = f), (d(i) || i === !1) && (r = i, i = f), r === !1 && (r = x), h.each(function (f, h) {
            o && (a = function (t) {
                return u(h, t.type, r), r.apply(this, arguments)
            }), n && (c = function (e) {
                var i, o = t(e.target).closest(n, h).get(0);
                return o && o !== h ? (i = t.extend(l(e), {currentTarget: o, liveFired: h}), (a || r).apply(o, [i].concat(p.call(arguments, 1)))) : void 0
            }), s(h, e, r, i, n, c || a)
        }))
    }, t.fn.off = function (e, n, i) {
        var r = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            r.off(t, n, e)
        }), r) : (m(n) || d(i) || i === !1 || (i = n, n = f), i === !1 && (i = x), r.each(function () {
            u(this, e, i, n)
        }))
    }, t.fn.trigger = function (e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function () {
            "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function (e, i) {
        var r, o;
        return this.each(function (a, s) {
            r = l(m(e) ? t.Event(e) : e), r._args = i, r.target = s, t.each(n(s, e.type || e), function (t, e) {
                return o = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), o
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.trigger(e)
        }
    }), ["focus", "blur"].forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.each(function () {
                try {
                    this[e]()
                } catch (t) {
                }
            }), this
        }
    }), t.Event = function (t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(v[t] || "Events"), i = !0;
        if (e)for (var r in e)"bubbles" == r ? i = !!e[r] : n[r] = e[r];
        return n.initEvent(t, i, !0), c(n)
    }
}(Zepto), function (t) {
    function e(e, n, i) {
        var r = t.Event(n);
        return t(e).trigger(r, i), !r.isDefaultPrevented()
    }

    function n(t, n, i, r) {
        return t.global ? e(n || y, i, r) : void 0
    }

    function i(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart")
    }

    function r(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }

    function o(t, e) {
        var i = e.context;
        return e.beforeSend.call(i, t, e) === !1 || n(e, i, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, i, "ajaxSend", [t, e])
    }

    function a(t, e, i, r) {
        var o = i.context, a = "success";
        i.success.call(o, t, a, e), r && r.resolveWith(o, [t, a, e]), n(i, o, "ajaxSuccess", [e, i, t]), u(a, e, i)
    }

    function s(t, e, i, r, o) {
        var a = r.context;
        r.error.call(a, i, e, t), o && o.rejectWith(a, [i, e, t]), n(r, a, "ajaxError", [i, r, t || e]), u(e, i, r)
    }

    function u(t, e, i) {
        var o = i.context;
        i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i)
    }

    function c() {
    }

    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == _ ? "html" : t == x ? "json" : w.test(t) ? "script" : b.test(t) && "xml") || "text"
    }

    function f(t, e) {
        return"" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function h(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
    }

    function p(e, n, i, r) {
        return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {url: e, data: n, success: i, dataType: r}
    }

    function d(e, n, i, r) {
        var o, a = t.isArray(n), s = t.isPlainObject(n);
        t.each(n, function (n, u) {
            o = t.type(u), r && (n = i ? r : r + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !r && a ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? d(e, u, i, n) : e.add(n, u)
        })
    }

    var m, g, v = 0, y = window.document, A = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, b = /^(?:text|application)\/xml/i, x = "application/json", _ = "text/html", T = /^\s*$/;
    t.active = 0, t.ajaxJSONP = function (e, n) {
        if (!("type"in e))return t.ajax(e);
        var i, r, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "jsonp" + ++v, l = y.createElement("script"), f = window[c], h = function (e) {
            t(l).triggerHandler("error", e || "abort")
        }, p = {abort: h};
        return n && n.promise(p), t(l).on("load error", function (o, u) {
            clearTimeout(r), t(l).off().remove(), "error" != o.type && i ? a(i[0], p, e, n) : s(null, u || "error", p, e, n), window[c] = f, i && t.isFunction(f) && f(i[0]), f = i = void 0
        }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function () {
            i = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (r = setTimeout(function () {
            h("timeout")
        }, e.timeout)), p)
    }, t.ajaxSettings = {type: "GET", beforeSend: c, success: c, error: c, complete: c, context: null, global: !0, xhr: function () {
        return new window.XMLHttpRequest
    }, accepts: {script: "text/javascript, application/javascript, application/x-javascript", json: x, xml: "application/xml, text/xml", html: _, text: "text/plain"}, crossDomain: !1, timeout: 0, processData: !0, cache: !0}, t.ajax = function (e) {
        var n = t.extend({}, e || {}), r = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings)void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
        i(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), h(n), n.cache === !1 && (n.url = f(n.url, "_=" + Date.now()));
        var u = n.dataType, p = /\?.+=\?/.test(n.url);
        if ("jsonp" == u || p)return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, r);
        var d, v = n.accepts[u], y = {}, A = function (t, e) {
            y[t.toLowerCase()] = [t, e]
        }, w = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, b = n.xhr(), x = b.setRequestHeader;
        if (r && r.promise(b), n.crossDomain || A("X-Requested-With", "XMLHttpRequest"), A("Accept", v || "*/*"), (v = n.mimeType || v) && (v.indexOf(",") > -1 && (v = v.split(",", 2)[0]), b.overrideMimeType && b.overrideMimeType(v)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && A("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)for (g in n.headers)A(g, n.headers[g]);
        if (b.setRequestHeader = A, b.onreadystatechange = function () {
            if (4 == b.readyState) {
                b.onreadystatechange = c, clearTimeout(d);
                var e, i = !1;
                if (b.status >= 200 && b.status < 300 || 304 == b.status || 0 == b.status && "file:" == w) {
                    u = u || l(n.mimeType || b.getResponseHeader("content-type")), e = b.responseText;
                    try {
                        "script" == u ? (1, eval)(e) : "xml" == u ? e = b.responseXML : "json" == u && (e = T.test(e) ? null : t.parseJSON(e))
                    } catch (o) {
                        i = o
                    }
                    i ? s(i, "parsererror", b, n, r) : a(e, b, n, r)
                } else s(b.statusText || null, b.status ? "error" : "abort", b, n, r)
            }
        }, o(b, n) === !1)return b.abort(), s(null, "abort", b, n, r), b;
        if (n.xhrFields)for (g in n.xhrFields)b[g] = n.xhrFields[g];
        var _ = "async"in n ? n.async : !0;
        b.open(n.type, n.url, _, n.username, n.password);
        for (g in y)x.apply(b, y[g]);
        return n.timeout > 0 && (d = setTimeout(function () {
            b.onreadystatechange = c, b.abort(), s(null, "timeout", b, n, r)
        }, n.timeout)), b.send(n.data ? n.data : null), b
    }, t.get = function () {
        return t.ajax(p.apply(null, arguments))
    }, t.post = function () {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, i) {
        if (!this.length)return this;
        var r, o = this, a = e.split(/\s/), s = p(e, n, i), u = s.success;
        return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function (e) {
            o.html(r ? t("<div>").html(e.replace(A, "")).find(r) : e), u && u.apply(o, arguments)
        }, t.ajax(s), this
    };
    var S = encodeURIComponent;
    t.param = function (t, e) {
        var n = [];
        return n.add = function (t, e) {
            this.push(S(t) + "=" + S(e))
        }, d(n, t, e), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (t) {
    t.fn.serializeArray = function () {
        var e, n = [];
        return t([].slice.call(this.get(0).elements)).each(function () {
            e = t(this);
            var i = e.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && n.push({name: e.attr("name"), value: e.val()})
        }), n
    }, t.fn.serialize = function () {
        var t = [];
        return this.serializeArray().forEach(function (e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function (e) {
        if (e)this.bind("submit", e); else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (t) {
    "__proto__"in{} || t.extend(t.zepto, {Z: function (e, n) {
        return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
    }, isZ: function (e) {
        return"array" === t.type(e) && "__Z"in e
    }});
    try {
        getComputedStyle(void 0)
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function (t) {
            try {
                return n(t)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto), function (t) {
    function e(t, e, n, i) {
        return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
    }

    function n() {
        l = null, h.last && (h.el && h.el.trigger("longTap"), h = {})
    }

    function i() {
        l && clearTimeout(l), l = null
    }

    function r() {
        s && clearTimeout(s), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l), s = u = c = l = null, h = {}
    }

    function o(t) {
        return("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }

    function a(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }

    var s, u, c, l, f, h = {}, p = 750;
    t(document).ready(function () {
        var d, m, g, v, y = 0, A = 0;
        "MSGesture"in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function (t) {
            var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
            e && (h.el && h.el.trigger("swipe"), h.el && h.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown", function (e) {
            (!(v = a(e, "down")) || o(e)) && (g = v ? e : e.touches[0], e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), d = Date.now(), m = d - (h.last || d), h.el = t("tagName"in g.target ? g.target : g.target.parentNode), s && clearTimeout(s), h.x1 = g.pageX, h.y1 = g.pageY, m > 0 && 250 >= m && (h.isDoubleTap = !0), h.last = d, l = setTimeout(n, p), f && v && f.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (t) {
            (!(v = a(t, "move")) || o(t)) && (g = v ? t : t.touches[0], i(), h.x2 = g.pageX, h.y2 = g.pageY, y += Math.abs(h.x1 - h.x2), A += Math.abs(h.y1 - h.y2))
        }).on("touchend MSPointerUp pointerup", function (n) {
            (!(v = a(n, "up")) || o(n)) && (i(), h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? c = setTimeout(function () {
                h.el && h.el.trigger("swipe"), h.el && h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)), h = {}
            }, 0) : "last"in h && (30 > y && 30 > A ? u = setTimeout(function () {
                var e = t.Event("tap");
                e.cancelTouch = r, h.el && h.el.trigger(e), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : s = setTimeout(function () {
                    s = null, h.el && h.el.trigger("singleTap"), h = {}
                }, 250)
            }, 0) : h = {}), y = A = 0)
        }).on("touchcancel MSPointerCancel pointercancel", r), t(window).on("scroll", r)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
        t.fn[e] = function (t) {
            return this.on(e, t)
        }
    })
}(Zepto), function (t, e) {
    function n(t) {
        return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }

    function i(t) {
        return r ? r + t : t.toLowerCase()
    }

    var r, o, a, s, u, c, l, f, h, p, d = "", m = {Webkit: "webkit", Moz: "", O: "o"}, g = document.createElement("div"), v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
    t.each(m, function (t, n) {
        return g.style[t + "TransitionProperty"] !== e ? (d = "-" + t.toLowerCase() + "-", r = n, !1) : void 0
    }), o = d + "transform", y[a = d + "transition-property"] = y[s = d + "transition-duration"] = y[c = d + "transition-delay"] = y[u = d + "transition-timing-function"] = y[l = d + "animation-name"] = y[f = d + "animation-duration"] = y[p = d + "animation-delay"] = y[h = d + "animation-timing-function"] = "", t.fx = {off: r === e && g.style.transitionProperty === e, speeds: {_default: 400, fast: 200, slow: 600}, cssPrefix: d, transitionEnd: i("TransitionEnd"), animationEnd: i("AnimationEnd")}, t.fn.animate = function (n, i, r, o, a) {
        return t.isFunction(i) && (o = i, r = e, i = e), t.isFunction(r) && (o = r, r = e), t.isPlainObject(i) && (r = i.easing, o = i.complete, a = i.delay, i = i.duration), i && (i = ("number" == typeof i ? i : t.fx.speeds[i] || t.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(n, i, r, o, a)
    }, t.fn.anim = function (i, r, d, m, g) {
        var A, w, b, x = {}, _ = "", T = this, S = t.fx.transitionEnd, E = !1;
        if (r === e && (r = t.fx.speeds._default / 1e3), g === e && (g = 0), t.fx.off && (r = 0), "string" == typeof i)x[l] = i, x[f] = r + "s", x[p] = g + "s", x[h] = d || "linear", S = t.fx.animationEnd; else {
            w = [];
            for (A in i)v.test(A) ? _ += A + "(" + i[A] + ") " : (x[A] = i[A], w.push(n(A)));
            _ && (x[o] = _, w.push(o)), r > 0 && "object" == typeof i && (x[a] = w.join(", "), x[s] = r + "s", x[c] = g + "s", x[u] = d || "linear")
        }
        return b = function (e) {
            if ("undefined" != typeof e) {
                if (e.target !== e.currentTarget)return;
                t(e.target).unbind(S, b)
            } else t(this).unbind(S, b);
            E = !0, t(this).css(y), m && m.call(this)
        }, r > 0 && (this.bind(S, b), setTimeout(function () {
            E || b.call(T)
        }, 1e3 * (r + g) + 25)), this.size() && this.get(0).clientLeft, this.css(x), 0 >= r && setTimeout(function () {
            T.each(function () {
                b.call(this)
            })
        }, 0), this
    }, g = null
}(Zepto), function (t) {
    function e(t, e) {
        var n = this.os = {}, i = this.browser = {}, r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/), o = t.match(/(Android);?[\s\/]+([\d.]+)?/), a = !!t.match(/\(Macintosh\; Intel /), s = t.match(/(iPad).*OS\s([\d_]+)/), u = t.match(/(iPod)(.*OS\s([\d_]+))?/), c = !s && t.match(/(iPhone\sOS)\s([\d_]+)/), l = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), f = /Win\d{2}|Windows/.test(e), h = t.match(/Windows Phone ([\d.]+)/), p = l && t.match(/TouchPad/), d = t.match(/Kindle\/([\d.]+)/), m = t.match(/Silk\/([\d._]+)/), g = t.match(/(BlackBerry).*Version\/([\d.]+)/), v = t.match(/(BB10).*Version\/([\d.]+)/), y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/), A = t.match(/PlayBook/), w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/), b = t.match(/Firefox\/([\d.]+)/), x = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/), _ = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/), T = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/), S = T || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
        (i.webkit = !!r) && (i.version = r[1]), o && (n.android = !0, n.version = o[2]), c && !u && (n.ios = n.iphone = !0, n.version = c[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0, n.version = s[2].replace(/_/g, ".")), u && (n.ios = n.ipod = !0, n.version = u[3] ? u[3].replace(/_/g, ".") : null), h && (n.wp = !0, n.version = h[1]), l && (n.webos = !0, n.version = l[2]), p && (n.touchpad = !0), g && (n.blackberry = !0, n.version = g[2]), v && (n.bb10 = !0, n.version = v[2]), y && (n.rimtabletos = !0, n.version = y[2]), A && (i.playbook = !0), d && (n.kindle = !0, n.version = d[1]), m && (i.silk = !0, i.version = m[1]), !m && n.android && t.match(/Kindle Fire/) && (i.silk = !0), w && (i.chrome = !0, i.version = w[1]), b && (i.firefox = !0, i.version = b[1]), x && (n.firefoxos = !0, n.version = x[1]), _ && (i.ie = !0, i.version = _[1]), S && (a || n.ios || f) && (i.safari = !0, n.ios || (i.version = S[1])), T && (i.webview = !0), n.tablet = !!(s || A || o && !t.match(/Mobile/) || b && t.match(/Tablet/) || _ && !t.match(/Phone/) && t.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(o || c || l || g || v || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || b && t.match(/Mobile/) || _ && t.match(/Touch/)))
    }

    e.call(t, navigator.userAgent, navigator.platform), t.__detect = e
}(Zepto), !function (t) {
    function e() {
        var t = -480, e = new Date;
        return t - e.getTimezoneOffset()
    }

    function n(e) {
        var n = t.extend(l.settings, e), r = this;
        i(r), n.refreshMillis > 0 && setInterval(function () {
            i(r)
        }, n.refreshMillis)
    }

    function i(e) {
        var n = r(e);
        return date = l.parse(n.datetime), isNaN(date) || t(e).text(l.inWords(date)), e
    }

    function r(e) {
        e = t(e);
        var n = l.datetime(e);
        return e.attr("data-timeago") || e.attr("data-timeago", JSON.stringify({datetime: n})), JSON.parse(e.attr("data-timeago"))
    }

    function o(t) {
        return(new Date).getTime() - t.getTime()
    }

    function a(t) {
        var e = new Date;
        return e.getMonth() > t.getMonth() || e.getDate() > t.getDate()
    }

    function s(t, e) {
        var n, i, r, o;
        return n = t.split("-"), i = new Date(n[0], n[1] - 1, n[2]), n = e.split("-"), r = new Date(n[0], n[1] - 1, n[2]), o = parseInt(Math.abs(i - r) / 1e3 / 60 / 60 / 24), 0 > i - r ? -o : o
    }

    function u(t) {
        return(new Date).getFullYear() > t.getFullYear()
    }

    Date.prototype.format = function (t) {
        var e = {"M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), S: this.getMilliseconds()};
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in e)new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[n] : ("00" + e[n]).substr(("" + e[n]).length)));
        return t
    };
    var c = 60 * e() * 1e3, l = {settings: {refreshMillis: 6e4, relative: !1, strings: {suffixAgo: "前", seconds: "刚刚", minute: "1分钟", minutes: "%d分钟", hour: "1小时", hours: "%d小时", days: "%d天", months: "%d月", years: "%d年", tomorrow: "明 %d", afterTomorrow: "后 %d", numbers: []}}, inWords: function (t) {
        function e(t, e) {
            var n = d.numbers && d.numbers[e] || e;
            return t.replace(/%d/i, n)
        }

        var n = l.settings.relative;
        if (n && u(t))return t.format("yyyy-MM-dd");
        if (n && a(t))return t.format("MM-dd hh:mm");
        var i = o(t);
        if (0 > i) {
            var r = new Date, c = s(t.format("yyyy-MM-dd"), r.format("yyyy-MM-dd")), f = t.format("hh:mm"), h = ["今", "明", "后"], p = t.format("MM-dd") + " ";
            return(0 == c || 1 == c || 2 == c) && (p = h[c]), p + f
        }
        var d = this.settings.strings, m = d.suffixAgo, g = Math.abs(i) / 1e3, v = g / 60, y = v / 60, A = y / 24, w = A / 30, b = A / 365;
        return words = 60 > g ? e(d.seconds, Math.floor(g)) : 60 > v ? e(d.minutes, Math.floor(v)) : 24 > y ? e(d.hours, Math.floor(y)) : 30 > A ? e(d.days, Math.floor(A)) : 365 > A ? e(d.months, Math.floor(w)) : e(d.years, Math.floor(b)), "刚刚" == words ? words : words + m
    }, parse: function (t) {
        var e = t.trim();
        e = e.replace(/\.\d+/, ""), e = e.replace(/-/, "/").replace(/-/, "/"), e = e.replace(/T/, " ").replace(/Z/, " UTC"), e = e.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        var n = new Date(e), i = n.getTime() + c;
        return new Date(i)
    }, datetime: function (t) {
        var e = t.attr(l.isTime(t) ? "datetime" : "title");
        return l.parse(e)
    }, isTime: function (e) {
        return"time" === t(e).get(0).tagName.toLowerCase()
    }};
    t.fn.timeago = function (t) {
        return this.each(function () {
            n.call(this, t)
        }), this
    }
}($), !function () {
    var t = !1, e = "qjianke.w", n = "http://10.6.131.78:8745", i = "http://10.6.131.78:8746", r = {url: n + "/putTouchLogger", debugSrc: i + "/target/target-script-min.js#" + e}, o = function (t) {
        var e = document.createElement("script");
        e.setAttribute("type", "text/javascript"), e.setAttribute("src", t), document.getElementsByTagName("body")[0].appendChild(e)
    }, a = function () {
        var n = window.location.href;
        if (!/^http.+/gi.test(n))return void(t = !0);
        var i = window.location.search;
        if ("undefined" == typeof localStorage && (localStorage = !1), /\?.+/gi.test(i)) {
            i = i.slice(1);
            var r, o, a = i.split("&");
            for (r = 0, o = a.length; o > r; r++) {
                if (/^development.+/gi.test(a[r])) {
                    var s = a[r].split("=");
                    "development" != s[0] || "1" != s[1] && "true" != s[1] || (t = !0, localStorage && localStorage.setItem("__deveopment__", 1))
                }
                /^devuser.+/gi.test(a[r]) && (e = a[r].split("=")[1])
            }
        }
        localStorage && 1 === parseInt(localStorage.getItem("__deveopment__"), 10) && (t = !0), ("localhost" === location.hostname || "127.0.0.1" === location.hostname) && (t = !0)
    }, s = function () {
        t && (console && console.log(arguments), arguments[arguments.length] = navigator.userAgent, arguments.length++, (new Image).src = r.url + "?user=" + e + "&data=" + encodeURIComponent(JSON.stringify(arguments)))
    };
    t && (window.onerror = function () {
        s.apply(null, arguments)
    }, window.addEventListener("load", function () {
        o(r.debugSrc)
    }, !1)), window.log = "object" == typeof console ? console.log : function () {
    }, window.logger = s, a()
}();
var weixin = "undefined" == typeof weixin ? {} : weixin, wx = "undefined" == typeof wx ? {} : wx;
wx.onReady = weixin.onReady = function (t) {
    var e = -1 !== location.hostname.search("toutiao.com"), n = e ? "Wm3WZYTPz0wzccnW" : "Wm3WQYJPz0iankenW", i = Date.now(), r = e ? "wxe8b89be1715734a6" : "wx53fcf3395bc0fe5e", o = !1, a = function (e) {
        1 == e.code && wx.config({debug: o, appId: r, timestamp: i, nonceStr: n, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]}), wx.ready(function () {
            t && t.apply(wx, arguments)
        }), wx.error(function (t) {
            console.debug(t)
        })
    }, s = document.createElement("script");
    s.type = "text/javascript", s.src = "//s3.pstatp.com/js/weixin_jssdk.js?ver=0301";
    var u = document.getElementsByTagName("head")[0];
    u.appendChild(s), s.onload = function () {
        $.ajax({type: "GET", dataType: "jsonp", jsonp: "callback", data: {appid: r, noncestr: n, timestamp: i, url: window.location.href}, url: location.protocol + "//open.snssdk.com/jssdk_signature/", success: a})
    }
}, hasMore = "undefined" == typeof hasMore ? !1 : "True" === hasMore ? !0 : !1, function () {
    function checkWebpFeature(t, e) {
        var n = {lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==", alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==", animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}, i = new Image;
        i.onload = function () {
            var t = i.width > 0 && i.height > 0;
            e(t)
        }, i.onerror = function () {
            e(!1)
        }, i.src = "data:image/webp;base64," + n[t]
    }

    var URL_PATH = location.pathname, pageVideoItemTmpl = function (obj) {
        var __t, __p = "";
        with (Array.prototype.join, obj || {}) {
            __p += "";
            var i, item, len = list.length;
            for (i = 0; len > i; i++) {
                item = list[i];
                try {
                    item.group_id_str = item.display_url.match(/^http:\/\/toutiao.com\/group\/(\d{1,})\//)[1]
                } catch (e) {
                }
                __p += '\n<a class="videolink" href="' + (null == (__t = item.display_url) ? "" : __t) + "?app=video_article&scheme=snssdk141%3A%2F%2Fdetail%3Fgroupid%3D" + (null == (__t = item.group_id_str || item.group_id) ? "" : __t) + '">\n<div class="video" itemid="video">\n    <div class="imginfo all-nobg-onepix">\n        <img class="img" src="' + (null == (__t = item.middle_image.url) ? "" : __t) + '" alt=""/>\n        <span class="duration" data-duration="' + (null == (__t = item.video_duration) ? "" : __t) + '">' + (null == (__t = item.video_duration) ? "" : __t) + '</span>\n    </div>\n    <div class="textinfo">\n        <div class="boxin">\n            <div class="inner">\n                <p class="title">' + (null == (__t = item.title) ? "" : __t) + '</p>\n                <p class="info">\n                    <span><em data-count="' + (null == (__t = item.video_detail_info.video_watch_count) ? "" : __t) + '">' + (null == (__t = item.video_detail_info.video_watch_count) ? "" : __t) + '</em>次观看</span>\n                    <span class="time" item="time" title="' + (null == (__t = item.publish_time) ? "" : __t) + '">' + (null == (__t = item.publish_time) ? "" : __t) + "</span>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n</a>\n"
            }
            __p += ""
        }
        return __p
    }, WEBP_ANIMATION_SUPPORT = "WEBP_ANIMATION_SUPPORT", webpAnimataionSupportDetect = function (t) {
        checkWebpFeature("animation", t)
    }, setWebpAnimationSupport = function (t) {
        localStorage.setItem(WEBP_ANIMATION_SUPPORT, t)
    }, loadWebpAnimationSupportFromLocalStorage = function () {
        var t;
        try {
            t = localStorage.getItem(WEBP_ANIMATION_SUPPORT)
        } catch (e) {
            webpAnimataionSupportDetect(setWebpAnimationSupport)
        }
        return(void 0 === t || null === t) && webpAnimataionSupportDetect(setWebpAnimationSupport), "true" === t ? !0 : !1
    }, getVipIconClass = function (t, e) {
        var n;
        return n = "0" === t ? "vip-certified" : "1" === t ? e ? "vip-outstanding-webp" : "vip-outstanding-png" : "vip-none", "user-vip " + n
    }, parseQuery = function () {
        var t = {}, e = window.location.search;
        if (/\?.+/.test(e)) {
            e = e.slice(1);
            var n, i, r, o = e.split("&");
            for (n = 0, i = o.length; i > n; n++)r = o[n].split("="), 2 === r.length && (t[r[0]] = decodeURIComponent(r[1]))
        }
        return t
    }, formatVideoTime = function (t) {
        var e, n, i, r = parseInt(t, 10);
        e = parseInt(r / 3600, 10), n = parseInt((r - 3600 * e) / 60, 10), i = r % 60;
        var o = [];
        return e > 0 && (o.push((9 >= e ? "0" : "") + e), o.push(":")), o.push((9 >= n ? "0" : "") + n), o.push(":"), o.push((9 >= i ? "0" : "") + i), o.join("")
    }, formatPublishTime = function (t) {
        var e = new Date(1e3 * parseInt(t, 10)), n = [e.getFullYear(), "-"];
        return n.push((e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1)), n.push("-"), n.push((e.getDate() <= 9 ? "0" : "") + e.getDate()), n.push(" "), n.push((e.getHours() <= 9 ? "0" : "") + e.getHours()), n.push(":"), n.push((e.getMinutes() <= 9 ? "0" : "") + e.getMinutes()), n.join("")
    }, formatPlayCount = function (t) {
        var e = "万", n = parseInt(t, 10);
        return n > 1e4 && 1e8 > n ? (n = Number(n / 1e4).toFixed(1), parseFloat(n) === parseInt(n, 10) ? n = parseInt(n, 10) + e : n += e) : n > 1e8 && (e = "亿", n = Number(n / 1e8).toFixed(0) + e), n
    }, checkItemStatus = function (t) {
        var e = t.find('[itemid="video"]');
        e.each(function () {
            var t = $(this);
            if (!t.attr("loaded")) {
                t.attr("loaded", 1);
                var e = t.find("[data-duration]"), n = t.find("[data-count]"), i = t.find('[item="time"]'), r = t.find(".img");
                e.text(formatVideoTime(e.attr("data-duration"))), n.text(formatPlayCount(n.attr("data-count"))), i.attr("title", formatPublishTime(i.attr("title"))), i.timeago({relative: !0}), r[0].onerror = function () {
                    var t = r.attr("src");
                    r.attr("src", t.replace(/p1-xg/, "p3-xg"))
                }
            }
        }), hasMore || $("#nomore").show()
    }, startLoad = function () {
        var t, e, n, i = $("#videolist"), r = $(window), o = $(document), a = $("#loading"), s = $(".user-vip"), u = $(".user-auth-type"), c = parseQuery(), l = !1, f = function () {
            var t = u.html(), e = loadWebpAnimationSupportFromLocalStorage(), n = getVipIconClass(t, e);
            s.attr("class", n)
        };
        f();
        var h = function () {
            return o.height() <= r.scrollTop() + window.innerHeight + 100 ? !0 : !1
        }, p = function (t) {
            hasMore = t.has_more, n = t.data[t.total_number - 1].behot_time, i.append(pageVideoItemTmpl({list: t.data})), a.hide(), checkItemStatus(i)
        }, d = function () {
            return e ? n : (e = 1, i.find('[itemid="video"]').eq(totalNumber - 1).attr("data-behot"))
        }, m = function () {
            if (!l) {
                if (!hasMore)return a.hide(), void $("#nomore").show();
                l = !0, a.show(), $.ajax({url: URL_PATH, dataType: "json", data: $.extend({}, c || {}, {max_behot_time: d(), format: "json"}), success: function (t) {
                    l = !1, t && t.data && t.data.length > 0 ? p(t) : (hasMore = !1, $("#loading").hide(), $("#nomore").show()), logger("success", t)
                }, error: function () {
                    l = !1, hasMore = !1, a.hide(), alert("网络异常,刷新重试")
                }})
            }
        };
        r.on("scroll", function () {
            t && clearTimeout(t), t = setTimeout(function () {
                h() && m()
            }, 10)
        }), checkItemStatus(i), setTimeout(function () {
            try {
                wx.onReady(function () {
                    var t = $("meta[name=weixin-share-content]");
                    if (t.length) {
                        var e = {title: t.attr("title"), desc: t.attr("desc"), link: t.attr("link") || location.href, imgUrl: t.attr("icon")};
                        wx.onMenuShareAppMessage(e);
                        var n = $.extend({}, e);
                        n.title = n.desc, wx.onMenuShareTimeline(n)
                    }
                })
            } catch (t) {
            }
        }, 10)
    }, App = function () {
        startLoad()
    };
    $(App)
}();