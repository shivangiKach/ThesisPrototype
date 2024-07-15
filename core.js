var requirejs,
    require,
    define;
!function(global, setTimeout) {
    var req,
        s,
        head,
        baseElement,
        dataMain,
        src,
        interactiveScript,
        currentlyAddingScript,
        mainScript,
        subPath,
        version = "2.3.6",
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    function commentReplace(e, t) {
        return t || ""
    }
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }
    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }
    function each(e, t) {
        var n;
        if (e)
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1)
                ;
    }
    function eachReverse(e, t) {
        var n;
        if (e)
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1)
                ;
    }
    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }
    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }
    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n))
                break
    }
    function mixin(e, t, n, r) {
        return t && eachProp(t, function(t, i) {
            !n && hasProp(e, i) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
        }), e
    }
    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function defaultOnError(e) {
        throw e
    }
    function getGlobal(e) {
        if (!e)
            return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }
    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttps://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }
    if (void 0 === define) {
        if (void 0 !== requirejs) {
            if (isFunction(requirejs))
                return;
            cfg = requirejs,
                requirejs = void 0
        }
        void 0 === require || isFunction(require) || (cfg = require, require = void 0),
            req = requirejs = function(e, t, n, r) {
                var i,
                    o,
                    a = defContextName;
                return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = r) : e = []), o && o.context && (a = o.context), (i = getOwn(contexts, a)) || (i = contexts[a] = req.s.newContext(a)), o && i.configure(o), i.require(e, t, n)
            },
            req.config = function(e) {
                return req(e)
            },
            req.nextTick = void 0 !== setTimeout ? function(e) {
                setTimeout(e, 4)
            } : function(e) {
                e()
            },
        require || (require = req),
            req.version = version,
            req.jsExtRegExp = /^\/|:|\?|\.js$/,
            req.isBrowser = isBrowser,
            s = req.s = {
                contexts: contexts,
                newContext: newContext
            },
            req({}),
            each(["toUrl", "undef", "defined", "specified"], function(e) {
                req[e] = function() {
                    var t = contexts[defContextName];
                    return t.require[e].apply(t, arguments)
                }
            }),
        isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
            req.onError = defaultOnError,
            req.createNode = function(e, t, n) {
                var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
            },
            req.load = function(e, t, n) {
                var r,
                    i = e && e.config || {};
                if (isBrowser)
                    return (r = req.createNode(i, t, n)).setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = n, i.onNodeCreated && i.onNodeCreated(r, i, t, n), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
                if (isWebWorker)
                    try {
                        setTimeout(function() {}, 0),
                            importScripts(n),
                            e.completeLoad(t)
                    } catch (r) {
                        e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, r, [t]))
                    }
            },
        isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main"))
                return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }),
            define = function(e, t, n) {
                var r,
                    i;
                "string" != typeof e && (n = t, t = e, e = null),
                isArray(t) || (n = t, t = null),
                !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(e, n) {
                    t.push(n)
                }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))),
                useInteractive && (r = currentlyAddingScript || getInteractiveScript()) && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")]),
                    i ? (i.defQueue.push([e, t, n]), i.defQueueMap[e] = !0) : globalDefQueue.push([e, t, n])
            },
            define.amd = {
                jQuery: !0
            },
            req.exec = function(text) {
                return eval(text)
            },
            req(cfg)
    }
    function newContext(e) {
        var t,
            n,
            r,
            i,
            o,
            a = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            s = {},
            u = {},
            c = {},
            l = [],
            d = {},
            p = {},
            f = {},
            h = 1,
            g = 1;
        function m(e, t, n) {
            var r,
                i,
                o,
                s,
                u,
                c,
                l,
                d,
                p,
                f,
                h = t && t.split("/"),
                g = a.map,
                m = g && g["*"];
            if (e && (c = (e = e.split("/")).length - 1, a.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && h && (e = h.slice(0, h.length - 1).concat(e)), function(e) {
                var t,
                    n;
                for (t = 0; t < e.length; t++)
                    if ("." === (n = e[t]))
                        e.splice(t, 1),
                            t -= 1;
                    else if (".." === n) {
                        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
                            continue;
                        t > 0 && (e.splice(t - 1, 2), t -= 2)
                    }
            }(e), e = e.join("/")), n && g && (h || m)) {
                e:
                    for (o = (i = e.split("/")).length; o > 0; o -= 1) {
                        if (u = i.slice(0, o).join("/"), h)
                            for (s = h.length; s > 0; s -= 1)
                                if ((r = getOwn(g, h.slice(0, s).join("/"))) && (r = getOwn(r, u))) {
                                    l = r,
                                        d = o;
                                    break e
                                }
                        !p && m && getOwn(m, u) && (p = getOwn(m, u), f = o)
                    }
                !l && p && (l = p, d = f),
                l && (i.splice(0, d, l), e = i.join("/"))
            }
            return getOwn(a.pkgs, e) || e
        }
        function v(e) {
            isBrowser && each(scripts(), function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName)
                    return t.parentNode.removeChild(t), !0
            })
        }
        function y(e) {
            var t = getOwn(a.paths, e);
            if (t && isArray(t) && t.length > 1)
                return t.shift(), r.require.undef(e), r.makeRequire(null, {
                    skipMap: !0
                })([e]), !0
        }
        function b(e) {
            var t,
                n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }
        function x(e, t, n, i) {
            var o,
                a,
                s,
                u,
                c = null,
                l = t ? t.name : null,
                p = e,
                f = !0,
                v = "";
            return e || (f = !1, e = "_@r" + (h += 1)), c = (u = b(e))[0], e = u[1], c && (c = m(c, l, i), a = getOwn(d, c)), e && (c ? v = n ? e : a && a.normalize ? a.normalize(e, function(e) {
                return m(e, l, i)
            }) : -1 === e.indexOf("!") ? m(e, l, i) : e : (c = (u = b(v = m(e, l, i)))[0], v = u[1], n = !0, o = r.nameToUrl(v))), {
                prefix: c,
                name: v,
                parentMap: t,
                unnormalized: !!(s = !c || a || n ? "" : "_unnormalized" + (g += 1)),
                url: o,
                originalName: p,
                isDefine: f,
                id: (c ? c + "!" + v : v) + s
            }
        }
        function w(e) {
            var t = e.id,
                n = getOwn(s, t);
            return n || (n = s[t] = new r.Module(e)), n
        }
        function k(e, t, n) {
            var r = e.id,
                i = getOwn(s, r);
            !hasProp(d, r) || i && !i.defineEmitComplete ? (i = w(e)).error && "error" === t ? n(i.error) : i.on(t, n) : "defined" === t && n(d[r])
        }
        function C(e, t) {
            var n = e.requireModules,
                r = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(s, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }
        function T() {
            globalDefQueue.length && (each(globalDefQueue, function(e) {
                var t = e[0];
                "string" == typeof t && (r.defQueueMap[t] = !0),
                    l.push(e)
            }), globalDefQueue = [])
        }
        function E(e) {
            delete s[e],
                delete u[e]
        }
        function S() {
            var e,
                n,
                i = 1e3 * a.waitSeconds,
                c = i && r.startTime + i < (new Date).getTime(),
                l = [],
                p = [],
                f = !1,
                h = !0;
            if (!t) {
                if (t = !0, eachProp(u, function(e) {
                    var t = e.map,
                        r = t.id;
                    if (e.enabled && (t.isDefine || p.push(e), !e.error))
                        if (!e.inited && c)
                            y(r) ? (n = !0, f = !0) : (l.push(r), v(r));
                        else if (!e.inited && e.fetched && t.isDefine && (f = !0, !t.prefix))
                            return h = !1
                }), c && l.length)
                    return (e = makeError("timeout", "Load timeout for modules: " + l, null, l)).contextName = r.contextName, C(e);
                h && each(p, function(e) {
                    !function e(t, n, r) {
                        var i = t.map.id;
                        t.error ? t.emit("error", t.error) : (n[i] = !0, each(t.depMaps, function(i, o) {
                            var a = i.id,
                                u = getOwn(s, a);
                            !u || t.depMatched[o] || r[a] || (getOwn(n, a) ? (t.defineDep(o, d[a]), t.check()) : e(u, n, r))
                        }), r[i] = !0)
                    }(e, {}, {})
                }),
                c && !n || !f || !isBrowser && !isWebWorker || o || (o = setTimeout(function() {
                    o = 0,
                        S()
                }, 50)),
                    t = !1
            }
        }
        function N(e) {
            hasProp(d, e[0]) || w(x(e[0], null, !0)).init(e[1], e[2])
        }
        function A(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }
        function q(e) {
            var t = e.currentTarget || e.srcElement;
            return A(t, r.onScriptLoad, "load", "onreadystatechange"), A(t, r.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        function j() {
            var e;
            for (T(); l.length;) {
                if (null === (e = l.shift())[0])
                    return C(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                N(e)
            }
            r.defQueueMap = {}
        }
        return i = {
            require: function(e) {
                return e.require ? e.require : e.require = r.makeRequire(e.map)
            },
            exports: function(e) {
                if (e.usingExports = !0, e.map.isDefine)
                    return e.exports ? d[e.map.id] = e.exports : e.exports = d[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(a.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, (n = function(e) {
            this.events = getOwn(c, e.id) || {},
                this.map = e,
                this.shim = getOwn(a.shim, e.id),
                this.depExports = [],
                this.depMaps = [],
                this.depMatched = [],
                this.pluginMaps = {},
                this.depCount = 0
        }).prototype = {
            init: function(e, t, n, r) {
                r = r || {},
                this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0,
                        r.startTime = (new Date).getTime();
                    var e = this.map;
                    if (!this.shim)
                        return e.prefix ? this.callPlugin() : this.load();
                    r.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    }))
                }
            },
            load: function() {
                var e = this.map.url;
                p[e] || (p[e] = !0, r.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e,
                        t,
                        n = this.map.id,
                        i = this.depExports,
                        o = this.exports,
                        a = this.factory;
                    if (this.inited) {
                        if (this.error)
                            this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(a)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                                        try {
                                            o = r.execCb(n, a, i, o)
                                        } catch (t) {
                                            e = t
                                        }
                                    else
                                        o = r.execCb(n, a, i, o);
                                    if (this.map.isDefine && void 0 === o && ((t = this.module) ? o = t.exports : this.usingExports && (o = this.exports)), e)
                                        return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", C(this.error = e)
                                } else
                                    o = a;
                                if (this.exports = o, this.map.isDefine && !this.ignore && (d[n] = o, req.onResourceLoad)) {
                                    var s = [];
                                    each(this.depMaps, function(e) {
                                        s.push(e.normalizedMap || e)
                                    }),
                                        req.onResourceLoad(r, this.map, s)
                                }
                                E(n),
                                    this.defined = !0
                            }
                            this.defining = !1,
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else
                        hasProp(r.defQueueMap, n) || this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    n = x(e.prefix);
                this.depMaps.push(n),
                    k(n, "defined", bind(this, function(n) {
                        var i,
                            o,
                            u,
                            c = getOwn(f, this.map.id),
                            l = this.map.name,
                            d = this.map.parentMap ? this.map.parentMap.name : null,
                            p = r.makeRequire(e.parentMap, {
                                enableBuildCallback: !0
                            });
                        return this.map.unnormalized ? (n.normalize && (l = n.normalize(l, function(e) {
                            return m(e, d, !0)
                        }) || ""), k(o = x(e.prefix + "!" + l, this.map.parentMap, !0), "defined", bind(this, function(e) {
                            this.map.normalizedMap = o,
                                this.init([], function() {
                                    return e
                                }, null, {
                                    enabled: !0,
                                    ignore: !0
                                })
                        })), void ((u = getOwn(s, o.id)) && (this.depMaps.push(o), this.events.error && u.on("error", bind(this, function(e) {
                            this.emit("error", e)
                        })), u.enable()))) : c ? (this.map.url = r.nameToUrl(c), void this.load()) : ((i = bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0
                            })
                        })).error = bind(this, function(e) {
                            this.inited = !0,
                                this.error = e,
                                e.requireModules = [t],
                                eachProp(s, function(e) {
                                    0 === e.map.id.indexOf(t + "_unnormalized") && E(e.map.id)
                                }),
                                C(e)
                        }), i.fromText = bind(this, function(n, o) {
                            var s = e.name,
                                u = x(s),
                                c = useInteractive;
                            o && (n = o),
                            c && (useInteractive = !1),
                                w(u),
                            hasProp(a.config, t) && (a.config[s] = a.config[t]);
                            try {
                                req.exec(n)
                            } catch (e) {
                                return C(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]))
                            }
                            c && (useInteractive = !0),
                                this.depMaps.push(u),
                                r.completeLoad(s),
                                p([s], i)
                        }), void n.load(e.name, p, i, a))
                    })),
                    r.enable(n, this),
                    this.pluginMaps[n.id] = n
            },
            enable: function() {
                u[this.map.id] = this,
                    this.enabled = !0,
                    this.enabling = !0,
                    each(this.depMaps, bind(this, function(e, t) {
                        var n,
                            o,
                            a;
                        if ("string" == typeof e) {
                            if (e = x(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, a = getOwn(i, e.id))
                                return void (this.depExports[t] = a(this));
                            this.depCount += 1,
                                k(e, "defined", bind(this, function(e) {
                                    this.undefed || (this.defineDep(t, e), this.check())
                                })),
                                this.errback ? k(e, "error", bind(this, this.errback)) : this.events.error && k(e, "error", bind(this, function(e) {
                                    this.emit("error", e)
                                }))
                        }
                        n = e.id,
                            o = s[n],
                        hasProp(i, n) || !o || o.enabled || r.enable(e, this)
                    })),
                    eachProp(this.pluginMaps, bind(this, function(e) {
                        var t = getOwn(s, e.id);
                        t && !t.enabled && r.enable(e, this)
                    })),
                    this.enabling = !1,
                    this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []),
                    n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }),
                "error" === e && delete this.events[e]
            }
        }, (r = {
            config: a,
            contextName: e,
            registry: s,
            defined: d,
            urlFetched: p,
            defQueue: l,
            defQueueMap: {},
            Module: n,
            makeModuleMap: x,
            nextTick: req.nextTick,
            onError: C,
            configure: function(e) {
                if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
                    var t = e.urlArgs;
                    e.urlArgs = function(e, n) {
                        return (-1 === n.indexOf("?") ? "?" : "&") + t
                    }
                }
                var n = a.shim,
                    i = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    i[t] ? (a[t] || (a[t] = {}), mixin(a[t], e, !0, !0)) : a[t] = e
                }),
                e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (f[e] = t)
                    })
                }),
                e.shim && (eachProp(e.shim, function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }),
                    !e.exports && !e.init || e.exportsFn || (e.exportsFn = r.makeShimExports(e)),
                        n[t] = e
                }), a.shim = n),
                e.packages && each(e.packages, function(e) {
                    var t;
                    t = (e = "string" == typeof e ? {
                        name: e
                    } : e).name,
                    e.location && (a.paths[t] = e.location),
                        a.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }),
                    eachProp(s, function(e, t) {
                        e.inited || e.map.unnormalized || (e.map = x(t, null, !0))
                    }),
                (e.deps || e.callback) && r.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                return function() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
            },
            makeRequire: function(t, n) {
                function o(a, u, c) {
                    var l,
                        p;
                    return n.enableBuildCallback && u && isFunction(u) && (u.__requireJsBuild = !0), "string" == typeof a ? isFunction(u) ? C(makeError("requireargs", "Invalid require call"), c) : t && hasProp(i, a) ? i[a](s[t.id]) : req.get ? req.get(r, a, t, o) : (l = x(a, t, !1, !0).id, hasProp(d, l) ? d[l] : C(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (j(), r.nextTick(function() {
                        j(),
                            (p = w(x(null, t))).skipMap = n.skipMap,
                            p.init(a, u, c, {
                                enabled: !0
                            }),
                            S()
                    }), o)
                }
                return n = n || {}, mixin(o, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var n,
                            i = e.lastIndexOf("."),
                            o = e.split("/")[0];
                        return -1 !== i && (!("." === o || ".." === o) || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(m(e, t && t.id, !0), n, !0)
                    },
                    defined: function(e) {
                        return hasProp(d, x(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = x(e, t, !1, !0).id, hasProp(d, e) || hasProp(s, e)
                    }
                }), t || (o.undef = function(e) {
                    T();
                    var n = x(e, t, !0),
                        i = getOwn(s, e);
                    i.undefed = !0,
                        v(e),
                        delete d[e],
                        delete p[n.url],
                        delete c[e],
                        eachReverse(l, function(t, n) {
                            t[0] === e && l.splice(n, 1)
                        }),
                        delete r.defQueueMap[e],
                    i && (i.events.defined && (c[e] = i.events), E(e))
                }), o
            },
            enable: function(e) {
                getOwn(s, e.id) && w(e).enable()
            },
            completeLoad: function(e) {
                var t,
                    n,
                    i,
                    o = getOwn(a.shim, e) || {},
                    u = o.exports;
                for (T(); l.length;) {
                    if (null === (n = l.shift())[0]) {
                        if (n[0] = e, t)
                            break;
                        t = !0
                    } else
                        n[0] === e && (t = !0);
                    N(n)
                }
                if (r.defQueueMap = {}, i = getOwn(s, e), !t && !hasProp(d, e) && i && !i.inited) {
                    if (!(!a.enforceDefine || u && getGlobal(u)))
                        return y(e) ? void 0 : C(makeError("nodefine", "No define call for " + e, null, [e]));
                    N([e, o.deps || [], o.exportsFn])
                }
                S()
            },
            nameToUrl: function(e, t, n) {
                var i,
                    o,
                    s,
                    u,
                    c,
                    l,
                    d = getOwn(a.pkgs, e);
                if (d && (e = d), l = getOwn(f, e))
                    return r.nameToUrl(l, t, n);
                if (req.jsExtRegExp.test(e))
                    u = e + (t || "");
                else {
                    for (i = a.paths, s = (o = e.split("/")).length; s > 0; s -= 1)
                        if (c = getOwn(i, o.slice(0, s).join("/"))) {
                            isArray(c) && (c = c[0]),
                                o.splice(0, s, c);
                            break
                        }
                    u = o.join("/"),
                        u = ("/" === (u += t || (/^data\:|^blob\:|\?/.test(u) || n ? "" : ".js")).charAt(0) || u.match(/^[\w\+\.\-]+:/) ? "" : a.baseUrl) + u
                }
                return a.urlArgs && !/^blob\:/.test(u) ? u + a.urlArgs(e, u) : u
            },
            load: function(e, t) {
                req.load(r, e, t)
            },
            execCb: function(e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = q(e);
                    r.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = q(e);
                if (!y(t.id)) {
                    var n = [];
                    return eachProp(s, function(e, r) {
                        0 !== r.indexOf("_@r") && each(e.depMaps, function(e) {
                            if (e.id === t.id)
                                return n.push(r), !0
                        })
                    }), C(makeError("scripterror", 'Script error for "' + t.id + (n.length ? '", needed by: ' + n.join(", ") : '"'), e, [t.id]))
                }
            }
        }).require = r.makeRequire(), r
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
            if ("interactive" === e.readyState)
                return interactiveScript = e
        }), interactiveScript)
    }
}(this, "undefined" == typeof setTimeout ? void 0 : setTimeout),
    function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document)
                throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        "use strict";
        var n = [],
            r = Object.getPrototypeOf,
            i = n.slice,
            o = n.flat ? function(e) {
                return n.flat.call(e)
            } : function(e) {
                return n.concat.apply([], e)
            },
            a = n.push,
            s = n.indexOf,
            u = {},
            c = u.toString,
            l = u.hasOwnProperty,
            d = l.toString,
            p = d.call(Object),
            f = {},
            h = function(e) {
                return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
            },
            g = function(e) {
                return null != e && e === e.window
            },
            m = e.document,
            v = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
        function y(e, t, n) {
            var r,
                i,
                o = (n = n || m).createElement("script");
            if (o.text = e, t)
                for (r in v)
                    (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
            n.head.appendChild(o).parentNode.removeChild(o)
        }
        function b(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[c.call(e)] || "object" : typeof e
        }
        var x = function(e, t) {
            return new x.fn.init(e, t)
        };
        function w(e) {
            var t = !!e && "length" in e && e.length,
                n = b(e);
            return !h(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }
        x.fn = x.prototype = {
            jquery: "3.6.0",
            constructor: x,
            length: 0,
            toArray: function() {
                return i.call(this)
            },
            get: function(e) {
                return null == e ? i.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = x.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return x.each(this, e)
            },
            map: function(e) {
                return this.pushStack(x.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(i.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(x.grep(this, function(e, t) {
                    return (t + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(x.grep(this, function(e, t) {
                    return t % 2
                }))
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: a,
            sort: n.sort,
            splice: n.splice
        },
            x.extend = x.fn.extend = function() {
                var e,
                    t,
                    n,
                    r,
                    i,
                    o,
                    a = arguments[0] || {},
                    s = 1,
                    u = arguments.length,
                    c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || h(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
                    if (null != (e = arguments[s]))
                        for (t in e)
                            r = e[t],
                            "__proto__" !== t && a !== r && (c && r && (x.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || x.isPlainObject(n) ? n : {}, i = !1, a[t] = x.extend(c, o, r)) : void 0 !== r && (a[t] = r));
                return a
            },
            x.extend({
                expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isPlainObject: function(e) {
                    var t,
                        n;
                    return !(!e || "[object Object]" !== c.call(e)) && (!(t = r(e)) || "function" == typeof (n = l.call(t, "constructor") && t.constructor) && d.call(n) === p)
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e)
                        return !1;
                    return !0
                },
                globalEval: function(e, t, n) {
                    y(e, {
                        nonce: t && t.nonce
                    }, n)
                },
                each: function(e, t) {
                    var n,
                        r = 0;
                    if (w(e))
                        for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                            ;
                    else
                        for (r in e)
                            if (!1 === t.call(e[r], r, e[r]))
                                break;
                    return e
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return null != e && (w(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
                },
                inArray: function(e, t, n) {
                    return null == t ? -1 : s.call(t, e, n)
                },
                merge: function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                        e[i++] = t[r];
                    return e.length = i, e
                },
                grep: function(e, t, n) {
                    for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                        !t(e[i], i) !== a && r.push(e[i]);
                    return r
                },
                map: function(e, t, n) {
                    var r,
                        i,
                        a = 0,
                        s = [];
                    if (w(e))
                        for (r = e.length; a < r; a++)
                            null != (i = t(e[a], a, n)) && s.push(i);
                    else
                        for (a in e)
                            null != (i = t(e[a], a, n)) && s.push(i);
                    return o(s)
                },
                guid: 1,
                support: f
            }),
        "function" == typeof Symbol && (x.fn[Symbol.iterator] = n[Symbol.iterator]),
            x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                u["[object " + t + "]"] = t.toLowerCase()
            });
        var k = function(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s,
                u,
                c,
                l,
                d,
                p,
                f,
                h,
                g,
                m,
                v,
                y,
                b,
                x = "sizzle" + 1 * new Date,
                w = e.document,
                k = 0,
                C = 0,
                T = ue(),
                E = ue(),
                S = ue(),
                N = ue(),
                A = function(e, t) {
                    return e === t && (d = !0), 0
                },
                q = {}.hasOwnProperty,
                j = [],
                D = j.pop,
                L = j.push,
                O = j.push,
                P = j.slice,
                M = function(e, t) {
                    for (var n = 0, r = e.length; n < r; n++)
                        if (e[n] === t)
                            return n;
                    return -1
                },
                B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                R = "[\\x20\\t\\r\\n\\f]",
                I = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                H = "\\[" + R + "*(" + I + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + R + "*\\]",
                F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)",
                W = new RegExp(R + "+", "g"),
                $ = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
                _ = new RegExp("^" + R + "*," + R + "*"),
                z = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
                U = new RegExp(R + "|>"),
                X = new RegExp(F),
                Q = new RegExp("^" + I + "$"),
                V = {
                    ID: new RegExp("^#(" + I + ")"),
                    CLASS: new RegExp("^\\.(" + I + ")"),
                    TAG: new RegExp("^(" + I + "|[*])"),
                    ATTR: new RegExp("^" + H),
                    PSEUDO: new RegExp("^" + F),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + B + ")$", "i"),
                    needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
                },
                G = /HTML$/i,
                Y = /^(?:input|select|textarea|button)$/i,
                J = /^h\d$/i,
                K = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ee = /[+~]/,
                te = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"),
                ne = function(e, t) {
                    var n = "0x" + e.slice(1) - 65536;
                    return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
                },
                re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                ie = function(e, t) {
                    return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                oe = function() {
                    p()
                },
                ae = xe(function(e) {
                    return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                O.apply(j = P.call(w.childNodes), w.childNodes),
                    j[w.childNodes.length].nodeType
            } catch (e) {
                O = {
                    apply: j.length ? function(e, t) {
                        L.apply(e, P.call(t))
                    } : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];)
                            ;
                        e.length = n - 1
                    }
                }
            }
            function se(e, t, r, i) {
                var o,
                    s,
                    c,
                    l,
                    d,
                    h,
                    v,
                    y = t && t.ownerDocument,
                    w = t ? t.nodeType : 9;
                if (r = r || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w)
                    return r;
                if (!i && (p(t), t = t || f, g)) {
                    if (11 !== w && (d = Z.exec(e)))
                        if (o = d[1]) {
                            if (9 === w) {
                                if (!(c = t.getElementById(o)))
                                    return r;
                                if (c.id === o)
                                    return r.push(c), r
                            } else if (y && (c = y.getElementById(o)) && b(t, c) && c.id === o)
                                return r.push(c), r
                        } else {
                            if (d[2])
                                return O.apply(r, t.getElementsByTagName(e)), r;
                            if ((o = d[3]) && n.getElementsByClassName && t.getElementsByClassName)
                                return O.apply(r, t.getElementsByClassName(o)), r
                        }
                    if (n.qsa && !N[e + " "] && (!m || !m.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
                        if (v = e, y = t, 1 === w && (U.test(e) || z.test(e))) {
                            for ((y = ee.test(e) && ve(t.parentNode) || t) === t && n.scope || ((l = t.getAttribute("id")) ? l = l.replace(re, ie) : t.setAttribute("id", l = x)), s = (h = a(e)).length; s--;)
                                h[s] = (l ? "#" + l : ":scope") + " " + be(h[s]);
                            v = h.join(",")
                        }
                        try {
                            return O.apply(r, y.querySelectorAll(v)), r
                        } catch (t) {
                            N(e, !0)
                        } finally {
                            l === x && t.removeAttribute("id")
                        }
                    }
                }
                return u(e.replace($, "$1"), t, r, i)
            }
            function ue() {
                var e = [];
                return function t(n, i) {
                    return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                }
            }
            function ce(e) {
                return e[x] = !0, e
            }
            function le(e) {
                var t = f.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                        t = null
                }
            }
            function de(e, t) {
                for (var n = e.split("|"), i = n.length; i--;)
                    r.attrHandle[n[i]] = t
            }
            function pe(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (r)
                    return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t)
                            return -1;
                return e ? 1 : -1
            }
            function fe(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }
            function he(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }
            function ge(e) {
                return function(t) {
                    return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
                }
            }
            function me(e) {
                return ce(function(t) {
                    return t = +t, ce(function(n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)
                            n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }
            function ve(e) {
                return e && void 0 !== e.getElementsByTagName && e
            }
            for (t in n = se.support = {}, o = se.isXML = function(e) {
                var t = e && e.namespaceURI,
                    n = e && (e.ownerDocument || e).documentElement;
                return !G.test(t || n && n.nodeName || "HTML")
            }, p = se.setDocument = function(e) {
                var t,
                    i,
                    a = e ? e.ownerDocument || e : w;
                return a != f && 9 === a.nodeType && a.documentElement ? (h = (f = a).documentElement, g = !o(f), w != f && (i = f.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", oe, !1) : i.attachEvent && i.attachEvent("onunload", oe)), n.scope = le(function(e) {
                    return h.appendChild(e).appendChild(f.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                }), n.attributes = le(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = le(function(e) {
                    return e.appendChild(f.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = K.test(f.getElementsByClassName), n.getById = le(function(e) {
                    return h.appendChild(e).id = x, !f.getElementsByName || !f.getElementsByName(x).length
                }), n.getById ? (r.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, r.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (r.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }, r.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n,
                            r,
                            i,
                            o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o];
                            for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                if ((n = o.getAttributeNode("id")) && n.value === e)
                                    return [o]
                        }
                        return []
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n,
                        r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];)
                            1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && g)
                        return t.getElementsByClassName(e)
                }, v = [], m = [], (n.qsa = K.test(f.querySelectorAll)) && (le(function(e) {
                    var t;
                    h.appendChild(e).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + R + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length || m.push("\\[" + R + "*(?:value|" + B + ")"),
                    e.querySelectorAll("[id~=" + x + "-]").length || m.push("~="),
                        (t = f.createElement("input")).setAttribute("name", ""),
                        e.appendChild(t),
                    e.querySelectorAll("[name='']").length || m.push("\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"),
                    e.querySelectorAll(":checked").length || m.push(":checked"),
                    e.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]"),
                        e.querySelectorAll("\\\f"),
                        m.push("[\\r\\n\\f]")
                }), le(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = f.createElement("input");
                    t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length && m.push("name" + R + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"),
                        h.appendChild(e).disabled = !0,
                    2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        m.push(",.*:")
                })), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && le(function(e) {
                    n.disconnectedMatch = y.call(e, "*"),
                        y.call(e, "[s!='']:x"),
                        v.push("!=", F)
                }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = K.test(h.compareDocumentPosition), b = t || K.test(h.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e)
                                return !0;
                    return !1
                }, A = t ? function(e, t) {
                    if (e === t)
                        return d = !0, 0;
                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == f || e.ownerDocument == w && b(w, e) ? -1 : t == f || t.ownerDocument == w && b(w, t) ? 1 : l ? M(l, e) - M(l, t) : 0 : 4 & r ? -1 : 1)
                } : function(e, t) {
                    if (e === t)
                        return d = !0, 0;
                    var n,
                        r = 0,
                        i = e.parentNode,
                        o = t.parentNode,
                        a = [e],
                        s = [t];
                    if (!i || !o)
                        return e == f ? -1 : t == f ? 1 : i ? -1 : o ? 1 : l ? M(l, e) - M(l, t) : 0;
                    if (i === o)
                        return pe(e, t);
                    for (n = e; n = n.parentNode;)
                        a.unshift(n);
                    for (n = t; n = n.parentNode;)
                        s.unshift(n);
                    for (; a[r] === s[r];)
                        r++;
                    return r ? pe(a[r], s[r]) : a[r] == w ? -1 : s[r] == w ? 1 : 0
                }, f) : f
            }, se.matches = function(e, t) {
                return se(e, null, null, t)
            }, se.matchesSelector = function(e, t) {
                if (p(e), n.matchesSelector && g && !N[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t)))
                    try {
                        var r = y.call(e, t);
                        if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return r
                    } catch (e) {
                        N(t, !0)
                    }
                return se(t, f, null, [e]).length > 0
            }, se.contains = function(e, t) {
                return (e.ownerDocument || e) != f && p(e), b(e, t)
            }, se.attr = function(e, t) {
                (e.ownerDocument || e) != f && p(e);
                var i = r.attrHandle[t.toLowerCase()],
                    o = i && q.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
                return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
            }, se.escape = function(e) {
                return (e + "").replace(re, ie)
            }, se.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, se.uniqueSort = function(e) {
                var t,
                    r = [],
                    i = 0,
                    o = 0;
                if (d = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(A), d) {
                    for (; t = e[o++];)
                        t === e[o] && (i = r.push(o));
                    for (; i--;)
                        e.splice(r[i], 1)
                }
                return l = null, e
            }, i = se.getText = function(e) {
                var t,
                    n = "",
                    r = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += i(e)
                    } else if (3 === o || 4 === o)
                        return e.nodeValue
                } else
                    for (; t = e[r++];)
                        n += i(t);
                return n
            }, (r = se.selectors = {
                cacheLength: 50,
                createPseudo: ce,
                match: V,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t,
                            n = !e[6] && e[2];
                        return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = T[e + " "];
                        return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && T(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = se.attr(r, e);
                            return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(W, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var c,
                                l,
                                d,
                                p,
                                f,
                                h,
                                g = o !== a ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                y = !u && !s,
                                b = !1;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (p = t; p = p[g];)
                                            if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType)
                                                return !1;
                                        h = g = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                    for (b = (f = (c = (l = (d = (p = m)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === k && c[1]) && c[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (b = f = 0) || h.pop();)
                                        if (1 === p.nodeType && ++b && p === t) {
                                            l[e] = [k, f, b];
                                            break
                                        }
                                } else if (y && (b = f = (c = (l = (d = (p = t)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === k && c[1]), !1 === b)
                                    for (; (p = ++f && p && p[g] || (b = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++b || (y && ((l = (d = p[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] = [k, b]), p !== t));)
                                        ;
                                return (b -= i) === r || b % r == 0 && b / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n,
                            i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                        return i[x] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function(e, n) {
                            for (var r, o = i(e, t), a = o.length; a--;)
                                e[r = M(e, o[a])] = !(n[r] = o[a])
                        }) : function(e) {
                            return i(e, 0, n)
                        }) : i
                    }
                },
                pseudos: {
                    not: ce(function(e) {
                        var t = [],
                            n = [],
                            r = s(e.replace($, "$1"));
                        return r[x] ? ce(function(e, t, n, i) {
                            for (var o, a = r(e, null, i, []), s = e.length; s--;)
                                (o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: ce(function(e) {
                        return function(t) {
                            return se(e, t).length > 0
                        }
                    }),
                    contains: ce(function(e) {
                        return e = e.replace(te, ne), function(t) {
                            return (t.textContent || i(t)).indexOf(e) > -1
                        }
                    }),
                    lang: ce(function(e) {
                        return Q.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(), function(t) {
                            var n;
                            do {
                                if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                    return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === h
                    },
                    focus: function(e) {
                        return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !r.pseudos.empty(e)
                    },
                    header: function(e) {
                        return J.test(e.nodeName)
                    },
                    input: function(e) {
                        return Y.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: me(function() {
                        return [0]
                    }),
                    last: me(function(e, t) {
                        return [t - 1]
                    }),
                    eq: me(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: me(function(e, t) {
                        for (var n = 0; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    odd: me(function(e, t) {
                        for (var n = 1; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    lt: me(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0;)
                            e.push(r);
                        return e
                    }),
                    gt: me(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;)
                            e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = r.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                r.pseudos[t] = fe(t);
            for (t in {
                submit: !0,
                reset: !0
            })
                r.pseudos[t] = he(t);
            function ye() {}
            function be(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++)
                    r += e[t].value;
                return r
            }
            function xe(e, t, n) {
                var r = t.dir,
                    i = t.next,
                    o = i || r,
                    a = n && "parentNode" === o,
                    s = C++;
                return t.first ? function(t, n, i) {
                    for (; t = t[r];)
                        if (1 === t.nodeType || a)
                            return e(t, n, i);
                    return !1
                } : function(t, n, u) {
                    var c,
                        l,
                        d,
                        p = [k, s];
                    if (u) {
                        for (; t = t[r];)
                            if ((1 === t.nodeType || a) && e(t, n, u))
                                return !0
                    } else
                        for (; t = t[r];)
                            if (1 === t.nodeType || a)
                                if (l = (d = t[x] || (t[x] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase())
                                    t = t[r] || t;
                                else {
                                    if ((c = l[o]) && c[0] === k && c[1] === s)
                                        return p[2] = c[2];
                                    if (l[o] = p, p[2] = e(t, n, u))
                                        return !0
                                }
                    return !1
                }
            }
            function we(e) {
                return e.length > 1 ? function(t, n, r) {
                    for (var i = e.length; i--;)
                        if (!e[i](t, n, r))
                            return !1;
                    return !0
                } : e[0]
            }
            function ke(e, t, n, r, i) {
                for (var o, a = [], s = 0, u = e.length, c = null != t; s < u; s++)
                    (o = e[s]) && (n && !n(o, r, i) || (a.push(o), c && t.push(s)));
                return a
            }
            function Ce(e, t, n, r, i, o) {
                return r && !r[x] && (r = Ce(r)), i && !i[x] && (i = Ce(i, o)), ce(function(o, a, s, u) {
                    var c,
                        l,
                        d,
                        p = [],
                        f = [],
                        h = a.length,
                        g = o || function(e, t, n) {
                            for (var r = 0, i = t.length; r < i; r++)
                                se(e, t[r], n);
                            return n
                        }(t || "*", s.nodeType ? [s] : s, []),
                        m = !e || !o && t ? g : ke(g, p, e, s, u),
                        v = n ? i || (o ? e : h || r) ? [] : a : m;
                    if (n && n(m, v, s, u), r)
                        for (c = ke(v, f), r(c, [], s, u), l = c.length; l--;)
                            (d = c[l]) && (v[f[l]] = !(m[f[l]] = d));
                    if (o) {
                        if (i || e) {
                            if (i) {
                                for (c = [], l = v.length; l--;)
                                    (d = v[l]) && c.push(m[l] = d);
                                i(null, v = [], c, u)
                            }
                            for (l = v.length; l--;)
                                (d = v[l]) && (c = i ? M(o, d) : p[l]) > -1 && (o[c] = !(a[c] = d))
                        }
                    } else
                        v = ke(v === a ? v.splice(h, v.length) : v),
                            i ? i(null, a, v, u) : O.apply(a, v)
                })
            }
            function Te(e) {
                for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, l = xe(function(e) {
                    return e === t
                }, s, !0), d = xe(function(e) {
                    return M(t, e) > -1
                }, s, !0), p = [function(e, n, r) {
                    var i = !a && (r || n !== c) || ((t = n).nodeType ? l(e, n, r) : d(e, n, r));
                    return t = null, i
                }]; u < o; u++)
                    if (n = r.relative[e[u].type])
                        p = [xe(we(p), n)];
                    else {
                        if ((n = r.filter[e[u].type].apply(null, e[u].matches))[x]) {
                            for (i = ++u; i < o && !r.relative[e[i].type]; i++)
                                ;
                            return Ce(u > 1 && we(p), u > 1 && be(e.slice(0, u - 1).concat({
                                value: " " === e[u - 2].type ? "*" : ""
                            })).replace($, "$1"), n, u < i && Te(e.slice(u, i)), i < o && Te(e = e.slice(i)), i < o && be(e))
                        }
                        p.push(n)
                    }
                return we(p)
            }
            return ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = se.tokenize = function(e, t) {
                var n,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l = E[e + " "];
                if (l)
                    return t ? 0 : l.slice(0);
                for (s = e, u = [], c = r.preFilter; s;) {
                    for (a in n && !(i = _.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = z.exec(s)) && (n = i.shift(), o.push({
                        value: n,
                        type: i[0].replace($, " ")
                    }), s = s.slice(n.length)), r.filter)
                        !(i = V[a].exec(s)) || c[a] && !(i = c[a](i)) || (n = i.shift(), o.push({
                            value: n,
                            type: a,
                            matches: i
                        }), s = s.slice(n.length));
                    if (!n)
                        break
                }
                return t ? s.length : s ? se.error(e) : E(e, u).slice(0)
            }, s = se.compile = function(e, t) {
                var n,
                    i = [],
                    o = [],
                    s = S[e + " "];
                if (!s) {
                    for (t || (t = a(e)), n = t.length; n--;)
                        (s = Te(t[n]))[x] ? i.push(s) : o.push(s);
                    (s = S(e, function(e, t) {
                        var n = t.length > 0,
                            i = e.length > 0,
                            o = function(o, a, s, u, l) {
                                var d,
                                    h,
                                    m,
                                    v = 0,
                                    y = "0",
                                    b = o && [],
                                    x = [],
                                    w = c,
                                    C = o || i && r.find.TAG("*", l),
                                    T = k += null == w ? 1 : Math.random() || .1,
                                    E = C.length;
                                for (l && (c = a == f || a || l); y !== E && null != (d = C[y]); y++) {
                                    if (i && d) {
                                        for (h = 0, a || d.ownerDocument == f || (p(d), s = !g); m = e[h++];)
                                            if (m(d, a || f, s)) {
                                                u.push(d);
                                                break
                                            }
                                        l && (k = T)
                                    }
                                    n && ((d = !m && d) && v--, o && b.push(d))
                                }
                                if (v += y, n && y !== v) {
                                    for (h = 0; m = t[h++];)
                                        m(b, x, a, s);
                                    if (o) {
                                        if (v > 0)
                                            for (; y--;)
                                                b[y] || x[y] || (x[y] = D.call(u));
                                        x = ke(x)
                                    }
                                    O.apply(u, x),
                                    l && !o && x.length > 0 && v + t.length > 1 && se.uniqueSort(u)
                                }
                                return l && (k = T, c = w), b
                            };
                        return n ? ce(o) : o
                    }(o, i))).selector = e
                }
                return s
            }, u = se.select = function(e, t, n, i) {
                var o,
                    u,
                    c,
                    l,
                    d,
                    p = "function" == typeof e && e,
                    f = !i && a(e = p.selector || e);
                if (n = n || [], 1 === f.length) {
                    if ((u = f[0] = f[0].slice(0)).length > 2 && "ID" === (c = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                        if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0]))
                            return n;
                        p && (t = t.parentNode),
                            e = e.slice(u.shift().value.length)
                    }
                    for (o = V.needsContext.test(e) ? 0 : u.length; o-- && (c = u[o], !r.relative[l = c.type]);)
                        if ((d = r.find[l]) && (i = d(c.matches[0].replace(te, ne), ee.test(u[0].type) && ve(t.parentNode) || t))) {
                            if (u.splice(o, 1), !(e = i.length && be(u)))
                                return O.apply(n, i), n;
                            break
                        }
                }
                return (p || s(e, f))(i, t, !g, n, !t || ee.test(e) && ve(t.parentNode) || t), n
            }, n.sortStable = x.split("").sort(A).join("") === x, n.detectDuplicates = !!d, p(), n.sortDetached = le(function(e) {
                return 1 & e.compareDocumentPosition(f.createElement("fieldset"))
            }), le(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || de("type|href|height|width", function(e, t, n) {
                if (!n)
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), n.attributes && le(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || de("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue
            }), le(function(e) {
                return null == e.getAttribute("disabled")
            }) || de(B, function(e, t, n) {
                var r;
                if (!n)
                    return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), se
        }(e);
        x.find = k,
            x.expr = k.selectors,
            x.expr[":"] = x.expr.pseudos,
            x.uniqueSort = x.unique = k.uniqueSort,
            x.text = k.getText,
            x.isXMLDoc = k.isXML,
            x.contains = k.contains,
            x.escapeSelector = k.escape;
        var C = function(e, t, n) {
                for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (i && x(e).is(n))
                            break;
                        r.push(e)
                    }
                return r
            },
            T = function(e, t) {
                for (var n = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            E = x.expr.match.needsContext;
        function S(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function A(e, t, n) {
            return h(t) ? x.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            }) : t.nodeType ? x.grep(e, function(e) {
                return e === t !== n
            }) : "string" != typeof t ? x.grep(e, function(e) {
                return s.call(t, e) > -1 !== n
            }) : x.filter(t, e, n)
        }
        x.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
            x.fn.extend({
                find: function(e) {
                    var t,
                        n,
                        r = this.length,
                        i = this;
                    if ("string" != typeof e)
                        return this.pushStack(x(e).filter(function() {
                            for (t = 0; t < r; t++)
                                if (x.contains(i[t], this))
                                    return !0
                        }));
                    for (n = this.pushStack([]), t = 0; t < r; t++)
                        x.find(e, i[t], n);
                    return r > 1 ? x.uniqueSort(n) : n
                },
                filter: function(e) {
                    return this.pushStack(A(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(A(this, e || [], !0))
                },
                is: function(e) {
                    return !!A(this, "string" == typeof e && E.test(e) ? x(e) : e || [], !1).length
                }
            });
        var q,
            j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (x.fn.init = function(e, t, n) {
            var r,
                i;
            if (!e)
                return this;
            if (n = n || q, "string" == typeof e) {
                if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : j.exec(e)) || !r[1] && t)
                    return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : m, !0)), N.test(r[1]) && x.isPlainObject(t))
                        for (r in t)
                            h(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return (i = m.getElementById(r[2])) && (this[0] = i, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : h(e) ? void 0 !== n.ready ? n.ready(e) : e(x) : x.makeArray(e, this)
        }).prototype = x.fn,
            q = x(m);
        var D = /^(?:parents|prev(?:Until|All))/,
            L = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        function O(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType;)
                ;
            return e
        }
        x.fn.extend({
            has: function(e) {
                var t = x(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (x.contains(this, t[e]))
                            return !0
                })
            },
            closest: function(e, t) {
                var n,
                    r = 0,
                    i = this.length,
                    o = [],
                    a = "string" != typeof e && x(e);
                if (!E.test(e))
                    for (; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                return this.pushStack(o.length > 1 ? x.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? s.call(x(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }),
            x.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null
                },
                parents: function(e) {
                    return C(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return C(e, "parentNode", n)
                },
                next: function(e) {
                    return O(e, "nextSibling")
                },
                prev: function(e) {
                    return O(e, "previousSibling")
                },
                nextAll: function(e) {
                    return C(e, "nextSibling")
                },
                prevAll: function(e) {
                    return C(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return C(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return C(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return T((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return T(e.firstChild)
                },
                contents: function(e) {
                    return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (S(e, "template") && (e = e.content || e), x.merge([], e.childNodes))
                }
            }, function(e, t) {
                x.fn[e] = function(n, r) {
                    var i = x.map(this, t, n);
                    return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (L[e] || x.uniqueSort(i), D.test(e) && i.reverse()), this.pushStack(i)
                }
            });
        var P = /[^\x20\t\r\n\f]+/g;
        function M(e) {
            return e
        }
        function B(e) {
            throw e
        }
        function R(e, t, n, r) {
            var i;
            try {
                e && h(i = e.promise) ? i.call(e).done(t).fail(n) : e && h(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (e) {
                n.apply(void 0, [e])
            }
        }
        x.Callbacks = function(e) {
            e = "string" == typeof e ? function(e) {
                var t = {};
                return x.each(e.match(P) || [], function(e, n) {
                    t[n] = !0
                }), t
            }(e) : x.extend({}, e);
            var t,
                n,
                r,
                i,
                o = [],
                a = [],
                s = -1,
                u = function() {
                    for (i = i || e.once, r = t = !0; a.length; s = -1)
                        for (n = a.shift(); ++s < o.length;)
                            !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                    e.memory || (n = !1),
                        t = !1,
                    i && (o = n ? [] : "")
                },
                c = {
                    add: function() {
                        return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                            x.each(n, function(n, r) {
                                h(r) ? e.unique && c.has(r) || o.push(r) : r && r.length && "string" !== b(r) && t(r)
                            })
                        }(arguments), n && !t && u()), this
                    },
                    remove: function() {
                        return x.each(arguments, function(e, t) {
                            for (var n; (n = x.inArray(t, o, n)) > -1;)
                                o.splice(n, 1),
                                n <= s && s--
                        }), this
                    },
                    has: function(e) {
                        return e ? x.inArray(e, o) > -1 : o.length > 0
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return i = a = [], o = n = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return i = a = [], n || t || (o = n = ""), this
                    },
                    locked: function() {
                        return !!i
                    },
                    fireWith: function(e, n) {
                        return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!r
                    }
                };
            return c
        },
            x.extend({
                Deferred: function(t) {
                    var n = [["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2], ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]],
                        r = "pending",
                        i = {
                            state: function() {
                                return r
                            },
                            always: function() {
                                return o.done(arguments).fail(arguments), this
                            },
                            catch: function(e) {
                                return i.then(null, e)
                            },
                            pipe: function() {
                                var e = arguments;
                                return x.Deferred(function(t) {
                                    x.each(n, function(n, r) {
                                        var i = h(e[r[4]]) && e[r[4]];
                                        o[r[1]](function() {
                                            var e = i && i.apply(this, arguments);
                                            e && h(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                        })
                                    }),
                                        e = null
                                }).promise()
                            },
                            then: function(t, r, i) {
                                var o = 0;
                                function a(t, n, r, i) {
                                    return function() {
                                        var s = this,
                                            u = arguments,
                                            c = function() {
                                                var e,
                                                    c;
                                                if (!(t < o)) {
                                                    if ((e = r.apply(s, u)) === n.promise())
                                                        throw new TypeError("Thenable self-resolution");
                                                    c = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                                        h(c) ? i ? c.call(e, a(o, n, M, i), a(o, n, B, i)) : (o++, c.call(e, a(o, n, M, i), a(o, n, B, i), a(o, n, M, n.notifyWith))) : (r !== M && (s = void 0, u = [e]), (i || n.resolveWith)(s, u))
                                                }
                                            },
                                            l = i ? c : function() {
                                                try {
                                                    c()
                                                } catch (e) {
                                                    x.Deferred.exceptionHook && x.Deferred.exceptionHook(e, l.stackTrace),
                                                    t + 1 >= o && (r !== B && (s = void 0, u = [e]), n.rejectWith(s, u))
                                                }
                                            };
                                        t ? l() : (x.Deferred.getStackHook && (l.stackTrace = x.Deferred.getStackHook()), e.setTimeout(l))
                                    }
                                }
                                return x.Deferred(function(e) {
                                    n[0][3].add(a(0, e, h(i) ? i : M, e.notifyWith)),
                                        n[1][3].add(a(0, e, h(t) ? t : M)),
                                        n[2][3].add(a(0, e, h(r) ? r : B))
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? x.extend(e, i) : i
                            }
                        },
                        o = {};
                    return x.each(n, function(e, t) {
                        var a = t[2],
                            s = t[5];
                        i[t[1]] = a.add,
                        s && a.add(function() {
                            r = s
                        }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock),
                            a.add(t[3].fire),
                            o[t[0]] = function() {
                                return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                            },
                            o[t[0] + "With"] = a.fireWith
                    }), i.promise(o), t && t.call(o, o), o
                },
                when: function(e) {
                    var t = arguments.length,
                        n = t,
                        r = Array(n),
                        o = i.call(arguments),
                        a = x.Deferred(),
                        s = function(e) {
                            return function(n) {
                                r[e] = this,
                                    o[e] = arguments.length > 1 ? i.call(arguments) : n,
                                --t || a.resolveWith(r, o)
                            }
                        };
                    if (t <= 1 && (R(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || h(o[n] && o[n].then)))
                        return a.then();
                    for (; n--;)
                        R(o[n], s(n), a.reject);
                    return a.promise()
                }
            });
        var I = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        x.Deferred.exceptionHook = function(t, n) {
            e.console && e.console.warn && t && I.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
        },
            x.readyException = function(t) {
                e.setTimeout(function() {
                    throw t
                })
            };
        var H = x.Deferred();
        function F() {
            m.removeEventListener("DOMContentLoaded", F),
                e.removeEventListener("load", F),
                x.ready()
        }
        x.fn.ready = function(e) {
            return H.then(e).catch(function(e) {
                x.readyException(e)
            }), this
        },
            x.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(e) {
                    (!0 === e ? --x.readyWait : x.isReady) || (x.isReady = !0, !0 !== e && --x.readyWait > 0 || H.resolveWith(m, [x]))
                }
            }),
            x.ready.then = H.then,
            "complete" === m.readyState || "loading" !== m.readyState && !m.documentElement.doScroll ? e.setTimeout(x.ready) : (m.addEventListener("DOMContentLoaded", F), e.addEventListener("load", F));
        var W = function(e, t, n, r, i, o, a) {
                var s = 0,
                    u = e.length,
                    c = null == n;
                if ("object" === b(n))
                    for (s in i = !0, n)
                        W(e, t, s, n[s], !0, o, a);
                else if (void 0 !== r && (i = !0, h(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(x(e), n)
                })), t))
                    for (; s < u; s++)
                        t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
                return i ? e : c ? t.call(e) : u ? t(e[0], n) : o
            },
            $ = /^-ms-/,
            _ = /-([a-z])/g;
        function z(e, t) {
            return t.toUpperCase()
        }
        function U(e) {
            return e.replace($, "ms-").replace(_, z)
        }
        var X = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
        function Q() {
            this.expando = x.expando + Q.uid++
        }
        Q.uid = 1,
            Q.prototype = {
                cache: function(e) {
                    var t = e[this.expando];
                    return t || (t = {}, X(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))), t
                },
                set: function(e, t, n) {
                    var r,
                        i = this.cache(e);
                    if ("string" == typeof t)
                        i[U(t)] = n;
                    else
                        for (r in t)
                            i[U(r)] = t[r];
                    return i
                },
                get: function(e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)]
                },
                access: function(e, t, n) {
                    return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
                },
                remove: function(e, t) {
                    var n,
                        r = e[this.expando];
                    if (void 0 !== r) {
                        if (void 0 !== t) {
                            n = (t = Array.isArray(t) ? t.map(U) : (t = U(t)) in r ? [t] : t.match(P) || []).length;
                            for (; n--;)
                                delete r[t[n]]
                        }
                        (void 0 === t || x.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                    }
                },
                hasData: function(e) {
                    var t = e[this.expando];
                    return void 0 !== t && !x.isEmptyObject(t)
                }
            };
        var V = new Q,
            G = new Q,
            Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            J = /[A-Z]/g;
        function K(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
                if (r = "data-" + t.replace(J, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
                    try {
                        n = function(e) {
                            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Y.test(e) ? JSON.parse(e) : e)
                        }(n)
                    } catch (e) {}
                    G.set(e, t, n)
                } else
                    n = void 0;
            return n
        }
        x.extend({
            hasData: function(e) {
                return G.hasData(e) || V.hasData(e)
            },
            data: function(e, t, n) {
                return G.access(e, t, n)
            },
            removeData: function(e, t) {
                G.remove(e, t)
            },
            _data: function(e, t, n) {
                return V.access(e, t, n)
            },
            _removeData: function(e, t) {
                V.remove(e, t)
            }
        }),
            x.fn.extend({
                data: function(e, t) {
                    var n,
                        r,
                        i,
                        o = this[0],
                        a = o && o.attributes;
                    if (void 0 === e) {
                        if (this.length && (i = G.get(o), 1 === o.nodeType && !V.get(o, "hasDataAttrs"))) {
                            for (n = a.length; n--;)
                                a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = U(r.slice(5)), K(o, r, i[r]));
                            V.set(o, "hasDataAttrs", !0)
                        }
                        return i
                    }
                    return "object" == typeof e ? this.each(function() {
                        G.set(this, e)
                    }) : W(this, function(t) {
                        var n;
                        if (o && void 0 === t)
                            return void 0 !== (n = G.get(o, e)) ? n : void 0 !== (n = K(o, e)) ? n : void 0;
                        this.each(function() {
                            G.set(this, e, t)
                        })
                    }, null, t, arguments.length > 1, null, !0)
                },
                removeData: function(e) {
                    return this.each(function() {
                        G.remove(this, e)
                    })
                }
            }),
            x.extend({
                queue: function(e, t, n) {
                    var r;
                    if (e)
                        return t = (t || "fx") + "queue", r = V.get(e, t), n && (!r || Array.isArray(n) ? r = V.access(e, t, x.makeArray(n)) : r.push(n)), r || []
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = x.queue(e, t),
                        r = n.length,
                        i = n.shift(),
                        o = x._queueHooks(e, t);
                    "inprogress" === i && (i = n.shift(), r--),
                    i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                        x.dequeue(e, t)
                    }, o)),
                    !r && o && o.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return V.get(e, n) || V.access(e, n, {
                        empty: x.Callbacks("once memory").add(function() {
                            V.remove(e, [t + "queue", n])
                        })
                    })
                }
            }),
            x.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? x.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                        var n = x.queue(this, e, t);
                        x._queueHooks(this, e),
                        "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        x.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n,
                        r = 1,
                        i = x.Deferred(),
                        o = this,
                        a = this.length,
                        s = function() {
                            --r || i.resolveWith(o, [o])
                        };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)
                        (n = V.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                    return s(), i.promise(t)
                }
            });
        var Z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ee = new RegExp("^(?:([+-])=|)(" + Z + ")([a-z%]*)$", "i"),
            te = ["Top", "Right", "Bottom", "Left"],
            ne = m.documentElement,
            re = function(e) {
                return x.contains(e.ownerDocument, e)
            },
            ie = {
                composed: !0
            };
        ne.getRootNode && (re = function(e) {
            return x.contains(e.ownerDocument, e) || e.getRootNode(ie) === e.ownerDocument
        });
        var oe = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && re(e) && "none" === x.css(e, "display")
        };
        function ae(e, t, n, r) {
            var i,
                o,
                a = 20,
                s = r ? function() {
                    return r.cur()
                } : function() {
                    return x.css(e, t, "")
                },
                u = s(),
                c = n && n[3] || (x.cssNumber[t] ? "" : "px"),
                l = e.nodeType && (x.cssNumber[t] || "px" !== c && +u) && ee.exec(x.css(e, t));
            if (l && l[3] !== c) {
                for (u /= 2, c = c || l[3], l = +u || 1; a--;)
                    x.style(e, t, l + c),
                    (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                        l /= o;
                l *= 2,
                    x.style(e, t, l + c),
                    n = n || []
            }
            return n && (l = +l || +u || 0, i = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = l, r.end = i)), i
        }
        var se = {};
        function ue(e) {
            var t,
                n = e.ownerDocument,
                r = e.nodeName,
                i = se[r];
            return i || (t = n.body.appendChild(n.createElement(r)), i = x.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), se[r] = i, i)
        }
        function ce(e, t) {
            for (var n, r, i = [], o = 0, a = e.length; o < a; o++)
                (r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = V.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && oe(r) && (i[o] = ue(r))) : "none" !== n && (i[o] = "none", V.set(r, "display", n)));
            for (o = 0; o < a; o++)
                null != i[o] && (e[o].style.display = i[o]);
            return e
        }
        x.fn.extend({
            show: function() {
                return ce(this, !0)
            },
            hide: function() {
                return ce(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    oe(this) ? x(this).show() : x(this).hide()
                })
            }
        });
        var le,
            de,
            pe = /^(?:checkbox|radio)$/i,
            fe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            he = /^$|^module$|\/(?:java|ecma)script/i;
        le = m.createDocumentFragment().appendChild(m.createElement("div")),
            (de = m.createElement("input")).setAttribute("type", "radio"),
            de.setAttribute("checked", "checked"),
            de.setAttribute("name", "t"),
            le.appendChild(de),
            f.checkClone = le.cloneNode(!0).cloneNode(!0).lastChild.checked,
            le.innerHTML = "<textarea>x</textarea>",
            f.noCloneChecked = !!le.cloneNode(!0).lastChild.defaultValue,
            le.innerHTML = "<option></option>",
            f.option = !!le.lastChild;
        var ge = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        function me(e, t) {
            var n;
            return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && S(e, t) ? x.merge([e], n) : n
        }
        function ve(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                V.set(e[n], "globalEval", !t || V.get(t[n], "globalEval"))
        }
        ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead,
            ge.th = ge.td,
        f.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
        var ye = /<|&#?\w+;/;
        function be(e, t, n, r, i) {
            for (var o, a, s, u, c, l, d = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
                if ((o = e[f]) || 0 === o)
                    if ("object" === b(o))
                        x.merge(p, o.nodeType ? [o] : o);
                    else if (ye.test(o)) {
                        for (a = a || d.appendChild(t.createElement("div")), s = (fe.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + x.htmlPrefilter(o) + u[2], l = u[0]; l--;)
                            a = a.lastChild;
                        x.merge(p, a.childNodes),
                            (a = d.firstChild).textContent = ""
                    } else
                        p.push(t.createTextNode(o));
            for (d.textContent = "", f = 0; o = p[f++];)
                if (r && x.inArray(o, r) > -1)
                    i && i.push(o);
                else if (c = re(o), a = me(d.appendChild(o), "script"), c && ve(a), n)
                    for (l = 0; o = a[l++];)
                        he.test(o.type || "") && n.push(o);
            return d
        }
        var xe = /^([^.]*)(?:\.(.+)|)/;
        function we() {
            return !0
        }
        function ke() {
            return !1
        }
        function Ce(e, t) {
            return e === function() {
                try {
                    return m.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }
        function Te(e, t, n, r, i, o) {
            var a,
                s;
            if ("object" == typeof t) {
                for (s in "string" != typeof n && (r = r || n, n = void 0), t)
                    Te(e, s, n, r, t[s], o);
                return e
            }
            if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i)
                i = ke;
            else if (!i)
                return e;
            return 1 === o && (a = i, (i = function(e) {
                return x().off(e), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = x.guid++)), e.each(function() {
                x.event.add(this, t, i, r, n)
            })
        }
        function Ee(e, t, n) {
            n ? (V.set(e, t, !1), x.event.add(e, t, {
                namespace: !1,
                handler: function(e) {
                    var r,
                        o,
                        a = V.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                        if (a.length)
                            (x.event.special[t] || {}).delegateType && e.stopPropagation();
                        else if (a = i.call(arguments), V.set(this, t, a), r = n(this, t), this[t](), a !== (o = V.get(this, t)) || r ? V.set(this, t, !1) : o = {}, a !== o)
                            return e.stopImmediatePropagation(), e.preventDefault(), o && o.value
                    } else
                        a.length && (V.set(this, t, {
                            value: x.event.trigger(x.extend(a[0], x.Event.prototype), a.slice(1), this)
                        }), e.stopImmediatePropagation())
                }
            })) : void 0 === V.get(e, t) && x.event.add(e, t, we)
        }
        x.event = {
            global: {},
            add: function(e, t, n, r, i) {
                var o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d,
                    p,
                    f,
                    h,
                    g,
                    m = V.get(e);
                if (X(e))
                    for (n.handler && (n = (o = n).handler, i = o.selector), i && x.find.matchesSelector(ne, i), n.guid || (n.guid = x.guid++), (u = m.events) || (u = m.events = Object.create(null)), (a = m.handle) || (a = m.handle = function(t) {
                        return void 0 !== x && x.event.triggered !== t.type ? x.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(P) || [""]).length; c--;)
                        f = g = (s = xe.exec(t[c]) || [])[1],
                            h = (s[2] || "").split(".").sort(),
                        f && (d = x.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, d = x.event.special[f] || {}, l = x.extend({
                            type: f,
                            origType: g,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && x.expr.match.needsContext.test(i),
                            namespace: h.join(".")
                        }, o), (p = u[f]) || ((p = u[f] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(f, a)), d.add && (d.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, l) : p.push(l), x.event.global[f] = !0)
            },
            remove: function(e, t, n, r, i) {
                var o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d,
                    p,
                    f,
                    h,
                    g,
                    m = V.hasData(e) && V.get(e);
                if (m && (u = m.events)) {
                    for (c = (t = (t || "").match(P) || [""]).length; c--;)
                        if (f = g = (s = xe.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), f) {
                            for (d = x.event.special[f] || {}, p = u[f = (r ? d.delegateType : d.bindType) || f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;)
                                l = p[o],
                                !i && g !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(o, 1), l.selector && p.delegateCount--, d.remove && d.remove.call(e, l));
                            a && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || x.removeEvent(e, f, m.handle), delete u[f])
                        } else
                            for (f in u)
                                x.event.remove(e, f + t[c], n, r, !0);
                    x.isEmptyObject(u) && V.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t,
                    n,
                    r,
                    i,
                    o,
                    a,
                    s = new Array(arguments.length),
                    u = x.event.fix(e),
                    c = (V.get(this, "events") || Object.create(null))[u.type] || [],
                    l = x.event.special[u.type] || {};
                for (s[0] = u, t = 1; t < arguments.length; t++)
                    s[t] = arguments[t];
                if (u.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, u)) {
                    for (a = x.event.handlers.call(this, u, c), t = 0; (i = a[t++]) && !u.isPropagationStopped();)
                        for (u.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !u.isImmediatePropagationStopped();)
                            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, u), u.result
                }
            },
            handlers: function(e, t) {
                var n,
                    r,
                    i,
                    o,
                    a,
                    s = [],
                    u = t.delegateCount,
                    c = e.target;
                if (u && c.nodeType && !("click" === e.type && e.button >= 1))
                    for (; c !== this; c = c.parentNode || this)
                        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                            for (o = [], a = {}, n = 0; n < u; n++)
                                void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? x(i, this).index(c) > -1 : x.find(i, this, null, [c]).length),
                                a[i] && o.push(r);
                            o.length && s.push({
                                elem: c,
                                handlers: o
                            })
                        }
                return c = this, u < t.length && s.push({
                    elem: c,
                    handlers: t.slice(u)
                }), s
            },
            addProp: function(e, t) {
                Object.defineProperty(x.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: h(t) ? function() {
                        if (this.originalEvent)
                            return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent)
                            return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(e) {
                return e[x.expando] ? e : new x.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return pe.test(t.type) && t.click && S(t, "input") && Ee(t, "click", we), !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return pe.test(t.type) && t.click && S(t, "input") && Ee(t, "click"), !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return pe.test(t.type) && t.click && S(t, "input") && V.get(t, "click") || S(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        },
            x.removeEvent = function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            },
            x.Event = function(e, t) {
                if (!(this instanceof x.Event))
                    return new x.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e,
                t && x.extend(this, t),
                    this.timeStamp = e && e.timeStamp || Date.now(),
                    this[x.expando] = !0
            },
            x.Event.prototype = {
                constructor: x.Event,
                isDefaultPrevented: ke,
                isPropagationStopped: ke,
                isImmediatePropagationStopped: ke,
                isSimulated: !1,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = we,
                    e && !this.isSimulated && e.preventDefault()
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = we,
                    e && !this.isSimulated && e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = we,
                    e && !this.isSimulated && e.stopImmediatePropagation(),
                        this.stopPropagation()
                }
            },
            x.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, x.event.addProp),
            x.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                x.event.special[e] = {
                    setup: function() {
                        return Ee(this, e, Ce), !1
                    },
                    trigger: function() {
                        return Ee(this, e), !0
                    },
                    _default: function() {
                        return !0
                    },
                    delegateType: t
                }
            }),
            x.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                x.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n,
                            r = e.relatedTarget,
                            i = e.handleObj;
                        return r && (r === this || x.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
                    }
                }
            }),
            x.fn.extend({
                on: function(e, t, n, r) {
                    return Te(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return Te(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r,
                        i;
                    if (e && e.preventDefault && e.handleObj)
                        return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (i in e)
                            this.off(i, t, e[i]);
                        return this
                    }
                    return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function() {
                        x.event.remove(this, e, n, t)
                    })
                }
            });
        var Se = /<script|<style|<link/i,
            Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ae = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function qe(e, t) {
            return S(e, "table") && S(11 !== t.nodeType ? t : t.firstChild, "tr") && x(e).children("tbody")[0] || e
        }
        function je(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }
        function De(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }
        function Le(e, t) {
            var n,
                r,
                i,
                o,
                a,
                s;
            if (1 === t.nodeType) {
                if (V.hasData(e) && (s = V.get(e).events))
                    for (i in V.remove(t, "handle events"), s)
                        for (n = 0, r = s[i].length; n < r; n++)
                            x.event.add(t, i, s[i][n]);
                G.hasData(e) && (o = G.access(e), a = x.extend({}, o), G.set(t, a))
            }
        }
        function Oe(e, t, n, r) {
            t = o(t);
            var i,
                a,
                s,
                u,
                c,
                l,
                d = 0,
                p = e.length,
                g = p - 1,
                m = t[0],
                v = h(m);
            if (v || p > 1 && "string" == typeof m && !f.checkClone && Ne.test(m))
                return e.each(function(i) {
                    var o = e.eq(i);
                    v && (t[0] = m.call(this, i, o.html())),
                        Oe(o, t, n, r)
                });
            if (p && (a = (i = be(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = a), a || r)) {
                for (u = (s = x.map(me(i, "script"), je)).length; d < p; d++)
                    c = i,
                    d !== g && (c = x.clone(c, !0, !0), u && x.merge(s, me(c, "script"))),
                        n.call(e[d], c, d);
                if (u)
                    for (l = s[s.length - 1].ownerDocument, x.map(s, De), d = 0; d < u; d++)
                        c = s[d],
                        he.test(c.type || "") && !V.access(c, "globalEval") && x.contains(l, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? x._evalUrl && !c.noModule && x._evalUrl(c.src, {
                            nonce: c.nonce || c.getAttribute("nonce")
                        }, l) : y(c.textContent.replace(Ae, ""), c, l))
            }
            return e
        }
        function Pe(e, t, n) {
            for (var r, i = t ? x.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
                n || 1 !== r.nodeType || x.cleanData(me(r)),
                r.parentNode && (n && re(r) && ve(me(r, "script")), r.parentNode.removeChild(r));
            return e
        }
        x.extend({
            htmlPrefilter: function(e) {
                return e
            },
            clone: function(e, t, n) {
                var r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l = e.cloneNode(!0),
                    d = re(e);
                if (!(f.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                    for (a = me(l), r = 0, i = (o = me(e)).length; r < i; r++)
                        s = o[r],
                            u = a[r],
                            c = void 0,
                            "input" === (c = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== c && "textarea" !== c || (u.defaultValue = s.defaultValue);
                if (t)
                    if (n)
                        for (o = o || me(e), a = a || me(l), r = 0, i = o.length; r < i; r++)
                            Le(o[r], a[r]);
                    else
                        Le(e, l);
                return (a = me(l, "script")).length > 0 && ve(a, !d && me(e, "script")), l
            },
            cleanData: function(e) {
                for (var t, n, r, i = x.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if (X(n)) {
                        if (t = n[V.expando]) {
                            if (t.events)
                                for (r in t.events)
                                    i[r] ? x.event.remove(n, r) : x.removeEvent(n, r, t.handle);
                            n[V.expando] = void 0
                        }
                        n[G.expando] && (n[G.expando] = void 0)
                    }
            }
        }),
            x.fn.extend({
                detach: function(e) {
                    return Pe(this, e, !0)
                },
                remove: function(e) {
                    return Pe(this, e)
                },
                text: function(e) {
                    return W(this, function(e) {
                        return void 0 === e ? x.text(this) : this.empty().each(function() {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                        })
                    }, null, e, arguments.length)
                },
                append: function() {
                    return Oe(this, arguments, function(e) {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
                    })
                },
                prepend: function() {
                    return Oe(this, arguments, function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = qe(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return Oe(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return Oe(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++)
                        1 === e.nodeType && (x.cleanData(me(e, !1)), e.textContent = "");
                    return this
                },
                clone: function(e, t) {
                    return e = null != e && e, t = null == t ? e : t, this.map(function() {
                        return x.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return W(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === e && 1 === t.nodeType)
                            return t.innerHTML;
                        if ("string" == typeof e && !Se.test(e) && !ge[(fe.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = x.htmlPrefilter(e);
                            try {
                                for (; n < r; n++)
                                    1 === (t = this[n] || {}).nodeType && (x.cleanData(me(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (e) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return Oe(this, arguments, function(t) {
                        var n = this.parentNode;
                        x.inArray(this, e) < 0 && (x.cleanData(me(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }),
            x.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                x.fn[e] = function(e) {
                    for (var n, r = [], i = x(e), o = i.length - 1, s = 0; s <= o; s++)
                        n = s === o ? this : this.clone(!0),
                            x(i[s])[t](n),
                            a.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
        var Me = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
            Be = function(t) {
                var n = t.ownerDocument.defaultView;
                return n && n.opener || (n = e), n.getComputedStyle(t)
            },
            Re = function(e, t, n) {
                var r,
                    i,
                    o = {};
                for (i in t)
                    o[i] = e.style[i],
                        e.style[i] = t[i];
                for (i in r = n.call(e), t)
                    e.style[i] = o[i];
                return r
            },
            Ie = new RegExp(te.join("|"), "i");
        function He(e, t, n) {
            var r,
                i,
                o,
                a,
                s = e.style;
            return (n = n || Be(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || re(e) || (a = x.style(e, t)), !f.pixelBoxStyles() && Me.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }
        function Fe(e, t) {
            return {
                get: function() {
                    if (!e())
                        return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }
        !function() {
            function t() {
                if (l) {
                    c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                        l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                        ne.appendChild(c).appendChild(l);
                    var t = e.getComputedStyle(l);
                    r = "1%" !== t.top,
                        u = 12 === n(t.marginLeft),
                        l.style.right = "60%",
                        a = 36 === n(t.right),
                        i = 36 === n(t.width),
                        l.style.position = "absolute",
                        o = 12 === n(l.offsetWidth / 3),
                        ne.removeChild(c),
                        l = null
                }
            }
            function n(e) {
                return Math.round(parseFloat(e))
            }
            var r,
                i,
                o,
                a,
                s,
                u,
                c = m.createElement("div"),
                l = m.createElement("div");
            l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", f.clearCloneStyle = "content-box" === l.style.backgroundClip, x.extend(f, {
                boxSizingReliable: function() {
                    return t(), i
                },
                pixelBoxStyles: function() {
                    return t(), a
                },
                pixelPosition: function() {
                    return t(), r
                },
                reliableMarginLeft: function() {
                    return t(), u
                },
                scrollboxSize: function() {
                    return t(), o
                },
                reliableTrDimensions: function() {
                    var t,
                        n,
                        r,
                        i;
                    return null == s && (t = m.createElement("table"), n = m.createElement("tr"), r = m.createElement("div"), t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "border:1px solid", n.style.height = "1px", r.style.height = "9px", r.style.display = "block", ne.appendChild(t).appendChild(n).appendChild(r), i = e.getComputedStyle(n), s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === n.offsetHeight, ne.removeChild(t)), s
                }
            }))
        }();
        var We = ["Webkit", "Moz", "ms"],
            $e = m.createElement("div").style,
            _e = {};
        function ze(e) {
            var t = x.cssProps[e] || _e[e];
            return t || (e in $e ? e : _e[e] = function(e) {
                for (var t = e[0].toUpperCase() + e.slice(1), n = We.length; n--;)
                    if ((e = We[n] + t) in $e)
                        return e
            }(e) || e)
        }
        var Ue = /^(none|table(?!-c[ea]).+)/,
            Xe = /^--/,
            Qe = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ve = {
                letterSpacing: "0",
                fontWeight: "400"
            };
        function Ge(e, t, n) {
            var r = ee.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }
        function Ye(e, t, n, r, i, o) {
            var a = "width" === t ? 1 : 0,
                s = 0,
                u = 0;
            if (n === (r ? "border" : "content"))
                return 0;
            for (; a < 4; a += 2)
                "margin" === n && (u += x.css(e, n + te[a], !0, i)),
                    r ? ("content" === n && (u -= x.css(e, "padding" + te[a], !0, i)), "margin" !== n && (u -= x.css(e, "border" + te[a] + "Width", !0, i))) : (u += x.css(e, "padding" + te[a], !0, i), "padding" !== n ? u += x.css(e, "border" + te[a] + "Width", !0, i) : s += x.css(e, "border" + te[a] + "Width", !0, i));
            return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
        }
        function Je(e, t, n) {
            var r = Be(e),
                i = (!f.boxSizingReliable() || n) && "border-box" === x.css(e, "boxSizing", !1, r),
                o = i,
                a = He(e, t, r),
                s = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Me.test(a)) {
                if (!n)
                    return a;
                a = "auto"
            }
            return (!f.boxSizingReliable() && i || !f.reliableTrDimensions() && S(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === x.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === x.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ye(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
        }
        function Ke(e, t, n, r, i) {
            return new Ke.prototype.init(e, t, n, r, i)
        }
        x.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = He(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i,
                        o,
                        a,
                        s = U(t),
                        u = Xe.test(t),
                        c = e.style;
                    if (u || (t = ze(s)), a = x.cssHooks[t] || x.cssHooks[s], void 0 === n)
                        return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t];
                    "string" === (o = typeof n) && (i = ee.exec(n)) && i[1] && (n = ae(e, t, i), o = "number"),
                    null != n && n == n && ("number" !== o || u || (n += i && i[3] || (x.cssNumber[s] ? "" : "px")), f.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? c.setProperty(t, n) : c[t] = n))
                }
            },
            css: function(e, t, n, r) {
                var i,
                    o,
                    a,
                    s = U(t);
                return Xe.test(t) || (t = ze(s)), (a = x.cssHooks[t] || x.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = He(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
            }
        }),
            x.each(["height", "width"], function(e, t) {
                x.cssHooks[t] = {
                    get: function(e, n, r) {
                        if (n)
                            return !Ue.test(x.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, t, r) : Re(e, Qe, function() {
                                return Je(e, t, r)
                            })
                    },
                    set: function(e, n, r) {
                        var i,
                            o = Be(e),
                            a = !f.scrollboxSize() && "absolute" === o.position,
                            s = (a || r) && "border-box" === x.css(e, "boxSizing", !1, o),
                            u = r ? Ye(e, t, r, s, o) : 0;
                        return s && a && (u -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ye(e, t, "border", !1, o) - .5)), u && (i = ee.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = x.css(e, t)), Ge(0, n, u)
                    }
                }
            }),
            x.cssHooks.marginLeft = Fe(f.reliableMarginLeft, function(e, t) {
                if (t)
                    return (parseFloat(He(e, "marginLeft")) || e.getBoundingClientRect().left - Re(e, {
                        marginLeft: 0
                    }, function() {
                        return e.getBoundingClientRect().left
                    })) + "px"
            }),
            x.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                x.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                            i[e + te[r] + t] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                },
                "margin" !== e && (x.cssHooks[e + t].set = Ge)
            }),
            x.fn.extend({
                css: function(e, t) {
                    return W(this, function(e, t, n) {
                        var r,
                            i,
                            o = {},
                            a = 0;
                        if (Array.isArray(t)) {
                            for (r = Be(e), i = t.length; a < i; a++)
                                o[t[a]] = x.css(e, t[a], !1, r);
                            return o
                        }
                        return void 0 !== n ? x.style(e, t, n) : x.css(e, t)
                    }, e, t, arguments.length > 1)
                }
            }),
            x.Tween = Ke,
            Ke.prototype = {
                constructor: Ke,
                init: function(e, t, n, r, i, o) {
                    this.elem = e,
                        this.prop = n,
                        this.easing = i || x.easing._default,
                        this.options = t,
                        this.start = this.now = this.cur(),
                        this.end = r,
                        this.unit = o || (x.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = Ke.propHooks[this.prop];
                    return e && e.get ? e.get(this) : Ke.propHooks._default.get(this)
                },
                run: function(e) {
                    var t,
                        n = Ke.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ke.propHooks._default.set(this), this
                }
            },
            Ke.prototype.init.prototype = Ke.prototype,
            Ke.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = x.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                    },
                    set: function(e) {
                        x.fx.step[e.prop] ? x.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !x.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)] ? e.elem[e.prop] = e.now : x.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            },
            Ke.propHooks.scrollTop = Ke.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            },
            x.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            },
            x.fx = Ke.prototype.init,
            x.fx.step = {};
        var Ze,
            et,
            tt = /^(?:toggle|show|hide)$/,
            nt = /queueHooks$/;
        function rt() {
            et && (!1 === m.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(rt) : e.setTimeout(rt, x.fx.interval), x.fx.tick())
        }
        function it() {
            return e.setTimeout(function() {
                Ze = void 0
            }), Ze = Date.now()
        }
        function ot(e, t) {
            var n,
                r = 0,
                i = {
                    height: e
                };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
                i["margin" + (n = te[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }
        function at(e, t, n) {
            for (var r, i = (st.tweeners[t] || []).concat(st.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                if (r = i[o].call(n, t, e))
                    return r
        }
        function st(e, t, n) {
            var r,
                i,
                o = 0,
                a = st.prefilters.length,
                s = x.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (i)
                        return !1;
                    for (var t = Ze || it(), n = Math.max(0, c.startTime + c.duration - t), r = 1 - (n / c.duration || 0), o = 0, a = c.tweens.length; o < a; o++)
                        c.tweens[o].run(r);
                    return s.notifyWith(e, [c, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
                },
                c = s.promise({
                    elem: e,
                    props: x.extend({}, t),
                    opts: x.extend(!0, {
                        specialEasing: {},
                        easing: x.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Ze || it(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var r = x.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(r), r
                    },
                    stop: function(t) {
                        var n = 0,
                            r = t ? c.tweens.length : 0;
                        if (i)
                            return this;
                        for (i = !0; n < r; n++)
                            c.tweens[n].run(1);
                        return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                    }
                }),
                l = c.props;
            for (!function(e, t) {
                var n,
                    r,
                    i,
                    o,
                    a;
                for (n in e)
                    if (i = t[r = U(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = x.cssHooks[r]) && "expand" in a)
                        for (n in o = a.expand(o), delete e[r], o)
                            n in e || (e[n] = o[n], t[n] = i);
                    else
                        t[r] = i
            }(l, c.opts.specialEasing); o < a; o++)
                if (r = st.prefilters[o].call(c, e, l, c.opts))
                    return h(r.stop) && (x._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)), r;
            return x.map(l, at, c), h(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), x.fx.timer(x.extend(u, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c
        }
        x.Animation = x.extend(st, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return ae(n.elem, e, ee.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                h(e) ? (t = e, e = ["*"]) : e = e.match(P);
                for (var n, r = 0, i = e.length; r < i; r++)
                    n = e[r],
                        st.tweeners[n] = st.tweeners[n] || [],
                        st.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d = "width" in t || "height" in t,
                    p = this,
                    f = {},
                    h = e.style,
                    g = e.nodeType && oe(e),
                    m = V.get(e, "fxshow");
                for (r in n.queue || (null == (a = x._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function() {
                    p.always(function() {
                        a.unqueued--,
                        x.queue(e, "fx").length || a.empty.fire()
                    })
                })), t)
                    if (i = t[r], tt.test(i)) {
                        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                            if ("show" !== i || !m || void 0 === m[r])
                                continue;
                            g = !0
                        }
                        f[r] = m && m[r] || x.style(e, r)
                    }
                if ((u = !x.isEmptyObject(t)) || !x.isEmptyObject(f))
                    for (r in d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = m && m.display) && (c = V.get(e, "display")), "none" === (l = x.css(e, "display")) && (c ? l = c : (ce([e], !0), c = e.style.display || c, l = x.css(e, "display"), ce([e]))), ("inline" === l || "inline-block" === l && null != c) && "none" === x.css(e, "float") && (u || (p.done(function() {
                        h.display = c
                    }), null == c && (l = h.display, c = "none" === l ? "" : l)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0],
                            h.overflowX = n.overflow[1],
                            h.overflowY = n.overflow[2]
                    })), u = !1, f)
                        u || (m ? "hidden" in m && (g = m.hidden) : m = V.access(e, "fxshow", {
                            display: c
                        }), o && (m.hidden = !g), g && ce([e], !0), p.done(function() {
                            for (r in g || ce([e]), V.remove(e, "fxshow"), f)
                                x.style(e, r, f[r])
                        })),
                            u = at(g ? m[r] : 0, r, p),
                        r in m || (m[r] = u.start, g && (u.end = u.start, u.start = 0))
            }],
            prefilter: function(e, t) {
                t ? st.prefilters.unshift(e) : st.prefilters.push(e)
            }
        }),
            x.speed = function(e, t, n) {
                var r = e && "object" == typeof e ? x.extend({}, e) : {
                    complete: n || !n && t || h(e) && e,
                    duration: e,
                    easing: n && t || t && !h(t) && t
                };
                return x.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in x.fx.speeds ? r.duration = x.fx.speeds[r.duration] : r.duration = x.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                    h(r.old) && r.old.call(this),
                    r.queue && x.dequeue(this, r.queue)
                }, r
            },
            x.fn.extend({
                fadeTo: function(e, t, n, r) {
                    return this.filter(oe).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, r)
                },
                animate: function(e, t, n, r) {
                    var i = x.isEmptyObject(e),
                        o = x.speed(t, n, r),
                        a = function() {
                            var t = st(this, x.extend({}, e), o);
                            (i || V.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var r = function(e) {
                        var t = e.stop;
                        delete e.stop,
                            t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            i = null != e && e + "queueHooks",
                            o = x.timers,
                            a = V.get(this);
                        if (i)
                            a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a)
                                a[i] && a[i].stop && nt.test(i) && r(a[i]);
                        for (i = o.length; i--;)
                            o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                        !t && n || x.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return !1 !== e && (e = e || "fx"), this.each(function() {
                        var t,
                            n = V.get(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            o = x.timers,
                            a = r ? r.length : 0;
                        for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)
                            o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; t < a; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
                }
            }),
            x.each(["toggle", "show", "hide"], function(e, t) {
                var n = x.fn[t];
                x.fn[t] = function(e, r, i) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ot(t, !0), e, r, i)
                }
            }),
            x.each({
                slideDown: ot("show"),
                slideUp: ot("hide"),
                slideToggle: ot("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                x.fn[e] = function(e, n, r) {
                    return this.animate(t, e, n, r)
                }
            }),
            x.timers = [],
            x.fx.tick = function() {
                var e,
                    t = 0,
                    n = x.timers;
                for (Ze = Date.now(); t < n.length; t++)
                    (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || x.fx.stop(),
                    Ze = void 0
            },
            x.fx.timer = function(e) {
                x.timers.push(e),
                    x.fx.start()
            },
            x.fx.interval = 13,
            x.fx.start = function() {
                et || (et = !0, rt())
            },
            x.fx.stop = function() {
                et = null
            },
            x.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            x.fn.delay = function(t, n) {
                return t = x.fx && x.fx.speeds[t] || t, n = n || "fx", this.queue(n, function(n, r) {
                    var i = e.setTimeout(n, t);
                    r.stop = function() {
                        e.clearTimeout(i)
                    }
                })
            },
            function() {
                var e = m.createElement("input"),
                    t = m.createElement("select").appendChild(m.createElement("option"));
                e.type = "checkbox",
                    f.checkOn = "" !== e.value,
                    f.optSelected = t.selected,
                    (e = m.createElement("input")).value = "t",
                    e.type = "radio",
                    f.radioValue = "t" === e.value
            }();
        var ut,
            ct = x.expr.attrHandle;
        x.fn.extend({
            attr: function(e, t) {
                return W(this, x.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    x.removeAttr(this, e)
                })
            }
        }),
            x.extend({
                attr: function(e, t, n) {
                    var r,
                        i,
                        o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return void 0 === e.getAttribute ? x.prop(e, t, n) : (1 === o && x.isXMLDoc(e) || (i = x.attrHooks[t.toLowerCase()] || (x.expr.match.bool.test(t) ? ut : void 0)), void 0 !== n ? null === n ? void x.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = x.find.attr(e, t)) ? void 0 : r)
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!f.radioValue && "radio" === t && S(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n,
                        r = 0,
                        i = t && t.match(P);
                    if (i && 1 === e.nodeType)
                        for (; n = i[r++];)
                            e.removeAttribute(n)
                }
            }),
            ut = {
                set: function(e, t, n) {
                    return !1 === t ? x.removeAttr(e, n) : e.setAttribute(n, n), n
                }
            },
            x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = ct[t] || x.find.attr;
                ct[t] = function(e, t, r) {
                    var i,
                        o,
                        a = t.toLowerCase();
                    return r || (o = ct[a], ct[a] = i, i = null != n(e, t, r) ? a : null, ct[a] = o), i
                }
            });
        var lt = /^(?:input|select|textarea|button)$/i,
            dt = /^(?:a|area)$/i;
        function pt(e) {
            return (e.match(P) || []).join(" ")
        }
        function ft(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }
        function ht(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
        }
        x.fn.extend({
            prop: function(e, t) {
                return W(this, x.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[x.propFix[e] || e]
                })
            }
        }),
            x.extend({
                prop: function(e, t, n) {
                    var r,
                        i,
                        o = e.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o)
                        return 1 === o && x.isXMLDoc(e) || (t = x.propFix[t] || t, i = x.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = x.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : lt.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }),
        f.optSelected || (x.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }),
            x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                x.propFix[this.toLowerCase()] = this
            }),
            x.fn.extend({
                addClass: function(e) {
                    var t,
                        n,
                        r,
                        i,
                        o,
                        a,
                        s,
                        u = 0;
                    if (h(e))
                        return this.each(function(t) {
                            x(this).addClass(e.call(this, t, ft(this)))
                        });
                    if ((t = ht(e)).length)
                        for (; n = this[u++];)
                            if (i = ft(n), r = 1 === n.nodeType && " " + pt(i) + " ") {
                                for (a = 0; o = t[a++];)
                                    r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                i !== (s = pt(r)) && n.setAttribute("class", s)
                            }
                    return this
                },
                removeClass: function(e) {
                    var t,
                        n,
                        r,
                        i,
                        o,
                        a,
                        s,
                        u = 0;
                    if (h(e))
                        return this.each(function(t) {
                            x(this).removeClass(e.call(this, t, ft(this)))
                        });
                    if (!arguments.length)
                        return this.attr("class", "");
                    if ((t = ht(e)).length)
                        for (; n = this[u++];)
                            if (i = ft(n), r = 1 === n.nodeType && " " + pt(i) + " ") {
                                for (a = 0; o = t[a++];)
                                    for (; r.indexOf(" " + o + " ") > -1;)
                                        r = r.replace(" " + o + " ", " ");
                                i !== (s = pt(r)) && n.setAttribute("class", s)
                            }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e,
                        r = "string" === n || Array.isArray(e);
                    return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : h(e) ? this.each(function(n) {
                        x(this).toggleClass(e.call(this, n, ft(this), t), t)
                    }) : this.each(function() {
                        var t,
                            i,
                            o,
                            a;
                        if (r)
                            for (i = 0, o = x(this), a = ht(e); t = a[i++];)
                                o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                        else
                            void 0 !== e && "boolean" !== n || ((t = ft(this)) && V.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : V.get(this, "__className__") || ""))
                    })
                },
                hasClass: function(e) {
                    var t,
                        n,
                        r = 0;
                    for (t = " " + e + " "; n = this[r++];)
                        if (1 === n.nodeType && (" " + pt(ft(n)) + " ").indexOf(t) > -1)
                            return !0;
                    return !1
                }
            });
        var gt = /\r/g;
        x.fn.extend({
            val: function(e) {
                var t,
                    n,
                    r,
                    i = this[0];
                return arguments.length ? (r = h(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (null == (i = r ? e.call(this, n, x(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = x.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), (t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                })) : i ? (t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(gt, "") : null == n ? "" : n : void 0
            }
        }),
            x.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = x.find.attr(e, "value");
                            return null != t ? t : pt(x.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            var t,
                                n,
                                r,
                                i = e.options,
                                o = e.selectedIndex,
                                a = "select-one" === e.type,
                                s = a ? null : [],
                                u = a ? o + 1 : i.length;
                            for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                                if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !S(n.parentNode, "optgroup"))) {
                                    if (t = x(n).val(), a)
                                        return t;
                                    s.push(t)
                                }
                            return s
                        },
                        set: function(e, t) {
                            for (var n, r, i = e.options, o = x.makeArray(t), a = i.length; a--;)
                                ((r = i[a]).selected = x.inArray(x.valHooks.option.get(r), o) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), o
                        }
                    }
                }
            }),
            x.each(["radio", "checkbox"], function() {
                x.valHooks[this] = {
                    set: function(e, t) {
                        if (Array.isArray(t))
                            return e.checked = x.inArray(x(e).val(), t) > -1
                    }
                },
                f.checkOn || (x.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                })
            }),
            f.focusin = "onfocusin" in e;
        var mt = /^(?:focusinfocus|focusoutblur)$/,
            vt = function(e) {
                e.stopPropagation()
            };
        x.extend(x.event, {
            trigger: function(t, n, r, i) {
                var o,
                    a,
                    s,
                    u,
                    c,
                    d,
                    p,
                    f,
                    v = [r || m],
                    y = l.call(t, "type") ? t.type : t,
                    b = l.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = f = s = r = r || m, 3 !== r.nodeType && 8 !== r.nodeType && !mt.test(y + x.event.triggered) && (y.indexOf(".") > -1 && (b = y.split("."), y = b.shift(), b.sort()), c = y.indexOf(":") < 0 && "on" + y, (t = t[x.expando] ? t : new x.Event(y, "object" == typeof t && t)).isTrigger = i ? 2 : 3, t.namespace = b.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), p = x.event.special[y] || {}, i || !p.trigger || !1 !== p.trigger.apply(r, n))) {
                    if (!i && !p.noBubble && !g(r)) {
                        for (u = p.delegateType || y, mt.test(u + y) || (a = a.parentNode); a; a = a.parentNode)
                            v.push(a),
                                s = a;
                        s === (r.ownerDocument || m) && v.push(s.defaultView || s.parentWindow || e)
                    }
                    for (o = 0; (a = v[o++]) && !t.isPropagationStopped();)
                        f = a,
                            t.type = o > 1 ? u : p.bindType || y,
                        (d = (V.get(a, "events") || Object.create(null))[t.type] && V.get(a, "handle")) && d.apply(a, n),
                        (d = c && a[c]) && d.apply && X(a) && (t.result = d.apply(a, n), !1 === t.result && t.preventDefault());
                    return t.type = y, i || t.isDefaultPrevented() || p._default && !1 !== p._default.apply(v.pop(), n) || !X(r) || c && h(r[y]) && !g(r) && ((s = r[c]) && (r[c] = null), x.event.triggered = y, t.isPropagationStopped() && f.addEventListener(y, vt), r[y](), t.isPropagationStopped() && f.removeEventListener(y, vt), x.event.triggered = void 0, s && (r[c] = s)), t.result
                }
            },
            simulate: function(e, t, n) {
                var r = x.extend(new x.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                x.event.trigger(r, null, t)
            }
        }),
            x.fn.extend({
                trigger: function(e, t) {
                    return this.each(function() {
                        x.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n)
                        return x.event.trigger(e, t, n, !0)
                }
            }),
        f.focusin || x.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e))
            };
            x.event.special[t] = {
                setup: function() {
                    var r = this.ownerDocument || this.document || this,
                        i = V.access(r, t);
                    i || r.addEventListener(e, n, !0),
                        V.access(r, t, (i || 0) + 1)
                },
                teardown: function() {
                    var r = this.ownerDocument || this.document || this,
                        i = V.access(r, t) - 1;
                    i ? V.access(r, t, i) : (r.removeEventListener(e, n, !0), V.remove(r, t))
                }
            }
        });
        var yt = e.location,
            bt = {
                guid: Date.now()
            },
            xt = /\?/;
        x.parseXML = function(t) {
            var n,
                r;
            if (!t || "string" != typeof t)
                return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (e) {}
            return r = n && n.getElementsByTagName("parsererror")[0], n && !r || x.error("Invalid XML: " + (r ? x.map(r.childNodes, function(e) {
                return e.textContent
            }).join("\n") : t)), n
        };
        var wt = /\[\]$/,
            kt = /\r?\n/g,
            Ct = /^(?:submit|button|image|reset|file)$/i,
            Tt = /^(?:input|select|textarea|keygen)/i;
        function Et(e, t, n, r) {
            var i;
            if (Array.isArray(t))
                x.each(t, function(t, i) {
                    n || wt.test(e) ? r(e, i) : Et(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
                });
            else if (n || "object" !== b(t))
                r(e, t);
            else
                for (i in t)
                    Et(e + "[" + i + "]", t[i], n, r)
        }
        x.param = function(e, t) {
            var n,
                r = [],
                i = function(e, t) {
                    var n = h(t) ? t() : t;
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (null == e)
                return "";
            if (Array.isArray(e) || e.jquery && !x.isPlainObject(e))
                x.each(e, function() {
                    i(this.name, this.value)
                });
            else
                for (n in e)
                    Et(n, e[n], t, i);
            return r.join("&")
        },
            x.fn.extend({
                serialize: function() {
                    return x.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = x.prop(this, "elements");
                        return e ? x.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !x(this).is(":disabled") && Tt.test(this.nodeName) && !Ct.test(e) && (this.checked || !pe.test(e))
                    }).map(function(e, t) {
                        var n = x(this).val();
                        return null == n ? null : Array.isArray(n) ? x.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(kt, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(kt, "\r\n")
                        }
                    }).get()
                }
            });
        var St = /%20/g,
            Nt = /#.*$/,
            At = /([?&])_=[^&]*/,
            qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            jt = /^(?:GET|HEAD)$/,
            Dt = /^\/\//,
            Lt = {},
            Ot = {},
            Pt = "*/".concat("*"),
            Mt = m.createElement("a");
        function Bt(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r,
                    i = 0,
                    o = t.toLowerCase().match(P) || [];
                if (h(n))
                    for (; r = o[i++];)
                        "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }
        function Rt(e, t, n, r) {
            var i = {},
                o = e === Ot;
            function a(s) {
                var u;
                return i[s] = !0, x.each(e[s] || [], function(e, s) {
                    var c = s(t, n, r);
                    return "string" != typeof c || o || i[c] ? o ? !(u = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
                }), u
            }
            return a(t.dataTypes[0]) || !i["*"] && a("*")
        }
        function It(e, t) {
            var n,
                r,
                i = x.ajaxSettings.flatOptions || {};
            for (n in t)
                void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && x.extend(!0, e, r), e
        }
        Mt.href = yt.href,
            x.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: yt.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(yt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Pt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": x.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? It(It(e, x.ajaxSettings), t) : It(x.ajaxSettings, e)
                },
                ajaxPrefilter: Bt(Lt),
                ajaxTransport: Bt(Ot),
                ajax: function(t, n) {
                    "object" == typeof t && (n = t, t = void 0),
                        n = n || {};
                    var r,
                        i,
                        o,
                        a,
                        s,
                        u,
                        c,
                        l,
                        d,
                        p,
                        f = x.ajaxSetup({}, n),
                        h = f.context || f,
                        g = f.context && (h.nodeType || h.jquery) ? x(h) : x.event,
                        v = x.Deferred(),
                        y = x.Callbacks("once memory"),
                        b = f.statusCode || {},
                        w = {},
                        k = {},
                        C = "canceled",
                        T = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (c) {
                                    if (!a)
                                        for (a = {}; t = qt.exec(o);)
                                            a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                    t = a[e.toLowerCase() + " "]
                                }
                                return null == t ? null : t.join(", ")
                            },
                            getAllResponseHeaders: function() {
                                return c ? o : null
                            },
                            setRequestHeader: function(e, t) {
                                return null == c && (e = k[e.toLowerCase()] = k[e.toLowerCase()] || e, w[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return null == c && (f.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (c)
                                        T.always(e[T.status]);
                                    else
                                        for (t in e)
                                            b[t] = [b[t], e[t]];
                                return this
                            },
                            abort: function(e) {
                                var t = e || C;
                                return r && r.abort(t), E(0, t), this
                            }
                        };
                    if (v.promise(T), f.url = ((t || f.url || yt.href) + "").replace(Dt, yt.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(P) || [""], null == f.crossDomain) {
                        u = m.createElement("a");
                        try {
                            u.href = f.url,
                                u.href = u.href,
                                f.crossDomain = Mt.protocol + "//" + Mt.host != u.protocol + "//" + u.host
                        } catch (e) {
                            f.crossDomain = !0
                        }
                    }
                    if (f.data && f.processData && "string" != typeof f.data && (f.data = x.param(f.data, f.traditional)), Rt(Lt, f, n, T), c)
                        return T;
                    for (d in (l = x.event && f.global) && 0 == x.active++ && x.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !jt.test(f.type), i = f.url.replace(Nt, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(St, "+")) : (p = f.url.slice(i.length), f.data && (f.processData || "string" == typeof f.data) && (i += (xt.test(i) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (i = i.replace(At, "$1"), p = (xt.test(i) ? "&" : "?") + "_=" + bt.guid++ + p), f.url = i + p), f.ifModified && (x.lastModified[i] && T.setRequestHeader("If-Modified-Since", x.lastModified[i]), x.etag[i] && T.setRequestHeader("If-None-Match", x.etag[i])), (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && T.setRequestHeader("Content-Type", f.contentType), T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Pt + "; q=0.01" : "") : f.accepts["*"]), f.headers)
                        T.setRequestHeader(d, f.headers[d]);
                    if (f.beforeSend && (!1 === f.beforeSend.call(h, T, f) || c))
                        return T.abort();
                    if (C = "abort", y.add(f.complete), T.done(f.success), T.fail(f.error), r = Rt(Ot, f, n, T)) {
                        if (T.readyState = 1, l && g.trigger("ajaxSend", [T, f]), c)
                            return T;
                        f.async && f.timeout > 0 && (s = e.setTimeout(function() {
                            T.abort("timeout")
                        }, f.timeout));
                        try {
                            c = !1,
                                r.send(w, E)
                        } catch (e) {
                            if (c)
                                throw e;
                            E(-1, e)
                        }
                    } else
                        E(-1, "No Transport");
                    function E(t, n, a, u) {
                        var d,
                            p,
                            m,
                            w,
                            k,
                            C = n;
                        c || (c = !0, s && e.clearTimeout(s), r = void 0, o = u || "", T.readyState = t > 0 ? 4 : 0, d = t >= 200 && t < 300 || 304 === t, a && (w = function(e, t, n) {
                            for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];)
                                u.shift(),
                                void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                            if (r)
                                for (i in s)
                                    if (s[i] && s[i].test(r)) {
                                        u.unshift(i);
                                        break
                                    }
                            if (u[0] in n)
                                o = u[0];
                            else {
                                for (i in n) {
                                    if (!u[0] || e.converters[i + " " + u[0]]) {
                                        o = i;
                                        break
                                    }
                                    a || (a = i)
                                }
                                o = o || a
                            }
                            if (o)
                                return o !== u[0] && u.unshift(o), n[o]
                        }(f, T, a)), !d && x.inArray("script", f.dataTypes) > -1 && x.inArray("json", f.dataTypes) < 0 && (f.converters["text script"] = function() {}), w = function(e, t, n, r) {
                            var i,
                                o,
                                a,
                                s,
                                u,
                                c = {},
                                l = e.dataTypes.slice();
                            if (l[1])
                                for (a in e.converters)
                                    c[a.toLowerCase()] = e.converters[a];
                            for (o = l.shift(); o;)
                                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = l.shift())
                                    if ("*" === o)
                                        o = u;
                                    else if ("*" !== u && u !== o) {
                                        if (!(a = c[u + " " + o] || c["* " + o]))
                                            for (i in c)
                                                if ((s = i.split(" "))[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                                                    !0 === a ? a = c[i] : !0 !== c[i] && (o = s[0], l.unshift(s[1]));
                                                    break
                                                }
                                        if (!0 !== a)
                                            if (a && e.throws)
                                                t = a(t);
                                            else
                                                try {
                                                    t = a(t)
                                                } catch (e) {
                                                    return {
                                                        state: "parsererror",
                                                        error: a ? e : "No conversion from " + u + " to " + o
                                                    }
                                                }
                                    }
                            return {
                                state: "success",
                                data: t
                            }
                        }(f, w, T, d), d ? (f.ifModified && ((k = T.getResponseHeader("Last-Modified")) && (x.lastModified[i] = k), (k = T.getResponseHeader("etag")) && (x.etag[i] = k)), 204 === t || "HEAD" === f.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = w.state, p = w.data, d = !(m = w.error))) : (m = C, !t && C || (C = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (n || C) + "", d ? v.resolveWith(h, [p, C, T]) : v.rejectWith(h, [T, C, m]), T.statusCode(b), b = void 0, l && g.trigger(d ? "ajaxSuccess" : "ajaxError", [T, f, d ? p : m]), y.fireWith(h, [T, C]), l && (g.trigger("ajaxComplete", [T, f]), --x.active || x.event.trigger("ajaxStop")))
                    }
                    return T
                },
                getJSON: function(e, t, n) {
                    return x.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return x.get(e, void 0, t, "script")
                }
            }),
            x.each(["get", "post"], function(e, t) {
                x[t] = function(e, n, r, i) {
                    return h(n) && (i = i || r, r = n, n = void 0), x.ajax(x.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, x.isPlainObject(e) && e))
                }
            }),
            x.ajaxPrefilter(function(e) {
                var t;
                for (t in e.headers)
                    "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
            }),
            x._evalUrl = function(e, t, n) {
                return x.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(e) {
                        x.globalEval(e, t, n)
                    }
                })
            },
            x.fn.extend({
                wrapAll: function(e) {
                    var t;
                    return this[0] && (h(e) && (e = e.call(this[0])), t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstElementChild;)
                            e = e.firstElementChild;
                        return e
                    }).append(this)), this
                },
                wrapInner: function(e) {
                    return h(e) ? this.each(function(t) {
                        x(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = x(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = h(e);
                    return this.each(function(n) {
                        x(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function(e) {
                    return this.parent(e).not("body").each(function() {
                        x(this).replaceWith(this.childNodes)
                    }), this
                }
            }),
            x.expr.pseudos.hidden = function(e) {
                return !x.expr.pseudos.visible(e)
            },
            x.expr.pseudos.visible = function(e) {
                return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
            },
            x.ajaxSettings.xhr = function() {
                try {
                    return new e.XMLHttpRequest
                } catch (e) {}
            };
        var Ht = {
                0: 200,
                1223: 204
            },
            Ft = x.ajaxSettings.xhr();
        f.cors = !!Ft && "withCredentials" in Ft,
            f.ajax = Ft = !!Ft,
            x.ajaxTransport(function(t) {
                var n,
                    r;
                if (f.cors || Ft && !t.crossDomain)
                    return {
                        send: function(i, o) {
                            var a,
                                s = t.xhr();
                            if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                                for (a in t.xhrFields)
                                    s[a] = t.xhrFields[a];
                            for (a in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i)
                                s.setRequestHeader(a, i[a]);
                            n = function(e) {
                                return function() {
                                    n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Ht[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                        binary: s.response
                                    } : {
                                        text: s.responseText
                                    }, s.getAllResponseHeaders()))
                                }
                            },
                                s.onload = n(),
                                r = s.onerror = s.ontimeout = n("error"),
                                void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                                    4 === s.readyState && e.setTimeout(function() {
                                        n && r()
                                    })
                                },
                                n = n("abort");
                            try {
                                s.send(t.hasContent && t.data || null)
                            } catch (e) {
                                if (n)
                                    throw e
                            }
                        },
                        abort: function() {
                            n && n()
                        }
                    }
            }),
            x.ajaxPrefilter(function(e) {
                e.crossDomain && (e.contents.script = !1)
            }),
            x.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return x.globalEval(e), e
                    }
                }
            }),
            x.ajaxPrefilter("script", function(e) {
                void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET")
            }),
            x.ajaxTransport("script", function(e) {
                var t,
                    n;
                if (e.crossDomain || e.scriptAttrs)
                    return {
                        send: function(r, i) {
                            t = x("<script>").attr(e.scriptAttrs || {}).prop({
                                charset: e.scriptCharset,
                                src: e.url
                            }).on("load error", n = function(e) {
                                t.remove(),
                                    n = null,
                                e && i("error" === e.type ? 404 : 200, e.type)
                            }),
                                m.head.appendChild(t[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
            });
        var Wt,
            $t = [],
            _t = /(=)\?(?=&|$)|\?\?/;
        x.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = $t.pop() || x.expando + "_" + bt.guid++;
                return this[e] = !0, e
            }
        }),
            x.ajaxPrefilter("json jsonp", function(t, n, r) {
                var i,
                    o,
                    a,
                    s = !1 !== t.jsonp && (_t.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && _t.test(t.data) && "data");
                if (s || "jsonp" === t.dataTypes[0])
                    return i = t.jsonpCallback = h(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(_t, "$1" + i) : !1 !== t.jsonp && (t.url += (xt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                        return a || x.error(i + " was not called"), a[0]
                    }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
                        a = arguments
                    }, r.always(function() {
                        void 0 === o ? x(e).removeProp(i) : e[i] = o,
                        t[i] && (t.jsonpCallback = n.jsonpCallback, $t.push(i)),
                        a && h(o) && o(a[0]),
                            a = o = void 0
                    }), "script"
            }),
            f.createHTMLDocument = ((Wt = m.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Wt.childNodes.length),
            x.parseHTML = function(e, t, n) {
                return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (f.createHTMLDocument ? ((r = (t = m.implementation.createHTMLDocument("")).createElement("base")).href = m.location.href, t.head.appendChild(r)) : t = m), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = be([e], t, o), o && o.length && x(o).remove(), x.merge([], i.childNodes)));
                var r,
                    i,
                    o
            },
            x.fn.load = function(e, t, n) {
                var r,
                    i,
                    o,
                    a = this,
                    s = e.indexOf(" ");
                return s > -1 && (r = pt(e.slice(s)), e = e.slice(0, s)), h(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && x.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    o = arguments,
                        a.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    a.each(function() {
                        n.apply(this, o || [e.responseText, t, e])
                    })
                }), this
            },
            x.expr.pseudos.animated = function(e) {
                return x.grep(x.timers, function(t) {
                    return e === t.elem
                }).length
            },
            x.offset = {
                setOffset: function(e, t, n) {
                    var r,
                        i,
                        o,
                        a,
                        s,
                        u,
                        c = x.css(e, "position"),
                        l = x(e),
                        d = {};
                    "static" === c && (e.style.position = "relative"),
                        s = l.offset(),
                        o = x.css(e, "top"),
                        u = x.css(e, "left"),
                        ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1 ? (a = (r = l.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0),
                    h(t) && (t = t.call(e, n, x.extend({}, s))),
                    null != t.top && (d.top = t.top - s.top + a),
                    null != t.left && (d.left = t.left - s.left + i),
                        "using" in t ? t.using.call(e, d) : l.css(d)
                }
            },
            x.fn.extend({
                offset: function(e) {
                    if (arguments.length)
                        return void 0 === e ? this : this.each(function(t) {
                            x.offset.setOffset(this, e, t)
                        });
                    var t,
                        n,
                        r = this[0];
                    return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    } : void 0
                },
                position: function() {
                    if (this[0]) {
                        var e,
                            t,
                            n,
                            r = this[0],
                            i = {
                                top: 0,
                                left: 0
                            };
                        if ("fixed" === x.css(r, "position"))
                            t = r.getBoundingClientRect();
                        else {
                            for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === x.css(e, "position");)
                                e = e.parentNode;
                            e && e !== r && 1 === e.nodeType && ((i = x(e).offset()).top += x.css(e, "borderTopWidth", !0), i.left += x.css(e, "borderLeftWidth", !0))
                        }
                        return {
                            top: t.top - i.top - x.css(r, "marginTop", !0),
                            left: t.left - i.left - x.css(r, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent; e && "static" === x.css(e, "position");)
                            e = e.offsetParent;
                        return e || ne
                    })
                }
            }),
            x.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = "pageYOffset" === t;
                x.fn[e] = function(r) {
                    return W(this, function(e, r, i) {
                        var o;
                        if (g(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i)
                            return o ? o[t] : e[r];
                        o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
                    }, e, r, arguments.length)
                }
            }),
            x.each(["top", "left"], function(e, t) {
                x.cssHooks[t] = Fe(f.pixelPosition, function(e, n) {
                    if (n)
                        return n = He(e, t), Me.test(n) ? x(e).position()[t] + "px" : n
                })
            }),
            x.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                x.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    x.fn[r] = function(i, o) {
                        var a = arguments.length && (n || "boolean" != typeof i),
                            s = n || (!0 === i || !0 === o ? "margin" : "border");
                        return W(this, function(t, n, i) {
                            var o;
                            return g(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? x.css(t, n, s) : x.style(t, n, i, s)
                        }, t, a ? i : void 0, a)
                    }
                })
            }),
            x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                x.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }),
            x.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                },
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            }),
            x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
                x.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            });
        var zt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        x.proxy = function(e, t) {
            var n,
                r,
                o;
            if ("string" == typeof t && (n = e[t], t = e, e = n), h(e))
                return r = i.call(arguments, 2), (o = function() {
                    return e.apply(t || this, r.concat(i.call(arguments)))
                }).guid = e.guid = e.guid || x.guid++, o
        },
            x.holdReady = function(e) {
                e ? x.readyWait++ : x.ready(!0)
            },
            x.isArray = Array.isArray,
            x.parseJSON = JSON.parse,
            x.nodeName = S,
            x.isFunction = h,
            x.isWindow = g,
            x.camelCase = U,
            x.type = b,
            x.now = Date.now,
            x.isNumeric = function(e) {
                var t = x.type(e);
                return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            },
            x.trim = function(e) {
                return null == e ? "" : (e + "").replace(zt, "")
            },
        "function" == typeof define && define.amd && define("jquery", [], function() {
            return x
        });
        var Ut = e.jQuery,
            Xt = e.$;
        return x.noConflict = function(t) {
            return e.$ === x && (e.$ = Xt), t && e.jQuery === x && (e.jQuery = Ut), x
        }, void 0 === t && (e.jQuery = e.$ = x), x
    }),
    $.fn.createSearchBar = function() {
        var e = $("body"),
            t = $("#searchForm"),
            n = t.find(".searchInput"),
            r = t.find(".searchSubmit"),
            i = !0,
            o = !1;
        function a() {
            s(),
                e.hasClass("home") || "mobile" === Core.viewport || "phablet" === Core.viewport ? (i = !0, r.attr("title", t.data("search-opened")), r.html(t.data("search-opened")), t.addClass("searchOpened")) : (i = !1, r.attr("title", t.attr("data-search-closed")), r.html(t.attr("data-search-closed")), t.removeClass("searchOpened"))
        }
        function s() {
            n.val("")
        }
        function u() {
            r.attr("title", t.data("search-opened")),
                r.html(t.data("search-opened")),
                t.addClass("searchOpened"),
                i = !0,
                n.trigger("focus")
        }
        $(window).on("orientationchange resize", function() {
            a()
        }).resize(),
            a(),
            r.on("mousedown", function() {
                o = !0
            }),
            r.on("click", function(e) {
                i || (e.preventDefault(), u()),
                    o = !1
            }),
            n.on("focus", function() {
                i ? n.trigger("focusin") : u(),
                    n.parent().removeClass("no-focus")
            }),
            n.on("blur", function() {
                i && ("" !== n.val() || o || e.hasClass("home") || "mobile" === Core.viewport || "phablet" === Core.viewport ? t.find(".clearField.active") && n.parent().addClass("no-focus") : (r.attr("title", t.attr("data-search-closed")), r.html(t.attr("data-search-closed")), t.removeClass("searchOpened"), t.find(".clearField").removeClass("active"), n.parent().removeClass("no-focus"), s(), i = !1))
            })
    },
    $.fn.mobileNavigation = function() {
        return this.each(function() {
            var e,
                t = $(this),
                n = $(this).find("ul");
            if (t.length > 0) {
                var r = t.attr("data-mobilebtntxt") || "Menu",
                    i = t.attr("data-closemobilenavtxt") || "Sluiten";
                function o() {
                    e || ((e = $("<button/>", {
                        class: "toggleNav",
                        "aria-expanded": "false",
                        "aria-controls": "topMenu",
                        html: "<span>" + r + "</span>"
                    })).prependTo(t), e && e.on("click", function() {
                        t.hasClass("navOpen") ? (t.addClass("navClosed"), t.removeClass("navOpen"), e.attr("aria-expanded", "false"), n.slideUp(), e.find("span").html(r)) : (t.addClass("navOpen"), t.removeClass("navClosed"), n.slideDown(300), e.attr("aria-expanded", "true"), e.find("span").html(i))
                    }))
                }
                function a() {
                    "mobile" === Core.viewport || "phablet" === Core.viewport ? o() : (e && (e.remove(), e = ""), n.removeAttr("style"), t.removeClass("navClosed"), t.removeClass("navOpen"))
                }
                window.attachEvent ? window.attachEvent("onresize", function() {
                    a()
                }) : window.addEventListener && window.addEventListener("resize", function() {
                    a()
                }, !0),
                    a()
            }
        })
    },
    $(window).on("load", function() {
        $("#navBar").length > 0 && ($(".mainNav").mobileNavigation(), $(".search").createSearchBar())
    });
var objectFitImages = function() {
    "use strict";
    var e = "bfred-it:object-fit-images",
        t = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
        n = "undefined" == typeof Image ? {
            style: {
                "object-position": 1
            }
        } : new Image,
        r = "object-fit" in n.style,
        i = "object-position" in n.style,
        o = "background-size" in n.style,
        a = "string" == typeof n.currentSrc,
        s = n.getAttribute,
        u = n.setAttribute,
        c = !1;
    function l(e, t, n) {
        var r = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + (t || 1) + "' height='" + (n || 0) + "'%3E%3C/svg%3E";
        s.call(e, "src") !== r && u.call(e, "src", r)
    }
    function d(e, t) {
        e.naturalWidth ? t(e) : setTimeout(d, 100, e, t)
    }
    function p(n) {
        var i = function(e) {
                for (var n, r = getComputedStyle(e).fontFamily, i = {}; null !== (n = t.exec(r));)
                    i[n[1]] = n[2];
                return i
            }(n),
            o = n[e];
        if (i["object-fit"] = i["object-fit"] || "fill", !o.img) {
            if ("fill" === i["object-fit"])
                return;
            if (!o.skipTest && r && !i["object-position"])
                return
        }
        if (!o.img) {
            o.img = new Image(n.width, n.height),
                o.img.srcset = s.call(n, "data-ofi-srcset") || n.srcset,
                o.img.src = s.call(n, "data-ofi-src") || n.src,
                u.call(n, "data-ofi-src", n.src),
            n.srcset && u.call(n, "data-ofi-srcset", n.srcset),
                l(n, n.naturalWidth || n.width, n.naturalHeight || n.height),
            n.srcset && (n.srcset = "");
            try {
                !function(t) {
                    var n = {
                        get: function(n) {
                            return t[e].img[n || "src"]
                        },
                        set: function(n, r) {
                            return t[e].img[r || "src"] = n, u.call(t, "data-ofi-" + r, n), p(t), n
                        }
                    };
                    Object.defineProperty(t, "src", n),
                        Object.defineProperty(t, "currentSrc", {
                            get: function() {
                                return n.get("currentSrc")
                            }
                        }),
                        Object.defineProperty(t, "srcset", {
                            get: function() {
                                return n.get("srcset")
                            },
                            set: function(e) {
                                return n.set(e, "srcset")
                            }
                        })
                }(n)
            } catch (e) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        !function(e) {
            if (e.srcset && !a && window.picturefill) {
                var t = window.picturefill._;
                e[t.ns] && e[t.ns].evaled || t.fillImg(e, {
                    reselect: !0
                }),
                e[t.ns].curSrc || (e[t.ns].supported = !1, t.fillImg(e, {
                    reselect: !0
                })),
                    e.currentSrc = e[t.ns].curSrc || e.src
            }
        }(o.img),
            n.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")',
            n.style.backgroundPosition = i["object-position"] || "center",
            n.style.backgroundRepeat = "no-repeat",
            n.style.backgroundOrigin = "content-box",
            /scale-down/.test(i["object-fit"]) ? d(o.img, function() {
                o.img.naturalWidth > n.width || o.img.naturalHeight > n.height ? n.style.backgroundSize = "contain" : n.style.backgroundSize = "auto"
            }) : n.style.backgroundSize = i["object-fit"].replace("none", "auto").replace("fill", "100% 100%"),
            d(o.img, function(e) {
                l(n, e.naturalWidth, e.naturalHeight)
            })
    }
    function f(t, n) {
        var r = !c && !t;
        if (n = n || {}, t = t || "img", i && !n.skipTest || !o)
            return !1;
        "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);
        for (var a = 0; a < t.length; a++)
            t[a][e] = t[a][e] || {
                skipTest: n.skipTest
            },
                p(t[a]);
        r && (document.body.addEventListener("load", function(e) {
            "IMG" === e.target.tagName && f(e.target, {
                skipTest: n.skipTest
            })
        }, !0), c = !0, t = "img"),
        n.watchMQ && window.addEventListener("resize", f.bind(null, t, {
            skipTest: n.skipTest
        }))
    }
    return f.supportsObjectFit = r, f.supportsObjectPosition = i, function() {
        function t(t, n) {
            return t[e] && t[e].img && ("src" === n || "srcset" === n) ? t[e].img : t
        }
        i || (HTMLImageElement.prototype.getAttribute = function(e) {
            return s.call(t(this, e), e)
        }, HTMLImageElement.prototype.setAttribute = function(e, n) {
            return u.call(t(this, e), e, String(n))
        })
    }(), f
}();
const anchorNav = () => {
    const e = document.querySelector('[data-an="container"]');
    if (e) {
        const t = document.querySelector('[data-an="buttonContainer"]'),
            n = document.querySelector('[data-an="button"]'),
            r = document.querySelector("header"),
            i = document.querySelector(".site-footer"),
            o = 24,
            a = r || e;
        t && window.addEventListener("scroll", () => {
            scrollY > 700 ? t.style.display = "block" : t.style.display = "none",
                function(e) {
                    const n = e.getBoundingClientRect();
                    let r = window.innerHeight || document.documentElement.clientHeight,
                        i = r - n.top;
                    n.top <= r ? t.style.bottom = `${o + i}px` : t.style.bottom = `${o}px`
                }(i)
        }, {
            passive: !0
        }),
        n && n.addEventListener("click", () => {
            a.scrollIntoView();
            const e = window.location.href.split("#")[0];
            window.history.replaceState({
                additionalInformation: "cleared the URL from anchortag"
            }, "Cleared the URL", e)
        })
    }
};
anchorNav();
var Core = {},
    Cookies = {},
    Cookiebar = {},
    Surveybar = {},
    _paq = _paq || [];
!function(e, t) {
    function n(e, t) {
        var n = new RegExp("\\b" + t + "\\b");
        return "*" === t || n.test(e.className)
    }
    function r(e, t) {
        return null !== e && (n(e, t) ? function(e, t) {
            if (null === e)
                return !1;
            if (n(e, t)) {
                var r = e.className.match(" " + t) ? " " + t : t;
                e.className = e.className.replace(r, "")
            }
        }(e, t) : function(e, t) {
            null !== e && (n(e, t) || (e.className += e.className ? " " + t : t))
        }(e, t), e)
    }
    function i() {
        var e = window.location.hostname;
        return e.substring(e.lastIndexOf(".", e.lastIndexOf(".") - 1) + 1)
    }
    var o;
    "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }),
    void 0 !== t.console && void 0 !== t.console.log || (t.console = {
        log: function() {}
    }),
    e.getElementsByClassName || (t.getElementsByClassName = function(e, t) {
        null === t && (t = document);
        for (var r = [], i = t.getElementsByTagName("*"), o = 0, a = i.length; o < a; o++)
            n(i[o], e) && r.push(i[o]);
        return r
    }, e.getElementsByClassName = function(e) {
        return t.getElementsByClassName(e, document)
    }),
    String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
        return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    }),
        String.prototype.hashCode = function() {
            var e,
                t = 0,
                n = this.length;
            if (0 === n)
                return t;
            for (e = 0; e < n; e++)
                t = (t << 5) - t + this.charCodeAt(e),
                    t &= t;
            return t
        },
        Cookies = {
            supported: !1,
            domain: "",
            init: function() {
                var e,
                    n,
                    r,
                    i,
                    o,
                    a;
                for (e in this)
                    if (this.hasOwnProperty(e)) {
                        if ("function" == typeof this[e])
                            continue;
                        this[e] = void 0
                    }
                if (this.domain = t.location.hostname, this.test())
                    for (e = 0, n = (a = document.cookie.split("; ")).length; e < n; e++)
                        -1 !== (r = a[e].indexOf("=")) && (i = a[e].substr(0, r), o = a[e].substr(r + 1, a[e].length), this[i] = o)
            },
            test: function() {
                if (navigator.cookieEnabled)
                    return this.supported = !0
            },
            create: function(e, t, n) {
                var r,
                    i = "";
                n && ((r = new Date).setTime(r.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString());
                var o = "";
                "https:" === document.location.protocol && (o = "secure;"),
                    document.cookie = e + "=" + t + i + "; path=/ ; domain=" + this.domain + "; " + o,
                    this[e] = t
            },
            read: function(e) {
                for (var t, n = e + "=", r = document.cookie.split(";"), i = 0, o = r.length; i < o; i++) {
                    for (t = r[i]; " " === t.charAt(0);)
                        t = t.substring(1, t.length);
                    if (0 === t.indexOf(n))
                        return t.substring(n.length, t.length)
                }
                return null
            },
            erase: function(e) {
                this.create(e, "", -1),
                    this[e] = void 0
            },
            eraseAll: function() {
                for (var e in this)
                    if (this.hasOwnProperty(e)) {
                        if ("function" == typeof this[e])
                            continue;
                        this.erase(e)
                    }
            }
        },
        Cookiebar = {
            cookiename: "toestemmingvoorcookies",
            cookievalues: {
                accept: "ja",
                deny: "nee",
                implicit: "ja"
            },
            lifespan: 1825,
            callback: function(e) {
                Cookies.create(this.cookiename, this.cookievalues[e], this.lifespan)
            },
            init: function(t) {
                var n,
                    r,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l = this,
                    d = e.getElementsByTagName("body")[0];
                for (var p in t)
                    this.hasOwnProperty(p) && (l[p] = t[p] || l[p]);
                if (!("object" != typeof Cookies || !Cookies.supported || void 0 !== window.navigator.doNotTrack && "yes" === window.navigator.doNotTrack || void 0 !== window.navigator.msDoNotTrack && "yes" === window.navigator.msDoNotTrack || d.className.indexOf("nocookiebar") > -1 || null !== Cookies.read(l.cookiename))) {
                    var f = d.getAttribute("data-cookiebody") || "{sitenaam} gebruikt cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Lees meer over",
                        h = d.getAttribute("data-cookieurltext") || "cookies";
                    o = e.createTextNode(f.replace("{sitenaam}", i()) + " "),
                        u = e.createTextNode("."),
                        s = e.createTextNode(h),
                        (a = e.createElement("a")).setAttribute("href", d.getAttribute("data-cookieinfourl") ? d.getAttribute("data-cookieinfourl") : "/cookies/"),
                        a.setAttribute("id", "cookieinfo"),
                        a.onclick = function(e) {
                            var t = e || window.event;
                            t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                        },
                        a.appendChild(s),
                        (r = e.createElement("p")).appendChild(o),
                        r.appendChild(a),
                        r.appendChild(u),
                        (n = e.createElement("div")).className = "site message cookie",
                        (c = e.createElement("div")).className = "wrapper",
                        n.appendChild(c),
                        c.appendChild(r),
                        d.insertBefore(n, d.getElementsByTagName("div")[0]);
                    for (var g = e.getElementById("mainwrapper").getElementsByTagName("a"), m = 0, v = g.length; m < v; m++)
                        "string" == typeof g[m].href && g[m].href.indexOf("#") < 0 && (g[m].onclick = function() {
                            l.callback("implicit")
                        })
                }
            }
        },
        Surveybar = {
            showsurvey: "false",
            surveyurl: "",
            surveyincidence: 50,
            surveytimethreshold: 30,
            surveyclickthreshold: 2,
            close: function(t, n) {
                Cookies.erase("surveyvisits"),
                    Cookies.create("surveyinvitestatus", n, 100),
                    e.getElementsByTagName("body")[0].removeChild(t)
            },
            init: function(t) {
                var n = this,
                    r = e.getElementsByTagName("body")[0];
                for (var o in n.surveyurl = r.getAttribute("data-surveyurl") || "", t)
                    n[o] = t[o] || n[o];
                if (Cookies.supported && "" !== n.surveyurl) {
                    n.surveyincidence = parseInt(r.getAttribute("data-surveyincidence"), 10) || n.surveyincidence,
                        n.surveytimethreshold = parseInt(r.getAttribute("data-surveytimethreshold"), 10) || n.surveytimethreshold,
                        n.surveyclickthreshold = parseInt(r.getAttribute("data-surveyclickthreshold"), 10) || n.surveyclickthreshold;
                    var a = (new Date).getTime();
                    Cookies.read("surveyinvitestatus") || (Cookies.create("surveyinvitestatus", "tracking", 100), Cookies.create("surveyvisittime", a, 100));
                    var s,
                        u,
                        c,
                        l,
                        d,
                        p,
                        f,
                        h,
                        g,
                        m = Cookies.read("surveyinvitestatus") || "",
                        v = parseInt(Cookies.read("surveyvisittime") - 1e3, 10),
                        y = v > 0 ? a - v : 0,
                        b = !0,
                        x = "",
                        w = Math.floor(Math.random() * n.surveyincidence);
                    if ("invited" === m ? w = 0 : "tracking" === m ? (Cookies.read("surveyvisits") && (x = parseInt(Cookies.read("surveyvisits"))), x += 1, Cookies.create("surveyvisits", x, 100), s = 1e3 * n.surveytimethreshold, (n.surveyclickthreshold > x || y < s) && (b = !1)) : "accepted" === m || "declined" === m ? (s = 78624e5, y > 0 && y < s && (b = !1)) : b = !1, b && !(w > 1))
                        u = r.getAttribute("data-surveybody") || "Help mee {sitenaam} te verbeteren.",
                            u = e.createTextNode(u.replace("{sitenaam}", i()) + " "),
                            c = e.createTextNode(r.getAttribute("data-surveyaccept") || "vul de enquete in"),
                            l = e.createTextNode(r.getAttribute("data-surveydecline") || "Nee, bedankt."),
                            (d = e.createElement("a")).setAttribute("href", n.surveyurl),
                            d.setAttribute("id", "survey-yes"),
                            d.setAttribute("target", "_blank"),
                            d.onclick = function() {
                                n.close(this.parentNode.parentNode.parentNode, "accepted")
                            },
                            d.appendChild(c),
                            (p = e.createElement("a")).setAttribute("href", "#"),
                            p.setAttribute("id", "survey-no"),
                            p.onclick = function(e) {
                                return e.preventDefault(), n.close(this.parentNode.parentNode, "declined"), !1
                            },
                            p.appendChild(l),
                            (f = e.createElement("p")).appendChild(u),
                            (h = e.createElement("div")).className = "site message survey",
                            (g = e.createElement("div")).className = "wrapper",
                            h.appendChild(g),
                            g.appendChild(f),
                            g.appendChild(d),
                            g.appendChild(p),
                            r.insertBefore(h, r.getElementsByTagName("div")[0]),
                            Cookies.create("surveyinvitestatus", "invited", 100)
                }
            }
        },
        (Core = {
            debug: !1,
            showcookiebar: "false",
            navtype: "reg",
            viewport: "mobile",
            setScreenType: function() {
                var e = function() {
                    Core.viewport = window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/[^0-9a-zA-Z]/g, "") || "mobile"
                };
                window.attachEvent ? window.attachEvent("onresize", function() {
                    e()
                }) : window.addEventListener && window.addEventListener("resize", function() {
                    e()
                }, !0),
                    e()
            },
            testSingleSelector: function(t) {
                return "." === t.charAt(0) ? e.getElementsByClassName(t.substr(1)).length > 0 : "#" === t.charAt(0) ? e.getElementById(t.substr(1)) : e.getElementsByTagName(t).length > 0
            },
            testSelectors: function(e) {
                for (var t = !1, n = 0; n < e.length; n++)
                    t = t || this.testSingleSelector(e[n]);
                return t
            },
            getOptimalViewportImage: function(e, t, n) {
                var r,
                    i,
                    o = ["thumbnail", "small", "medium", "large", "widescreen"],
                    a = "",
                    s = "",
                    u = e.split("/");
                for (r = 0; r < o.length; r++)
                    for (i = 0; i < u.length; i++)
                        o[r] === u[i] && (a = o[r]);
                return "desktop" === Core.viewport ? s = "widescreen" === n ? "widescreen" : "large" === n ? "large" : "medium" === n ? "medium" : "large" : "tablet" === Core.viewport ? s = "large" === n ? "large" : "medium" === n ? "medium" : "large" : (s = "small", s = "small" === t ? "small" : "medium" === t ? "medium" : "large" === t ? "large" : "small"), "" !== a && "" !== s && (e = e.replace("/" + a, "/" + s)), e
            },
            handleSwipeEvents: function(e, t, n) {
                var r = 0,
                    i = 0,
                    o = !1;
                e.on("touchstart", function(e) {
                    o = !0,
                        r = e.touches[0].clientX,
                    e.touches.length > 1 && (o = !1)
                }),
                    e.on("touchmove", function(e) {
                        var a = Math.round(screen.width / window.innerWidth);
                        if (0 !== window.orientation && (a = Math.round(screen.height / window.innerWidth)), 1 === a && o) {
                            i = e.touches[0].clientX;
                            var s = Math.abs(r - i);
                            r > i ? s > 80 && (o = !1, t()) : s > 80 && (o = !1, n())
                        }
                    })
            },
            fold: function(e, t) {
                if (r(e, "hide"), null === t)
                    return !1;
                t.onclick = function() {
                    return r(e, "hide"), r(t, "active"), !1
                }
            },
            foldList: function() {
                var t,
                    n,
                    r,
                    i,
                    o,
                    a,
                    s,
                    u,
                    c,
                    l,
                    d,
                    p,
                    f = this,
                    h = e.getElementsByClassName("topic"),
                    g = e.getElementsByClassName("list"),
                    m = e.getElementsByClassName("thematic").length > 0,
                    v = e.getElementById("sitemap");
                for (d = 0, p = h.length; d < p; d++)
                    void 0 !== (o = h[d].getElementsByTagName("h2")[0]) && (a = o.getElementsByTagName("label")[0], i = h[d].getElementsByClassName ? h[d].getElementsByClassName("subtopics")[0] : window.getElementsByClassName("subtopics", h[d])[0], f.fold(i, o), void 0 !== a && (s = a.getElementsByTagName("input")[0], f.stopClick(s), f.stopClick36emUp(a)), m && (c = (u = o.getElementsByTagName("a")[0]).cloneNode(!0), (l = e.createElement("p")).className = "more", l.appendChild(c), i.insertBefore(l, i.childNodes[0]), f.stopClick36emUp(u)));
                for (null !== v && (n = (t = v.getElementsByTagName("h2")[0]).getElementsByTagName("a")[0], r = v.getElementsByTagName("div")[0], f.fold(r, t), void 0 !== n && f.stopClick36emUp(n)), d = 0, p = g.length; d < p; d++)
                    void 0 !== (o = g[d].getElementsByTagName("h2")[0]) && (i = g[d].getElementsByClassName ? g[d].getElementsByClassName("sublist")[0] : window.getElementsByClassName("sublist", g[d])[0], f.fold(i, o))
            },
            stopClick: function(e) {
                e.onclick = function(e) {
                    var t = e || window.event;
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                }
            },
            stopClick36emUp: function(e) {
                e.onclick = function(e) {
                    if ("mobile" !== Core.viewport) {
                        var t = e || window.event;
                        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                    }
                }
            },
            checkLogoVersion: function() {
                var e = document.getElementById("logotype");
                if (e) {
                    var t = "desktop",
                        n = e.src;
                    window.onload = function() {
                        var r = e.getAttribute("data-fallback");
                        if (r) {
                            var i = function() {
                                "mobile" === Core.viewport || "phablet" === Core.viewport ? "mobile" !== t && (e.setAttribute("src", r), t = "mobile") : "desktop" !== t && (e.setAttribute("src", n), t = "desktop")
                            };
                            window.attachEvent ? window.attachEvent("onresize", function() {
                                i()
                            }) : window.addEventListener && window.addEventListener("resize", function() {
                                i()
                            }, !0),
                                i()
                        }
                    }
                }
            },
            loadJsScripts: function() {
                var e = {
                        accordeon: {
                            path: "shared-ro/accordion",
                            triggers: [".accordion"]
                        },
                        audiovideo: {
                            path: "shared-ro/mediaplayer",
                            deps: ["collapsiblePanels"],
                            triggers: [".block-audio-video"]
                        },
                        autocomplete: {
                            path: "shared-ro/autocomplete",
                            deps: ["jquery-ui"],
                            triggers: [".autocomplete"]
                        },
                        baz: {
                            path: "shared-ro/baz",
                            triggers: [".baz"]
                        },
                        collapsiblePanels: {
                            deps: ["jquery-ui"],
                            path: "shared-ro/collapsible-panels"
                        },
                        datePicker: {
                            path: "shared-ro/datePicker",
                            triggers: [".date-picker"]
                        },
                        dateRangePicker: {
                            path: "shared-ro/dateRangePicker",
                            triggers: [".date-range-picker"]
                        },
                        filterTools: {
                            path: "shared-ro/filtertool",
                            triggers: [".filterToolWrapper"]
                        },
                        filterList: {
                            path: "shared-ro/filter-list",
                            triggers: ["#source-list"]
                        },
                        "flex-images": {
                            path: "shared-ro/flex-images",
                            deps: ["img-helpers"],
                            triggers: [".block-photo-gallery"]
                        },
                        "foto-slider": {
                            path: "shared-ro/foto-slider",
                            triggers: [".fotoSlider"]
                        },
                        forms: {
                            path: "shared-ro/forms",
                            deps: ["jquery-ui"],
                            triggers: [".ro-form"]
                        },
                        helpers: {
                            path: "shared-ro/helpers",
                            triggers: ["table", ".anchors", ".index"]
                        },
                        highchart: {
                            path: "shared-ro/highcharts",
                            deps: ["collapsiblePanels"],
                            triggers: [".hchart"]
                        },
                        highmaps: {
                            path: "shared-ro/highmaps",
                            deps: ["highchart"],
                            triggers: [".hmap"]
                        },
                        hotspot: {
                            path: "shared-ro/hotspot",
                            triggers: [".hotspotContainer"]
                        },
                        infographics: {
                            path: "shared-ro/infographics",
                            deps: ["collapsiblePanels"],
                            triggers: [".infographic", ".infographicInfo"]
                        },
                        "img-helpers": {
                            path: "shared-ro/img-helpers",
                            deps: ["jquery-ui"],
                            triggers: [".content-image-left", ".dlimg", ".hasOptions", ".headerImage", ".campaignImage"]
                        },
                        "jquery-ui": {
                            path: "shared-ro/jquery-ui"
                        },
                        lazyload: {
                            path: "shared-ro/jquery-lazyload",
                            triggers: [".lazy"]
                        },
                        leaflet: {
                            deps: ["collapsiblePanels"],
                            path: "shared-ro/leaflet",
                            triggers: [".map"]
                        },
                        luxon: {
                            path: "shared-ro/luxon"
                        },
                        "meta-info-logger": {
                            path: "shared-ro/meta-info-1400",
                            triggers: [".meta-info-1400"]
                        },
                        "representation-panels": {
                            path: "shared-ro/representation-panels",
                            deps: ["collapsiblePanels"],
                            triggers: [".representationLocations"]
                        },
                        "paging-menu": {
                            path: "shared-ro/paging-menu",
                            triggers: [".paging-menu"]
                        },
                        poll: {
                            path: "shared-ro/poll",
                            triggers: [".poll"]
                        },
                        "style-togglr": {
                            path: "shared-ro/styletogglr",
                            triggers: []
                        },
                        timeline: {
                            path: "shared-ro/timeliner",
                            triggers: [".timeline"]
                        },
                        topicList: {
                            path: "shared-ro/topic-list",
                            triggers: [".topicList"]
                        },
                        mailServiceClient: {
                            path: "shared-ro/mailserviceclient",
                            triggers: [".mailServiceClientWrapper"]
                        },
                        travelAdviceTiles: {
                            path: "shared-ro/traveladvicetiles",
                            triggers: [".travel-safety"]
                        },
                        "object-fit-images": {
                            path: "shared-ro/ofi"
                        }
                    },
                    n = {},
                    r = {},
                    i = {};
                for (var o in e)
                    n[o] = {},
                        n[o] = this.scriptpath + e[o].path + this.scriptversion,
                        r[o] = {},
                        r[o].exports = o,
                    e[o].deps && (r[o].deps = e[o].deps),
                    e[o].triggers && (i[o] = e[o].triggers);
                for (var a in require.config({
                    paths: n,
                    shim: r
                }), i)
                    this.testSelectors(i[a]) && require([a]);
                var s = t.location.href;
                (s.includes("buildomgeving.nl/frontend/platform-templates") || s.includes("localhost:8888")) && require(["style-togglr"])
            },
            init: function() {
                var n = this,
                    r = e.getElementsByTagName("html")[0],
                    i = e.getElementsByTagName("body")[0],
                    o = r.className.indexOf("ie") > -1;
                n.debug = n.debug || t.location.hash.indexOf("debug") > -1,
                    n.scriptpath = i.getAttribute("data-scriptpath") ? i.getAttribute("data-scriptpath") + "/" : "js/",
                    n.scriptversion = i.getAttribute("data-scriptversion") ? "-" + i.getAttribute("data-scriptversion") + ".min" : "",
                !o && i.className.indexOf("home"),
                    n.setScreenType(),
                    n.checkLogoVersion(),
                    n.loadJsScripts(),
                    Cookies.init(),
                    n.showcookiebar = !!i.getAttribute("data-showcookiebar") && "true" === i.getAttribute("data-showcookiebar").toString(),
                n.showcookiebar && (Cookiebar.cookieurl = i.getAttribute("data-cookieimg") ? i.getAttribute("data-cookieimg") : "/presentation/shared-ro/images/cookie.png", Cookiebar.init({
                    callback: function(e) {
                        Cookies.create(Cookiebar.cookiename, Cookiebar.cookievalues[e], Cookiebar.lifespan);
                        var t = navigator.userAgent.hashCode(),
                            n = (new Date).getTime() + t.toString(),
                            r = Cookiebar.cookievalues[e];
                        r = r + "." + n,
                            (new Image).src = Cookiebar.cookieurl + "?" + Cookiebar.cookiename + "=" + r
                    }
                })),
                    n.showsurveybar = i.getAttribute("data-showsurveybar") || "false",
                "true" === n.showsurveybar && Surveybar.init(),
                    objectFitImages()
            }
        }).init(),
        function() {
            var e = document.getElementsByTagName("body")[0],
                t = e.getAttribute("data-stats") || "",
                n = e.getAttribute("data-trackerurl") || "statistiek.rijksoverheid.nl/piwik/",
                r = e.getAttribute("data-statssiteid") || 0,
                i = parseInt(e.getAttribute("data-linktrackingtimer")) || 500,
                o = parseInt(e.getAttribute("data-hartbeattrackingtimer"));
            if (0 != r) {
                if (e.getAttribute("data-word-counter")) {
                    var a = e.textContent.replace(/^\s+|\s+$/g, "").split(/\s+/).length;
                    t = t.concat((t ? ";" : "") + "word_count:" + a)
                }
                _paq.push(["setTrackerUrl", "//" + n + "piwik.php"]),
                    _paq.push(["setSiteId", r]),
                    require(["//" + n + "piwik.js"], function() {
                        if (_paq.push(["setDomains", document.domain]), _paq.push(["setSecureCookie", !0]), _paq.push(["setIgnoreClasses", ["openLightbox", "lightbox", "item", "shareBtn"]]), _paq.push(["addDownloadExtensions", "rtf|eps|odp|srt|sha2|json|ai|ics"]), _paq.push(["enableLinkTracking"]), _paq.push(["setLinkTrackingTimer", i]), o && (o < 10 && (o = 10), _paq.push(["enableHeartBeatTimer", o])), t)
                            for (var n = t.split(";"), r = 0; r < n.length; r++)
                                if ("" !== n[r]) {
                                    var a = n[r].split(":");
                                    _paq.push(["setCustomVariable", "" + (r + 1), a[0], a[1], "page"])
                                }
                        var s = document.getElementById("searchFilterForm") || "";
                        if (s) {
                            var u = window.location.pathname.split("/").pop(),
                                c = parseInt(s.getAttribute("data-searchresultscount")) || 0,
                                l = s.getAttribute("data-searchkeyword");
                            l && _paq.push(["trackSiteSearch", l, u, c])
                        }
                        "undefined" != typeof Storage && localStorage.resetPiwik && (_paq.push(["appendToTrackingUrl", "new_visit=1"]), _paq.push(["deleteCookies"]), localStorage.removeItem("resetPiwik")),
                            _paq.push(["trackPageView"]);
                        var d = e.getAttribute("data-scroll-depth-marks");
                        if (d) {
                            var p = d.replace(",", ".").split(";").map(function(e) {
                                    return parseFloat(e)
                                }).filter(function(e) {
                                    return !isNaN(e)
                                }),
                                f = parseInt(e.getAttribute("data-scroll-depth-dim-id")) || 1;
                            isNaN(f) && (f = 1);
                            var h = !1,
                                g = -1,
                                m = !1,
                                v = function() {
                                    m || (_paq.push(["setCustomDimension", f, g + "%"]), _paq.push([function() {
                                        this.trackRequest("ping=1")
                                    }]), m = !0)
                                },
                                y = function() {
                                    document.hidden && v()
                                },
                                b = function() {
                                    !h && window.requestAnimationFrame(function() {
                                        var e = Math.round(window.pageYOffset / (document.body.clientHeight - window.innerHeight) * 100);
                                        p.forEach(function(t) {
                                            e >= t && (g = t > g ? t : g)
                                        }),
                                            h = !1
                                    }),
                                        h = !0
                                };
                            window.addEventListener("scroll", b),
                                window.addEventListener("beforeunload", v),
                            window.matchMedia("(any-pointer:fine)").matches || (document.removeEventListener("visibilitychange", y), document.addEventListener("visibilitychange", y), window.addEventListener("pagehide", v)),
                                b(),
                                window.addEventListener("pageshow", function(e) {
                                    e.persisted && (g = -1, m = !1, b())
                                })
                        }
                        if (e.getAttribute("data-visit-timer")) {
                            var x,
                                w = !1,
                                k = function() {
                                    w || (Piwik.getAsyncTracker().trackRequest("ping=1"), w = !0)
                                },
                                C = function() {
                                    document.hidden && k()
                                },
                                T = function() {
                                    x && clearTimeout(x)
                                },
                                E = function() {
                                    x && clearTimeout(x),
                                        x = setTimeout(function() {
                                            Piwik.getAsyncTracker().trackRequest("ping=1"),
                                                window.removeEventListener("blur", T),
                                                window.removeEventListener("focus", E),
                                            d || (window.addEventListener("beforeunload", k), window.matchMedia("(any-pointer:fine)").matches || (document.removeEventListener("visibilitychange", C), document.addEventListener("visibilitychange", C), window.addEventListener("pagehide", k)))
                                        }, 1e4)
                                };
                            window.addEventListener("blur", T),
                                window.addEventListener("focus", E),
                                window.addEventListener("pageshow", function(e) {
                                    e.persisted && (w = !1, E())
                                }),
                            document.hasFocus() && E()
                        }
                    })
            }
        }(),
    (o = document.getElementsByTagName("html")[0].classList).contains("no-js") && (o.remove("no-js"), o.add("js"))
}(document, window);
