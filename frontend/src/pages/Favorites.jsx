import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [animeFavorites, setAnimeFavorites] = useState([]);
  const [characterFavorites, setCharacterFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("anime");

  useEffect(() => {
    const anime = JSON.parse(localStorage.getItem("favorites")) || [];
    const characters =
      JSON.parse(localStorage.getItem("favoriteCharacters")) || [];

    setAnimeFavorites(anime);
    setCharacterFavorites(characters);
  }, []);

  const removeAnime = (id) => {
    const updated = animeFavorites.filter((anime) => anime.mal_id !== id);

    setAnimeFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeCharacter = (id) => {
    const updated = characterFavorites.filter(
      (character) => character.mal_id !== id,
    );

    setCharacterFavorites(updated);
    localStorage.setItem("favoriteCharacters", JSON.stringify(updated));
  };

  return (
    <div className="bg-[#111] min-h-screen text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">Favorites</h1>

      <div className="flex gap-5 mb-10">
        <button
          onClick={() => setActiveTab("anime")}
          className={`px-8 py-2 rounded ${
            activeTab === "anime" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Anime
        </button>

        <button
          onClick={() => setActiveTab("characters")}
          className={`px-8 py-2 rounded ${
            activeTab === "characters" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Characters
        </button>
      </div>

      {activeTab === "anime" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {animeFavorites.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-[#1c1c1c] rounded-lg overflow-hidden"
            >
              <Link to={`/anime/${anime.mal_id}`}>
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full h-72 object-cover"
                />
              </Link>

              <div className="p-4">
                <h2 className="text-xl">{anime.title}</h2>

                <button
                  onClick={() => removeAnime(anime.mal_id)}
                  className="mt-4 w-full bg-red-600 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "characters" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {characterFavorites.map((character) => (
            <div
              key={character.mal_id}
              className="bg-[#1c1c1c] rounded-lg overflow-hidden"
            >
              <Link to={`/characters/${character.mal_id}`}>
                <img
                  src={character.images.jpg.image_url}
                  alt={character.name}
                  className="w-full h-72 object-cover"
                />
              </Link>

              <div className="p-4">
                <h2 className="text-xl">{character.name}</h2>

                <button
                  onClick={() => removeCharacter(character.mal_id)}
                  className="mt-4 w-full bg-red-600 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "anime" && animeFavorites.length === 0 && (
        <p className="text-center text-gray-400">No favorite anime yet.</p>
      )}

      {activeTab === "characters" && characterFavorites.length === 0 && (
        <p className="text-center text-gray-400">No favorite characters yet.</p>
      )}
    </div>
  );
}
