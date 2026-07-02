import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.BACKEND_URL || "http://localhost:3002";

export function useGetMembers(filters: Record<string, string> = {}, page = 1, limit = 10) {
    const queryParams = new URLSearchParams({
        ...filters,
        page: page.toString(),
        limit: limit.toString(),
    });

    return useQuery({
        queryKey: ['members', filters, page, limit],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/members?${queryParams}`,{
                credentials: 'include',  // ← add to every fetch
            });
            if (!response.ok) throw new Error('Failed to fetch members');
            return response.json();
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 20,
    });
}

export function useGetMemberFilters() {
  return useQuery({
    queryKey: ['member-filters'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/members/filter`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch filters');
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // cache for 10 mins, filter options rarely change
  });
}

export function useGetSingleMember(id: string) {
    return useQuery({
        queryKey: ['member', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/members/${id}`, {
                credentials: 'include',  // ← add to every fetch
            });
            if (!response.ok) throw new Error('Failed to fetch member');
            return response.json();
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 20,
        enabled: !!id,
    });
}

export function useRegisterMember() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(`${API_URL}/members/add`, {
                method: 'POST',
                body: formData,
                credentials: 'include',  // ← add to every fetch
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

export function useUpdateMember() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const response = await fetch(`${API_URL}/members/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',  // ← add to every fetch
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

export function useUpdateMemberOffice() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ id, officeHeld }: { id: string; officeHeld: string }) => {
            const response = await fetch(`${API_URL}/members/${id}/office`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // ← add to every fetch
                body: JSON.stringify({ officeHeld }),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

export function useDeleteMember() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_URL}/members/${id}`, {
                method: 'DELETE',
                credentials: 'include',  // ← add to every fetch
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

// hooks/auth.hook.ts
export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Request failed');
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
        body: JSON.stringify({ token, newPassword }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
  });
}

// ── ADD THIS to your member.hook.ts ─────────────────────────────────────────

export function useUpdateProfilePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await fetch(`${API_URL}/members/${id}/photo`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json(); // returns { profilePhoto: url }
    },

    onSuccess: (_, { id }) => {
      // Invalidate the specific member so ProfileHeader re-fetches with new photo
      queryClient.invalidateQueries({ queryKey: ['member', id] });
    },
  });
}