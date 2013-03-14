/*global require:false, module:true */

require('shelljs/global');
var reader = require('buffered-reader');
var util = require('util');

/**
 * MuggleTemplate
 *
 * @constructor
 * @param {string} filePath path of template file.
 * @param {string} encoding encoding of template file.
 */
var MuggleTemplate = function(filePath, encoding) {
    this._path = filePath;
    this._encoding = encoding;
};

/**
 * parse template file
 *
 * @param {fucntion} callback excute when parse over.
 */
MuggleTemplate.prototype.parse = function(callback) {
    var me = this;
    new reader.DataReader(this._path, {encoding: this._encoding})
        .on('error', function(error) {
            util.puts(error);
        })
        .on('line', function(line, nextByteOffset) {
            console.log(line);
            console.log(nextByteOffset);
            // TODO
        })
        .on('end', function() {
            callback.call(me);
        });
};
