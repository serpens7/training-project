import { Country } from "@/entities/Country/@x/Profile";
import { Currency } from "@/entities/Currency/@x/Profile";

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}
