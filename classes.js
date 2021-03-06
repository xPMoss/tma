let genres = [
    {12: "Adventure"},
    {14: "Fantasy"},
    {16: "Animation"},
    {18: "Drama"},
    {27: "Horror"},
    {28: "Action"},
    {35: "Comedy"},
    {36: "History"},
    {37: "Western"},
    {53: "Thriller"},
    {80: "Crime"},
    {878: "Science Fiction"},
    {9648: "Mystery"},
    {99: "Documentary"},
    {10749: "Romance"},
    {10751: "Family"},
    {10752: "War"},
    {10770: "TV Movie"}
]

function getGenre(id) {
    let string;

    switch(id) {
        case 12:
            string = "Adventure"
            break;
        case 14:
            string = "Fantasy"
            break;
        case 16:
            string = "Animation"
            break;
        case 18:
            string = "Drama"
            break;
        case 27:
            string = "Horror"
            break;
        case 28:
            string = "Action"
            break;
        case 35:
            string = "Comedy"
            break;
        case 36:
            string = "History"
            break;
        case 37:
            string = "Western"
            break;
        case 53:
            string = "Thriller"
            break;
        case 80:
            string = "Crime"
            break;
        case 99:
            string = "Documentary"
            break;
        case 878:
            string = "Science Fiction"
            break;
        case 9648:
            string = "Mystery"
            break;
        case 10749:
            string = "Romance"
            break;
        case 10751:
            string = "Family"
            break;
        case 10752:
            string = "War"
            break;
        case 10770:
            string = "TV Movie"
            break;
        default:
            // code block
    }


    return string

}

/*
10402, Music
classes.js:42 10749, Romance
classes.js:42 10751, Family
classes.js:42 10752, War
classes.js:42 10770, TV Movie

classes.js:42 12, Adventure
classes.js:42 14, Fantasy
classes.js:42 16, Animation
classes.js:42 18, Drama
classes.js:42 27, Horror
classes.js:42 28, Action
classes.js:42 35, Comedy
classes.js:42 36, History
classes.js:42 37, Western
classes.js:42 53, Thriller
classes.js:42 80, Crime
classes.js:42 878, Science Fiction
classes.js:42 9648, Mystery
classes.js:42 99, Documentary

*/



// RETURNS LIKE BUTTON OBJECT //
/* Kr??ver ett movie object */
class LikeBtn{
    constructor(movie) {
        let likeBtn = document.createElement('i');
        likeBtn.style.cursor = "pointer";
        this.found = null;

        // CHECK IF MY IS IN LIST //
        for (let i = 0; i < localStorage.length; i++) {
            if (movie.id == localStorage[i]) {
                this.found = true;
            }
            
        }

        // SET STYLE DEPENDING ON IF IN MY LIST //
        if(this.found == true){
            likeBtn.classList.add('fas');
            likeBtn.classList.add('fa-heart');
        }
        else{
            likeBtn.classList.add('far');
            likeBtn.classList.add('fa-heart');
        }

        // ONCLICK //
        likeBtn.onclick = function(event) {
            // CHECK IF MY IS IN LIST //
            for (let i = 0; i < localStorage.length; i++) {
                if (movie.id == localStorage[i]) {
                    this.found = true;
                }
                
            }
            
            // REMOVE OR ADD //
            if(this.found == true){
                removeFromMyMovies(movie)    
                this.found = false;  

            }
            else{
                addToMyMovies(movie)
                this.found = true;  
                
            }

            // TOGGLE COLOR FILL //
            $( this ).toggleClass( "fas" );
            $( this ).toggleClass('far');

            event.preventDefault();
        }; 

        return likeBtn;

    }

}

// RETURNS REMOVE BUTTON OBJECT //
/* Kr??ver ett movie object */
class RemoveBtn{
    constructor(movie) {
        let removeBtn = document.createElement('div');
        removeBtn.classList.add('btn');
        removeBtn.classList.add('btn-danger');
        removeBtn.classList.add('text-center');
        removeBtn.classList.add('col-12');
        removeBtn.classList.add('text-truncate'); // Klipp text om den g??r break
        
        removeBtn.innerHTML = "Remove";

        removeBtn.onclick = function(event) { 
            removeFromMyMovies(movie)

            event.preventDefault();
        };

        return removeBtn;

    }


}

