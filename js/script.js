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
        if(book.volumeInfo.imageLinks!=undefined)
            img.setAttribute("src",book.volumeInfo.imageLinks.thumbnail)
        else{
            img.setAttribute("src","../imagenes/sinportada.jpg")
        }
        img.classList.add("fotos_res");
        article.appendChild(img);

        let title=document.createElement("h5");
        title.textContent=book.volumeInfo.title;
        title.classList.add("title__book")
        article.appendChild(title);

        
    container.appendChild(article);
    }


   
}



document.addEventListener("DOMContentLoaded",()=>{
    apiSearchLibrary(arrayBusqueda[Math.floor(Math.random()*arrayBusqueda.length)]);
    formInfo();
})

   

    