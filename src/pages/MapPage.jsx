import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapPage() {
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuakes = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data.features.length === 0) {
          setError("No earthquake data available right now.");
        } else {
          setQuakes(data.features);
        }
      } catch (err) {
        console.error("Error fetching earthquake data:", err);
        setError("Failed to fetch earthquake data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuakes();
  }, []);

  // Custom marker icon
  const quakeIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -20],
  });

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-6">
      {loading && (
        <p className="text-center text-gray-700 mt-40 text-lg">Loading earthquake data...</p>
      )}

      {error && !loading && (
        <p className="text-center text-red-600 font-semibold mt-40 text-base md:text-xl">{error}</p>
      )}

      {!loading && !error && quakes.length === 0 && (
        <p className="text-center text-gray-600 mt-40 text-base md:text-xl">
          No earthquake data available at the moment.
        </p>
      )}

      {!loading && !error && quakes.length > 0 && (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            🌍 Recent Earthquakes
          </h2>
          <div className="h-[60vh] sm:h-[80vh]">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-full w-full rounded-lg shadow-lg"
          >
            <LayersControl position="topright">
              {/* Default OpenStreetMap Layer */}
              <LayersControl.BaseLayer checked name="Street Map">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                />
              </LayersControl.BaseLayer>

              {/* Satellite View Layer (Esri) */}
              <LayersControl.BaseLayer name="Satellite View">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="&copy; <a href='https://www.esri.com/'>Esri</a>, Earthstar Geographics"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {/* Earthquake markers */}
            {quakes.map((quake) => {
              const [lng, lat, depth] = quake.geometry.coordinates;
              const mag = quake.properties.mag;
              return (
                <Marker key={quake.id} position={[lat, lng]} icon={quakeIcon}>
                  <Popup closeButton={true}>
                    <div className="bg-white p-2 w-64 sm:w-72">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-white mb-2">
                        {quake.properties.place}
                      </h3>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Magnitude:</span>
                        <span className="font-semibold text-red-500">{mag}</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600 dark:text-gray-300">Depth:</span>
                        <span className="font-semibold">{depth} km</span>
                      </div>
                      <a
                        href={quake.properties.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-blue-600 dark:text-blue-400 font-medium hover:underline transition"
                      >
                        View Details
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        </>
      )}
    </div>
  );
}
