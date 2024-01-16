import React, { useState } from "react"
import Search from "../components/Search"
import DataJikan from "../components/DataJikan"

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  // Función para manejar la búsqueda
  const handleSearch = (term, genre) => {
    setSearchTerm(term)
    setSelectedGenre(genre)
  }

  return (
    <div className="min">
      <h1 className="text-center">Anime Search</h1>
      <Search onSearch={handleSearch} />
      {/* Si "searchTerm" no está vacío, se renderiza el componente "<DataJikan>" */}
      {searchTerm && <DataJikan search={searchTerm} genre={selectedGenre} />}
    </div>
  )
}

export default Home