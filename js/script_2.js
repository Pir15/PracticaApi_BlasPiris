//API F1

let container=document.querySelector(".content")

const apiF1Equipos=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Formula%201")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    mostrarEquipos(data.teams)   
    });  
}

const mostrarEquipos=(equipos)=>{
    container.innerHTML="";
    container.className="content"
    for(equipo of equipos){
       

        let article=document.createElement("article");
        article.className="article__teams";

        let img=document.createElement("img");
        img.setAttribute("src",equipo.strTeamLogo)
        img.className="fotos__res"
        article.appendChild(img);

        let title=document.createElement("h5");
        title.textContent=equipo.strTeam;
        article.appendChild(title);

    container.appendChild(article);
    }
}

const apiF1Search=()=>{
        fetch("http://ergast.com/api/f1/2020/drivers.json")
        .then(response => response.json())
        .then(responseJSON => {
        let data = responseJSON;
        apiF1Pilotos(data.MRData.DriverTable.Drivers)  
        });  
    }



const apiF1Pilotos=(drivers)=>{
    container.className="content";
    container.innerHTML="";
    for(piloto of drivers){
        fetch("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p="+piloto.givenName+" "+piloto.familyName)
        .then(response => response.json())
        .then(responseJSON => {
        let data = responseJSON;
        mostrarPilotos(data.player[0])
        });  
    }
}

const mostrarPilotos=(piloto)=>{
    
      let article=document.createElement("article");
        article.className="article__teams";

         let img=document.createElement("img");
         img.setAttribute("src",piloto.strThumb)
         img.className="fotos__res"
        article.appendChild(img);

         let title=document.createElement("h5");
         title.textContent=piloto.strPlayer;
         article.appendChild(title);

     container.appendChild(article);
    
}

document.addEventListener("DOMContentLoaded",()=>{
    apiF1Equipos();
    document.addEventListener("click",(event)=>{
        if(event.target.id=="teams"){
            apiF1Equipos();
        }
        if(event.target.id=="drivers"){
            apiF1Search();
        }
    })
});