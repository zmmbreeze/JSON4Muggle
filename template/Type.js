/**
 * Right way to Get Type.
 *
 * @param {string} typeName input type.
 * @return {Object} type.
 */
function Type(typeName) {
    var T = Type[typeName];
    if (!T._inited) {
        T._is = T.is || Type.is;
        if (!T.from) {
            /**
             * autocorrect the input value.
             * if there is no `from` function, then use default input value.
             *
             * @param {string} val input value.
             * @return {string} value.
             */
            T.from = function(val) {
                return val;
            };
        }
        // update `is` function to call `from` function first
        T.is = function(val) {
            try {
                val = T.from(val);
            } catch (e) {
                return false;
            }
            return T._is(val);
        };
        T._inited = true;
    }
    return T;
}

/**
 * Return true.
 *
 * @return {boolean} true.
 */
Type.is = function() {
    return true;
};

(function() {
/**
 * Text type like string in javascript.
 */
Type.Text = {
    /**
     * validate input value after use `from` function.
     * if there is no `is` function, then not validate.
     *
     * @param {string} val input value.
     * @return {boolean} true/false.
     */
    /*
    is: function(val) {
        return true;
    },
    */
    /**
     * autocorrect the input value.
     * if there is no `from` function, then use default input value.
     *
     * @param {string} val input value.
     * @return {string} value.
     */
    /*
    from: function(val) {
        return val;
    }
     */
};

Type.Number = {
    from: function(val) {
        return parseFloat(val);
    }
};

/**
 * Integer type.
 */
Type.Integer = {
    /**
     * autocorrect the input value.
     *
     * @param {string} val input value.
     * @return {number} value.
     */
    from: function(val) {
        return parseInt(val, 10);
    }
};

Type.Float = {
    from: function(val) {
        return parseFloat(val);
    }
};

Type.Chinese = {
    /**
     * validate input value after use `from` function.
     * validate if input is Chinese text.
     *
     * @param {string} val input value.
     * @return {boolean} true/false.
     */
    is: function(val) {
        return (/[^\x00-\xff]/ig).test(val);
    }
};

var urlReg =
    /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@\?\^=%&:\/~\+#]*[\w\-@?\^=%&\/~\+#])?/;
Type.Url = {
    is: function(val) {
        return urlReg.test(val);
    }
};

var emailReg =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
Type.Email = {
    is: function(val) {
        return emailReg.test(val);
    }
};

Type.EnglishAndNumber = {
    is: function(val) {
        return (/[^\x00-\xff]/ig).test(val);
    }
};

})();
