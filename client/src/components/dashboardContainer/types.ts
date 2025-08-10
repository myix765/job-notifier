export interface Alert {
  id: number;
  position: string;
  filters: {
    alertFreq: number;
    location: string | null;
    keywords: string[] | null;
  };
  isActive: boolean;
}

export interface DashboardContainerProps {
  alerts: Alert[];
}