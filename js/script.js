//API BIBLIOTECA:

let arrayBusqueda=["Javier Marías","Dolores Redondo", "Antonio Iturbe","Juan Gómez-Jurado","Javier Castillo"]

let busqueda=false;

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
    
    if(busqueda){
        document.querySelector(".book_info_title").textContent=" Datos obtenidos de la busqueda" 
    }
        if(data.totalItems!=0){
         mostrarInfo(data.items);
		}else{
           alert("No se ha encontrado")
        }
    });  
}


const mostrarInfo=(data)=>{
    let container=document.querySelector(".data__container__books")
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




//API FLORA DE ESPAÑA

const apiSearchNat=()=>{
    fetch("https://restcountries.eu/rest/v2/region/europe")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
     
        insertNat(data)
     
        
    });  
}

const insertNat=(paises)=>{
    for(pais of paises){
        let container=document.querySelector(".paises__container")
        let li=document.createElement("li")
        li.innerHTML="Vegetacion de "+pais.name
        li.setAttribute("id",pais.alpha3Code);
        li.className="paises__list"
        container.appendChild(li)
        
    }
}

document.addEventListener("click",(event)=>{
        if(event.target.className=="paises__list"){
            apiSearchTrefle(event.target.id)
        }
})

const tokenTrefle="nfhfGDGVD_eItALYUl7NrAfot5ARYlBE2MfY0V_vad8"
const publicCors="https://cors-anywhere.herokuapp.com/"

const apiSearchTrefle=(nat)=>{
    fetch(publicCors+"https://trefle.io/api/v1/distributions/"+nat+"/plants/?token="+tokenTrefle)
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
    //apiSearchTrefle("spa");
    apiSearchNat();
}