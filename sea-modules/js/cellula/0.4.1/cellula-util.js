define(function(require, exports, module) {

    /**
     * @fileOverview Cellula Framework's core utility library definition.
     * @description: a utility library for Cellula that provides a lot of the functional programming support
     * @namespace: Cellula
     *
     * thanks to underscore.js and json2.js
     */

    var cellula = require('./cellula-namespace'),
        util = cellula._util;

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var slice = util.slice = ArrayProto.slice,

        toString = util.toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;

    var breaker = util.breaker = 'breaker is used to break a loop';

    var isArray = util.isArray = function(obj){
        if(nativeIsArray) return nativeIsArray(obj);
        return toString.call(obj) === '[object Array]';
    };
    var isObject = util.isObject = function (obj) {
        //return obj === Object(obj);
        return obj == null ? false : toString.call(obj) === '[object Object]';
    };
    var isString = util.isString = function (obj) {
        return toString.call(obj) === '[object String]';
    };
    var isFunction = util.isFunction = function (obj) {
        return toString.call(obj) === '[object Function]';
    };
    var isArguments = util.isArguments = function (obj) {
        return toString.call(obj) === '[object Arguments]';
    };

    var isNodeList = util.isNodeList = function (obj) {
        return toString.call(obj) === '[object NodeList]';
    };

    var isClass = util.isClass = function(func){ // deprecated
        return isFunction(func) && func.toString() === classCtor().toString();
    };

    var has = util.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    var isEmpty = util.isEmpty = function (obj, isEnum) { // isEnum is a flag that be used to judge enumerable properties of an object
        if (!obj) return true;
        if (isArray(obj) || isString(obj)) return obj.length === 0;
        for (var key in obj) {
            if(!(isEnum && !has(obj, key))) return false;
        }
        return true;
    };

    var iterator = util.iterator = function(v){return v};

    // There is no guarantee that for...in will return the indexes in any particular order
    // and it will return all enumerable properties,
    // including those with non–integer names and those that are inherited.
    var each = util.each = function (obj, fn, context, breaker) {
        if (!obj) return;
        var key;
        if (breaker != null) {
            for (key in obj) {
                if (isObject(obj) && has(obj, key) || isArray(obj) && key in obj) { // || obj === Object(obj)
                    if (fn.call(context, obj[key], key, obj) === breaker) return key;
                }
            }
        } else {
            if (nativeForEach && nativeForEach === obj.forEach) {
                obj.forEach(fn, context);
            } else {
                for (key in obj) {
                    if (isObject(obj) && has(obj, key) || isArray(obj) && key in obj) {
                        fn.call(context, obj[key], key, obj);
                    }
                }
            }
        }
    };


    // Return the results of applying the iterator to each element.
    // Delegates to ES 5 's native 'map' if available.
    var map = util.map = function (obj, fn, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && nativeMap === obj.map) return obj.map(fn, context);
        each(obj, function (value, index, list) {
            results[results.length] = fn.call(context, value, index, list);
        });
        return results;
    };

    // Retrieve the names of an object's properties.
    // Delegates to ES 5 's native 'Object.keys'
    var keys = util.keys = function (obj) {
        if(nativeKeys) return nativeKeys(obj);
        if (obj !== Object(obj)) throw new TypeError('Invalid object');

        var keys = [];
        for (var key in obj) if (has(obj, key)) keys[keys.length] = key;
        return keys;
    };

    // Retrieve the values of an object's properties.
    var values = util.values = function (obj) {
        return map(obj, iterator);
    };

    var emptyFunc = util.emptyFunc = function(){};

    var bind = util.bind = function (func, context) {
        var bound, args;
        if (nativeBind && nativeBind === func.bind) return nativeBind.call(func, context); // to fix the inconformity with es5
        if (!isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, slice.call(arguments));
            emptyFunc.prototype = func.prototype;
            var self = new emptyFunc;
            var result = func.apply(self, slice.call(arguments));
            if (Object(result) === result) return result;
            return self;
        };
    };

    // Safely convert anything iterable into a real, live array.
    var toArray = util.toArray = function (obj) {
        if (!obj) return [];
        if (isArray(obj) || isArguments(obj)) return slice.call(obj); // return a new array, not obj itself
        return values(obj);
    };

    var toArrayByLen = util.toArrayByLen = function (obj) {
        var ret = [];
        if(obj.length) for(var ii = 0; ii<obj.length; ret[ii] = obj[ii++]){}
        return ret;
    };

    var mix = util.mix = function(){
        var ret = arguments[0] || {};
        for(var i=1, l=arguments.length; i<l; i++){
            var t = arguments[i];
            if(isObject(t) || isArray(t)){ // if Array is not allowed --> isObject(t)
                for(var n in t){
                    ret[n] = t[n];
                }
            }
        }
        return ret;
    };

    var deepMix = util.deepMix = function(){
        var ret = arguments[0] || {};
        for(var i=1, l=arguments.length; i<l; i++){
            var t = arguments[i];
            if(isObject(t) || isArray(t)){ //if Array is not allowed --> util.isObject(t)
                for(var n in t){
                    ret[n] = isObject(ret[n]) && isObject(t[n]) ? deepMix({}, ret[n], t[n]) : t[n];
                }
            }
        }
        return ret;
    };

    var copy = util.copy = function(obj){
        if (!(isObject(obj) || isArray(obj))) return obj;
        return isArray(obj) ? obj.slice() : mix({}, obj);
    };

    var aspect = util.aspect = function (obj) {
        if (!util.isObject(obj)) throw new Error("invalid parameter!");

        var __aspect__ = {
            //afterReturning
            //afterThrowing
            //destroy
            before:function (name, func, context) {
                if (!util.isString(name) || !util.isFunction(func)) throw new Error("invalid parameter!");

                var origin = obj[name],
                    args = context ? util.slice.call(arguments, 3) : [];
                obj[name] = function () {
                    func.apply(context || obj, args);
                    return origin.apply(obj, arguments);
                };
            },
            after:function (name, func, context) {
                if (!util.isString(name) || !util.isFunction(func)) throw new Error("invalid parameter!");

                var origin = obj[name],
                    args = context ? util.slice.call(arguments, 3) : [];
                obj[name] = function () {
                    var ret = origin.apply(obj, arguments);
                    func.apply(context || obj, args);
                    return ret;
                };
            },
            wrap:function (name, func) { // around
                if (!util.isString(name) || !util.isFunction(func)) throw new Error("invalid parameter!");

                var origin = obj[name];

                obj[name] = function () { // arguments belongs to origin
                    var temp = obj._origin;
                    obj._origin = origin;
                    var ret = func.apply(obj, arguments);
                    obj._origin = temp;
                    return ret;
                };
            }
        };
        return __aspect__;
    };

    // console
    var nativeConsole = window ? window.console || {} : {};

    each(['log','info','warn','error'], function(v){
        util[v] = nativeConsole[v] && nativeConsole[v].apply ? function() {nativeConsole[v].apply(nativeConsole, toArrayByLen(arguments))} : emptyFunc;
    });

    var makeTpl = util.makeTpl = function(tpl, data) {
        var newTpl = tpl;
        for (n in data) {
            var reg = new RegExp("(\\$\\-\\{" + n + "\\})", "g");
            newTpl = newTpl.replace(reg, data[n]);
        }
        // replace extra placeholders with '' || if there's no matching data for it
        var r = new RegExp("(\\$\\-\\{[/#a-zA-Z0-9]+\\})", "g");
        newTpl = newTpl.replace(r, "");

        return newTpl;
    };

    var parseTpl = util.parseTpl = function(tpl, data) {
        if(!isString(tpl) || !isObject(data)) return tpl;
        
        var newTpl = tpl, tagReg = new RegExp("\\$\\-\\{#(.*)\\}");

        function parse(prop){
            var regHead = new RegExp("(\\$\\-\\{#" + prop + "\\})", "g"),
                regTail = new RegExp("(\\$\\-\\{/" + prop + "\\})", "g"),
                reg = new RegExp("(\\$\\-\\{#" + prop + "\\})(.*)(\\$\\-\\{/" + prop + "\\})", "g");

            if(data[prop] === false || !data[prop]){
                newTpl = newTpl.replace(reg, '');
            }else if(isArray(data[prop])){
                var r = reg.exec(tpl);
                if(r){
                    var t = r[2],
                        s = '',
                        d = data[prop];

                    for(var i=0; i<d.length; i++){
                        s += this.parseTpl.call(this, t, d[i]);
                    }
                    newTpl = newTpl.replace(reg, s);
                }
            }else{
                newTpl = newTpl.replace(regHead, '').replace(regTail, '');
            }
            return newTpl;
        }

        for (var n in data) {
            //newTpl = parse.call(this, n, newTpl);
            parse.call(this, n);
        }

        while(tagReg.test(newTpl)){
            var p = tagReg.exec(newTpl)[1];
            p = p.substring(0, p.indexOf('}')); // to be strict
            parse.call(this, p);
        }

        return makeTpl(newTpl, data);
    };

    util.JSON = {};

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b':'\\b',
            '\t':'\\t',
            '\n':'\\n',
            '\f':'\\f',
            '\r':'\\r',
            '"':'\\"',
            '\\':'\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    util.JSON.stringify = function (value, replacer, space) {
        var i;
        gap = '';
        indent = '';
        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }
        } else if (typeof space === 'string') {
            indent = space;
        }

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
            (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }

        return str('', {'':value});
    };

    util.JSON.parse = function (text, reviver) {
        var j;

        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

        if (/^[\],:{}\s]*$/
            .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            j = eval('(' + text + ')');

            return typeof reviver === 'function'
                ? walk({'':j}, '')
                : j;
        }

        throw new SyntaxError('JSON.parse');
    };

    var trim = util.trim = function(s) {
        return isString(s) ? s.replace(/^\s+/g, '').replace(/\s+$/g, '') : s;
    };


    var hasClass = util.hasClass = function(node, className){
        if(node && node.nodeType == 1){
            className = ' ' + className + ' ';
            return (' ' + node.className + ' ').replace(/[\n\t\r]/g, ' ').indexOf(className) > -1;
        }
        return false;
    };
    var addClass = util.addClass = function(node, className){
        if(node && node.nodeType == 1){
            if(!trim(node.className)) return node.className = className;
            if(!hasClass(node, className)) node.className = trim(node.className) + ' ' + className;
        }
    };

    var removeClass = util.removeClass = function(node, className){
        if(hasClass(node, className))
            node.className = trim( (' ' + node.className + ' ').replace(/[\n\t\r]/g, ' ').replace(' ' + className + ' ', ' ') );
    };

    var getElementsByClassName = util.getElementsByClassName = function(searchClass, node, tag) {
        node = node || document;
        if(node.getElementsByClassName){
            return  node.getElementsByClassName(searchClass);
        }else{
            tag = tag || '*';
            var ret = [],
                els = node.getElementsByTagName(tag), //var els =  (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag);
                i = els.length,
                reg = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
            while(--i >= 0){
                if (reg.test(els[i].className) ) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    };

    module.exports = util;

});