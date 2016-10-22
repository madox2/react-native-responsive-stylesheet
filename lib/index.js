'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveStyleSheet = exports.makeStyleSheet = undefined;

var _sheet = require('./sheet');

var globalStyleSheet = (0, _sheet.makeSheet)();

var makeStyleSheet = exports.makeStyleSheet = _sheet.makeSheet;

var ResponsiveStyleSheet = exports.ResponsiveStyleSheet = globalStyleSheet;