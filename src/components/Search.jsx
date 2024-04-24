import React, { useState, useEffect } from "react"
import DataJikan from "../pages/DataHome"

const Search = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState("")
	const [genres, setGenres] = useState([])
	const [selectedGenre, setSelectedGenre] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [resultsPerPage] = useState(20)

	// Llamada a "API Jikan" para obtener los géneros
	useEffect(() => {
		const getGenres = async () => {
			try {
				const data = await fetch("https://api.jikan.moe/v4/genres/anime")
				const result = await data.json()
				const sortedGenres = result.data.sort((a, b) => a.name.localeCompare(b.name))
				setGenres(sortedGenres)
			} catch (error) {
				console.error("Error fetching anime genres from Jikan API", error)
			}
		}

		getGenres()
	}, [])

	// Función que maneja los cambios de página
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage)
	}

	// Función que maneja el envío del formulario
	const handleSubmit = (event) => {
		event.preventDefault()
		onSearch(searchInput, selectedGenre, currentPage, resultsPerPage)
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="searchForm"
			>
				<input
					className="search"
					type="text"
					placeholder="Search anime..."
					value={searchInput}
					onChange={(event) => setSearchInput(event.target.value)}
				/>
				<select
					className="search"
					value={selectedGenre}
					onChange={(event) => setSelectedGenre(event.target.value)}
				>
					<option
						className="search"
						value="genres"
					>
						All genres
					</option>
					{genres.map((genre) => (
						<option
							key={genre.mal_id}
							value={genre.name}
						>
							{genre.name}
						</option>
					))}
				</select>
				<button
					className="submitSearch"
					type="submit"
				>
					Search
				</button>
			</form>
			<DataJikan
				search={searchInput}
				genre={selectedGenre}
				page={currentPage}
				resultsPerPage={resultsPerPage}
				onPageChange={handlePageChange}
			/>
			<div className="pagination">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous Page
				</button>
				<span>{currentPage}</span>
				<button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
			</div>
		</div>
	)
}

export default Search
