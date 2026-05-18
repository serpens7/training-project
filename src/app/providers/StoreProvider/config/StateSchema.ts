import { UserSchema } from "@/entities/User";
import { LoginSchema } from "@/features/AuthByUserName";

export interface CounterSchema {
    value: number;
}

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    loginForm: LoginSchema;
}
