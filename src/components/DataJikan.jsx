import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

const DataJikan = ({ search }) => {
    const [animeResults, setAnimeResults] = useState([])

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
            <ul className="anime-list">
                {animeResults.map((anime) => (
                    <Card key={anime.mal_id} style={{ width: '18rem', height: '30rem' }} className="anime-card">
                        <Card.Img variant="top" src={anime.images.jpg.image_url} />
                        <Card.Body>
                            <Card.Title className="cardName">
                                <span>{anime.title}</span>
                            </Card.Title>
                            <Card.Text>{anime.synopsis}</Card.Text>
                            <Button variant="primary">Go to anime</Button>
                        </Card.Body>
                    </Card>
                ))}
            </ul>
        </div>
    )
}

export default DataJikan