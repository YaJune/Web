var obj = (function () {
    return {
        isNumber: function (item) {
            return obj.isItem(item,"Number");
        },
        isString: function (item) {
            return obj.isItem(item,"String");
        },
        isArray: function (item) {
            return obj.isItem(item,"Array");
        },
        isFunction: function (item) {
            return obj.isItem(item,"Function");
        },
        isObject: function (item) {
            return obj.isItem(item,"Object");
        },
        isItem: function (item,type) {
            return toString.call(item)==="[object "+type+"]"
        }

    }
})();
