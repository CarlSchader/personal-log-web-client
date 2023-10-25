import { Log } from '@/types';

export async function GET() {
  const res = await fetch(process.env.LOGS_API_URL + '/logs', { cache: 'no-store' });
  const resJson = await res.json();
  const logs: Log[] = resJson.map((log: any) => { log.timestamp = new Date(log.timestamp); return log; });
 
  return Response.json(logs);
}

export async function POST(req: Request) {
  const { message, location } = await req.json();

  const res = await fetch(process.env.LOGS_API_URL + '/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, location }),
  });
  const jsonRes = await res.json();
 
  return Response.json(jsonRes);
}