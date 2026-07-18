import { useState } from "react";

import ProfileHeader from "../components/profile/ProfileHeader/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm/ProfileForm";
import PasswordForm from "../components/profile/PasswordForm/PasswordForm";
import DangerZone from "../components/profile/DangerZone/DangerZone";
import DeleteAccountModal from "../components/profile/DeleteAccountModal/DeleteAccountModal";

import { useCurrentUser, useDeleteAccount } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

import styles from "./Profile.module.css";

export default function Profile() {

  const { data: user, isLoading } = useCurrentUser();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteAccount = useDeleteAccount();

  const { logout } = useAuth();

  const toast = useToast();

  if (isLoading) {
    return (
      <main className={styles.page}>
        Loading...
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <ProfileHeader />

        <ProfileForm user={user} />

        <PasswordForm />

        <DangerZone
          loading={deleteAccount.isPending}
          onDelete={() => setDeleteOpen(true)}
        />

        <DeleteAccountModal
          open={deleteOpen}
          loading={deleteAccount.isPending}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => {
            deleteAccount.mutate(undefined, {
              onSuccess: () => {
                toast.success("Account deleted.");

                logout();
              },

              onError: () => {
                toast.error("Failed to delete account.");
              },
            });
          }}
        />

      </div>
    </main>
  );
}