import { Log } from '@/types';
import LogsDisplay from '@/components/LogsDisplay';
import LogInput from '@/components/LogInput';
import InsightComponent from '@/components/InsightComponent';

export default async function Home() {
  const resJson = await fetch(process.env.LOGS_API_URL + '/logs', { cache: 'no-store' }).then(res => res.json());
  const logs: Log[] = resJson.map((log: any) => { log.timestamp = new Date(log.timestamp); return log; });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* header */}
      <div className="flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Log</h1>
      </div>

      {/* log list display */}
      <LogsDisplay logs={logs} />
      <LogInput />
      <InsightComponent title="Task list" query='Use this data to make a task list' />
    </main>
  )
}
