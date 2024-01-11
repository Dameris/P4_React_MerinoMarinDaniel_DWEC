import React, { useState } from "react"

const Search = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("")

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(searchInput)
  }

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="text"
        placeholder="Search anime..."
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default Search