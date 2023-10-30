import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get('q');
  const system_prompt = req.nextUrl.searchParams.get('system_prompt');
  const max_new_tokens = req.nextUrl.searchParams.get('max_new_tokens');
  
  let queryString = '';
  if (prompt) queryString += `q=${prompt}&`;
  if (system_prompt) queryString += `system_prompt=${system_prompt}&`;
  if (max_new_tokens) queryString += `max_new_tokens=${max_new_tokens}&`;

  const res = await fetch(`${process.env.LOGS_API_URL}/insight?${queryString}`, { cache: 'no-store' });
  const resJson = await res.json();
 
  return Response.json(resJson);
}
