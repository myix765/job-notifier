export interface Alert {
    id: number;
    position: string;
    filters: { type: string; value: string }[];
}