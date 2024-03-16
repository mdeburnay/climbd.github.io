import { format } from "date-fns";

export const CURRENT_TIME = format(new Date().getTime(), "dd/MM/yyyy");
