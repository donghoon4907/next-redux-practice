import { SagaErrorAction } from '@actions/error/error.action';

export interface ErrorState {
    [key: string]: null | Error | string;
}

const errorReducer = (state: ErrorState = {}, action: SagaErrorAction) => {
    const { type, payload } = action;

    const matches = /(.*)_(REQUEST|ERROR)/.exec(type);

    if (!matches) {
        return state;
    }

    const [, requestName, requestStatus] = matches;

    return {
        ...state,
        message: requestStatus === 'ERROR' ? payload.message : null,
        statusCode: requestStatus === 'ERROR' ? payload.statusCode : null,
    };
};

export default errorReducer;
