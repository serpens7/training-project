import { ArticleDetailsSchema } from "@/entities/Article";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User";
import { AddCommentFormSchema } from "@/features/AddCommentForm";
import { LoginSchema } from "@/features/AuthByUserName";
import { ArticlesPageSchema } from "@/pages/ArticlesPage";
import { AnyAction, Dispatch, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";
import { ArticleDetailsPageSchema } from "@/pages/ArticleDetailsPage";
import { rtkApi } from "@/shared/api/rtkApi";

export interface CounterSchema {
    value: number;
}

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => OptionalRecord<StateSchemaKey, boolean>;
}


export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export type ThunkConfig<T> = {
    rejectValue: T;
    extra: ThunkExtraArg;
    dispatch?: Dispatch;
    state: StateSchema;
}

