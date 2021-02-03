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
	console.log(data)
    
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

apiSearchLibrary(arrayBusqueda[Math.floor(Math.random()*arrayBusqueda.length)]);
formInfo();

//API FLORA DE ESPAÑA

const apiSearchNat=()=>{
    fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    // for(pais of data){
    //     console.log(pais.alpha3Code)
    //     apiSearchTrefle(pais.alpha3Code)
    // }
	
    apiSearchTrefle(data[0].alpha3Code)
        
    });  
}

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

//formInfo();
//apiSearchTrefle();
//apiSearchNat();