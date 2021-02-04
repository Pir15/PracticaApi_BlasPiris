//API BIBLIOTECA:

let arrayBusqueda=["Javier Marías","Dolores Redondo", "Antonio Iturbe","Juan Gómez-Jurado","Javier Castillo"]

let busqueda=false;

let container=document.querySelector(".data__container__books")

const formInfo=()=>{
    let button=document.querySelector("#button");

    button.addEventListener("click", ()=>{
        let search=document.querySelector("#search");
        if(search.value!=""){
          apiSearchLibrary(search.value) 
         busqueda=true;        
        }
    })  
}


const apiSearchLibrary=(search)=>{
    fetch("https://www.googleapis.com/books/v1/volumes?q="+search)
    .then(response => response.json())
    .then(responseJSON => {
	let data = responseJSON;
	//console.log(data)
    
   
        if(data.totalItems!=0){
         mostrarInfo(data.items);
            if(busqueda){
                document.querySelector(".book_info_title").textContent=" Datos obtenidos de la busqueda" 
            }
		}else{
            
                document.querySelector(".book_info_title").textContent=" No se han encontrado resultados" 
        }
    });  
}


const mostrarInfo=(data)=>{
   
    container.innerHTML="";

   
    for(book of data) {
        let article=document.createElement("article");
        article.className="article__book";

        let img=document.createElement("img");
        img.setAttribute("src",book.volumeInfo.imageLinks.thumbnail)
        img.className="fotos"
        article.appendChild(img);

        let title=document.createElement("h5");
        title.textContent=book.volumeInfo.title;
        article.appendChild(title);

        
    container.appendChild(article);
    }


   
}




//API F1



const apiF1Equipos=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Formula%201")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    console.log(data)

        
    });  
}

let driverArray=["Lewis Hamilton","Valtteri Bottas","Max Verstappen","Sergio Perez",
"Daniel Ricciardo","Lando Norris","Sebastian Vettel","Lance Stroll","Fernando Alonso",
"Esteban Ocon","Charles Leclerc","Carlos Sainz","Pierre Gasly","Yuki Tsunoda","Kimi Raikkonen",
"Antonio Giovinazzi","Nikita Mazepin","Mick Schumacher","Nicholas Latifi","George Russell"]

const apiF1Pilotos=()=>{
    for(piloto of driverArray){
        fetch("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p="+piloto)
        .then(response => response.json())
        .then(responseJSON => {
        let data = responseJSON;
        console.log(data)  
        });  
    }
}

const apiF1Temporada=()=>{
    fetch("https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4370&s=2021")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    console.log(data)      
    });  
}








let page=document.querySelector(".ref")
if(page.id=="index1"){
    apiSearchLibrary(arrayBusqueda[Math.floor(Math.random()*arrayBusqueda.length)]);
    formInfo();
}else{
    //apiF1Equipos();
    //apiF1Temporada();
    apiF1Pilotos();
}