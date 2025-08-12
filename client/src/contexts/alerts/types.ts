import type { Alert } from "@/types/alert";
import type { Tables } from '@/types/supabase.types';
import type { PartialBy } from "@/utils/types";
import type { PostgrestError } from "@supabase/supabase-js";

export type DbAlert = Tables<'alerts'>
export type UiAlert = PartialBy<Alert, "id" | "isActive" | "createdAt">;

export interface AlertsContextType {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  editAlertState: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  createAlert: (alert: UiAlert) =>
    Promise<{ success: boolean; data?: DbAlert; error?: PostgrestError | null }>;
  getUsersAlerts: () =>
    Promise<{ success: boolean; data?: DbAlert; error?: PostgrestError | null }>;
  editAlert: (alert: Alert) =>
    Promise<{ success: boolean; data?: DbAlert; error?: PostgrestError | null }>;
  deleteAlert: (id: string) =>
    Promise<{ success: boolean; data?: DbAlert; error?: PostgrestError | null }>;
  editActivateState: (alert: Alert) =>
    Promise<{ success: boolean; data?: DbAlert; error?: PostgrestError | null }>
}