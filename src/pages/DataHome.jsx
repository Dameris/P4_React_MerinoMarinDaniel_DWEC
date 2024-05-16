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
	const [sortBy, setSortBy] = useState("")
	const [order, setOrder] = useState("asc")
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const fetchAnimeData = async () => {
			try {
				let apiUrl = `https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}`

				if (sortBy) {
					apiUrl += `&order_by=${sortBy}&sort=${order}`
				}

				const response = await fetch(apiUrl)
				const { data, pagination } = await response.json()

				// Filtrar los resultados para evitar duplicados por mal_id
				const uniqueAnimeResults = filterUniqueByMalId(data)

				setAnimeResults(uniqueAnimeResults)
				setTotalPages(pagination.last_visible_page)
			} catch (error) {
				console.error("Error fetching anime data from Jikan API", error)
			}
		}

		// Retrasar la llamada para evitar la sobrecarga del servidor
		const timeoutId = setTimeout(fetchAnimeData, 1000)
		return () => clearTimeout(timeoutId)
	}, [search, genre, page, sortBy, order])

	// Función para filtrar resultados únicos por mal_id
	const filterUniqueByMalId = (data) => {
		const malIdSet = new Set()
		const uniqueAnimeResults = []

		data.forEach((anime) => {
			if (!malIdSet.has(anime.mal_id)) {
				malIdSet.add(anime.mal_id)
				uniqueAnimeResults.push(anime)
			}
		})

		return uniqueAnimeResults
	}

	// Función para desplazar la página hacia arriba
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 400)
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

	// Filtrar los resultados del anime según el género
	const filteredAnimeResults = animeResults.filter(
		(anime) => !genre || anime.genres.some((animeGenre) => genre === animeGenre.name)
	)

	return (
		<div className="text-center">
			<div className="filtersBox">
				<div className="dropdown">
					<select
						id="sortBy"
						className="sortBy__Select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="">Sort by...</option>
						<option value="title">Title</option>
						<option value="score">Score</option>
						<option value="episodes">Episodes</option>
						<option value="mal_id">MyAnimeList ID</option>
					</select>
				</div>
				{sortBy && (
					<div className="checkboxBox">
						<input
							type="checkbox"
							id="orderCheckbox"
							checked={order === "desc"}
							onChange={(e) => setOrder(e.target.checked ? "desc" : "asc")}
						/>
						<label htmlFor="orderCheckbox">Descending order</label>
					</div>
				)}
			</div>
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
							<Link
								to={`/animeDetails/${anime.mal_id}`}
								target="_blank"
							>
								{anime.title}
							</Link>
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
