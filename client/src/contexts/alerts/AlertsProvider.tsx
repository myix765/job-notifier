import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertsContext } from "./AlertsContext";
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from '@/hooks/useToast';
import type { Alert } from "@/types/alert";
import type { DbAlert, UiAlert } from "./types";
import type { PartialBy } from "@/utils/types";

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { session } = useAuth();
  const { showErrorToast } = useToast();

  // STATE SETTERS
  const addAlert = (alert: Alert) => {
    setAlerts(prev => [...prev, alert]);
  };

  const editAlertState = (alert: Alert) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alert.id ? { ...a, ...alert } : a))
    );
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  // MODEL MAPPER
  const modelMapper = useMemo(() => ({
    uiToDbAlert: (
      alert: UiAlert,
      userId: string | null
    ): PartialBy<DbAlert, "id"> => {
      const { position, filters } = alert;
      const { location, keywords, alertFreq } = filters

      return {
        id: alert.id ?? undefined,
        user_id: userId,
        position: position,
        location: location ?? null,
        keywords: keywords ?? null,
        alert_freq: alertFreq,
        is_active: true,
        created_at: alert.createdAt ?? null,
      };
    },

    dbToUiAlert: (alert: DbAlert): Alert => {
      const {
        id,
        position,
        is_active,
        created_at,
        alert_freq,
        location,
        keywords
      } = alert;

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
        isActive: is_active,
        createdAt: created_at,
      };
    }
  }), []);

  // DB CRUD FUNCTIONS
  const createAlert = async (alert: UiAlert) => {
    try {
      const mappedAlert = modelMapper.uiToDbAlert(alert, session?.user?.id ?? null);
      const { id: _id, created_at: _created_at, ...newAlert } = mappedAlert;

      const { data, error } = await supabase
        .from('alerts')
        .insert(newAlert)
        .select()
        .single();

      if (error) {
        showErrorToast("Error creating an alert", error.message);
        return { success: false, error };
      }

      const uiAlert = modelMapper.dbToUiAlert(data);
      addAlert(uiAlert);
      return { success: false, data };
    } catch (err) {
      console.error("Unexpected error when creating an alert:", err);
      showErrorToast("Unexpected error when creating an alert");
      return { success: false, error: null };
    }
  }

  const getUsersAlerts = useCallback(async () => {
    try {
      const user = session?.user;
      if (!user) return { success: false, error: null };

      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        showErrorToast("Error creating an alert", error.message);
        return { success: false, error };
      }

      const dataArr = data.map(alert => modelMapper.dbToUiAlert(alert));
      setAlerts(dataArr);
      return { success: true, dataArr };
    } catch (err) {
      console.error("Unexpected error when getting alerts:", err);
      showErrorToast("Unexpected error when getting alerts");
      return { success: false, error: null };
    }
  }, [modelMapper, session?.user, showErrorToast])

  const editAlert = async (edits: Alert) => {
    try {
      const updatedAlert = modelMapper.uiToDbAlert(edits, session?.user?.id ?? null);

      const { data, error } = await supabase
        .from('alerts')
        .update(updatedAlert)
        .eq('id', edits.id)
        .select()
        .single();

      if (error) {
        showErrorToast("Error creating an alert", error.message);
        return { success: false, error };
      }

      const uiAlert = modelMapper.dbToUiAlert(data);
      editAlertState(uiAlert);
      return { success: false, data };
    } catch (err) {
      console.error("Unexpected error when editing alert:", err);
      showErrorToast("Unexpected error when editing alert");
      return { success: false, error: null };
    }
  }

  const deleteAlert = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) {
        showErrorToast("Error deleting alert", error.message);
        return { success: false, error };
      }

      removeAlert(data.id);
      return { success: false, data };
    } catch (err) {
      console.error("Unexpected error when deleting alerts:", err);
      showErrorToast("Unexpected error when deleting alerts");
      return { success: false, error: null };
    }
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      await getUsersAlerts();
    }

    fetchAlerts();
  }, [getUsersAlerts]);

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        addAlert,
        editAlertState,
        removeAlert,
        createAlert,
        getUsersAlerts,
        editAlert,
        deleteAlert,
      }}>
      {children}
    </AlertsContext.Provider>
  );
}
