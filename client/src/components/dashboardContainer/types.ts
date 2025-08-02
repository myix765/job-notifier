export interface Alert {
    id: number;
    position: string;
    alertFreq: number;
    filters: { type: string; value: string }[];
}