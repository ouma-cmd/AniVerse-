import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAnime: 0,
    episodesWatched: 0,
    hoursSpent: 0,
    favorites: 0,
  });

  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("library")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const totalAnime = library.length;

    const episodesWatched = library.reduce(
      (sum, anime) => sum + (anime.watched || 0),
      0,
    );

    const hoursSpent = ((episodesWatched * 24) / 60).toFixed(1);

    setStats({
      totalAnime,
      episodesWatched,
      hoursSpent,
      favorites: favorites.length,
    });
  }, []);

  return (
    <div className="bg-[#111] min-h-screen text-white px-10 py-10">
      {/* Profile */}
      <div className="flex items-center gap-5 mb-10">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          <p className="text-gray-400">Member since 2026</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-gray-400">Total Anime</h3>
          <p className="text-4xl font-bold mt-4">{stats.totalAnime}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center border border-blue-500">
          <h3 className="text-gray-400">Episodes Watched</h3>
          <p className="text-4xl font-bold mt-4">{stats.episodesWatched}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-gray-400">Hours Spent</h3>
          <p className="text-4xl font-bold mt-4">{stats.hoursSpent}h</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-gray-400">Favorites</h3>
          <p className="text-4xl font-bold mt-4">{stats.favorites}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Recent Activity</h2>

        <div className="space-y-4 text-xl text-gray-300">
          <p>📺 Watched {stats.episodesWatched} episode(s)</p>

          <p>❤️ Added {stats.favorites} favorite anime</p>

          <p>📚 Library contains {stats.totalAnime} anime</p>

          <p>⏱ Total watch time: {stats.hoursSpent} hours</p>
        </div>
      </div>
    </div>
  );
}
