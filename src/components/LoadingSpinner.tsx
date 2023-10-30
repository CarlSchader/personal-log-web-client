// loading spinner nextjs component

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    </div>
  )
}