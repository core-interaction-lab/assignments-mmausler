const fetchMovies = async () => {
    const response = await fetch('https://api.airtable.com/v0/appxfJxfQb92yyKkg/movies?maxRecords=100&view=Grid%20view&api_key=keykxG25CNr82Rf9Y').then(data => data.json());

    console.log(response);

    const moviesContainer = document.getElementById('movies-container');

    response.records.forEach(movie => {
        console.log(movie.fields);
        const articleEl = document.createElement('article');
        const titleEl = document.createElement('div');
        const genreEl = document.createElement('div');
        const imdbUrlEl = document.createElement('div');
        const releaseDateEl = document.createElement('div');

        titleEl.innerHTML = movie.fields.title;
        genreEl.innerHTML = movie.fields.genre;

        articleEl.appendChild(titleEl);

        moviesContainer.appendChild(articleEl);
    });
};

fetchMovies();