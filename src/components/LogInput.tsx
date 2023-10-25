'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogInput() {
  const router = useRouter();
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
      navigator.geolocation.watchPosition((position) => {
        setLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  return (
    <div className="flex flex-col m-10 group">
      <form className="flex flex-col items-center" onSubmit={async e => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const message = form.message.value;

        form.reset();
        
        await fetch('/logs', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, location }),
        });
        
        router.refresh();
      }}>
        <input
          className="focus:outline-none focus:border-blue-500 appearance-none border-b bg-transparent w-96 px-4 py-2"
          type="text"
          name="message"
          placeholder="new log..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 m-10"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  )
}