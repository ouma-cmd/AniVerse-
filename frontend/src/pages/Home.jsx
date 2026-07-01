import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHeroAnime } from "../redux/thunks/animeThunk";

export default function Home() {
  const dispatch = useDispatch();
  const { hero, loading, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchHeroAnime());
  }, [dispatch]);

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2143A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl animate-pulse">
            Chargement de l'univers Anime... 🚀
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-red-500">
        <div className="text-center">
          <p className="text-xl">❌ Erreur : {error.message}</p>
          <button
            onClick={() => dispatch(fetchHeroAnime())}
            className="mt-4 bg-[#D2143A] hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // S'assurer que hero est un tableau pour le mapping
  const trendingAnime = Array.isArray(hero) ? hero : hero ? [hero] : [];
  const displayAnime = trendingAnime.slice(0, 6);

  return (
    <div className="bg-[#121212] text-white min-h-screen px-6 md:px-16 py-10">
      {/* --- HERO SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-12 border-b border-zinc-800">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            Ani<span className="text-purple-500">Verse</span>
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-2">
            Explore, track, organize
          </h3>
          <h3 className="text-3xl font-extrabold mb-4">Your Anime Universe</h3>
          <p className="text-zinc-500 mb-6">
            Discover. Track. Enjoy your anime journey.
          </p>
          <Link to="/anime">
            <button className="bg-purple-500 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-md transition duration-300 uppercase text-sm tracking-wider shadow-lg hover:shadow-red-500/20">
              Explore Anime
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D2143A]/20 to-transparent rounded-lg blur-2xl"></div>
            <img
              src={
                displayAnime[0]?.images?.jpg?.large_image_url ||
                "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop"
              }
              alt="Anime Hero Art"
              className="rounded-lg shadow-2xl w-full h-[300px] object-cover border border-zinc-800 relative z-10"
            />
            {displayAnime[0] && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg z-10">
                <p className="text-white font-bold text-sm">
                  {displayAnime[0].title}
                </p>
                <p className="text-yellow-400 text-xs">
                  ⭐ {displayAnime[0].score || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- TRENDING ANIME SECTION --- */}
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-100 border-l-4 border-[#D2143A] pl-3">
            🔥 Trending Anime
          </h2>
          <Link
            to="/anime"
            className="text-[#D2143A] hover:text-red-400 text-sm font-semibold transition"
          >
            Voir tout →
          </Link>
        </div>

        {displayAnime.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">Aucun anime trouvé. 🎌</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {displayAnime.map((anime) => (
              <Link
                key={anime.mal_id}
                to={`/anime/${anime.mal_id}`}
                className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      anime.images?.jpg?.image_url ||
                      anime.images?.jpg?.large_image_url ||
                      "/placeholder.jpg"
                    }
                    alt={anime.title}
                    className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
                  />
                  {anime.score && (
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-yellow-400 px-2 py-1 rounded-md text-xs font-bold">
                      ⭐ {anime.score}
                    </div>
                  )}
                  {anime.episodes && (
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
                      {anime.episodes} eps
                    </div>
                  )}
                </div>
                <div className="p-3 bg-[#1c1c1c] flex-1 flex flex-col justify-between">
                  <p className="font-bold text-sm truncate text-zinc-200 group-hover:text-[#D2143A] transition duration-200">
                    {anime.title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#D2143A] text-xs font-semibold">
                      ⭐ {anime.score || "N/A"}
                    </p>
                    {anime.year && (
                      <p className="text-zinc-500 text-xs">{anime.year}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* --- SEASONAL ANIME SECTION (Bonus) --- */}
      <div className="py-12 border-t border-zinc-800">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-100 border-l-4 border-[#D2143A] pl-3">
            🌸 Seasonal Anime
          </h2>
          <Link
            to="/anime"
            className="text-[#D2143A] hover:text-red-400 text-sm font-semibold transition"
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayAnime.slice(0, 6).map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300 flex flex-col group cursor-pointer"
            >
              <img
                src={anime.images?.jpg?.image_url || "/placeholder.jpg"}
                alt={anime.title}
                className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="p-3 bg-[#1c1c1c]">
                <p className="font-bold text-sm truncate text-zinc-200 group-hover:text-[#D2143A] transition duration-200">
                  {anime.title}
                </p>
                <p className="text-[#D2143A] text-xs font-semibold mt-1">
                  ⭐ {anime.score || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
