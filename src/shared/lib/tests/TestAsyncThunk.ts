import { StateSchema } from '@/app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';

type ActionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<
        Return,
        Arg,
        {
            rejectValue: RejectedValue;
            extra: { api: typeof $api };
            state: StateSchema;
        }
    >;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    api = $api;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(
            this.dispatch,
            this.getState,
            {
                api: this.api,
            }
        );
        return result;
    }
}