
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// hooks/document.hook.ts
const API_URL = 'http://localhost:3002';

export function useGetDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/documents`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch documents');
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData, // no Content-Type header — let browser set it
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}