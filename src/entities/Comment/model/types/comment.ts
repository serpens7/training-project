import type { User } from '@/entities/User/@x/Comment';

export interface Comment {
    id: string;
    user: User;
    text: string;
}
