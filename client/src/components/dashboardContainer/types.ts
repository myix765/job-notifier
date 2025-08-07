import type { FilterTypes } from "@/components/dashboardContainer/constants";

export interface Alert {
    id: number;
    position: string;
    alertFreq: number;
    filters: { type: FilterTypes; value: string }[];
}

export interface DashboardContainerProps {
    alerts: Alert[];
}