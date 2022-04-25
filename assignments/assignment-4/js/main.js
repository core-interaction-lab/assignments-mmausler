const albumContainer = document.getElementById('album-container');

const fetchContent = (fetchUrl) => {
    return fetch(fetchUrl).then(data => data.json());
};

const htmlDecode = (input) => {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.innerText;
}

const buildStories = stories => {
    stories.forEach(item => {
        console.log(item);
        const container = document.createElement('article');
        const titleEl = document.createElement('h2');
        const bodyEl = document.createElement('div');

        titleEl.innerHTML = item.data.title;
        bodyEl.innerHTML = htmlDecode(item.data.selftext_html);

        container.append(titleEl, bodyEl);
        albumContainer.append(container);
    });
};

const buildEpisodes = episodes => {
    episodes.forEach(item => {
        console.log(item);
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', item.image.medium);
        albumContainer.append(imgEl);
    });
};

const buildAlbums = albums => {
    albums.forEach(item => {
        console.log(item);
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', item.images[0].url);
        albumContainer.append(imgEl);
    });
};

const url1 = 'https://interactionlab.space/data/assignment-4-1.json';
const url2 = 'https://interactionlab.space/data/assignment-4-2.json';
const url3 = 'https://interactionlab.space/data/assignment-4-3.json';

const main = async () => {
    const response1 = await fetchContent(url1);
    const response2 = await fetchContent(url2);
    const response3 = await fetchContent(url3);
    // console.log(response);
    buildAlbums(response1.items);
    buildEpisodes(response2);
    buildStories(response3.data.children);
};

main();