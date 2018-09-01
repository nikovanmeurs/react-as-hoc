"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asHoc = exports.defaultMergeProps = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultMergeProps = exports.defaultMergeProps = function defaultMergeProps(a, b) {
  return Object.assign({}, a, b);
};

var asHoc = function asHoc(ComponentWithRenderProps) {
  return function () {
    var hocProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mergeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMergeProps;
    return function (ComponentToWrap) {
      return function (props) {
        return _react2.default.createElement(
          ComponentWithRenderProps,
          hocProps,
          function (renderProps) {
            var children = props.children,
                rest = _objectWithoutProperties(props, ["children"]);

            var mergedProps = mergeProps(rest, renderProps);

            return _react2.default.createElement(
              ComponentToWrap,
              mergedProps,
              children
            );
          }
        );
      };
    };
  };
};

exports.asHoc = asHoc;
exports.default = asHoc;