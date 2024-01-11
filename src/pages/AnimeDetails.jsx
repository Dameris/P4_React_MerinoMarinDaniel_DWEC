import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const AnimeDetails = () => {
    // Inicializar los estados del componente
    const { animeId } = useParams()
    const [animeResults, setAnimeResults] = useState({ data: {} })

    // Llamada a "API Jikan" para obtener todos los datos de un anime por su ID
    useEffect(() => {
        const getAnimeData = async () => {
            try {
                const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
                const result = await data.json()
                setAnimeResults(result)
            } catch (error) {
                console.error('Error fetching anime data from Jikan API', error)
            }
        }

        getAnimeData()
    }, [animeId])

    if (!animeResults.data) {
        return <div>No anime found.</div>
    }

    const anime = animeResults.data

    return (
        <div className="detailsDiv">
            <h1>{anime.title}</h1>
            <h2>({anime.title_japanese})</h2>
            {anime.images?.jpg && (
                <img src={anime.images.jpg.image_url} alt={anime.title} />
            )}
            <p className="detailsP">
                {anime.synopsis}
                Type: {anime.type}
                Source: {anime.source}
                Episodes: {anime.episodes}
                Status: {anime.status}
                Aired from: {anime.aired.prop}
            </p>
        </div>
    )
}

export default AnimeDetails