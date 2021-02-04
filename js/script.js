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




//API FLORA DE ESPAÑA

const tokenTrefle="nfhfGDGVD_eItALYUl7NrAfot5ARYlBE2MfY0V_vad8"
const publicCors="https://cors-anywhere.herokuapp.com/"
let containerPlant=document.querySelector(".content__2")

const apiSearchTrefle=()=>{
    fetch(publicCors+"https://trefle.io/api/v1/distributions/spa/plants/?token="+tokenTrefle)
    .then(response => response.json())
    .then(responseJSON => {
    let data = responseJSON;
    console.log(data.data)
    mostrarGaleria(data.data)
    
        
    });  
}

const mostrarGaleria=(datos)=>{

    for(dato of datos){
        let article=document.createElement("article");
        article.className="article__plant";

        let img=document.createElement("img");
        img.setAttribute("src",dato.image_url)
        img.className="fotos"
        article.appendChild(img);

        let title=document.createElement("h5");
        title.textContent=dato.scientific_name;
        article.appendChild(title);
    containerPlant.appendChild(article);

    }

}


let page=document.querySelector(".ref")
if(page.id=="index1"){
    apiSearchLibrary(arrayBusqueda[Math.floor(Math.random()*arrayBusqueda.length)]);
    formInfo();
}else{
    apiSearchTrefle();
}