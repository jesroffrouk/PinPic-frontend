import '../css/PageLoading.css'

function PageLoader() {
  return (
    <div className="page-loading dark:bg-gray-900">
      <div className="loading-spinner dark:border-gray-700 dark:border-t-indigo-400"></div>
      <p className="loading-text dark:text-gray-300">Loading page...</p>
    </div>
  )
}

export default PageLoader
