import { useState } from "react";

import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import { useChangePassword } from "../../../hooks/useUser";
import { useToast } from "../../../hooks/useToast";

import styles from "./PasswordForm.module.css";

export default function PasswordForm() {
  const toast = useToast();

  const changePassword = useChangePassword();

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const canSubmit =
    form.current_password.trim() !== "" &&
    form.new_password.trim() !== "" &&
    form.confirm_password.trim() !== "" &&
    form.new_password === form.confirm_password &&
    form.new_password !== form.current_password;

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (
      form.new_password !==
      form.confirm_password
    ) {
      setError("Passwords do not match.");
      return;
    }

    if (
      form.current_password ===
      form.new_password
    ) {
      setError(
        "New password must be different."
      );
      return;
    }

    try {
      await changePassword.mutateAsync({
        current_password: form.current_password,
        new_password: form.new_password,
      });

      toast.success("Password updated.");

      setForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (err) {
      const message =
        err.response?.data?.detail ??
        "Failed to update password.";

      setError(message);
      toast.error(message);
    }
  }

  let validationMessage = "";

  if (
    form.new_password &&
    form.confirm_password &&
    form.new_password !== form.confirm_password
  ) {
    validationMessage =
      "Passwords do not match.";
  } else if (
    form.current_password &&
    form.new_password &&
    form.current_password === form.new_password
  ) {
    validationMessage =
      "New password must be different from the current password.";
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Security</h2>

        <p>
          Change your account password.
        </p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Input
          label="Current Password"
          type="password"
          value={form.current_password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              current_password:
                e.target.value,
            }))
          }
          required
        />

        <Input
          label="New Password"
          type="password"
          value={form.new_password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              new_password:
                e.target.value,
            }))
          }
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          value={form.confirm_password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              confirm_password:
                e.target.value,
            }))
          }
          required
        />

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

        {validationMessage && (
          <p className={styles.error}>
            {validationMessage}
          </p>
        )}
        <div className={styles.actions}>
          <Button
            type="submit\"
            loading={changePassword.isPending}
            disabled={!canSubmit}
          >
            Change Password
          </Button>
        </div>
      </form>
    </section>
  );
}