import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { Character, ApiResponse } from './types';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [audio] = useState(new Audio('https://www.youtube.com/embed/_TsgWjaBvbc?autoplay=1'));
  const [showVideo, setShowVideo] = useState(false);


  const fetchCharacters = async (page: number, name: string = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
      );
      const data: ApiResponse = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
      setTotalPages(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCharacters(1, searchTerm);
  };

  const handleImageClick = (characterName: string) => {
    if (characterName.toLowerCase().includes('pickle rick')) {
      setShowVideo(true);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header and Search */}
      <div className="sticky top-0 bg-gray-800 shadow-lg z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-3xl font-bold text-green-400">Rick & Morty Characters</h1>
            <div className="flex-1 flex items-center justify-end gap-4">
              <form onSubmit={handleSearch} className="flex max-w-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search characters..."
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="submit"
                  className="bg-green-500 px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Search size={20} />
                </button>
              </form>
              <span className="text-orange-500 font-bold whitespace-nowrap">RetodeReact_CodigoFacilito</span>
            </div>
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="container mx-auto px-4 py-8 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-72 object-cover cursor-pointer"
                  onClick={() => handleImageClick(character.name)}
                  title={character.name.toLowerCase().includes('pickle rick') ? "Click to watch Pickle Rick!" : ""}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-center">{character.name}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No characters found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
           <span className="text-gray-400 flex items-center">
            <img src="https://github.com/MENM-HRRY/master-class-react-feb2025/blob/main/dist/copuara.png?raw=true" alt="Copyright Icon" className="w-5 h-5 mr-2" />
              2025 Rick & Morty Developed By <span className="text-blue-600 ml-1">MEMN</span>
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                PRIMERO
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                ATRAS
              </button>
              <span className="text-lg">
                Pàgina {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                AVANZAR
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                ULTIMO
              </button>
            </div>
          </div>
        </div>
      </div>
      {showVideo && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="relative w-full max-w-3xl">
      <button
        onClick={() => setShowVideo(false)}
        className="absolute -top-10 right-0 bg-red-600 px-3 py-1 text-white rounded-lg"
      >
        ✖ Close
      </button>
      <iframe
        className="w-full h-[400px] sm:h-[500px] rounded-lg"
        src="https://www.youtube.com/embed/_TsgWjaBvbc?autoplay=1"
        title="Pickle Rick"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}
    </div>
  );
}

export default App;
