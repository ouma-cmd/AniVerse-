import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import AnimeList from "./components/pages/AnimeList";
import Dashboard from "./components/pages/Dashboard";
import Characters from "./components/pages/Characters";
import Favorites from "./components/pages/Favorites";
import MyLibrary from "./components/pages/MyLibrary";

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="anime" element={<AnimeList />} />
        <Route path="characters" element={<Characters />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="my-library" element={<MyLibrary />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
