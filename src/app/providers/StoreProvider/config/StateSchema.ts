import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User";
import { LoginSchema } from "@/features/AuthByUserName";
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";

export interface CounterSchema {
    value: number;
}

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}


export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

