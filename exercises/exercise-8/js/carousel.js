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
    const slideCount = 3;
    /*
    *  Add the first 7 items from our collection array to our container:
    *  We start with our full movies collection, call slice(0, 7) on it to trim
    *  the array to a length of 7, and then pass the resulting array to
    *  map. Map is a function that will run our specified function on each
    *  item in the array passed to it. So we pass it our sliced array and
    *  tell it to run our buildSlide function on each item. This will return
    *  a new array that holds all of the results from buildSlide, which are
    *  article HTML elements. So articleEls is an array of 7 article elements
    */
    const articleEls = movies.slice(0, slideCount).map(buildSlide);
    // Append these 7 HTML elements to our container, the '...' syntax takes
    // our array and turns it into a list of function arguments, so its
    // equivalent to append(article1, article2, article3, etc...)
    slideshowContainer.append(...articleEls);

    /*
    *  Here we declare two variables using let, since we will be updating them. 
    *  One to keep track of the index of the movie that is on the right of
    *  of our container, and one for the left side. If we click prev we increase
    *  both of these by 1, since we start with viewing slides 0-6, and if we
    *  click prev we want to then be viewing slides 1-7.
    */
    let leftI = 0;
    let rightI = slideCount - 1;

    prevButton.addEventListener('click', () => {
        leftI += 1;
        rightI += 1;
        // If the right or left side is the last movie in our list, reset it to 0
        if (rightI >= movies.length) {
            rightI = 0;
        }
        if (leftI >= movies.length) {
            leftI = 0;
        }

        // Remove the first element 
        slideshowContainer.removeChild(slideshowContainer.children[0]);
        slideshowContainer.append(buildSlide(movies[rightI]));
    });

    nextButton.addEventListener('click', () => {
        leftI -= 1;
        rightI -= 1;
        if (leftI < 0) {
            leftI = movies.length - 1;
        }
        if (rightI < 0) {
            rightI = movies.length - 1;
        }
        slideshowContainer.removeChild(slideshowContainer.querySelectorAll('article')[slideCount - 1]);
        slideshowContainer.prepend(buildSlide(movies[leftI]));
    });
};

const buildSlide = (movie) => {
    const movieContainer = document.createElement('article');
    if (movie.fields.poster) {
        // console.log(movie.fields.poster[0].url);
        const posterImg = document.createElement('img');
        posterImg.src = movie.fields.poster[0].url;
        posterImg.classList.add('poster-img', 'dlkjfdl');
        posterImg.id = 'poster-img-id';
        movieContainer.append(posterImg);
    }
    if (movie.fields.release_date) {
        // console.log(movie.fields.release_date);
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