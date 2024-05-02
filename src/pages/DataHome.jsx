import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const DataHome = ({ search, genre, page, resultsPerPage }) => {
	const { user, updateFavorites, logged } = useUserContext()
	const [animeResults, setAnimeResults] = useState([])
	const [totalPages, setTotalPages] = useState(0)

	useEffect(() => {
		const fetchAnimeData = async () => {
			try {
				const response = await fetch(
					`https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}&per_page=${resultsPerPage}`
				)
				const { data, pagination } = await response.json()
				setAnimeResults(data)
				setTotalPages(pagination.items.total)
			} catch (error) {
				console.error("Error fetching anime data from Jikan API", error)
			}
		}

		const timeoutId = setTimeout(fetchAnimeData, 1000)

		return () => clearTimeout(timeoutId)
	}, [search, genre, page, resultsPerPage])

	const toggleFavorite = (animeId) => {
		if (!user) {
			console.error("Usuario no definido.")
			return
		}

		const updatedFavorites = user.favorites?.includes(animeId)
			? user.favorites.filter((id) => id !== animeId)
			: [...user.favorites, animeId]

		updateFavorites(updatedFavorites)
	}

	const filteredAnimeResults = genre
		? animeResults.filter((anime) => anime.genres.some((animeGenre) => genre === animeGenre.name))
		: animeResults

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
							src={anime.images?.jpg?.image_url}
							className="animeImg"
						/>
						<Card.Body></Card.Body>
						<Card.Footer className="cardName">
							{logged && (
								<button
									className="me-2"
									onClick={() => toggleFavorite(anime.mal_id)}
								>
									{user && user.favorites && user.favorites.includes(anime.mal_id)
										? "Remove"
										: "Add"}
								</button>
							)}
							<Link to={`/animeDetails/${anime.mal_id}`}>{anime.title}</Link>
						</Card.Footer>
					</Card>
				))}
			</ul>
		</div>
	)
}

export default DataHome
