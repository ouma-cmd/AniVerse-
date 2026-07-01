import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AnimeDetails() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToLibrary = () => {
    let library = JSON.parse(localStorage.getItem("library")) || [];

    if (!library.find((item) => item.mal_id === anime.mal_id)) {
      library.push(anime);
      localStorage.setItem("MyLibrary", JSON.stringify(library));
      alert("Added to Library");
    }
  };

  const addToFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.find((item) => item.mal_id === anime.mal_id)) {
      favorites.push(anime);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to Favorites");
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const animeRes = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/full`,
        );

        const charRes = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`,
        );

        setAnime(animeRes.data.data);
        setCharacters(charRes.data.data.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading)
    return (
      <div className="text-white text-center mt-20 text-2xl">Loading...</div>
    );

  return (
    <div className="bg-[#111] min-h-screen text-white px-10 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-72 rounded-xl shadow-lg"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold">{anime.title}</h1>

          <p className="text-yellow-400 text-xl mt-4">
            ⭐ {anime.score ?? "N/A"}
          </p>
          <div className="flex gap-10 py-5">
            <button
              onClick={addToLibrary}
              className="bg-purple-600 px-6 py-3 rounded-lg"
            >
              Add to Library
            </button>

            <button
              onClick={addToFavorite}
              className="bg-pink-600 px-6 py-3 rounded-lg"
            >
              ❤ Favorite
            </button>
          </div>

          <div className="mt-10 space-y-2 text-gray-300">
            <p>
              <span className="font-semibold text-white">Type:</span>{" "}
              {anime.type}
            </p>

            <p>
              <span className="font-semibold text-white">Episodes:</span>{" "}
              {anime.episodes}
            </p>

            <p>
              <span className="font-semibold text-white">Status:</span>{" "}
              {anime.status}
            </p>

            <p>
              <span className="font-semibold text-white">Studio:</span>{" "}
              {anime.studios.map((studio) => studio.name).join(", ")}
            </p>

            <p>
              <span className="font-semibold text-white">Genres:</span>{" "}
              {anime.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-6">Synopsis</h2>

        <p className="text-gray-300 leading-8">{anime.synopsis}</p>
      </div>

      {/* Characters */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-8">Main Characters</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {characters.map((item) => (
            <div key={item.character.mal_id} className="text-center">
              <img
                src={item.character.images.jpg.image_url}
                alt={item.character.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-purple-600"
              />

              <p className="mt-3 text-sm">{item.character.name}</p>

              <p className="text-gray-400 text-xs">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
