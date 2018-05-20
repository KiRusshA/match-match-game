class Timer {
    constructor() {
        this.readout = '';
        this.base = 60;
        this.hour = 1;
        this.minute = 1;
        this.tm = 1;
        this.s = 0;
        this.ts = 0;
        this.ms = 0;
        this.init = 0;
        this.clocktimer = null;
        this.dateObj = null;
        this.dh = null;
        this.dm = null;
        this.ds = null;
    };

    get readOut(){
        return this.readout;
    }

    clearClock() {
        clearTimeout(this.clocktimer);
        this.hour = 1;
        this.minute = 1;
        this.tm = 1;
        this.s = 0;
        this.ts = 0;
        this.ms = 0;
        this.init = 0;
        this.readout = '00:00:00.00';
    }

    StartTIME() {
        let cdateObj = new Date();
        let t = (cdateObj.getTime() - dateObj.getTime()) - (this.s * 1000);
        if (t > 999) {
            this.s++;
        }
        if (this.s >= (this.minute * this.base)) {
            this.ts = 0;
            this.minute++;
        } else {
            this.ts = parseInt((this.ms / 100) + this.s);
            if (this.ts >= this.base) {
                this.ts = this.ts - ((this.minute - 1) * this.base);
            }
        }
        if (this.minute > (this.hour * this.base)) {
            this.tm = 1;
            this.hour++;
        } else {
            this.tm = parseInt((this.ms / 100) + this.minute);
            if (this.tm >= this.base) {
                this.tm = this.tm - ((this.hour - 1) * this.base);
            }
        }
        this.ms = Math.round(this.t / 10);
        if (this.ms > 99) {
            this.ms = 0;
        }
        if (this.ms == 0) {
            this.ms = '00';
        }
        if (this.ms > 0 && this.ms <= 9) {
            this.ms = '0' + this.ms;
        }
        if (this.ts > 0) {
            this.ds = this.ts;
            if (this.ts < 10) {
                this.ds = '0' + this.ts;
            }
        } else {
            this.ds = '00';
        }
        this.dm = this.tm - 1;
        if (this.dm > 0) {
            if (this.dm < 10) {
                this.dm = '0' + this.dm;
            }
        } else {
            this.dm = '00';
        }
        this.dh = this.hour - 1;
        if (this.dh > 0) {
            if (this.dh < 10) {
                this.dh = '0' + this.dh;
            }
        } else {
            this.dh = '00';
        }
        this.readout = this.dh + ':' + this.dm + ':' + this.ds + '.' + this.ms;
        this.clocktimer = setTimeout("StartTIME()", 1);
    }

    startStop() {
        if (init == 0) {
            clearClock();
            this.dateObj = new Date();
            StartTIME();
            this.init = 1;
        } else {
            clearTimeout(this.clocktimer);
            this.init = 0;
        }
    }
}

module.exports = {
    Timer,
};