// RETURNS POSTER OBJECT //
/* Kr??ver ett movie object, storlek p?? bild och ifall den ??r klickbar */
class Poster{
    constructor(movie, _size, x_toggle) {
        let img = document.createElement('img');

        /* Laddar in bild beroende p?? ??nskad storlek */
        if(_size == "original"){
            img.src = "https://image.tmdb.org/t/p/original" + movie.poster_path;
            

        }
        else if(_size < 200){
            img.src = "https://image.tmdb.org/t/p/w200/" + movie.poster_path;
            img.style.width = _size + "px";
        }
        else{
            img.src = "https://image.tmdb.org/t/p/w" + _size + "/" + movie.poster_path;
            
        }
        
        if(movie.poster_path == null){
            img.src = "https://via.placeholder.com/200x300"

        }

        img.classList.add("rounded");
        img.classList.add("img-fluid");
        
        if(x_toggle){
            img.style.cursor = "pointer";
            img.setAttribute("data-toggle", "modal");
            img.setAttribute("data-target", "#movieModal");

            img.onclick = function(e) { 
                showMovieModal(movie);

            };

        }

        return img;

    }

}

// RETURNS BACKDROP OBJECT //
/* Kr??ver ett movie object och ifall den ??r klickbar */
class Backdrop{
    constructor(movie, x_toggle) {
        let img = document.createElement('img');

        img.src = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
        
        img.classList.add("d-block");
        img.classList.add("w-100");
        img.classList.add("rounded");

        if(x_toggle){
            img.style.cursor = "pointer";
            img.setAttribute("data-toggle", "modal");
            img.setAttribute("data-target", "#movieModal");

            img.onclick = function() { 
                showMovieModal(movie);
                
    
            };

        }

        return img;

    }

}

// RETURNS CAROUSELITEM OBJECT //
/* Kr??ver ett movie object */
class CarouselItem{
    constructor(movie) {
        let item = document.createElement('div');
        item.classList.add("carousel-item");

        let carouselCaption = document.createElement('div');
        carouselCaption.classList.add("carousel-caption");
        carouselCaption.classList.add("d-none");
        carouselCaption.classList.add("d-md-block");

        let label = document.createElement('h5');
        label.classList.add("p-4");
        label.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        label.innerHTML = movie.title;

        if(movie.backdrop_path == null){
            item.appendChild(new Poster(movie, 400, true));
        }
        else{
            
            item.appendChild(new Backdrop(movie, true));
        }

        
        item.appendChild(carouselCaption);
        carouselCaption.appendChild(label);

        //console.log(movie.backdrop_path)

        return item;


    }


}

// RETURNS LIST OBJECT //
/* Kr??ver ett movie object */
class List{
    constructor(movie) {
        let ul = document.createElement("ul");
        ul.classList.add("list-group");
        ul.classList.add("list-group-flush");

        let li;

        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.appendChild(new LikeBtn(movie));
        ul.appendChild(li);

        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = "<b>Overview:</b></br>" + movie.overview;
        ul.appendChild(li);

        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = "<b>Genres:</b></br>";
        for (let i = 0; i < movie.genre_ids.length; i++) {
            let genreT = getGenre(movie.genre_ids[i]);
            li.innerHTML += "" + genreT;
            if (i != movie.genre_ids.length - 1) {
                li.innerHTML += ", ";
            }
            
        }
        ul.appendChild(li);

        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = "<b>Release Date:</b></br>" + movie.release_date;
        ul.appendChild(li);

        li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = "<b>Rating: </b></br>" + movie.vote_average;
        ul.appendChild(li);

        return ul;

    }

}

// RETURNS MOVIECARD OBJECT //
/* Kr??ver ett movie object, titel, likeBtn(bool), removeBtn(Bool) */
class MovieCard{
    constructor(movie, x_title, x_likeBtn, x_removeBtn) {
        let colDiv = document.createElement("div");
        /* S??tter bredd 2 i rad f??r sm?? sk??rmar, 3 f??r st??rre, sen 4, sen 6 */
        colDiv.classList.add('col-6');
        colDiv.classList.add('col-sm-4');
        colDiv.classList.add('col-md-3');
        colDiv.classList.add('col-lg-2');
        colDiv.classList.add('p-0');
        colDiv.classList.add('m-0');
        
    
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("mr-sm-4");
        cardDiv.classList.add("mb-sm-4");

        let cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");

        let newP = document.createElement("h5");
        newP.classList.add('card-title');
        newP.classList.add('text-truncate'); // Klipp text om den g??r break
        newP.style.textAlign = "center";
        newP.style.fontSize = "1rem"; // Mindre fontSize p?? titeln
        newP.innerHTML = movie.title;

        let footDiv = document.createElement("div");
        footDiv.classList.add('card-footer');

        colDiv.appendChild(cardDiv);

        let poster = new Poster(movie, 400, true); // Nytt poster objekt

        cardDiv.appendChild(poster);
        if (x_title) {
            footDiv.appendChild(newP);
        }
        
        if (x_likeBtn) {

        }

        if (x_removeBtn) {
            footDiv.appendChild(new RemoveBtn(movie));
        }
        
        if (!x_title && !x_likeBtn && !x_removeBtn) {
            
        }
        else{
            cardDiv.appendChild(footDiv);
        }
        

        return colDiv;

    }



}

