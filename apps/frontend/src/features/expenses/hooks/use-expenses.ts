import type { CreateExpenseDto, UpdateExpenseDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { expensesService } from '../services';

const EXPENSE_KEY = ['expenses'];

export function useExpenses() {
  return useQuery({
    queryKey: EXPENSE_KEY,
    queryFn: () => expensesService.getAll(),
  });
}

export function useExpense(id: string) {
  return useQuery({
    queryKey: [...EXPENSE_KEY, id],
    queryFn: () => expensesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseDto) => expensesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEY });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseDto }) =>
      expensesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEY });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expensesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEY });
    },
  });
}
