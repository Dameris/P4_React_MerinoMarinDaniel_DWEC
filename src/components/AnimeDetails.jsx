import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

const AnimeDetails = () => {
    const { animeId } = useParams()
    const [animeResults, setAnimeResults] = useState({ data: {} })
    const [animeImg, setAnimeImg] = useState("")
    const { loged, user, updateUserFavorites } = useUserContext()
    const navigate = useNavigate()

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
        };

        getAnimeData()
    }, [animeId])

    useEffect(() => {
        const savedFavorites = user && user.favorites ? user.favorites : []
        updateUserFavorites(savedFavorites)
    }, [user, updateUserFavorites])

    const addToFavorites = (animeId) => {
        if (!user?.favorites.includes(animeId)) {
            updateUserFavorites([...user.favorites, animeId])
        }
    }

    const removeFromFavorites = (animeId) => {
        updateUserFavorites(user?.favorites.filter((id) => id !== animeId))
    }

    const anime = animeResults.data

    if (!anime) {
        return <div>No anime found.</div>
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
                        if (user && user.favorites) {
                            const isFavorite = user.favorites.includes(anime.mal_id)
                            isFavorite ? removeFromFavorites(anime.mal_id) : addToFavorites(anime.mal_id)
                        }
                    }
                }}>
                    {user && user.favorites && user.favorites.includes(anime.mal_id) ? "Remove from favorites" : "Add to favorites"}
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