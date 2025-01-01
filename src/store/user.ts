import { createGlobalStore } from './index'

type UserState = {
    name: string;
    token: string;
}

export const useUserState = createGlobalStore<UserState>('user', {
    name: '',
    token: '',
})