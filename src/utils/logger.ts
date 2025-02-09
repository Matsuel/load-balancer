import { LogLevel, LogLevelColors } from "../constantes/enum";

export class Logger {
    private logFunction: (message: string) => void = console.log;
    private logLevel: string;

    constructor(logLevel: string = LogLevel.DEBUG) {
        this.logLevel = logLevel;
    }

    public setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel;
    }

    private getNowDate(): string {
        const now = new Date();
        return now.toLocaleString();
    }

    public log(color: string, level: string, message: string[]): void {
        this.logFunction(color + `[${level}] ${this.getNowDate()} : ${message.join(' ')}` + LogLevelColors.END);
    }

    public info(...message: string[]): void {
        this.log(LogLevelColors.INFO, 'INFO', message);
    }

    public debug(...message: string[]): void {
        this.log(LogLevelColors.DEBUG, 'DEBUG', message);
    }

    public warn(...message: string[]): void {
        this.log(LogLevelColors.WARN, 'WARN', message);
    }

    public error(...message: string[]): void {
        this.log(LogLevelColors.ERROR, 'ERROR', message);
    }
}