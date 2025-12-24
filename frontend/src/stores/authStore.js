import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || '');
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);
    const router = useRouter();

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5005/auth/login', {
                username, password
            });

            token.value = response.data.token;
            user.value = response.data.user;

            localStorage.setItem('token', token.value);
            localStorage.setItem('user', JSON.stringify(user.value));

            return true; // Login sukses
        } catch (error) {
            throw error; // Lempar error biar bisa ditangkap di View
        }
    };

    const logout = () => {
        token.value = '';
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect will be handled by component or here if router instance available
        window.location.href = '/login';
    };

    return { token, user, login, logout };
});
