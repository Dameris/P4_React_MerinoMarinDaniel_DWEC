import React, { useState, useEffect } from "react"

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("")
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")

  // Llamada a "API Jikan" para obtener los géneros
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetch("https://api.jikan.moe/v4/genres/anime")
        const result = await data.json()
        setGenres(result.data)
      } catch (error) {
        console.error("Error fetching anime genres from Jikan API", error)
      }
    };

    getGenres()
  }, [])

  // Función que maneja los cambios del input
  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  // Función que maneja los cambios de género
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value)
  }

  // Función que maneja el envío del formulario de búsqueda
  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(searchInput, selectedGenre)
  }

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="text"
        placeholder="Search anime..."
        value={searchInput}
        onChange={handleInputChange}
      />
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.mal_id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  )
}

export default Search