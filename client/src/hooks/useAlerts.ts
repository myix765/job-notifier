import { useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from '@/hooks/useToast';
import type { Alert } from "@/components/types";

interface dbAlertSchema {
  id: string | null;
  user_id: string | null;
  position: string;
  location: string | null;
  keywords: string[] | null;
  alert_freq: number;
  is_active: boolean;
  created_at: string | null;
}

type NewDbAlertSchema = Omit<dbAlertSchema, "id" | "created_at">;
type NewAlert = Omit<Alert, "id" | "isActive">;

export const useAlerts = () => {
  const { session } = useAuth();
  const { showErrorToast } = useToast();

  const modelMapper = useMemo(() => ({
    uiToDbAlert: (
      alert: NewAlert,
      userId: string | null
    ): NewDbAlertSchema => {
      const { position, filters } = alert;
      const { location, keywords, alertFreq } = filters

      return {
        user_id: userId,
        position: position,
        location: location ?? null,
        keywords: keywords ?? null,
        alert_freq: alertFreq,
        is_active: true,
      };
    },

    dbToUiAlert: (alert: dbAlertSchema): Alert => {
      const { id, position, is_active, alert_freq, location, keywords } = alert;

      if (!id) {
        throw new Error("Missing alert ID");
      }

      return {
        id,
        position,
        filters: {
          alertFreq: alert_freq,
          location,
          keywords,
        },
        isActive: is_active
      };
    }
  }), []);

  const createAlert = async (alert: NewAlert) => {
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

  const getUsersAlerts = useCallback(async () => {
    try {
      const user = session?.user;
      if (!user) throw new Error("Unable to find user");

      const res = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user?.id)

      if (res.error) {
        showErrorToast("Error creating an alert", res.error.message);
        return { success: false, error: res.error };
      }
      const data = res.data.map(alert => modelMapper.dbToUiAlert(alert));

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error when getting alerts:", err);
      showErrorToast("Unexpected error when getting alerts");
      return { success: false, error: null };
    }
  }, [modelMapper, session?.user, showErrorToast])

  return {
    modelMapper,
    createAlert,
    getUsersAlerts,
  };
}