/*global require:false, module:true */

var util = require('util');
var re = {};

/**
 * 用于替代字符串拼接的模板函数
 *      G.format( '{1} name is {2}!', { 1: 'Her', 2: 'Mo' });
 *      G.format( '{v} is good!', 'JavaScript' );
 *      G.format( '{s} is good!', '{s}', 'JavaScript' );
 *      G.format( '<1> name is <2>!', { 1: 'Her', 2: 'Mo' }, /<([^<>]+)>/g);
 * @param {string} tmpl 模板字符串.
 * @param {string/object} _key 如果是字符串则是键值；
 *                            如果是object则是Map,key为键值，value为替换值;
 *                            如果没有第三个参数，则key为{v}，value为此值.
 * @param {string/regexp} _val 如果key是字符串，则val是被替换值
 *                            如果key是Map，且有val，则val是搜索key的正则，例如：/<([^<>]+)>\/g .
 * @return {string} 替换成功后的值.
 */
re.format = function(tmpl, _key, _val) {
    if (!_key) {
        return tmpl;
    }
    var val;

    if (typeof _key !== 'object') {
        var key = _val ? _key : '{v}';
        val = _val || _key;
        return tmpl.replace(new RegExp(key, 'g'), ('' + val));
    } else {
        var obj = _key;
        return tmpl.replace(_val || /\{([^{}]+)\}/g, function(match, key) {
            val = obj[key];
            return (val !== undefined) ? ('' + val) : '';
        });
    }
};

/**
 * 用于替代字符串拼接的模板函数，并直接输出到控制台
 *      G.format( '{1} name is {2}!', { 1: 'Her', 2: 'Mo' });
 *      G.format( '{v} is good!', 'JavaScript' );
 *      G.format( '{s} is good!', '{s}', 'JavaScript' );
 *      G.format( '<1> name is <2>!', { 1: 'Her', 2: 'Mo' }, /<([^<>]+)>/g);
 *
 * @this
 * @param {string} tmpl 模板字符串.
 * @param {string/object} _key 如果是字符串则是键值；
 *                            如果是object则是Map,key为键值，value为替换值;
 *                            如果没有第三个参数，则key为{v}，value为此值.
 * @param {string/regexp} _val 如果key是字符串，则val是被替换值
 *                            如果key是Map，且有val，则val是搜索key的正则，例如：/<([^<>]+)>\/g .
 */
re.puts = function(tmpl, _key, _val) {
    util.puts(this.format(tmpl, _key, _val));
};

/**
 * export
 */
module.exports = re;
