import React, { useEffect, useState } from 'react'
import { FEATURED_API } from "./services/config"
import Movie from "./components/Movie"


function App() {
    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        fetch(FEATURED_API)
            .then((res) => (res.status === 200) ? res.json() : 'error' )
            .then((data) => {
                if (data === 'error') {console.error('Sorry, there was an unexpected error!'); 
                alert('Sorry, there was an unexpected error!')} 
                else {setMovies(data.results)}
                
            });
    }, []);

    return (
        <div className="movie-container">
            {movies.length > 0 && 
                movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
    );
}
 
export default App
