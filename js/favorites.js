const Favorites = (function () {
    const outputList = document.getElementsByClassName('output-list')[0];
    function showFavs() {
        const favs = Common.getFav();
        outputList.innerHTML = '';
        if (!favs || favs.length === 0)
            outputList.innerHTML = '<li class="no-favorites"> No Favorites!! </li>';
        else {
            favs.forEach((item) => {
                const li = document.createElement('li');
                li.classList.add('item');
                li.innerHTML = ` <div class="left"><img src=${item.image.url} alt="superhero Image"></div>
            <div class="right">
                <a href="details.html?id=${item.id}"><div class="name">${item.name}</div></a>
                <div class="real-name">${item.biography['full-name']}</div>
                <div class="address">${item.biography['place-of-birth']}</div>
                <div class="buttons"> 
                    <button class="btn remove-from-favorites" data-id=${item.id}>Remove from favorites</button>
                </div>
            </div>`
                outputList.appendChild(li);
            });
        }
    }

    function handleClick(event){
        const target = event.target;
        if(target.classList.contains('remove-from-favorites')){
            const liID = target.dataset.id;
            Common.removeFromFav(liID);
            showFavs();
            Common.sendNotif('Removed from Favorites!', 'red');
        }
    }
    function start(){
        showFavs();
        document.addEventListener('click', handleClick);
    }
    return{
        start
    };
})();