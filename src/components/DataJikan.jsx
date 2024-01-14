import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const DataJikan = ({ search }) => {
    // Inicializar el estado del componente
    const [animeResults, setAnimeResults] = useState([])

    // Llamada a "API Jikan" para obtener los animes
    useEffect(() => {
        const getAnimeData = async () => {
            try {
                const data = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`)
                const result = await data.json()
                setAnimeResults(result.data)
            } catch (error) {
                console.error('Error fetching anime data from Jikan API', error)
            }
        }

        getAnimeData()
    }, [search])

    return (
        <div>
            <h2>Results for "{search}":</h2>
            <ul className="animeList">
                {animeResults.map((anime) => (
                    <Card key={anime.mal_id} className="animeCard">
                        <Card.Img variant="top" src={anime.images.jpg.image_url} className="animeImg" />
                        <Card.Body></Card.Body>
                        <Card.Footer className="cardName">
                            <Link to={`/animeDetails/${anime.mal_id}`}>{anime.title}</Link>
                        </Card.Footer>
                    </Card>
                ))}
            </ul>
        </div>
    )
}

export default DataJikan