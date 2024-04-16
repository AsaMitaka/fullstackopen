import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';

const useAllNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: api.getAllNotes,
  });
};

const useNote = (id) => {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => api.getNote(id),
  });
};

const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote) => await api.createNote(newNote),
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};

const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedNote }) => await api.updateNote(id, updatedNote),
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};

const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await api.deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries('notes'),
  });
};

export { useAllNotes, useNote, useCreateNote, useUpdateNote, useDeleteNote };
