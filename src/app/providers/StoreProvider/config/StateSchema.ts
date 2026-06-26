import { ArticleDetailsSchema } from "@/entities/Article/model/types/articleDetailsSchema";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User";
import { AddCommentFormSchema } from "@/features/AddCommentForm";
import { LoginSchema } from "@/features/AuthByUserName";
import { ArticleDetailsCommentsSchema } from "@/pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "@/pages/ArticlesPage";
import { AnyAction, Dispatch, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";

export interface CounterSchema {
    value: number;
}

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    profile?: ProfileSchema;
    loginForm?: LoginSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
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

