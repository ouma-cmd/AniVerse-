import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const res = await axios.get("https://api.jikan.moe/v4/top/characters");

      setCharacters(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-white text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#111] min-h-screen text-white px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Characters</h1>

        <input
          type="text"
          placeholder="Search for a character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-5 md:mt-0 px-5 py-2 rounded-full bg-white text-black w-80 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCharacters.map((character) => (
          <Link
            key={character.mal_id}
            to={`/character/${character.mal_id}`}
            className="bg-[#1c1c1c] rounded-xl overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={character.images.jpg.image_url}
              alt={character.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {character.name}
              </h2>

              <p className="text-gray-400 mt-2">
                Favorites: {character.favorites}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}