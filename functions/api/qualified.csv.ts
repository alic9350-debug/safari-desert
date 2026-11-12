// GET /api/qualified.csv — Google Ads Data Manager connection for "Safari – Qualified Lead"
import { serveCsv } from "./conversions.csv";

export const onRequestGet = ({ request, env }: { request: Request; env: Parameters<typeof serveCsv>[1] }) =>
  serveCsv(request, env, "qualified");
export const onRequestHead = onRequestGet;
