import type { CreatePaymentDto, UpdatePaymentDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentsService } from '../services';

const PAYMENT_KEY = ['payments'];

export function usePayments() {
  return useQuery({
    queryKey: PAYMENT_KEY,
    queryFn: () => paymentsService.getAll(),
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey: [...PAYMENT_KEY, id],
    queryFn: () => paymentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => paymentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY });
    },
  });
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePaymentDto }) =>
      paymentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEY });
    },
  });
}
