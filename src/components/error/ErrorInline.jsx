
function ErrorInline({error}) {
  return (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-600 font-medium text-center text-sm">{error}</div>
          </div>
  )
}

export default ErrorInline