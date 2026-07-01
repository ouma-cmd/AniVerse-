import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailsCharacters() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/characters/${id}/full`
        );

        setCharacter(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#111] text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#111] text-white text-2xl">
        Character Not Found
      </div>
    );
  }

  return (
    <div className="bg-[#111] min-h-screen text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Character Image */}
          <img
            src={character.images.jpg.image_url}
            alt={character.name}
            className="w-72 rounded-xl shadow-lg"
          />

          {/* Character Info */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold">{character.name}</h1>

            <p className="mt-4 text-pink-400 text-xl">
              ❤️ Favorites: {character.favorites}
            </p>

            <p className="mt-8 text-gray-300 leading-8">
              {character.about || "No description available."}
            </p>
          </div>
        </div>

        {/* Anime Appearances */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Anime Appearances
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {character.anime.map((anime) => (
              <div
                key={anime.anime.mal_id}
                className="bg-[#1c1c1c] rounded-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={anime.anime.images.jpg.image_url}
                  alt={anime.anime.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold">
                    {anime.anime.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Role: {anime.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Actors */}
        {character.voices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">
              Voice Actors
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {character.voices.map((voice) => (
                <div
                  key={voice.person.mal_id}
                  className="bg-[#1c1c1c] rounded-lg p-4 text-center"
                >
                  <img
                    src={voice.person.images.jpg.image_url}
                    alt={voice.person.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />

                  <h3 className="mt-4 font-semibold">
                    {voice.person.name}
                  </h3>

                  <p className="text-gray-400">
                    {voice.language}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}