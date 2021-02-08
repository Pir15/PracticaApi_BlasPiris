//API F1

let container=document.querySelector(".content")

//FUNCION QUE BUSCA EN EL API LOS EQUIPOS

const apiF1Equipos=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Formula%201")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    mostrarEquipos(data.teams)   
    });  
}

//FUNCION QUE MUESTRA POR PANTALLA LOS EQUIPOS
const mostrarEquipos=(equipos)=>{
    container.innerHTML="";
    container.className="content"
    for(equipo of equipos){
       

        let article=document.createElement("article");
        article.className="article__f1";

        let title=document.createElement("h3");
        title.textContent=equipo.strTeam;
        title.classList.add("article__f1__title")
        article.appendChild(title);

        let img=document.createElement("img");
        img.setAttribute("src",equipo.strTeamLogo)
        img.className="fotos__res"
        article.appendChild(img);

        let year=document.createElement("h5");
        year.textContent="Año de fundación: "+equipo.intFormedYear;
        year.classList.add("article__f1__info")
        article.appendChild(year);

        let country=document.createElement("h5");
        country.textContent="Pais: "+equipo.strCountry;
        country.classList.add("article__f1__info")
        article.appendChild(country);

        console.log(equipo)

        

    container.appendChild(article);
    }
}

//FUNCION QUE BUSCA LOS PILOTOS EN EL API
const apiF1Search=()=>{
        fetch("http://ergast.com/api/f1/2020/drivers.json")
        .then(response => response.json())
        .then(responseJSON => {
        let data = responseJSON;
        apiF1Pilotos(data.MRData.DriverTable.Drivers)  
        });  
    }

//FUNCION QUE BUSCA EN EL API LOS DATOS DE LOS PILOTOS DE LA API PRINCIPAL
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

//FUNCION QUE MUESTRA LOS DATOS DE LOS PILOTOS
const mostrarPilotos=(piloto)=>{
    
      let article=document.createElement("article");
        article.className="article__f1";

        let title=document.createElement("h3");
        title.textContent=piloto.strPlayer;
        title.classList.add("article__f1__title")
        article.appendChild(title);

         let img=document.createElement("img");
         img.setAttribute("src",piloto.strThumb)
         img.className="fotos__res"
        article.appendChild(img);

        let date=document.createElement("h5");
        date.textContent="Nacionalidad: "+piloto.strNationality;
        date.classList.add("article__f1__info")
        article.appendChild(date);

        let team=document.createElement("h5");
        team.textContent="Equipo: "+piloto.strTeam;
        team.classList.add("article__f1__info")
        article.appendChild(team);

        
        

     container.appendChild(article);
    
}

//EVENTOS 
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