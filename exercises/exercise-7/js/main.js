const fetchMovies = async () => {
    const response = await fetch('https://api.airtable.com/v0/appxfJxfQb92yyKkg/movies?maxRecords=100&view=Grid%20view&api_key=keykxG25CNr82Rf9Y').then(data => data.json());

    console.log(response);

    const moviesContainer = document.getElementById('movies-container');

    response.records.forEach(movie => {
        console.log(movie.fields);
        const articleEl = document.createElement('article');
        const titleEl = document.createElement('div');
        const genreEl = document.createElement('div');
        const imdbUrlEl = document.createElement('a');
        const releaseDateEl = document.createElement('div');

        titleEl.innerHTML = movie.fields.title;
        genreEl.innerHTML = movie.fields.genre;

        imdbUrlEl.href = movie.fields.imdb_url;
        imdbUrlEl.target = "_blank";
        imdbUrlEl.classList.add('imdb-link');

        imdbUrlEl.innerHTML = "IMDB Page";
        releaseDateEl.innerHTML = movie.fields.release_date;

        articleEl.append(titleEl, genreEl, imdbUrlEl, releaseDateEl);

        moviesContainer.appendChild(articleEl);
    });

    const linkTags = document.querySelectorAll('.imdb-link');
    console.log(linkTags);
    linkTags.forEach((link, index) => {
        const linkColor = link.style.color;
        link.id = `my-link-${index + 1}`;
        link.addEventListener('mouseover', (evt) => {
            link.style.color = "green";
        });

        link.addEventListener('mouseout', evt => {
            link.style.color = linkColor;
        });
    });
};

fetchMovies();