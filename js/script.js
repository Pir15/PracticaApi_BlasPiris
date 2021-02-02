//API BIBLIOTECA:

const formInfo=()=>{
    let button=document.querySelector("#button");

    search.addEventListener("click", ()=>{
        let search=document.querySelector("#search");
        if(search.value!=""){
          apiSearch(search.value)           
        }
    })  
}



const apiSearchLibrary=(search)=>{
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
//apiSearch();

//API FLORA DE ESPAÑA

const tokenTrefle="nfhfGDGVD_eItALYUl7NrAfot5ARYlBE2MfY0V_vad8"
const publicCors="https://cors-anywhere.herokuapp.com/"
const apiSearchTrefle=()=>{
    fetch(publicCors+"https://trefle.io/api/v1/distributions/spa/plants/?token="+tokenTrefle)
    .then(response => response.json())
    .then(responseJSON => {
	let data = responseJSON;
	console.log(data)
    
        
    });  
}

apiSearchTrefle();