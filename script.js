$(".search-button").on("click", function () {
    $.ajax({
        url:
            "http://www.omdbapi.com/?i=tt3896198&apikey=520bb745&s=" +
            $(".input-keyword").val(),
        success: (results) => {
            const movies = results.Search;
            let cards = "";
            movies.forEach((m) => {
                cards += showCards(m);
            });
            $(".movie-container").html(cards);

            // Ketika tombol detail di-klik
            $(".modal-detail-button").on("click", function () {
                $.ajax({
                    url:
                        "http://www.omdbapi.com/?apikey=520bb745&i=" +
                        $(this).data("imdbid"),
                    success: (m) => {
                        console.log(m);

                        const movieDetail = showMovieDetail(m);
                        $(".modal-body").html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    },
                });
            });
        },
        error: (e) => {
            const pesanError = `
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">${e}</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                    <hr>
                    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
            `;
            $(".movie-container").html(pesanError);
        },
    });
});

function showCards(m) {
    return ` <div class="col-md-4 my-5">
                    <div class="card"">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                        <div class="card-body">
                          <h5 class="card-title">${m.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                            data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                        </div>
                      </div>
                </div>`;
}

function showMovieDetail(m) {
    return `
                            
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="${m.Poster}" class="img-fluid" alt="" />
                                    </div>
                                        <div class="col-md">
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <h4>${m.Title} (${m.Year})</h4>
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Director : </strong> ${m.Director}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Actors : </strong> ${m.Actors}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Writer : </strong> ${m.Writer}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Plot : </strong> ${m.Plot}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                            </div>`;
}
