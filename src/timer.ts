export class Timer {
    private startTime: number = 0;
    private timerRunning: boolean = false;
    private diffAtBreak: number = 0;
    private ONE_HOUR = 3600000;
    private ONE_MINUTE = 60000;
    private ONE_SECOND = 1000;
    public start() {
        if (this.timerRunning) {
            return;
        }
        this.startTime = Date.now();
        this.timerRunning = true;
    }

    public stop() {
        if (!this.timerRunning) {
            return;
        }
        const now = Date.now();
        this.diffAtBreak = (now - this.startTime) + this.diffAtBreak;
        this.timerRunning = false;
    }
    public reset() {
        this.startTime = 0;
        this.diffAtBreak = 0;
        this.timerRunning = false;
    }
    public isRunning() {
        return this.timerRunning;
    }
    public getRunTime() {
        let diff: number = 0
        if (this.timerRunning) {
            const now = Date.now();
            diff = (now - this.startTime) + this.diffAtBreak;
        }
        else {
            diff = this.diffAtBreak;
        }
        let hours = this.getHours(diff);
        let minutes = this.getMinutes(diff, hours);
        let seconds = this.getSeconds(diff, hours, minutes);
        return this.convertToTime(hours, minutes, seconds);
    }
    private getHours(diff: number) {
        return Math.trunc(diff / this.ONE_HOUR);
    }

    private getMinutes(diff: number, hours: number) {
        let diffMin = diff - (hours * this.ONE_HOUR);
        return Math.trunc(diffMin / this.ONE_MINUTE);
    }

    private getSeconds(diff: number, hours: number, minutes: number) {
        let diffSec = diff - ((hours * this.ONE_HOUR) + (minutes * this.ONE_MINUTE));
        return Math.trunc(diffSec / this.ONE_SECOND);
    }
    private getNumberStrNumc2(number: number) {
        let numberStr = number.toString();
        if (numberStr.length === 1) {
            numberStr = "0" + numberStr;
        }
        return numberStr;
    }
    private convertToTime(hours: number, minutes: number, seconds: number) {
        let hoursStr = this.getNumberStrNumc2(hours);
        let minutesStr = this.getNumberStrNumc2(minutes);
        let secondsStr = this.getNumberStrNumc2(seconds);
        return hoursStr + ":" + minutesStr + ":" + secondsStr;
    }
}