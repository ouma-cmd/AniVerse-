import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeList from "./pages/AnimeList";
import Dashboard from "./pages/Dashboard";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import MyLibrary from "./pages/MyLibrary";
import Footer from "./components/Footer";
import AnimeDetails from "./pages/AnimeDetails";

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="anime" element={<AnimeList />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="characters" element={<Characters />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="my-library" element={<MyLibrary />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}
