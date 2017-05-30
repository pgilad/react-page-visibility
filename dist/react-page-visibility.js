'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVisibilityState = exports.visibility = exports.isSupported = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hasDocument = typeof document !== 'undefined';
var vendorEvents = [{
    hidden: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState'
}, {
    hidden: 'webkitHidden',
    event: 'webkitvisibilitychange',
    state: 'webkitVisibilityState'
}, {
    hidden: 'mozHidden',
    event: 'mozvisibilitychange',
    state: 'mozVisibilityState'
}, {
    hidden: 'msHidden',
    event: 'msvisibilitychange',
    state: 'msVisibilityState'
}, {
    hidden: 'oHidden',
    event: 'ovisibilitychange',
    state: 'oVisibilityState'
}];

var isSupported = exports.isSupported = hasDocument && Boolean(document.addEventListener);

var visibility = exports.visibility = function () {
    if (!isSupported) {
        return null;
    }
    for (var i = 0; i < vendorEvents.length; i++) {
        var event = vendorEvents[i];
        if (event.hidden in document) {
            return event;
        }
    }
    // otherwise it's not supported
    return null;
}();

var getVisibilityState = exports.getVisibilityState = function getVisibilityState(_ref) {
    var hidden = _ref.hidden,
        state = _ref.state;

    return {
        documentHidden: document[hidden],
        visibilityState: document[state]
    };
};

var PageVisibility = function (_Component) {
    _inherits(PageVisibility, _Component);

    function PageVisibility() {
        _classCallCheck(this, PageVisibility);

        return _possibleConstructorReturn(this, (PageVisibility.__proto__ || Object.getPrototypeOf(PageVisibility)).apply(this, arguments));
    }

    _createClass(PageVisibility, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!isSupported || !visibility) {
                return;
            }

            this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
            this.isListening = true;

            document.addEventListener(visibility.event, this.handleVisibilityChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.isListening) {
                return;
            }
            document.removeEventListener(visibility.event, this.handleVisibilityChange);
        }
    }, {
        key: 'handleVisibilityChange',
        value: function handleVisibilityChange() {
            var hidden = visibility.hidden,
                state = visibility.state;

            this.props.onChange(document[state], document[hidden]);
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.children) {
                return null;
            }

            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return PageVisibility;
}(_react.Component);

PageVisibility.displayName = 'PageVisibility';

PageVisibility.propTypes = {
    onChange: _propTypes2.default.func.isRequired
};

exports.default = PageVisibility;

