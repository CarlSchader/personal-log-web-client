import OpenAI from "openai";
import { NextRequest } from "next/server";
import { Log } from '@/types';

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  const res = await fetch(process.env.LOGS_API_URL + '/logs', { cache: 'no-store' });
  const resJson = await res.json();
  const logs: Log[] = resJson.map((log: any) => { log.timestamp = new Date(log.timestamp); return log; });

  const prompt = req.nextUrl.searchParams.get('q');
  const system_prompt = req.nextUrl.searchParams.get('system_prompt');
  const max_new_tokens = req.nextUrl.searchParams.get('max_new_tokens');
  
  let queryString = '';
  if (prompt) queryString += `q=${prompt}&`;
  if (system_prompt) queryString += `system_prompt=${system_prompt}&`;
  if (max_new_tokens) queryString += `max_new_tokens=${max_new_tokens}&`;

  const logsString = logs.map((log) => `${log.timestamp.toLocaleString()}: ${log.message}`).join('\n');

  let messageList: OpenAI.ChatCompletionMessageParam[] = [{ role: "system", content: `You are a helpful planner app that can help the user base on a history of events. Given these logs: \n${logsString}` }];
  messageList.push({ role: "user", content: prompt });

  const completion = await openai.chat.completions.create({
    messages: messageList,
    model: "gpt-4",
  });

  console.log(completion.choices[0])

  // const res = await fetch(`${process.env.LOGS_API_URL}/insight?${queryString}`, { cache: 'no-store' });
  // const resJson = await res.json();
  // return Response.json(resJson);

  return Response.json({response: completion.choices[0].message.content});
}