// RETURNS MOVIEMODAL OBJECT //
/* Kr??ver ett movie object och storlek("small" eller "large") */
class MovieModal{
    constructor(movie, size) {

        let modal = document.createElement("div");

        modal.classList.add('modal');
        modal.classList.add('row');
        modal.classList.add('col-12');
        modal.classList.add('mx-auto');

        /* Liten eller stor */
        if(size == "small"){
            modal.classList.add('bd-example-modal-sm');
        }
        else if(size == "large"){
            modal.classList.add('bd-example-modal-lg');
        }
        
        modal.classList.add('fade');
        modal.classList.add('modal-dialog-centered');
        modal.tabIndex = "-1";
        modal.id = "movieModal";

        
        let modalDialog = document.createElement("div");
        modalDialog.classList.add("modal-dialog");

        if(size == "small"){
            modalDialog.classList.add("modal-sm");
        }
        else if(size == "large"){
            modalDialog.classList.add("modal-lg");
        }

        modalDialog.setAttribute("role", "document");
        
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        let modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
        modalHeader.innerHTML = '<h5 class="modal-title" id="">' +movie.title+ '</h5>';
        modalHeader.innerHTML += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        modalHeader.innerHTML +=  '<span aria-hidden="true">&times;</span>';
        modalHeader.innerHTML += '</button>';
        
        let modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
        let row = document.createElement("div");
        row.classList.add("row");
        let col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col-md-6");

        col.appendChild(new Poster(movie, "original", false));
        row.appendChild(col);

        // IF WIDE //
        col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col-md-6");
        col.classList.add("d-none");
        col.classList.add("d-md-block");
        col.appendChild(new List(movie));
        row.appendChild(col);
        // ------- //

        modalBody.appendChild(row);

        // IF SMALL //
        let modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");
        modalFooter.classList.add("d-block");
        modalFooter.classList.add("d-md-none");
        // ------- //
        
        modalFooter.appendChild(new List(movie));
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        
        return modal;

    }



}

// RETURNS ALERT OBJECT //
/* Kr??ver ett movie object och typ("add", "remove" eller "clear") */
class Alert{
    constructor(movie, _string) {

        let div = document.createElement("div");
        div.classList.add("alert");
        if(_string == "add"){
            div.classList.add("alert-primary");
            div.innerHTML = movie.title +  " was added to my movies!";
        }
        else if(_string == "remove"){
            div.classList.add("alert-warning");
            div.innerHTML = movie.title +  " was removed from my movies!";
            
        }
        else if(_string == "clear"){
            div.classList.add("alert-danger");
            div.innerHTML = "My movies was cleared!";
        }
        
        div.classList.add("fixed-bottom");

        div.style.zIndex = "1500";
        div.id = "alert";
        div.setAttribute("role", "alert");

        $('#closeAlert').click(function() {
            $('#alert').remove();
        });

        setTimeout(function removeMe(){
            $('#alert').remove();
        }, 2000);

        return div;

    }

}

// RETURNS INFO OBJECT //
/* Kr??ver en text */
class Info{
    constructor(_string) {

        let div = document.createElement("div");
        div.classList.add("alert");
        div.classList.add("alert-warning");
        div.innerHTML = _string;
        
        div.classList.add("fixed-top");
        div.classList.add("py-4");
        div.classList.add("text-center");
        div.style.top = "20vh";
        div.style.fontSize = "2rem";

        div.style.zIndex = "1500";
        div.id = "Info";
        div.setAttribute("role", "alert");

        $('#closeAlert').click(function() {
            $('#Info').remove();
        });

        setTimeout(function removeMe(){
            $('#Info').remove();
        }, 1000);

        return div;

    }

}



