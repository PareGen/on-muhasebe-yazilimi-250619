import type { CreateUseractivitylogDto, UpdateUseractivitylogDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useractivitylogsService } from '../services';

const USERACTIVITYLOG_KEY = ['useractivitylogs'];

export function useUseractivitylogs() {
  return useQuery({
    queryKey: USERACTIVITYLOG_KEY,
    queryFn: () => useractivitylogsService.getAll(),
  });
}

export function useUseractivitylog(id: string) {
  return useQuery({
    queryKey: [...USERACTIVITYLOG_KEY, id],
    queryFn: () => useractivitylogsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUseractivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUseractivitylogDto) => useractivitylogsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERACTIVITYLOG_KEY });
    },
  });
}

export function useUpdateUseractivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUseractivitylogDto }) =>
      useractivitylogsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERACTIVITYLOG_KEY });
    },
  });
}

export function useDeleteUseractivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => useractivitylogsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERACTIVITYLOG_KEY });
    },
  });
}
