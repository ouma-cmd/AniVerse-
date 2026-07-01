import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHeroAnime } from "../redux/thunks/animeThunk";

export default function AnimeList() {
  const { hero } = useSelector((state) => state.anime);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    dispatch(fetchHeroAnime());
  }, [dispatch]);

  const trendingAnime = Array.isArray(hero) ? hero : hero ? [hero] : [];

  const displayAnime = trendingAnime.filter((anime) => {
    const matchSearch = anime.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchGenre =
      genre === "" ||
      anime.genres?.some((g) => g.name === genre);

    return matchSearch && matchGenre;
  });

  return (
    <div className="bg-[#121212] min-h-screen text-white px-6 md:px-16 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Explore All <span className="text-[#D2143A]">Anime</span>
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="🔍 Search For anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1c1c1c] text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-[#D2143A]"
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-[#1c1c1c] text-white px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-[#D2143A]"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
      </div>

      {/* Anime Grid */}
      {displayAnime.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-zinc-500 text-xl">
            No anime found 🎌
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayAnime.map((anime) => (
            <Link
              key={anime.mal_id}
              to={`/anime/${anime.mal_id}`}
              className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300 flex flex-col group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    anime.images?.jpg?.image_url ||
                    anime.images?.jpg?.large_image_url
                  }
                  alt={anime.title}
                  className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
                />

                {anime.score && (
                  <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 px-2 py-1 rounded-md text-xs font-bold">
                    ⭐ {anime.score}
                  </div>
                )}

                {anime.episodes && (
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded-md text-xs">
                    {anime.episodes} eps
                  </div>
                )}
              </div>

              <div className="p-3 flex-1">
                <p className="font-bold text-sm truncate group-hover:text-[#D2143A]">
                  {anime.title}
                </p>

                <div className="flex justify-between mt-2">
                  <p className="text-[#D2143A] text-xs">
                    ⭐ {anime.score || "N/A"}
                  </p>

                  {anime.year && (
                    <p className="text-zinc-500 text-xs">
                      {anime.year}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}