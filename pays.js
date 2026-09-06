const paysContenairs=document.querySelector(".paysContenairs");
const navigation = document.querySelector(".navigation");
const PaysName=document.getElementById("paysName");
const population=document.getElementById("population");
const ajouter=document.getElementById("ajout");

window.addEventListener("DOMContentLoaded",()=>{
    load();
    updatePays();
})

try {
navigation.addEventListener("mouseover",navAffiche);
navigation.addEventListener("mouseout", navDisp);   

ajouter.addEventListener("click",()=>{
    if(PaysName.value &&  population.value){
    PaysListe.push(new Pays(PaysName.value,population.value));
    save();
    console.log(PaysListe);
    updatePays();
    PaysName.value = "";
    population.value = "";
    }


 })
} catch (error) {
    console.log(error);
}

 async function updatePays(){
    // Prefer the in-memory PaysListe (loaded/saved to localStorage) when available
    let list = (typeof PaysListe !== 'undefined' && PaysListe.length>0) ? PaysListe : null;
    if(!list){
        try{
            let data = await fetch("data.json");
            let res = await data.json();
            list = res.PaysListe || [];
        } catch(e){
            list = [];
        }
    }

    paysContenairs.innerHTML = list.map((e)=>{
    return `
    <div class="element">
            <img src="./image/pins-de-la-carte-des-etats-unis.png" alt="">
            <div class="info">
                <p>${e.paysName}</p>
                <div class="popuInfo">
                    <img src="./image/population.png" alt="">
                    <p>${e.population}</p>
                </div>
            </div>
        </div>
    `
 }).join("");

}




    
