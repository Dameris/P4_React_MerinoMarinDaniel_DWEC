import React, { useState } from "react"
import Search from "../components/Search"
import DataHome from "./DataHome"

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("")

	// Función para manejar la búsqueda
	const handleSearch = (term) => {
		setSearchTerm(term)
	}

	return (
		<div>
			<h1 className="text-center">Anime Orbit</h1>
			<Search onSearch={handleSearch} />
			{searchTerm && (
				<DataHome
					search={searchTerm}
					onPageChange={handleSearch}
				/>
			)}
		</div>
	)
}

export default Home
