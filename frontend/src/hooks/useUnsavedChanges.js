import { useEffect } from "react";

export function useUnsavedChanges(hasChanges) {
  useEffect(() => {
    function handleBeforeUnload(e) {
      if (!hasChanges) return;

      e.preventDefault();

      // Required for Chrome
      e.returnValue = "";
    }

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [hasChanges]);
}