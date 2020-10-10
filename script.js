// API Key
//
// http://www.omdbapi.com/?i=tt3896198&apikey=9198b7b1



// On Load
// Load a list of movies

$(document).ready(() => {
  let onLoad = "what+about";
  axios.get(`http://www.omdbapi.com/?apikey=9198b7b1&s=${onLoad}`)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });

    let onLoadtwo = "once";
    axios.get(`http://www.omdbapi.com/?apikey=9198b7b1&s=${onLoadtwo}`)
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
        });

        $('#moviestwo').html(output);
      })
      .catch((err) => {
        console.log(err);
      });

});

// On Load set up search bar

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText= $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get(`http://www.omdbapi.com/?apikey=9198b7b1&s=${searchText}`)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

// When Movie Details button is pressed load singular movie info
// using the id kept in session storage

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`http://www.omdbapi.com/?apikey=9198b7b1&i=${movieId}`)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src=${movie.Poster} class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDb</a>
            <a href="index.html" class="btn btn-secondary">Go Back to Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
