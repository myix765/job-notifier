export interface Alert {
    id: number;
    position: string;
    notifyFreq: number;
    filters: { type: string; value: string }[];
}