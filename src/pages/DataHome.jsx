import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

const DataHome = ({ search, genre, page, onPageChange }) => {
	const { user, updateFavorites, logged } = useUserContext()
	const [animeResults, setAnimeResults] = useState([])
	const [totalPages, setTotalPages] = useState(0)
	const [sortByAlphabetical, setSortByAlphabetical] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const fetchAnimeData = async () => {
			try {
				// Llamada a la API Jikan para obtener los datos del anime
				const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}`)
				const { data, pagination } = await response.json()
				setAnimeResults(data)
				console.log(data)
				setTotalPages(pagination.last_visible_page)
				console.log(pagination)
			} catch (error) {
				console.error("Error fetching anime data from Jikan API", error)
			}
		}

		// Retrasar la llamada para evitar la sobrecarga del servidor
		const timeoutId = setTimeout(fetchAnimeData, 1000)

		return () => clearTimeout(timeoutId)
	}, [search, genre, page])

	// Función para desplazar la página hacia arriba
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 400) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	// Función para agregar o eliminar un anime de los favoritos
	const toggleFavorite = (animeId) => {
		if (!user) {
			console.error("User not defined.")
			return
		}

		// Actualizar la lista de favoritos del usuario
		const updatedFavorites = user.favorites?.includes(animeId)
			? user.favorites.filter((id) => id !== animeId)
			: [...user.favorites, animeId]

		updateFavorites(updatedFavorites)
	}

	// Filtrar y ordenar los resultados del anime
	const filteredAnimeResults = animeResults.filter(
		(anime) => !genre || anime.genres.some((animeGenre) => genre === animeGenre.name)
	)

	const sortedAnimeResults = sortByAlphabetical
		? filteredAnimeResults.sort((a, b) => a.title.localeCompare(b.title))
		: filteredAnimeResults

	return (
		<div>
			<div className="checkbox_order">
				<input
					type="checkbox"
					id="checkbox"
					checked={sortByAlphabetical}
					onChange={(e) => setSortByAlphabetical(e.target.checked)}
				/>
				<label htmlFor="checkbox">Sort by alphabetical order</label>
			</div>
			<ul className="animeList">
				{sortedAnimeResults.map((anime) => (
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
			<div className="pagination">
				<button
					onClick={() => {
						onPageChange(page - 1)
						scrollToTop()
					}}
					disabled={page === 1}
				>
					Previous Page
				</button>
				<span>{page}</span>
				<button
					onClick={() => {
						onPageChange(page + 1)
						scrollToTop()
					}}
					disabled={page === totalPages}
				>
					Next Page
				</button>
			</div>
			{isVisible && (
				<Box className="boxScrollTop">
					<Button
						onClick={scrollToTop}
						variant="contained"
						color="success"
						size="small"
						startIcon={<ArrowUpwardIcon />}
					/>
				</Box>
			)}
		</div>
	)
}

export default DataHome
