const API_URL = 'http://localhost:3000/api';

export const authService = {
    async login(email: string, password: string) {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Ensures cookies are sent/received
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to login');
        }

        const data = await response.json();
        return data.user; // Backend returns { user: createUserResponse(user) }
    },

    async logout() {
        const response = await fetch(`${API_URL}/users/logout`, {
            method: 'POST',
            credentials: 'include', // Ensures cookies are included
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to logout');
        }

        return response.json(); // Returns { message: 'Logged out successfully' }
    },

    async getCurrentUser() {
        const response = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            credentials: 'include', // Ensures cookies are sent
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user');
        }

        return await response.json(); // Returns user data
    },

    async register(email: string, password: string, name: string) {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
            credentials: 'include', // Ensures cookies are included
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register');
        }

        const data = await response.json();
        return data.user; // Backend returns { user: createUserResponse(user) }
    },
};
