const db = {
    id: 'appxfJxfQb92yyKkg',
    table: 'movies',
    apiKey: 'keykxG25CNr82Rf9Y'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const slideshowContainer = document.getElementById('slideshow-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let moviesArray = [];

const fetchMovies = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    // console.log(response);
    moviesArray = response.records;

    const dramaMovies = moviesArray.filter(movie => {
        if (movie.fields.genre.includes("Drama") && movie.fields.release_date.includes('1972')) {
            return true;
        }

        return false;
    });

    console.log(dramaMovies);

    buildSlideshow(dramaMovies);
    return response.records;
};

const buildSlideshow = (movies) => {
    const slideCount = 2;

    const articleEls = movies.slice(0, slideCount).map(buildSlide);
    console.log(articleEls);

    slideshowContainer.append(...articleEls);

    let leftIndex = 0;
    let rightIndex = slideCount - 1;

    prevButton.addEventListener('click', () => {
        leftIndex += 1;
        rightIndex += 1;

        if (rightIndex >= movies.length) {
            rightIndex = 0;
        }

        if (leftIndex >= movies.length) {
            leftIndex = 0;
        }

        console.log(leftIndex, rightIndex);

        slideshowContainer.removeChild(slideshowContainer.children[0]);
        slideshowContainer.append(buildSlide(movies[rightIndex], rightIndex));
    });

    nextButton.addEventListener('click', () => {
        leftIndex -= 1;
        rightIndex -= 1;

        if (leftIndex < 0) {
            leftIndex = movies.length - 1;
        }

        if (rightIndex < 0) {
            rightIndex = movies.length - 1;
        }

        console.log(leftIndex, rightIndex);

        const lastItem = slideshowContainer.querySelectorAll('article')[slideCount - 1];
        slideshowContainer.removeChild(lastItem);
        slideshowContainer.prepend(buildSlide(movies[leftIndex], leftIndex));
    });
};

const buildSlide = (movie, index) => {
    const movieContainer = document.createElement('article');
    if (movie.fields.poster) {
        // console.log(movie.fields.poster[0].url);
        const posterSelectBtn = document.createElement('button');
        posterSelectBtn.dataset.movieIndex = index;

        posterSelectBtn.addEventListener('click', evt => {
            buildSelectedMovie(moviesArray[index]);
        });

        const posterImg = document.createElement('img');
        posterImg.src = movie.fields.poster[0].url;
        posterImg.classList.add('poster-img', 'dlkjfdl');
        posterImg.id = 'poster-img-id';

        posterSelectBtn.append(posterImg);
        movieContainer.append(posterSelectBtn);
    }

    return movieContainer;
};

const selectedMovieContainer = document.getElementById('selected-movie');

const buildSelectedMovie = movie => {
    selectedMovieContainer.innerHTML = '';
    if (movie.fields.poster) {
        const posterImg = document.createElement('img');
        posterImg.src = movie.fields.poster[0].url;
        posterImg.classList.add('poster-img');
        selectedMovieContainer.append(posterImg);
    }

    if (movie.fields.release_date) {
        // console.log(movie.fields.release_date);
        const releaseEl = document.createElement('p');
        releaseEl.innerHTML = movie.fields.release_date;
        selectedMovieContainer.append(releaseEl);
    }

    if (movie.fields.description) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerHTML = movie.fields.description;
        descriptionEl.classList.add('movie-description');
        selectedMovieContainer.append(descriptionEl);
    }
};

fetchMovies();