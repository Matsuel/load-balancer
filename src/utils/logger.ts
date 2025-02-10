import { LogLevel, LogLevelColors, LogLevelValues } from "../constantes/enum";

export class Logger {
    private logFunction: (message: string) => void = console.log;
    private logLevel: number = 0;

    constructor(logLevel: LogLevel = LogLevel.DEBUG) {
        this.setLogLevel(logLevel);
    }

    public setLogLevel(logLevel: LogLevel): void {
        this.logLevel = LogLevelValues[logLevel];
    }

    private getNowDate(): string {
        const now = new Date();
        return now.toLocaleString();
    }

    private canLog(level: LogLevel): boolean {
        return LogLevelValues[level] >= this.logLevel;
    }

    public log(color: string, level: LogLevel, message: string[]): void {
        if (!this.canLog(level)) return;
        this.logFunction(color + `[${level}] ${this.getNowDate()} : ${message.join(' ')}` + LogLevelColors.END);
    }

    public info(...message: string[]): void {
        if (!this.canLog(LogLevel.INFO)) return;
        this.log(LogLevelColors.INFO, LogLevel.INFO, message);
    }

    public debug(...message: string[]): void {
        if (!this.canLog(LogLevel.DEBUG)) return;
        this.log(LogLevelColors.DEBUG, LogLevel.DEBUG, message);
    }

    public warn(...message: string[]): void {
        if (!this.canLog(LogLevel.WARN)) return;
        this.log(LogLevelColors.WARN, LogLevel.WARN, message);
    }

    public error(...message: string[]): void {
        if (!this.canLog(LogLevel.ERROR)) return;
        this.log(LogLevelColors.ERROR, LogLevel.ERROR, message);
    }
}