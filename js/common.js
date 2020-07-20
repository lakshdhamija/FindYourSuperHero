const Common = (function(){
    const token = 10213278264309612;
    const apiUrl = `https://www.superheroapi.com/api.php/${token}/`;
    const notifContainer = document.querySelector('.notification');
    const FAVARRAY = 'favs';

    function sendNotif(notif, type){ // funtion to show notifications
        if(type === 'red'){
            notifContainer.classList.remove('green');
            notifContainer.classList.add('red');
        }else if(type === 'green'){
            notifContainer.classList.remove('red');
            notifContainer.classList.add('green');
        }
        notifContainer.style.display = 'block';
        notifContainer.textContent = notif;
        setTimeout(() => { // remove container after 5s
            notifContainer.style.display = 'none';
        }, 1000);
    }
    function getFav(){
        const heros = localStorage.getItem(FAVARRAY);
        if(heros) return JSON.parse(heros);
        else return [];
    }
    function addToFav(hero){
        if(!hero) return;
        const favHeroes = getFav(); // get array from local storage 
        favHeroes.push(hero); // adding curr hero to array

        localStorage.setItem(FAVARRAY, JSON.stringify(favHeroes)); // pushing updated array back to local storage
    }
    function removeFromFav(hero){
        if(!hero) return;
        let favHeroes = getFav();
        favHeroes = favHeroes.filter(item => item.id !== hero);
        localStorage.setItem(FAVARRAY, JSON.stringify(favHeroes));
    }

    async function sendReq(url){ // send req to url
        try{
            const response = await fetch(url);
            const data = await response.json();
            return{
                data, 
                success:true
            };
        }catch(err){
            console.log('error in fetching response: ', err);
            return{
                error: err.message,
                success: false
            };
        }
    }
    return{
        sendReq, apiUrl, sendNotif, getFav, addToFav, removeFromFav
    }
})();