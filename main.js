const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=1524e679-c8da-496b-ad90-2bd4cad93b33'; 

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=1524e679-c8da-496b-ad90-2bd4cad93b33'; 

const spanError = document.getElementById('error');
// consumir Api rest con fetch
// fetch(URL)
// .then(res => res.json())
// .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
// });

async function loadRandomCats() {
    const res = await fetch(API_URL);
    //con el siguiente codigo se parsea se pasa a json
    const data = await res.json();
    // const img = document.querySelector('img');
    // img.src = data[0].url;

    if (res.status !== 200){
        spanError.innerHTML = `Error ${res.status} in Catland. ${data.message}.`;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavouriteCat(data[0].id);
        btn2.onclick = () => saveFavouriteCat(data[1].id);
        btn3.onclick = () => saveFavouriteCat(data[2].id);
    }
    

    // codigo mas corto
    // const images = document.getElementsByTagName("img"); 

    // const arrImages = [...images];
    // arrImages.forEach((image, item) => {
    //     image.src = data[item].url;
    // });

}

async function loadFavoritesCats() {
    const res = await fetch(API_URL_FAVORITES); 
    const data = await res.json();
    
    if (res.status !== 200){
        spanError.innerHTML = `Error ${res.status} in Catland`;
    } else {
        data.forEach(e => {
            const section = document.getElementById('favouriteCats')
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar Cat');


            
            img.src = e.image.url;
            img.width = 250;
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    }

}

async function saveFavouriteCat(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({image_id: id}),
    });
    const data = await res.json();
    if (res.status !== 200){
        spanError.innerHTML = `Error ${res.status} in Catland`;
    } 
}    

loadRandomCats();
loadFavoritesCats();