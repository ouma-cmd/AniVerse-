import { useEffect, useState } from "react";

export default function MyLibrary() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("library")) || [];
    setLibrary(saved);
  }, []);

  const saveLibrary = (updated) => {
    setLibrary(updated);
    localStorage.setItem("library", JSON.stringify(updated));
  };

  const increaseEpisode = (id) => {
    const updated = library.map((anime) =>
      anime.mal_id === id
        ? {
            ...anime,
            watched: Math.min((anime.watched || 0) + 1, anime.episodes || 999),
          }
        : anime,
    );

    saveLibrary(updated);
  };

  const decreaseEpisode = (id) => {
    const updated = library.map((anime) =>
      anime.mal_id === id
        ? {
            ...anime,
            watched: Math.max((anime.watched || 0) - 1, 0),
          }
        : anime,
    );

    saveLibrary(updated);
  };

  const changeStatus = (id, status) => {
    const updated = library.map((anime) =>
      anime.mal_id === id ? { ...anime, status: status } : anime,
    );

    saveLibrary(updated);
  };

  const removeAnime = (id) => {
    const updated = library.filter((anime) => anime.mal_id !== id);

    saveLibrary(updated);
  };

  return (
    <div className="bg-[#111] min-h-screen text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-10">My Library</h1>

      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-4 text-left">Anime</th>
            <th>Status</th>
            <th>Episodes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {library.map((anime) => (
            <tr key={anime.mal_id} className="border-b border-gray-800">
              <td className="flex items-center gap-4 p-4">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-16 h-20 object-cover rounded"
                />

                {anime.title}
              </td>

              <td>
                <select
                  value={anime.status || "Watching"}
                  onChange={(e) => changeStatus(anime.mal_id, e.target.value)}
                  className="bg-gray-800 p-2 rounded"
                >
                  <option>Watching</option>
                  <option>Completed</option>
                  <option>Plan to Watch</option>
                </select>
              </td>

              <td>
                {anime.watched || 0}/{anime.episodes || "?"}
              </td>

              <td>
                <button
                  onClick={() => increaseEpisode(anime.mal_id)}
                  className="bg-green-600 px-3 rounded mr-2"
                >
                  +
                </button>

                <button
                  onClick={() => decreaseEpisode(anime.mal_id)}
                  className="bg-yellow-600 px-3 rounded mr-2"
                >
                  -
                </button>

                <button
                  onClick={() => removeAnime(anime.mal_id)}
                  className="bg-red-600 px-3 rounded"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {library.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Your Library is Empty</p>
      )}
    </div>
  );
}
