
// SET HOME PAGE //
/* Här skapas det innehåll som visas på första sidan */
Setcarousel();
SetPopularMovies();
SetTrendingMovies();

/* Sätt innehållet i karusellen på första sidan */
async function Setcarousel(){
    let movies = await loadPopularMovies(); // Hämta data från TMDB

    let carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = ""; // Töm container

    for (let i = 0; i < 3; i++) {
        let item = new CarouselItem(movies.results[i]); // Skapa en ny Karusell item

        if (i == 0) {
            item.classList.add("active");
        }

        carouselInner.appendChild(item);

    }

}

/* Sätt innehållet i populära filmer på första sidan */
async function SetPopularMovies(){
    let movies = await loadPopularMovies(); // Hämta data från TMDB

    let topMovies = document.getElementById("topMovies");
    topMovies.innerHTML = ""; // Töm container
    
    /* Skapa nya filmobjekt med rätt innehåll från TMDB */
    for (let i = 3; i < 15; i++) {
        let movie = movies.results[i];
        topMovies.appendChild(new MovieCard(movie, false, false, false)); // Skapa ett nytt filmobjekt 
        
    }

}

/* Sätt innehållet i trending filmer på första sidan */
async function SetTrendingMovies(){
    let movies = await LoadTrendingMovies(); // Hämta data från TMDB

    let trendingMovies = document.getElementById("trendingMovies");
    trendingMovies.innerHTML = ""; // Töm container
    
    /* Skapa nya filmobjekt med rätt innehåll från TMDB */
    for (let i = 0; i < 12; i++) {
        let movie = movies[i];
        trendingMovies.appendChild(new MovieCard(movie, false, false, false)); // Skapa ett nytt filmobjekt 
        
    }

}
// ----------- //

// TABLE //
async function CreateTopMovies() {
    let mydata = await LoadTopMovies(); // Hämta data från TMDB
    mydata = setTableData(mydata);

    /* Sätt tabell och ladda in data */
    $('#table').bootstrapTable({
        data: mydata
    });

}

/* Rätta till viss data så att den kan visas korrekt i boostraps tabell */
function setTableData(movies){
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        let url = "https://image.tmdb.org/t/p/w200/" + movie.poster_path;

        movie.poster_path = '<a href="#" onclick="showMovieModal('+ movies[i].id + ')" id="' + movies[i].id + '"><img src="' + url + '" width="100" ></a>';
        movie.ranking = i+1;

    }

    return movies;
}
// ----- //

// MY MOVIES LIST //
/* Skapa filmlista */
async function CreateMyMovies () {
    let movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.getItem(i) != ""){
            let movie = await loadMovie(localStorage.getItem(i)); // Hämta data från TMDB
            movieContainer.appendChild(new MovieCard(movie, true, true, true)); // Skapa ett nytt filmobjekt 
        }

    }

}

/* Töm filmlista från localStorage */
function clearMyMovies(){
    localStorage.clear(); // Töm localStorage
    navigation(currPage);
    showAlert("", "clear") // Visa meddelande

}

function SetMyMovies(){
    localStorage.getItem(1)

    for (let i = 1; i < localStorage.length+1; i++) {

    }

}

function chechMyMovies(){

}

/* Lägg till film i localStorage */
function addToMyMovies(movie){
    let found = false;

    for (let i = 0; i < localStorage.length; i++) {
        if (movie.id == localStorage[i]) {
            found = true;
        }
        

    }

    if(found == false){
        localStorage.setItem(localStorage.length, movie.id); // Skriv till localStorage på rätt plats
        showAlert(movie, "add") // Visa meddelande

    }

    CreateMyMovies();
    //navigation(currPage);
}

/* Ta bort film från localStorage */
function removeFromMyMovies(movie){
    for (let i = 0; i < localStorage.length; i++) {
        if (movie.id == localStorage[i]) {
            localStorage.setItem(i, ""); // Ta bort från localStorage på rätt plats
            showAlert(movie, "remove") // Visa meddelande
        }
        

    }

    CreateMyMovies();
    //navigation(currPage);

}
// -------------- //

// SEARCH //

/* Försöker binda enter till sök */
$('#searchText').bind('keyup', async function (e) {                 
    if (e.keyCode == 13) {
        e.preventDefault();       
        await SubmitSearch()
        console.log("key");
    }
      

});

/* Sök efter filmer */
async function SubmitSearch(){
    let value = document.getElementById("frm1").elements[0].value;
    let resultDiv = document.getElementById("results");

    //navigation(3);

    let movies = await SearchForMovies(value); // Hämta data från TMDB

    resultDiv.innerHTML = ""; // Töm tidigare filmer

    /* Skapa lista med filmer som returnerats från TMDB */
    for (let i = 0; i < movies.results.length; i++) {
        resultDiv.appendChild(new MovieCard(movies.results[i], true, true, false)); 

    }

    /* Om ingen data returneras från TMDB */
    if(movies.results.length <= 0){
        resultDiv.innerHTML = "No results";

    }

}

/* Töm tidigare sökning */
function clearSearchResults(){
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = ""; // Töm tidigare filmer

    let value = document.getElementById("frm1").elements[0].value;
    value = "";
}
// ------ //

// MOVIE MODAL //
/* Visa modal ifall klick på film */
async function showMovieModal(movie){
    let movieModalDiv = document.getElementById("movieModalDiv");
    movieModalDiv.innerHTML = ""; // Töm container

    /* Kolla ifall det är en film eller ett film id */
    if(typeof movie == "number"){
        movie = await loadMovie(movie); // Hämta data från TMDB
        movieModalDiv.appendChild(await new MovieModal(movie, "large"));
        $('#movieModal').modal('show')
    }
    else{
        movieModalDiv.appendChild(new MovieModal(movie, "large")); // Skapa ny modal med innehåll från klickad film 
    }

}
// ----------- //

// ALERT //
/* Vissa meddelande ifall film tas bort, läggs till eller filmlista töms*/
function showAlert(movie, _string){
    document.body.appendChild(new Alert(movie, _string)); // Skapa nytt meddelande

}


function showModal(){


}

/* Visa inforuta */
function showInfo(_string){
    document.body.appendChild(new Info(_string)); // Skapa nytt meddelande

}
// ---- //