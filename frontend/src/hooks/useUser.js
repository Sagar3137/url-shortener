import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../api/users";

export const userKeys = {
  me: ["me"],
};

export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: getCurrentUser,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.me,
      });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
  });
}