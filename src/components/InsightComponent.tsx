'use client';
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function InsightComponent() {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onPress() {
    setLoading(true);
    const res = await fetch('/insight?q=How would you summarize?&max_new_tokens=512');
    const resJson = await res.json();

    console.log(resJson.response.split('\n').map((str: string, index: number) => <p key={index}>{str}</p>))
    setInsight(resJson.response.split('\n').map((str: string, index: number) => <p key={index}>{str}</p>));
    setLoading(false);
  }

  // return modern looking component for prompting an llm and displaying the result
  return (
    <div className="flex flex-col m-10 group">
      {
        loading ? <LoadingSpinner /> :
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 m-10"
            type="button"
            onClick={onPress}
          >
            Get Insight
          </button>
      }
      {insight && (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{insight}</p>
        </div>
      )}
    </div>
  )

}