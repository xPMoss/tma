
// NAVIGATION CODE //
/* Hitta och göm innehåll */
let page00 = document.getElementById("page00");
let page01 = document.getElementById("page01");
let page02 = document.getElementById("page02");
let page03 = document.getElementById("page03");
page00.style.display = "block";
page01.style.display = "none";
page02.style.display = "none";
page03.style.display = "none";

let currPage;

/* Om man klickar utanför nav stäng det */
$(document).click(function () {
      $('.navbar-collapse').collapse('hide');

});

// HANDLES LOADING OF PAGE OBJECTS //
/* Tar emot en int, skapar och visar sedan innehåll ut efter det */
async function navigation(page){
    currPage = page;

    $('.navbar-collapse').collapse('hide');

    if (page == 0) {
        Setcarousel();
        SetPopularMovies();
        page00.style.display = "block";
        page01.style.display = "none";
        page02.style.display = "none";
        page03.style.display = "none";
    }
    else if (page == 1) {
        CreateTopMovies();
        
        page00.style.display = "none";
        page01.style.display = "block";
        page02.style.display = "none";
        page03.style.display = "none";
    }
    else if (page == 2) {
        CreateMyMovies();
        page00.style.display = "none";
        page01.style.display = "none";
        page02.style.display = "block";
        page03.style.display = "none";

        

    }
    else if (page == 3) {
        clearSearchResults();
        page00.style.display = "none";
        page01.style.display = "none";
        page02.style.display = "none";
        page03.style.display = "block";

    }
    else{
        page00.style.display = "none";
        page01.style.display = "none";
        page02.style.display = "none";
        page03.style.display = "none";

    }


}
// --------------- //