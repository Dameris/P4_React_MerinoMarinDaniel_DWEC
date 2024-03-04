import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const DataJikan = ({ search, genre, page, resultsPerPage }) => {
	const [animeResults, setAnimeResults] = useState([])
	const [totalPages, setTotalPages] = useState(0)

	// Llamada a "API Jikan" para obtener los animes
	useEffect(() => {
		const getAnimeData = async () => {
			try {
				const data = await fetch(
					`https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}&per_page=${resultsPerPage}`
				)
				const result = await data.json()
				setAnimeResults(result.data)
				setTotalPages(result.pagination.items.total)
			} catch (error) {
				console.error("Error fetching anime data from Jikan API", error)
			}
		}

		// Añadir un retraso de 1 segundo entre solicitudes
		const timeoutId = setTimeout(() => {
			getAnimeData()
		}, 1000)

		// Limpiar el temporizador para evitar problemas
		return () => clearTimeout(timeoutId)
	}, [search, genre, page, resultsPerPage])

	// Filtrar animes por género
	const filteredAnimeResults = animeResults
		? animeResults.filter((anime) => {
				if (!genre) {
					return true
				} else {
					return anime.genres.some((animeGenre) => genre === animeGenre.name)
				}
			})
		: []

	return (
		<div>
			<ul className="animeList">
				{filteredAnimeResults.map((anime) => (
					<Card
						key={anime.mal_id}
						className="animeCard"
					>
						<Card.Img
							variant="top"
							src={anime.images.jpg.image_url}
							className="animeImg"
						/>
						<Card.Body></Card.Body>
						<Card.Footer className="cardName">
							<Link to={`/animeDetails/${anime.mal_id}`}>{anime.title}</Link>
						</Card.Footer>
					</Card>
				))}
			</ul>
		</div>
	)
}

export default DataJikan
