import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const Favorites = () => {
	const { user } = useUserContext()
	const [favoriteAnimeDetails, setFavoriteAnimeDetails] = useState([])
	const { updateUserFavorites } = useUserContext()

	// Llamada a la API para obtener los datos de los animes y
	// para poder agregar los animes favoritos a la lista de favoritos
	useEffect(() => {
		const fetchFavoriteAnimeDetails = async () => {
			const detailsPromises = user.favorites.map(async (animeId) => {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
				const result = await response.json()
				return result.data
			})

			const animeDetails = await Promise.all(detailsPromises)
			setFavoriteAnimeDetails(animeDetails)
		}

		fetchFavoriteAnimeDetails()

		const savedFavorites = user && user.favorites ? user.favorites : []
		updateUserFavorites(savedFavorites)
	}, [user.favorites, updateUserFavorites])

	const removeFromFavorites = (animeId) => {
		updateUserFavorites(user?.favorites.filter((id) => id !== animeId))
	}

	return (
		<div className="animeList">
			{favoriteAnimeDetails.map((anime) => (
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
						<button
							className="me-2"
							onClick={() => {
								removeFromFavorites(anime.mal_id)
							}}
						>
							Remove
						</button>
						<Link to={`/animeDetails/${anime.mal_id}`}>{anime.title}</Link>
					</Card.Footer>
				</Card>
			))}
		</div>
	)
}

export default Favorites
