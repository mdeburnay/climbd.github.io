import { format } from "date-fns";

export const CURRENT_DATE = format(new Date().getTime(), "dd/MM/yyyy");
export const CURRENT_TIME = format(new Date(), "HH:mm");
