import { defineStore } from 'pinia';
import type { UserResponse } from '~/types/api/user';


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as UserResponse | null,
    }),
    
    getters: {
        currentUser: (state) => state.user,
    },
    
    actions: {
        setUser(user: UserResponse) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    }
});
