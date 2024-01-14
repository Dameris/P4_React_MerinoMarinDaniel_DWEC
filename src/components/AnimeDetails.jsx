import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const AnimeDetails = () => {
    // Inicializar los estados del componente
    const { animeId } = useParams()
    const [animeResults, setAnimeResults] = useState({ data: {} })
    const [animeImg, setAnimeImg] = useState("")
    const [favorites, setFavorites] = useState([])
    const { loged, user } = useUserContext()
    const navigate = useNavigate()

    // Llamada a "API Jikan" para obtener todos los datos de un anime por su ID
    useEffect(() => {
        const getAnimeData = async () => {
            try {
                const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
                const result = await data.json()
                setAnimeResults(result)
                setAnimeImg(result.data.images?.jpg?.large_image_url)
            } catch (error) {
                console.error('Error fetching anime data from Jikan API', error)
            }
        }

        getAnimeData()
    }, [animeId])

    // Obtener lista favoritos de localStorage
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
        setFavorites(savedFavorites)
    }, [])

    // Guardar favoritos en localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    if (!animeResults.data) {
        return <div>No anime found.</div>
    }

    const anime = animeResults.data

    // Añadir anime a favoritos
    const addToFavorites = (animeId) => {
        if (!favorites.includes(animeId)) {
            setFavorites([...favorites, animeId])
        }
    }

    // Eliminar anime de favoritos
    const removeFromFavorites = (animeId) => {
        setFavorites(favorites.filter((id) => id !== animeId))
    }

    return (
        <div className="detailsDiv">
            <h1 className="text-center">{anime.title}</h1>
            <h2 className="text-center">({anime.title_japanese})</h2>
            <div className="imgSynopsis">
                {animeImg && (
                    <img src={animeImg} alt={anime.title} />
                )}
                {anime.synopsis}
            </div>

            <p className="detailsP">
                <button onClick={() => {
                    if (!loged) {
                        navigate("/login")
                    } else {
                        favorites.includes(anime.mal_id) ? removeFromFavorites(anime.mal_id) : addToFavorites(anime.mal_id)
                    }
                }}>
                    {favorites.includes(anime.mal_id) ? "Remove from favorites" : "Add to favorites"}
                </button> <br />
                Type: {anime.type} <br />
                Source: {anime.source} <br />
                Episodes: {anime.episodes} <br />
                Status: {anime.status}
            </p>
        </div>
    )
}

export default AnimeDetails