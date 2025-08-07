import { toast } from 'sonner';

export const useToast = () => {
  const showErrorToast = (message: string, description?: string) => {
    toast.error(message, {
      description,
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  };

  const showSuccessToast = (message: string, description?: string) => {
    toast.success(message, {
      description,
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  };

  return { showErrorToast, showSuccessToast };
};
