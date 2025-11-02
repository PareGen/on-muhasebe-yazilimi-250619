import type { CreateInvoiceDto, UpdateInvoiceDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invoicesService } from '../services';

const INVOICE_KEY = ['invoices'];

export function useInvoices() {
  return useQuery({
    queryKey: INVOICE_KEY,
    queryFn: () => invoicesService.getAll(),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: [...INVOICE_KEY, id],
    queryFn: () => invoicesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceDto) => invoicesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEY });
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInvoiceDto }) =>
      invoicesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEY });
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEY });
    },
  });
}
