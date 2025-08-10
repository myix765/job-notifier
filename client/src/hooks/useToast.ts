import { useCallback } from 'react';
import { toast } from 'sonner';

export const useToast = () => {
  const showErrorToast = useCallback((message: string, description?: string) => {
    toast.error(message, {
      description,
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  }, []);

  const showSuccessToast = useCallback((message: string, description?: string) => {
    toast.success(message, {
      description,
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  }, []);

  return { showErrorToast, showSuccessToast };
};
