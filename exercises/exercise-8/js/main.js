const db = {
    id: 'appxfJxfQb92yyKkg',
    table: 'movies',
    apiKey: 'keykxG25CNr82Rf9Y'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const slideshowContainer = document.getElementById('slideshow-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const fetchMovies = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    // console.log(response);
    buildSlideshow(response.records);
    return response.records;
};

const buildSlideshow = (movies) => {
    console.log(movies);
    console.log(buildSlide(movies[0]));

    const firstMovie = buildSlide(movies[0]);
    slideshowContainer.append(firstMovie);

    let currentMovie = 0;

    prevButton.addEventListener('click', () => {
        if (currentMovie === 0) {
            currentMovie = movies.length - 1;
        } else {
            currentMovie = currentMovie - 1;
        }

        const movieRecord = movies[currentMovie];
        swapSlide(movieRecord);
    });

    nextButton.addEventListener('click', () => {
        if (currentMovie === movies.length - 1) {
            currentMovie = 0;
        } else {
            currentMovie = currentMovie + 1;
        }

        const movieRecord = movies[currentMovie];
        swapSlide(movieRecord);
    });
};

const swapSlide = (movieRecord) => {
    const slideEl = buildSlide(movieRecord);

    slideshowContainer.innerHTML = '';
    slideshowContainer.append(slideEl);
};

const buildSlide = (movie) => {
    const movieContainer = document.createElement('article');
    if (movie.fields.poster) {
        console.log(movie.fields.poster[0].url);
        const posterImg = document.createElement('img');
        posterImg.src = movie.fields.poster[0].url;
        posterImg.classList.add('poster-img', 'dlkjfdl');
        posterImg.id = 'poster-img-id';
        movieContainer.append(posterImg);
    }
    if (movie.fields.release_date) {
        console.log(movie.fields.release_date);
    }

    if (movie.fields.description) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.description;
        descriptionEl.classList.add('movie-description');
        movieContainer.append(descriptionEl);
    }
    return movieContainer;
};

fetchMovies();