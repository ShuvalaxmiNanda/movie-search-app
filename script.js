require('dotenv').config();

const getMovieForm = document.getElementById('movieForm')
const movieData = document.getElementById('movieSearch')
const getMovieList = document.getElementById('movieList')


getMovieForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const movieTitle = movieData.value
    const apiKey = process.env.API_KEY
    const url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`
    const options = {
        method: 'GET'
    }

try{
    const response = await fetch(url,options)
    const data = await response.json()

    getMovieList.innerHTML = ''
        
        if (data.Response === 'True') {
            data.Search.forEach(async movie => {

                const movieDetailUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
                const detailResponse = await fetch(movieDetailUrl); 
                const movieDetail = await detailResponse.json();

                const movieItem = document.createElement('li')
                movieItem.classList.add('movie-item')
                movieItem.innerHTML = `
                <div class="movie-details">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <p><strong>Imdb_Rating:</strong> ${movieDetail.imdbRating}</p>
                    <p><strong>Actors:</strong> ${movieDetail.Actors}</p>
                    <p><strong>Director:</strong> ${movieDetail.Director}</p>
                    <p><strong>Release Date:</strong> ${movieDetail.Released}</p>
                    <p><strong>Box Office:</strong> ${movieDetail.BoxOffice || 'N/A'}</p>
                </div>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" width="100">
               
                `
                getMovieList.appendChild(movieItem);
            })
        }
        else{
            getMovieList.innerHTML = '<li>No results found</li>'
        }
    } 
    catch (error) {
        console.error('Error fetching movie data:', error);
    }
})