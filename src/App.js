import React, { useEffect, useState } from "react"
import { FEATURED_API, SEARCH_API } from "./services/config"
import Movie from "./components/Movie"


function App() {
    const [ movies, setMovies ] = useState([]);
    const [ searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(FEATURED_API)
            .then((res) => (res.status === 200) ? res.json() : "error" )
            .then((data) => {
                if (data === "error") {console.error("Sorry, there was an unexpected error!"); 
                alert("Sorry, there was an unexpected error!")} 
                else {setMovies(data.results)};
            });
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            fetch(SEARCH_API + searchTerm)
                .then((res) => (res.status === 200) ? res.json() : "error" )
                .then((data) => {
                    if (data === "error") {console.error("Sorry, there was an unexpected error!"); 
                    alert("Sorry, there was an unexpected error!")} 
                    else {setMovies(data.results)};
                });

                setSearchTerm("");
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }


    return (
        <>
            <header>
                <form onSubmit={handleOnSubmit}>
                    <input 
                        className="search"
                        type="search" 
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                </form>
            </header>
            <div className="movie-container">
                {movies.length > 0 && 
                    movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </>
    );
}
 
export default App
