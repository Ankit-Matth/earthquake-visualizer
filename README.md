# 🌍 Earthquake Visualizer | Powered by USGS API

Track **Earthquakes in Real Time** and explore **recent and historic seismic activity worldwide**. This project helps visualize earthquake data to understand **geographical distribution, frequency, magnitude, depth,** and **temporal patterns**.

## 🚀 Features

- **Real-time Data:** Fetches the latest earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson).  
- **Interactive Map:** Visualize earthquakes on an interactive world map.  
- **Seismic Charts:** Analyze earthquake patterns with graphs (magnitude, depth, and frequency).  
- **Data Insights:** Understand temporal and geographical trends of earthquakes.  

## 🛠️ Technology Stack

- **Framework:** [React](https://react.dev/)  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- **Data Fetching:** [USGS Earthquake API](https://earthquake.usgs.gov/)  
- **Maps:** [React Leaflet](https://react-leaflet.js.org/)  
- **Charts:** [Recharts](https://recharts.org/)  

## 📂 Project Structure
```bash
src/
├─ assets/ # Project assets like images
├─ components/ # Reusable UI components
│ ├─ Header.jsx
│ ├─ Footer.jsx
├─ pages/ # Page-level components
│ ├─ Home.jsx # Landing page
│ ├─ MapPage.jsx # Interactive earthquake map
│ ├─ Visualize.jsx # Data visualization (charts)
│ ├─ Notfound.jsx # 404 - Page not found
└─ App.jsx # Root component
```
