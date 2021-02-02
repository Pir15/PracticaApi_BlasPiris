//API BIBLIOTECA:

const formInfo=()=>{
    let search=document.querySelector("#search");

    search.addEventListener("click", ()=>{
        let name=document.querySelector("#name");
        if(name.value!=""){
          apiSearch(name.value)           
        }
    })  
}



const apiSearch=(search)=>{
    fetch("https://www.googleapis.com/books/v1/volumes?q="+search)
    .then(response => response.json())
    .then(responseJSON => {
	let data = responseJSON;
	console.log(data)
    
        if(data.totalItems!=0){
         //mostrarInfo(data);
		}else{
           alert("No se ha encontrado")
        }
    });  
}


const mostrarInfo=(data)=>{
    contenedor.innerHTML="";

    for(foto of data.results) {
        console.log(foto.preview_photos[0].urls)
        let img=document.createElement("img");
        img.setAttribute("src",foto.preview_photos[0].urls.small)
        img.className="fotos"
        contenedor.appendChild(img);
    }

   
}

// formInfo();
// let contenedor=document.querySelector("#contenedor")
apiSearch();