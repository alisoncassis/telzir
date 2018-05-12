class Call {

    constructor(dddOrigin = '', dddDestination = '', time = '', plan = '', pricePerMinute = '', tax = '') {
        this._dddOrigin = dddOrigin ;
        this._dddDestination = dddDestination;
        this._time = time;
        this._plan = plan;
        this._pricePerMinute = pricePerMinute;
        this._tax = tax;
    }

    get dddOrigin() {
        return this._dddOrigin;
    }

    get tax() {
        return this._tax;
    }

    get dddDestination() {
        return this._dddDestination;
    }

    get time() {
        return this._time;
    }

    get plan() {
        return this._plan;
    }

    get pricePerMinute() {
        return this._pricePerMinute;
    }

    get defaultPrice() {
        return this.time * this.pricePerMinute
    }

    get faleMaisPrice() {
        if(this.time <= this.plan) {
            return 0
        }
        return (this.time - this.plan) * (this.pricePerMinute + (this.pricePerMinute * this.tax))
    }

    set dddOrigin(dddOrigin) {
        this._dddOrigin = dddOrigin;
        return this
    }

    set dddDestination(dddDestination) {
        this._dddDestination = dddDestination;
        return this
    }

    set tax(tax) {
        this._tax = tax;
        return this
    }

    set time(time) {
        this._time = time;
        return this
    }

    set plan(plan) {
        this._plan = plan;
        return this
    }

    set pricePerMinute(pricePerMinute) {
        this._pricePerMinute = pricePerMinute;
        return this
    }
}
