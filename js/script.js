//API BIBLIOTECA:

let arrayBusqueda=["Javier Marías","Dolores Redondo", "Antonio Iturbe","Juan Gómez-Jurado","Javier Castillo"]

let busqueda=false;

let container=document.querySelector(".data__container__books")

//FUNCION QUE RECOGE LOS DATOS DEL FORMULARIO
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

//FUNCION QUE BUSCA EN EL API LOS RESULTADOS DE LA BUSQUEDA DEL FORMULARIO
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


//FUNCION QUE MUESTRA LOS DATOS DE LOS LIBROS DE LA BUSQUEDA
const mostrarInfo=(data)=>{
   
    container.innerHTML="";
    container.className="data__container__books"

   
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
        img.id=book.id
        article.appendChild(img);

        let title=document.createElement("h5");
        title.textContent=book.volumeInfo.title;
        title.classList.add("title__book")
        title.id=book.id
        article.appendChild(title);

        
    container.appendChild(article);
    }
}

//FUNCION QUE BUSCA UN LIBRO POR SU ID
const searchBook=(id)=>{
    fetch("https://www.googleapis.com/books/v1/volumes/"+id)
    .then(response => response.json())
    .then(responseJSON => {
	let data = responseJSON;
    console.log(data)
    mostrarBook(data)
    }); 
}

//FUNCION QUE MUESTRA LOS DATOS DE UN LIBRO
const mostrarBook=(book)=>{
    container.innerHTML="";
    container.className="book__info"

    let article=document.createElement("article");
        article.className="article__book__data";

        let img=document.createElement("img");
        if(book.volumeInfo.imageLinks!=undefined)
            img.setAttribute("src",book.volumeInfo.imageLinks.thumbnail)
        else{
            img.setAttribute("src","../imagenes/sinportada.jpg")
        }
        img.classList.add("fotos_res");
        img.id=book.id
        article.appendChild(img);

        let divInfo=document.createElement("div")

            let title=document.createElement("h5");
            title.textContent="Titulo: "+book.volumeInfo.title;
            title.classList.add("book__info__text")
            divInfo.appendChild(title);

            let title2=document.createElement("h5");
            title2.textContent="Autor: "+book.volumeInfo.authors;
            title2.classList.add("book__info__text")
            divInfo.appendChild(title2);

            let title3=document.createElement("h5");
            title3.textContent="Editorial: "+book.volumeInfo.publisher;
            title3.classList.add("book__info__text")
            divInfo.appendChild(title3);

            let title4=document.createElement("h5");
            title4.innerHTML="Resumen: "+book.volumeInfo.description;
            title4.classList.add("book__info__text")
            divInfo.appendChild(title4);

        article.appendChild(divInfo)
    container.appendChild(article);

}


//EVENTO DE ARRANQUE QUE MUESTRA LIBROS RECOMENDADOS
document.addEventListener("DOMContentLoaded",()=>{
    apiSearchLibrary(arrayBusqueda[Math.floor(Math.random()*arrayBusqueda.length)]);
    formInfo();
})

//EVENTO PARA VER LA INFORMACION DE CADA LIBRO
document.addEventListener("click",(event)=>{
    if(event.target.className=="title__book" || event.target.className=="fotos_res"){
        searchBook(event.target.id)
    }
})

   

    