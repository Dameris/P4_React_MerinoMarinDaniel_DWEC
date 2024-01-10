import React, { useState, useEffect } from "react"
import axios from "axios"
import Jikan from "jikan-node"
const mal = new Jikan()

export default function Series() {
    const [page, setPage] = useState(1);
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <>
            Animes
        </>
    )
}