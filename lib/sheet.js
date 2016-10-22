'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSheet = undefined;

var _reactNative = require('react-native');

/**
 * Factory function to create ResponsiveStyleSheet object.
 */
var make = function make(extension) {
  var _extension = extension || function () {
    return {};
  };

  var setExtension = function setExtension(e) {
    _extension = e;
  };

  var getExtension = function getExtension() {
    return _extension;
  };

  /**
   * Re-compute base and custom propeties.
   */
  var _calculateProperties = function _calculateProperties() {
    var _Dimensions$get = _reactNative.Dimensions.get('window');

    var width = _Dimensions$get.width;
    var height = _Dimensions$get.height;

    var landscape = width > height;
    var ratio = width / height;
    var orientation = landscape ? 'landscape' : 'portrait';
    var baseProperties = { width: width, height: height, landscape: landscape, orientation: orientation, ratio: ratio };
    var customProperties = _extension(baseProperties);
    return Object.assign({}, baseProperties, customProperties);
  };

  /**
   * Compute and return properties.
   */
  var getProperties = function getProperties() {
    return _calculateProperties();
  };

  /**
   * Factory function to create responsive styles.
   * Maps properties to styles.
   */
  var create = function create(attributesToStyles) {
    return function () {
      var properties = _calculateProperties();
      return attributesToStyles(properties);
    };
  };

  return { create: create, getProperties: getProperties, setExtension: setExtension, getExtension: getExtension };
};

var makeSheet = exports.makeSheet = make;