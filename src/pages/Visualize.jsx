import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Visualize() {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [largestEarthquakes, setLargestEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch recent earthquakes
        const recentResponse = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
        );
        setEarthquakeData(recentResponse.data.features);

        // Fetch largest earthquakes
        const largestResponse = await axios.get(
          "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1900-01-01&minmagnitude=8&limit=20&orderby=magnitude"
        );
        setLargestEarthquakes(largestResponse.data.features);

      } catch (err) {
        console.error("Error fetching earthquake data:", err);
        setError("Failed to fetch earthquake data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-40 text-3xl">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-40 text-base px-6 md:px-0 md:text-xl text-red-600 font-semibold">{error}</div>;
  }

  if (earthquakeData.length === 0) {
    return <div className="text-center mt-20 text-gray-700">No earthquake data available.</div>;
  }

  // Frequency vs Magnitude
  const magnitudeFrequencyData = Object.entries(
    earthquakeData.reduce((acc, eq) => {
      const magnitude = Math.floor(eq.properties.mag);
      acc[magnitude] = (acc[magnitude] || 0) + 1;
      return acc;
    }, {})
  ).map(([magnitude, count]) => ({ magnitude, count }));

  // Magnitude vs Time
  const magnitudeTimeData = earthquakeData.map((eq) => ({
    time: new Date(eq.properties.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    magnitude: eq.properties.mag,
  }));

  // Depth vs Magnitude
  const depthData = earthquakeData.map((eq) => ({
    depth: eq.geometry.coordinates[2],
    magnitude: eq.properties.mag,
  }));

  // Average Depth vs Region
  const depthRegionData = earthquakeData.map((eq) => ({
    region: (eq.properties.place || "Unknown").split(",").pop().trim(),
    depth: eq.geometry.coordinates[2],
  }));

  // Average Magnitude vs Region
  const regionGroups = earthquakeData.reduce((acc, eq) => {
    const region = (eq.properties.place || "Unknown").split(",").pop().trim();
    if (!acc[region]) acc[region] = [];
    acc[region].push(eq.properties.mag);
    return acc;
  }, {});

  const regionMagnitudeData = Object.entries(regionGroups).map(
    ([region, magnitudes]) => {
      const avgMagnitude =
        magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length;
      return { region, avgMagnitude: parseFloat(avgMagnitude.toFixed(2)) };
    }
  );

  // Geographical Distribution
  const regionCountData = Object.entries(
    earthquakeData.reduce((acc, eq) => {
      const region = (eq.properties.place || "Unknown").split(",").pop().trim();
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {})
  ).map(([region, count]) => ({ region, count }));

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="py-10 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-10 text-center">📊 Seismic Patterns</h2>

      <div className="grid gap-8 lg:gap-12 md:grid-cols-2 max-w-7xl mx-auto">
        {/* Frequency vs Magnitude */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Frequency vs Magnitude</h3>
          {magnitudeFrequencyData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={magnitudeFrequencyData} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="magnitude"
                  label={{ value: "Magnitude", position: "insideBottom", offset: -25 }}
                />
                <YAxis label={{ value: "Frequency", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Depth vs Magnitude */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Depth vs Magnitude</h3>
          {depthData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ bottom: 30 }}>
                <CartesianGrid />
                <XAxis
                  dataKey="depth"
                  name="Depth (km)"
                  label={{ value: "Depth (km)", position: "insideBottom", offset: -25 }}
                />
                <YAxis
                  dataKey="magnitude"
                  name="Magnitude"
                  label={{ value: "Magnitude", angle: -90, position: "insideLeft" }}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={depthData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Average Depth vs Region */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Average Depth vs Region</h3>
          {depthRegionData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ bottom: 30 }}>
                <CartesianGrid />
                <XAxis
                  dataKey="region"
                  label={{ value: "Region", position: "insideBottom", offset: -25 }}
                />
                <YAxis
                  dataKey="depth"
                  label={{ value: "Depth (km)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={depthRegionData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Magnitude vs Time */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Magnitude vs Time</h3>
          {magnitudeTimeData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={magnitudeTimeData} margin={{ bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  label={{ value: "Time (Hours)", position: "insideBottom", offset: -25 }}
                />
                <YAxis label={{ value: "Magnitude", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="magnitude" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Average Magnitude vs Region */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Average Magnitude vs Region</h3>
          {regionMagnitudeData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionMagnitudeData} margin={{ bottom: 30 }}>
                <CartesianGrid />
                <XAxis
                  dataKey="region"
                  label={{ value: "Region", position: "insideBottom", offset: -25 }}
                />
                <YAxis
                  dataKey="avgMagnitude"
                  label={{ value: "Magnitude", angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Bar dataKey="avgMagnitude" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Geographical Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">Geographical Distribution</h3>
          {regionCountData.length === 0 ? (
            <p className="text-center text-gray-600">No data available for this chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionCountData}
                  dataKey="count"
                  nameKey="region"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {regionCountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Largest 20 Earthquakes Table */}
      <div className="bg-white p-8 rounded-xl shadow-md mx-auto mt-12 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">
          🌍 20 Largest Earthquakes in the World Since 1900
        </h3>
        {largestEarthquakes.length === 0 ? (
          <p className="text-center text-gray-600">No data available.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Location</th>
                <th className="p-2 border border-gray-300">Magnitude</th>
                <th className="p-2 border border-gray-300">Depth (km)</th>
              </tr>
            </thead>
            <tbody>
              {largestEarthquakes.map((eq, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-2 border border-gray-300 whitespace-nowrap">
                    {new Date(eq.properties.time).toLocaleDateString()}
                  </td>
                  <td className="p-2 border border-gray-300">{eq.properties.place}</td>
                  <td className="p-2 border border-gray-300 font-bold">
                    {eq.properties.mag.toFixed(1)}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {eq.geometry.coordinates[2].toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
