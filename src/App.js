import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com/?apikey=18006a93';

function App() {

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState('');

  const searchMovies = async (title) => {
    const {data} = await Axios.get(`${API_URL}&s=${title}`)
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman')
  },[]);

  return (
    <div className='app'>
     <h1> MovieWebsite </h1>
     <div className='search'>
       <input 
        placeholder='Search for movies'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
       />
       <img 
        src={SearchIcon}
        alt= "search"
        onClick={() => searchMovies(term)}
       />
     </div>

    {
      movies?.length > 0 ? 
      (
        <div className='container'>
          {movies.map((movie) => (
             <MovieCard movie={movie}/>
          ))}
        </div>
      ) : 
      (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )
    }

    </div>
  );
}

export default App;
