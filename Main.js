var PaysListe=[];
var Simulations=[];
var utilisateurs;
var test;





 async function load(){
    // Try to load from localStorage first for persistence
    try{
        const stored = localStorage.getItem('SIR');
        if(stored){
            const SIR = JSON.parse(stored);
            PaysListe = SIR.PaysListe || [];
            Simulations = SIR.Simulations || [];
            utilisateurs = SIR.utilisateurs || [];
            return;
        }
        else{
                // Fallback to data.json
    try{
        var pays=await fetch("data.json");
        var  res = await pays.json();
        var SIR = res;
        console.log(SIR);
        if(SIR){
            PaysListe = SIR.PaysListe || [];
            Simulations = SIR.Simulations || [];
            utilisateurs = SIR.utilisateurs || [];
            return
        }
    } catch(e){
        console.log('Erreur fetch data.json:', e);
    }
        }
    } catch(e){
        console.log('Erreur lecture localStorage:', e);
    }


}

function save(){
    localStorage.setItem("SIR",JSON.stringify(
        {
            PaysListe:PaysListe,
            Simulations:Simulations,
        }
    ));
}

function initializeDOM(){
    const navigation =document.querySelector(".navigation");
    const navp=document.querySelectorAll(".navInfo");
    const simulationNameId=document.getElementById('simulationName');
    const paysId=document.getElementById("paysSelect");
    const popuId=document.getElementById("popu");
    const gammaId=document.getElementById('gamma');
    const betaId=document.getElementById('beta');
    const infecteId=document.getElementById('infecte');
    const dureeId=document.getElementById('duree');
    const lancer=document.querySelector(".lancerSimu");
    const sauvegarde=document.getElementById("sauvegarde");

    try {
       
        paysId.addEventListener("change",(event)=>{
        PaysListe.forEach((e)=>{
            if(e.paysName==event.target.value){
                popuId.value=e.population;
            }
        })
     })
     
     paysId.innerHTML=PaysListe.map((e)=>{
        return `
         <option value="${e.paysName}">${e.paysName}</option>
        `;
    }).join("");

    if (PaysListe.length > 0) {
        paysId.value = PaysListe[0].paysName;
        popuId.value = PaysListe[0].population;
    }
    } catch (error) {
        console.log("Erreur index.html:", error);
    }

    try {
        lancer.addEventListener("click", AfficherGraphe);
    } catch (error) {
        console.log(error);
    }

    if(navigation){
        navigation.addEventListener("mouseover",navAffiche);
        navigation.addEventListener("mouseout", navDisp);
    }

    // Initialiser la simulation par défaut
    const temporSIR=JSON.parse(localStorage.getItem("temporSIR"));
    test = temporSIR!=null?Euler(new Simulation("seann",new Pays("madagascar",temporSIR.simu.popu ),"test"),new Parametre("test",temporSIR.simu.guerison,temporSIR.simu.transmission,temporSIR.simu.duree)):Euler(new Simulation("seann",new Pays("madagascar",5000000),"test"),new Parametre("test",0.8,0.1,300));
    if(typeof afficherSimulation === 'function'){
        afficherSimulation(test);
    }

         sauvegarde.addEventListener("click",()=>saveSimulation("test",paysId.value,simulationNameId.value,{guerison:gammaId.value,transmission:betaId.value,duree:dureeId.value,popu:popuId.value}))
}



function Suspect(S,I,B,N){
    return -1*B*S*I/N;
}
function Infecte(S,I,B,G,N){
    return B*S*I/N-G*I;
}
function Retabli(G,I){
    return G*I;
}

function Euler(S=new Simulation(userName,pays=new Pays(PaysName,population),simulationName),P=new Parametre(simulationName,Beta,gamma ,duree)){
console.log("hello world");
console.log(Simulations);

var s=S.paysName.population-1;
var N=S.paysName.population;
var i=1;
var r=0;
let Sus=[];
let I=[];
let R=[];
let J=[];


for (let j=1;j<=(P.duree-1)/1;j++){
    s=s+Suspect(s,i,P.beta,N);
    i=i+Infecte(s,i,P.beta,P.gamma,N);
    r=r+Retabli(P.gamma,i);
    Sus.push(s);
    I.push(i);
    R.push(r);
    J.push(j);
}
return {suspect:Sus,Infecte:I,Retabli:R,duree:J};
}

function AfficherGraphe(){
    const simulationNameId=document.getElementById('simulationName');
    const paysId=document.getElementById("paysSelect");
    const popuId=document.getElementById("popu");
    const gammaId=document.getElementById('gamma');
    const betaId=document.getElementById('beta');
    const infecteId=document.getElementById('infecte');
    const dureeId=document.getElementById('duree');
    
    test = Euler(new Simulation(infecteId.value,new Pays(paysId.value,popuId.value),simulationNameId.value),new Parametre(simulationNameId.value,gammaId.value,betaId.value,dureeId.value));
    console.log(test);
    afficherSimulation(test);
    save();
}

 function navAffiche(){
    const navp=document.querySelectorAll(".navInfo");
    navp.forEach((e)=>{
        e.style.fontSize="small";
    })
 }
 function navDisp(){
    const navp=document.querySelectorAll(".navInfo");
        navp.forEach((e)=>{
        e.style.fontSize="0";
    })
 }

 function saveSimulation(userName,paysName,simulationName,parametre){
    if(userName && paysName && simulationName && parametre){
        Simulations.push(new Simulation(userName,paysName,simulationName,parametre));
    }
    else{
        alert("completer tout les champs")
    }
    save()
    

 }
 
async function initializeApp(){
    await load();
    initializeDOM();
}

initializeApp();













