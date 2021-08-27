


// RETURNS LIST OF MOVIES //
/* Hämtar en lista av top filmer */
async function LoadTrendingMovies(){
    let url = 'https://api.themoviedb.org/3/trending/all/day?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US';

    const response = await fetch(url);
    let movies = await response.json()
    movies = movies.results;

    return movies;

}

// RETURNS LIST OF MOVIES //
/* Hämtar en lista av top filmer */
async function LoadTopMovies(){
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US&page=1';

    const response = await fetch(url);
    let movies = await response.json()
    movies = movies.results;

    return movies;

}

// RETURNS LIST OF MOVIES //
/* Hämtar en lista av populära filmer */
async function loadPopularMovies() {
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US&page=1';

    const response = await fetch(url);
    
    return response.json(); 
    
}

// RETURNS MOVIE OBJECT //
/* Hämtar en specifik film */
/* Kräver ett film id */
async function loadMovie(id) {
    let url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US';

    const response = await fetch(url);

    return response.json();
    
}

// RETURNS OBJECT WITH backdrops, logos and posters //
/* Hämtar bilder för en specifik film */
/* Kräver ett movie object */
async function loadImages(movie) {
    let url = "https://api.themoviedb.org/3/movie/" + movie.id + "/images?api_key=837510eb0be61188d342d8c49173bb6e&include_image_language=en,null";

    const response = await fetch(url);

    return response.json(); 
    
}

// RETURNS LIST OF MOVIES //
async function SearchForMovies(searchString) {
    searchString = searchString.split(' ').join('+');
    
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=837510eb0be61188d342d8c49173bb6e&language=en-US&page=1&include_adult=false&query=' + searchString;

    const response = await fetch(url);

    
    return response.json();
    
}