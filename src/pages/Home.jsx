import React, { useState } from "react"
import Search from "../components/Search"
import DataJikan from "../components/DataJikan"

const Home = () => {
  // Inicializar el estado del componente
  const [searchTerm, setSearchTerm] = useState("")

  // Función para manejar la búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term)
  };

  return (
    <div className="min">
      <h1 className="text-center">Anime Search</h1>
      <Search onSearch={handleSearch} />
      {/* Si "searchTerm" no está vacío, se renderiza el componente "<DataJikan>" */}
      {searchTerm && <DataJikan search={searchTerm} />}
    </div>
  )
}

export default Home