import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Visualize from "./pages/Visualize";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app flex flex-col bg-gray-50 text-gray-900 min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/visualize" element={<Visualize />} />
            <Route path="*" element={<NotFound />} /> {/* catch-all other routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
