import { createContext } from "react";
import type { AlertsContextType } from "./types";

export const AlertsContext = createContext<AlertsContextType | undefined>(undefined);
