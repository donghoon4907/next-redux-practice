import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
import coreConstants from '@constants/core';
import { isNumberic } from './validation';

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

export class DayJSModule {
    private _instance: dayjs.Dayjs | null = null;
    private _date: string | null = null;
    private readonly ymdRegex = /^\d{4}-\d{2}-\d{2}$/;

    public static isDate(date: string | number) {
        return isNumberic(date)
            ? false
            : /^\d{4}-\d{2}-\d{2}$/.test(date as string);
    }

    constructor(date?: string) {
        if (date) {
            this.initialize(date);
        }
    }
    // Get dayjs instance
    getInstance = () => {
        return this._instance;
    };
    // Get date string
    getDate = () => {
        return this._date;
    };
    // Set dayjs instance
    initialize = (date: string) => {
        this._instance = dayjs(date);
        this._date = date;
    };
    // Only checks if the value could be parsed to a Date time.
    isDate = () => {
        let output = false;
        if (this._date) {
            output = DayJSModule.isDate(this._date);
        }

        return output;
    };
    // Provided by changing to default date format
    public getDefaultDateFormat = () => {
        return this._instance?.format(coreConstants.CORE_DATE_FORMAT);
    };
    // Provided by changing to custom date format
    public getDateFormat = (dateFormat: string) => {
        return this._instance?.format(dateFormat);
    };
}
