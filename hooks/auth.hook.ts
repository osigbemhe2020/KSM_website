import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3002";

// in your auth.hook file
export function useGetMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/auth/me`, {
                credentials: 'include',
            });
            console.log("i am logged in", response);
            if (!response.ok) throw new Error('Not authenticated');
            return response.json();
        },
        retry: false,         // don't retry if not logged in
        staleTime: 1000 * 60 * 5,
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // <-- add to every fetch
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Handle different error statuses
                if (response.status === 401) {
                    const error = await response.json();
                    throw new Error(error.message || 'Invalid email or password');
                } else if (response.status === 400) {
                    const error = await response.json();
                    throw new Error(error.message || 'Invalid input data');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    throw new Error('Login failed. Please try again.');
                }
            }

            return response.json();
        },
        onSuccess: () => {
            // Refetch any protected queries after login
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Logout failed');
            return response.json();
        },
        onSuccess: () => {
            // Clear all cached data on logout so protected data isn't sitting in memory
            queryClient.clear();
        },
    });
}

export function useChangePassword() {
    return useMutation({
        mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
            const response = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send reset instructions');
            }

            return response.json();
        },
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to reset password');
            }

            return response.json();
        },
    });
}