//API F1

let container2=document.querySelector(".content__2")

const apiF1Equipos=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Formula%201")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    mostrarEquipos(data.teams)   
    });  
}

const mostrarEquipos=(equipos)=>{
    container2.innerHTML="";
    container2.className="content__2"
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

    container2.appendChild(article);
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
    container2.className="content__2";
    container2.innerHTML="";
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

     container2.appendChild(article);
    
}

const apiF1Temporada=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4370&s=2021")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    console.log(data.events)  
    mostrarTemporada(data.events)    
    });  
}

const mostrarTemporada=(temporada)=>{
    container2.innerHTML="";
    container2.className="content__2__calendar";
        
        let title4=document.createElement("a");
        title4.className="calendar__text__title"
        title4.textContent="Nº";
        container2.appendChild(title4);

        let title=document.createElement("a");
        title.className="calendar__text__title"
        title.textContent="GRAN PREMIO";
        container2.appendChild(title);

        let title2=document.createElement("a");
        title2.className="calendar__text__title"
        title2.textContent="FECHA"
        container2.appendChild(title2);
        
        let title3=document.createElement("a");
        title3.className="calendar__text__title"
        title3.textContent="CIRCUITO";
        container2.appendChild(title3);
    
    for(gp of temporada){
        let title4=document.createElement("a");
        title4.className="calendar__text"
        title4.textContent=gp.intRound;
        container2.appendChild(title4);

        let title=document.createElement("a");
        title.className="calendar__text"
        title.textContent=gp.strEvent;
        container2.appendChild(title);

        let title2=document.createElement("a");
        title2.className="calendar__text"
        title2.textContent=gp.dateEvent;
        container2.appendChild(title2);
        
        let title3=document.createElement("a");
        title3.className="calendar__text"
        title3.textContent=gp.strVenue;
        container2.appendChild(title3);

    }
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
        if(event.target.id=="calendar"){
            apiF1Temporada();
        }
    })
});