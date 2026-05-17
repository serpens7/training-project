import { UserSchema } from "@/entities/User";

export interface CounterSchema {
    value: number;
}

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
}
