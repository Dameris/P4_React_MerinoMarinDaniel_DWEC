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
	const [alphabeticalOrder, setAlphabeticalOrder] = useState("asc")
	const [sortByScore, setSortByScore] = useState(false)
	const [scoreOrder, setScoreOrder] = useState("desc")
	const [sortByEpisodes, setSortByEpisodes] = useState(false)
	const [episodesOrder, setEpisodesOrder] = useState("desc")
	const [sortByMalId, setSortByMalId] = useState(true) // Predeterminado activo
	const [malIdOrder, setMalIdOrder] = useState("asc") // Predeterminado ascendente
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const fetchAnimeData = async () => {
			try {
				let apiUrl = `https://api.jikan.moe/v4/anime?q=${search}&sfw&page=${page}`

				if (sortByAlphabetical) {
					apiUrl += `&order_by=title&sort=${alphabeticalOrder}`
				}

				if (sortByScore) {
					apiUrl += `&order_by=score&sort=${scoreOrder}`
				}

				if (sortByEpisodes) {
					apiUrl += `&order_by=episodes&sort=${episodesOrder}`
				}

				if (sortByMalId) {
					apiUrl += `&order_by=mal_id&sort=${malIdOrder}`
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
	}, [
		search,
		genre,
		page,
		sortByAlphabetical,
		alphabeticalOrder,
		sortByScore,
		scoreOrder,
		sortByEpisodes,
		episodesOrder,
		sortByMalId,
		malIdOrder,
	])

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
		<div>
			<div className="checkbox_order">
				<input
					type="checkbox"
					id="orderCheckbox"
					checked={sortByAlphabetical}
					onChange={(e) => setSortByAlphabetical(e.target.checked)}
					disabled={sortByScore || sortByEpisodes || sortByMalId}
				/>
				<label htmlFor="orderCheckbox">Sort by alphabetical order</label>
				<div>
					<label>
						<input
							type="radio"
							name="alphabeticalOrder"
							value="asc"
							checked={sortByAlphabetical && alphabeticalOrder === "asc"}
							onChange={() => setAlphabeticalOrder("asc")}
							disabled={!sortByAlphabetical}
						/>
						Asc
					</label>
					<label>
						<input
							type="radio"
							name="alphabeticalOrder"
							value="desc"
							checked={sortByAlphabetical && alphabeticalOrder === "desc"}
							onChange={() => setAlphabeticalOrder("desc")}
							disabled={!sortByAlphabetical}
						/>
						Desc
					</label>
				</div>
				<input
					type="checkbox"
					id="scoreCheckbox"
					checked={sortByScore}
					onChange={(e) => setSortByScore(e.target.checked)}
					disabled={sortByAlphabetical || sortByEpisodes || sortByMalId}
				/>
				<label htmlFor="scoreCheckbox">Sort by score</label>
				<div>
					<label>
						<input
							type="radio"
							name="scoreOrder"
							value="asc"
							checked={sortByScore && scoreOrder === "asc"}
							onChange={() => setScoreOrder("asc")}
							disabled={!sortByScore}
						/>
						Asc
					</label>
					<label>
						<input
							type="radio"
							name="scoreOrder"
							value="desc"
							checked={sortByScore && scoreOrder === "desc"}
							onChange={() => setScoreOrder("desc")}
							disabled={!sortByScore}
						/>
						Desc
					</label>
				</div>
				<input
					type="checkbox"
					id="episodesCheckbox"
					checked={sortByEpisodes}
					onChange={(e) => setSortByEpisodes(e.target.checked)}
					disabled={sortByAlphabetical || sortByScore || sortByMalId}
				/>
				<label htmlFor="episodesCheckbox">Sort by episodes</label>
				<div>
					<label>
						<input
							type="radio"
							name="episodesOrder"
							value="asc"
							checked={sortByEpisodes && episodesOrder === "asc"}
							onChange={() => setEpisodesOrder("asc")}
							disabled={!sortByEpisodes}
						/>
						Asc
					</label>
					<label>
						<input
							type="radio"
							name="episodesOrder"
							value="desc"
							checked={sortByEpisodes && episodesOrder === "desc"}
							onChange={() => setEpisodesOrder("desc")}
							disabled={!sortByEpisodes}
						/>
						Desc
					</label>
				</div>
				<input
					type="checkbox"
					id="malIdCheckbox"
					checked={sortByMalId}
					onChange={(e) => setSortByMalId(e.target.checked)}
					disabled={sortByAlphabetical || sortByScore || sortByEpisodes}
				/>
				<label htmlFor="malIdCheckbox">Sort by MyAnimeList ID</label>
				<div>
					<label>
						<input
							type="radio"
							name="malIdOrder"
							value="asc"
							checked={sortByMalId && malIdOrder === "asc"}
							onChange={() => setMalIdOrder("asc")}
							disabled={!sortByMalId}
						/>
						Asc
					</label>
					<label>
						<input
							type="radio"
							name="malIdOrder"
							value="desc"
							checked={sortByMalId && malIdOrder === "desc"}
							onChange={() => setMalIdOrder("desc")}
							disabled={!sortByMalId}
						/>
						Desc
					</label>
				</div>
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
