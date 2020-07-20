const Index = (function(){
    const search = document.getElementById('search');
    const outputList = document.getElementsByClassName('output-list')[0];
    let output = [];
    const MINLIMIT = 2;

    function dispOutput(){
        if(!output || output.length === 0){
            outputList.innerHTML= '<li class="no-results"> No results found </li>';
            return;
        }
        const favHeroes = Common.getFav();
        outputList.innerHTML = '';
        output.forEach((item) => { // adding result to list
            const li = document.createElement('li');
            const searchAndFav = favHeroes.findIndex(hero => hero.id === item.id);
            li.classList.add('item');
            li.innerHTML = ` <div class="left"><img src=${item.image.url} alt="superhero Image"></div>
            <div class="right">
                <a href="details.html?id=${item.id}"><div class="name">${item.name}</div></a>
                <div class="real-name">${item.biography['full-name']}</div>
                <div class="address">${item.biography['place-of-birth']}</div>
                <div class="buttons"> 
                    <button class="btn add-to-favorites" data-id=${item.id} style="display: ${searchAndFav === -1 ? 'block' : 'none'}">Add to favorites</button>
                    <button class="btn remove-from-favorites" data-id=${item.id} style="display: ${searchAndFav === -1 ? 'none' : 'block'}">Remove from favorites</button>
                </div>
            </div>`
            outputList.appendChild(li);
        });
    }
    function removeResults(){ // function to remove the results
        outputList.innerHTML = '';
        output = [];
    }

    async function searchResults(event){
        const searchVal = event.target.value;
        const url = Common.apiUrl;
        if(MINLIMIT >= searchVal.length){
            removeResults();
            return;
        }
        removeResults();
        try{
            const data = await Common.sendReq(`${url}/search/${searchVal}`);
            if(data.success){
                output = data.data.results;
                dispOutput();
            }
        }catch(err){
                console.log('Error in getting search results: ', err);
        }
    }

    function handleClick(event){
        const target = event.target;
        if(target.classList.contains('add-to-favorites')){
            const liID = target.dataset.id;
            const item = output.filter(item => liID === item.id);
            Common.addToFav(item[0]);
            dispOutput();
            Common.sendNotif('Added to Favorites!', 'green');
        }else if(target.classList.contains('remove-from-favorites')){
            const liID = target.dataset.id;
            const favBtn = document.querySelector(`button[data-id="${liID}"].add-to-favorites`);
            if(favBtn) favBtn.style.display = 'block';
            const removeBtn = document.querySelector(`button[data-id="${liID}"].remove-from-favorites`);
            if(removeBtn) removeBtn.style.display = 'none';
            Common.removeFromFav(liID);
            Common.sendNotif('Removed from Favorites!', 'red');
        }
    }
    function start(){
        search.addEventListener('keyup', searchResults);
        document.addEventListener('click', handleClick); 
    }
    return{
        start
    };
})();