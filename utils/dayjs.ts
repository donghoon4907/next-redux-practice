import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
import coreConstants from '@constants/core';
import { isNumeric } from './validation';

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

export class DayJSModule {
    private _instance: dayjs.Dayjs | null = null;
    private _date: string | null = null;

    public static isDate(date: string) {
        let output = false;
        if (!isNumeric(date)) {
            if (dayjs(date).isValid()) {
                output = true;
            }
        }

        return output;
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
        // 숫자형 데이터 제외
        if (!isNumeric(this._date)) {
            // 날짜 형식 검증
            if (this._instance?.isValid()) {
                output = true;
            }
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
