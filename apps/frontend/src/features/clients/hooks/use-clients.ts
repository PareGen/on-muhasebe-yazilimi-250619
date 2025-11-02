import type { CreateClientDto, UpdateClientDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clientsService } from '../services';

const CLIENT_KEY = ['clients'];

export function useClients() {
  return useQuery({
    queryKey: CLIENT_KEY,
    queryFn: () => clientsService.getAll(),
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: [...CLIENT_KEY, id],
    queryFn: () => clientsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientDto) => clientsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientDto }) =>
      clientsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_KEY });
    },
  });
}
