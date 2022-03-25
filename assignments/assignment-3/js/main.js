const db = {
    id: 'appxfJxfQb92yyKkg',
    table: 'movies',
    apiKey: 'keykxG25CNr82Rf9Y'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const fetchMovies = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    console.log(response);
};

fetchMovies();