import { createGlobalStore } from './index'

type UserState = {
    name: string;
    token: string;
}

export const UserState = createGlobalStore<UserState>('user', {
    name: '',
    token: '',
})