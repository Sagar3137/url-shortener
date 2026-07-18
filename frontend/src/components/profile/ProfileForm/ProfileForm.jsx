import { useState, useRef } from "react";

import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import { useUpdateProfile } from "../../../hooks/useUser";
import { useToast } from "../../../hooks/useToast";
import { useUnsavedChanges } from "../../../hooks/useUnsavedChanges";
import styles from "./ProfileForm.module.css";

export default function ProfileForm({ user }) {
  const toast = useToast();

  const updateProfile = useUpdateProfile();

  const [form, setForm] = useState(() => ({
    username: user.username,
    email: user.email,
  }));

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const hasChanges =
    form.username.trim() !== user.username.trim() ||
    form.email.trim().toLowerCase() !==
    user.email.trim().toLowerCase();

  useUnsavedChanges(hasChanges);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profile updated.");
    } catch (err) {
      const message =
        err.response?.data?.detail ??
        "Failed to update profile.";

      toast.error(message);

      if (
        message.toLowerCase().includes("username")
      ) {
        usernameRef.current?.focus();
      }

      if (
        message.toLowerCase().includes("email")
      ) {
        emailRef.current?.focus();
      }
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Account Information</h2>

        <p>
          Update your username and email.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          label="Username"
          value={form.username}
          ref={usernameRef}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          ref={emailRef}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />


        <div className={styles.actions}>
          <Button
            type="submit"
            loading={updateProfile.isPending}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
}