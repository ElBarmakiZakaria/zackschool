
const Homepage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to the HomePage</h1>
      <p className="text-gray-600 mt-2">Sign in to access your dashboard.</p>
      <a href="/sign-in" className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Sign In
        </button>
      </a>
    </div>
  )
}

export default Homepage