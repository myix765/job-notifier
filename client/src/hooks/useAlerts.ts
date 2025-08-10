import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from '@/hooks/useToast';
import type { Alert } from "@/components/dashboardContainer/types";

interface dbAlertSchema {
  id: string | null;
  user_id: string | null;
  position: string;
  location: string | null;
  keywords: string[] | null;
  alertFreq: number;
  is_active: boolean;
  created_at: string | null;
}

type NewalertFormSchema = Omit<dbAlertSchema, "id" | "created_at">;

export const useAlerts = () => {
  const { session } = useAuth();
  const { showErrorToast } = useToast();

  const modelMapper = {
    uiToDbAlert: (
      alert: Alert,
      userId: string | null
    ): NewalertFormSchema => {
      const { position, filters } = alert;
      const { location, keywords, alertFreq } = filters

      return {
        user_id: userId,
        position: position,
        location: location ?? null,
        keywords: keywords ?? null,
        alertFreq: alertFreq,
        is_active: true,
      };
    },

    dbToUiAlert: (alert: dbAlertSchema): Alert => {
      const { id, position, is_active, alertFreq, location, keywords } = alert;

      return {
        id: Number(id),
        position: position,
        filters: {
          alertFreq,
          location,
          keywords,
        },
        isActive: is_active
      };
    }
  }

  const createAlert = async (alert: Alert) => {
    try {
      const newAlert = modelMapper.uiToDbAlert(alert, session?.user?.id ?? null);

      const { error } = await supabase
        .from('alerts')
        .insert(newAlert)

      if (error) {
        showErrorToast("Error creating an alert", error.message);
        return { success: false, error };
      }

      return { success: false, error: null };
    } catch (err) {
      console.error("Unexpected error when creating an alert:", err);
      showErrorToast("Unexpected error when creating an alert");
      return { success: false, error: null };
    }
  }

  return {
    modelMapper,
    createAlert,
  };
}