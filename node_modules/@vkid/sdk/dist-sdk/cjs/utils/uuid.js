'use strict';

var index = require('./../lib/nanoid/non-secure/index.js');

var uuid = index.customAlphabet("qazwsxedcrfvtgbyhnujmikol", 6);

exports.uuid = uuid;
