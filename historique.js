navigation.addEventListener("mouseover",navAffiche);
navigation.addEventListener("mouseout", navDisp);
const userContenair=document.querySelector(".userContenair");
const navp=document.querySelectorAll(".navInfo");
var Simulations=[];

 async function load(){
    // Try to load from localStorage first for persistence
    try{
        const stored = localStorage.getItem('SIR');
        console.log(stored);
        if(stored){
            let  storage = JSON.parse(stored);
            PaysListe = storage.PaysListe || [];
            Simulations = storage.Simulations || [];
            utilisateurs = storage.utilisateurs || [];
        }
        else if (stored== null){
                // Fallback to data.json
    try{
        var pays=await fetch("data.json");
        var  res = await pays.json();
        var SIR = JSON.parse(res);
        console.log(SIR);
        PaysListe = SIR.PaysListe || [];
        Simulations = SIR.Simulations || [];
        utilisateurs = SIR.utilisateurs || [];
    } catch(e){
        console.log('Erreur fetch data.json:', e);
    }
}
    } catch(e){
        console.log('Erreur lecture localStorage:', e);
    }


}


 function navAffiche(){
    navp.forEach((e)=>{
        e.style.fontSize="small";
    })
 }
 function navDisp(){
        navp.forEach((e)=>{
        e.style.fontSize="0";
    })
 }
 
load()
function AfficherSimulations(){
        userContenair.innerHTML=Simulations.map(e=>{
        return `
            <div class="users">
                    <img src="./image/methode.png" alt="">
                <div class="userInfo">
                    <h2>${e.simulationName}</h2>
                    <p>${e.paysName}</p>
                 </div>
                <button class="play" onclick="changePage()">
                    <img src="./image/cercle-de-jeu.png" alt="">
                    <p>lancer</p>
                 </button>
            </div>

        `
    })

}

 function changePage(){
    window.open("index.html");
 }
 AfficherSimulations()