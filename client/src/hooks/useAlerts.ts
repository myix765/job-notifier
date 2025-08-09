import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from '@/hooks/useToast';
import type { Alert } from "@/components/dashboardContainer/types";

interface alertFormSchema {
  id: string | null;
  user_id: string | null;
  position: string;
  location: string | null;
  keywords: string[] | null;
  alertFreq: number;
  is_active: boolean;
  created_at: string | null;
}

type NewalertFormSchema = Omit<alertFormSchema, "id" | "created_at">;

export const useAlerts = () => {
  const { session } = useAuth();
  const { showErrorToast } = useToast();

  const mapAlertToalertFormSchema = (alert: Alert, userId: string | null): NewalertFormSchema => {
    const location = alert.filters.find(f => f.type === "location")?.value ?? null;
    const keywords = alert.filters
      .filter(
        (f): f is { type: "keyword"; value: string } =>
          f.type === "keyword" && f.value !== null
      )
      .map(f => f.value);

    return {
      user_id: userId,
      position: alert.position,
      location,
      keywords: keywords.length > 0 ? keywords : null,
      alertFreq: alert.alertFreq,
      is_active: true,
    };
  }

  const mapalertFormSchemaToAlert = (alert: alertFormSchema): Alert => {
    const filters: Alert["filters"] = [
      alert.location ? { type: "location" as const, value: alert.location } : null,
      ...(alert.keywords ?? []).map(kw => ({ type: "keyword" as const, value: kw })),
    ].filter((f): f is NonNullable<typeof f> => f !== null);

    return {
      id: Number(alert.id),
      position: alert.position,
      alertFreq: alert.alertFreq,
      filters,
    };
  }

  const createAlert = async (alert: Alert) => {
    try {
      const newAlert = mapAlertToalertFormSchema(alert, session?.user?.id ?? null);

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
    createAlert,
  };
}