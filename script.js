$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText")[0].value;
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get(
      "https://api.themoviedb.org/3/search/movie?api_key=851195eccb0eb072fa9f0724b9001de5&query=" +
        searchText
    )
    .then((response) => {
      let movies = response.data.results;
      let output = "";
      $.each(movies, (index, movie) => {
        output += 
        `<div class="col-md-3">
                    <div class="well text-center">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                        <h5>${movie.title}</h5>
                        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Click to see movie details</a>
                    </div>
                  </div>`;
      });   
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id); // session will clear out when browser is closed
    window.location = 'movieInfo.html';
    return false
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get(
        "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=851195eccb0eb072fa9f0724b9001de5&language=en-US"
      )
      .then((response) => {
        console.log(response);
        let movie = response.data;
        let output = `
        <div class="row">
            <div class="col-md-4">
                <img src= "https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="tumbnail" />
            </div>
            <div class="col-md-8">
                <h2>${movie.title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong> Release date: </strong>${movie.release_date}</li>
                    <li class="list-group-item"><strong> Popularity: </strong>${movie.popularity}</li>
                    <li class="list-group-item"><strong> Status: </strong>${movie.status}</li>
                    <li class="list-group-item"><strong> Genres: </strong>${movie.genres[0].name}</li>
                </ul>
            </div>
        </div>
        `;
        $("#movies").html(output);
      })
      .catch((err) => {
        console.log(err);
      });
}
