export interface Alert {
  id: string;
  position: string;
  filters: {
    alertFreq: number;
    location: string | null;
    keywords: string[] | null;
  };
  isActive: boolean;
}