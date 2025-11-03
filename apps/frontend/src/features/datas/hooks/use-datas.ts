import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { datasService, type CreateDataDto, type UpdateDataDto } from '../services';

const DATA_KEY = ['datas'];

export function useDatas() {
  return useQuery({
    queryKey: DATA_KEY,
    queryFn: () => datasService.getAll(),
  });
}

export function useData(id: string) {
  return useQuery({
    queryKey: [...DATA_KEY, id],
    queryFn: () => datasService.getById(id),
    enabled: !!id,
  });
}

export function useCreateData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDataDto) => datasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATA_KEY });
    },
  });
}

export function useUpdateData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDataDto }) =>
      datasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATA_KEY });
    },
  });
}

export function useDeleteData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => datasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATA_KEY });
    },
  });
}
