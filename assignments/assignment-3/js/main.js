const db = {
    id: 'appxfJxfQb92yyKkg',
    table: 'movies',
    apiKey: 'keykxG25CNr82Rf9Y'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const fetchMovies = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    console.log(response);

    const myObject = {
        title: 'movie',
        release_date: '334824',
    }

    const myArray = ['movie', 348927, 'fdiosj'];

    const isReleased = true;

    console.log( myObject.release_date )
    console.log(myArray[2]);

    const container = document.getElementById('movies-container');

    response.records.forEach((movie) => {
        console.log(movie);
        if (movie.fields.poster) {
            console.log(movie.fields.poster[0].url);
            const posterImg = document.createElement('img');
            posterImg.src = movie.fields.poster[0].url;
            //posterImg.setAttribute('src', movie.fields.poster[0].url);
            container.append(posterImg);
        }
        if (movie.fields.release_date) {
            console.log(movie.fields.release_date);
        }

        if (movie.fields.description) {
            const descriptionEl = document.createElement('p');
            descriptionEl.innerHTML = movie.fields.description;
            descriptionEl.classList.add('movie-description');
            container.append(descriptionEl);
        }
    });
};

fetchMovies();