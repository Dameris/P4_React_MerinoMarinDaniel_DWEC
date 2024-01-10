import React, { useState } from 'react';
import Search from '../components/Search';
import DataJikan from '../components/DataJikan';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>Anime Search</h1>
      <Search onSearch={handleSearch} />
      {searchTerm && <DataJikan search={searchTerm} />}
    </div>
  );
};

export default Home;
