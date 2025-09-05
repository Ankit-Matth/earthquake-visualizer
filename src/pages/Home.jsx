import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-16">
      <section>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-blue-700">
          Track Earthquakes in Real Time
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
          Explore recent and historic earthquakes worldwide. 
          Visualize seismic activity to understand geographical distribution, frequency, 
          magnitude, depth, and temporal patterns.
        </p>
      </section>

      <section className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link
          to="/visualize"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg text-sm sm:text-md font-medium transition"
        >
          Visualize Seismic Patterns
        </Link>
        <Link
          to="/map"
          className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg text-sm sm:text-md font-medium transition"
        >
          Latest Earthquakes on Map
        </Link>
      </section>
    </div>
  )
}
