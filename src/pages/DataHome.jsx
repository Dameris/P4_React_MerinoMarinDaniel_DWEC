import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const DataHome = ({ search, genre, page, resultsPerPage }) => {
	const { user, updateUserFavorites } = useUserContext()
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

	const toggleFavorite = (animeId) => {
		const isFavorite = user?.favorites.includes(animeId)
		if (isFavorite) {
			// Remove from favorites
			updateUserFavorites(user?.favorites.filter((id) => id !== animeId))
		} else {
			// Add to favorites
			updateUserFavorites([...user?.favorites, animeId])
		}
	}

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
							<button
								className="me-2"
								onClick={() => {
									toggleFavorite(anime.mal_id)
								}}
							>
								{user?.favorites.includes(anime.mal_id) ? "Remove" : "Add"}
							</button>
							<Link to={`/animeDetails/${anime.mal_id}`}>{anime.title}</Link>
						</Card.Footer>
					</Card>
				))}
			</ul>
		</div>
	)
}

export default DataHome
