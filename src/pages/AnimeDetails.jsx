import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const AnimeDetails = () => {
	const { animeId } = useParams()
	const [animeResults, setAnimeResults] = useState({ data: {} })
	const [animeImg, setAnimeImg] = useState("")
	const { logged, user, updateFavorites } = useUserContext()
	const navigate = useNavigate()

	// Llamada a "Jikan API" para obtener la info completa de los animmes a partir del ID
	useEffect(() => {
		const getAnimeData = async () => {
			try {
				const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
				const result = await data.json()
				setAnimeResults(result)
				setAnimeImg(result.data.images?.jpg?.large_image_url)
			} catch (error) {
				console.error("Error fetching anime data from Jikan API", error)
			}
		}

		getAnimeData()
	}, [animeId])

	// Función para agregar un anime a favoritos
	const addToFavorites = (animeId) => {
		if (!user?.favorites.includes(animeId)) {
			updateFavorites([...user.favorites, animeId])
		}
	}

	// Función para eliminar un anime de favoritos
	const removeFromFavorites = (animeId) => {
		updateFavorites(user?.favorites.filter((id) => id !== animeId))
	}

	if (!animeResults.data) {
		return <div>No anime found</div>
	}

	return (
		<div className="detailsDiv">
			<h1 className="text-center">{animeResults.data.title}</h1>
			<h2 className="text-center">({animeResults.data.title_japanese})</h2>
			<div className="imgSynopsis">
				{animeImg && (
					<img
						src={animeImg}
						alt={animeResults.data.title}
					/>
				)}
				{animeResults.data.synopsis}
			</div>

			<p className="detailsP">
				<button
					onClick={() => {
						if (!logged) {
							navigate("/login")
						} else if (user && user.favorites) {
							const isFavorite = user.favorites.includes(animeResults.data.mal_id)
							isFavorite
								? removeFromFavorites(animeResults.data.mal_id)
								: addToFavorites(animeResults.data.mal_id)
						}
					}}
				>
					{user && user.favorites && user.favorites.includes(animeResults.data.mal_id)
						? "Remove from favorites"
						: "Add to favorites"}
				</button>
				<br />
				Type: {animeResults.data.type} <br />
				Source: {animeResults.data.source} <br />
				Episodes: {animeResults.data.episodes} <br />
				Status: {animeResults.data.status}
			</p>
		</div>
	)
}

export default AnimeDetails
