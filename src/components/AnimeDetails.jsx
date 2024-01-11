import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const AnimeDetails = () => {
    // Inicializar los estados del componente
    const { animeId } = useParams()
    const [animeResults, setAnimeResults] = useState({ data: {} })
    const [animeImg, setAnimeImg] = useState("")

    // Llamada a "API Jikan" para obtener todos los datos de un anime por su ID
    useEffect(() => {
        const getAnimeData = async () => {
            try {
                const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
                const result = await data.json()
                setAnimeResults(result)
                setAnimeImg(result.data.images.jpg.large_image_url)
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
            <h1 className="text-center">{anime.title}</h1>
            <h2 className="text-center">({anime.title_japanese})</h2>
            <div className="imgSynopsis">
                {anime.images?.jpg && (
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                )}
                {anime.synopsis}
            </div>

            <p className="detailsP">
                Type: {anime.type} <br />
                Source: {anime.source} <br />
                Episodes: {anime.episodes} <br />
                Status: {anime.status}
                Aired: {anime.aired.from}
            </p>
        </div>
    )
}

export default AnimeDetails