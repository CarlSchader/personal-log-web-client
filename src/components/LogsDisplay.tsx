'use client'

import { useEffect } from "react";
import { Log } from "@/types";

export default function LogsDisplay({ logs=[] }: { logs: Log[]}) {
  useEffect(() => {
    const logList = document.getElementById('log-list') as HTMLElement;
    logList.scrollTop = logList.scrollHeight;
  }, [logs]);

  return (
    <div className="flex flex-col w-screen overflow-auto p-5" id="log-list">
      <ul className="mt-4 max-h-96">
        {logs.map((log, index) => (
          <li key={index} className="flex flex-row items-center align-center">
            <p className="text-sm line-clamp-1">{log.timestamp.toLocaleDateString()}</p>
            <p className="text-sm pl-2 line-clamp-1">{log.timestamp.toLocaleTimeString()}</p>
            {log.location && <p className="text-sm pl-2 line-clamp-1 hidden md:block">{log.location[0]} {log.location[1]}</p>}
            <p className="text-sm">: {log.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
