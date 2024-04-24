import React, { useState } from "react"
import Search from "../components/Search"
import DataJikan from "./DataHome"

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedGenre, setSelectedGenre] = useState("")

	// Función para manejar la búsqueda
	const handleSearch = (term, genre) => {
		setSearchTerm(term)
		setSelectedGenre(genre)
	}

	return (
		<div>
			<h1 className="text-center">Anime Orbit</h1>
			<Search onSearch={handleSearch} />
			{searchTerm && (
				<DataJikan
					search={searchTerm}
					genre={selectedGenre}
				/>
			)}
		</div>
	)
}

export default Home
