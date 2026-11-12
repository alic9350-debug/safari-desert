// GET /api/booked.csv — Google Ads Data Manager connection for "Safari – Booking Confirmed"
import { serveCsv } from "./conversions.csv";

export const onRequestGet = ({ request, env }: { request: Request; env: Parameters<typeof serveCsv>[1] }) =>
  serveCsv(request, env, "booked");
export const onRequestHead = onRequestGet;
