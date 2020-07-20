const Details = (function(){
    const detailsContainer = document.querySelector('.hero-details');
    async function showDetails(id){
        if(!id){
            detailsContainer.innerHTML = 'No data of superhero';
            return;
        }
        const data = await Common.sendReq(`${Common.apiUrl}/${id}`);
        console.log(data);
        detailsContainer.innerHTML = `<img src=${data.data.image.url} alt="superhero image" />
        <h1>${data.data.name}</h1>
        <h2>${data.data.biography['full-name']}</h2>
        <div class="stats">
            <h3>STATS</h3>
            <p><span> Power: </span> ${data.data.powerstats.power}</p>
            <p><span> Strength: </span> ${data.data.powerstats.strength}</p>
            <p><span> Combat: </span> ${data.data.powerstats.combat}</p>
            <p><span> Speed: </span> ${data.data.powerstats.speed}</p>
            <p><span> Durability: </span> ${data.data.powerstats.durability}</p>
            <p><span> Intelligence: </span> ${data.data.powerstats.intelligence}</p>
        </div>`;
    }
    async function getData(id){
        const url = Common.apiUrl;
        try{
            const data = await Common.sendReq(`${url}/${id}`);
            if(data.success) showDetails(data.data);
            else showDetails(null);
        }catch(err){
            console.log('Error in fetching details', err);
            showDetails(null);
        }
    }
    function passParamId(param){
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }
    function start(){
        const id = passParamId('id');
        showDetails(id);
    }
    return{
        start
    };
})();