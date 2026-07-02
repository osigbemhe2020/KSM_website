import { useQuery, useMutation} from '@tanstack/react-query';

const API_URL = process.env.BACKEND_URL || "http://localhost:3002";

export function useDonate() {
    

    return useMutation({
        mutationFn: async ({ name, amount, email }: { name: string; amount: number; email: string }) => {
            const response = await fetch(`${API_URL}/payment/donate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, amount, email }),
            });

            if (!response.ok) {
                throw new Error('Payment initialization failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            // Optional: invalidate any donation-related queries
            // queryClient.invalidateQueries({ queryKey: ['donations'] });

            // If Paystack returns an authorization_url, redirect the user
            if (data?.data?.authorization_url) {
                window.location.href = data.data.authorization_url;
            }
        },
        onError: (error) => {
            console.error('Donation failed:', error);
        }
    });
}

export function useVerifyDonation({ reference }: { reference: string }) {
    return useQuery({
        queryKey: ['verify-donation', reference],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/payment/verify-donation?reference=${reference}`);

            if (!response.ok) {
                throw new Error('Verification failed');
            }

            return response.json();
        },
        enabled: !!reference, // Only run when reference is provided
        retry: false          // Don't retry on failure for verification
    });
}