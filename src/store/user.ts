import { createGlobalStore } from './index'
import type { IUserCredentials } from '../models/component'

export const UserState = createGlobalStore<IUserCredentials>('user', {
    name: '',
    email: '',
    gender: '', 
    status: '',
    token: '',
})