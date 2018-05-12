'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Call = function () {
    function Call() {
        var dddOrigin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var dddDestination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var plan = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var pricePerMinute = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
        var tax = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

        _classCallCheck(this, Call);

        this._dddOrigin = dddOrigin;
        this._dddDestination = dddDestination;
        this._time = time;
        this._plan = plan;
        this._pricePerMinute = pricePerMinute;
        this._tax = tax;
    }

    _createClass(Call, [{
        key: 'dddOrigin',
        get: function get() {
            return this._dddOrigin;
        },
        set: function set(dddOrigin) {
            this._dddOrigin = dddOrigin;
            return this;
        }
    }, {
        key: 'tax',
        get: function get() {
            return this._tax;
        },
        set: function set(tax) {
            this._tax = tax;
            return this;
        }
    }, {
        key: 'dddDestination',
        get: function get() {
            return this._dddDestination;
        },
        set: function set(dddDestination) {
            this._dddDestination = dddDestination;
            return this;
        }
    }, {
        key: 'time',
        get: function get() {
            return this._time;
        },
        set: function set(time) {
            this._time = time;
            return this;
        }
    }, {
        key: 'plan',
        get: function get() {
            return this._plan;
        },
        set: function set(plan) {
            this._plan = plan;
            return this;
        }
    }, {
        key: 'pricePerMinute',
        get: function get() {
            return this._pricePerMinute;
        },
        set: function set(pricePerMinute) {
            this._pricePerMinute = pricePerMinute;
            return this;
        }
    }, {
        key: 'defaultPrice',
        get: function get() {
            return this.time * this.pricePerMinute;
        }
    }, {
        key: 'faleMaisPrice',
        get: function get() {
            if (this.time <= this.plan) {
                return 0;
            }
            return (this.time - this.plan) * (this.pricePerMinute + this.pricePerMinute * this.tax);
        }
    }]);

    return Call;
}();
//# sourceMappingURL=Call.js.map