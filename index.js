/*global require:false, module:true */

var util = require('util');
var fs = require('fs');
var path = require('path');
var Template = require('./lib/Template');

var msg = {
    templateNotExist: 'Error:template file {v} not exist!',
    createMakerUsage: 'Use template file {file} ({encoding}).'
};

/**
 * Entry of this program
 */
module.exports = {
    /**
     * create JSON maker
     *
     * @param {string} templateFile template file name.
     * @param {string} encoding for file.
     */
    createJSONMaker: function(templateFile, encoding) {
        encoding = encoding || 'utf8';
        templateFile = path.resolve(templateFile || './muggle.template');
        fs.exists(templateFile, function(exists) {
            if (!exists) {
                Template.puts(msg.templateNotExist, templateFile);
                return;
            }

            Template.puts(msg.createMakerUsage, {
                file: templateFile,
                encoding: encoding
            });
            util.puts('Generating JSON maker for muggle...');

            util.puts('Generating complete!');
        });
    }
};
