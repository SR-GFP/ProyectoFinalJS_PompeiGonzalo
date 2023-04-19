/*Variables de informacion*/
let stock = [];
let carrito = [];

/*Variables para Nodos */
let contenedorProductos;
let plantillaProductos;
let cardProducto;
let imagenProducto;
let nombreProducto;
let precioProducto;
let descripcionProducto;


/*Vincular Variables con nodos del DOM*/
function vincularElementos() {
    contenedorProductos = document.getElementById("contenedorProductos");
    plantillaProductos = document.getElementById("plantillaProductos").content;
    imagenProducto = document.getElementById("imagenProducto");
    nombreProducto = document.getElementById("nombreProducto");
    precioProducto = document.getElementById("precioProducto");
    descripcionProducto = document.getElementById("descripcionProducto");    
}

/*Inicializador de eventos*/
function inicializarEventos(){
    document.addEventListener("DOMContentLoaded", ()=> cargarProductosApi());
    contenedorProductos.addEventListener("click", evento =>{agregarProducto(evento)});
}

/*Obtener los datos de los productos desde API*/
function cargarProductosApi() {
    fetch("https://643e078b6c30feced81e5b74.mockapi.io/productos")
        .then((response) => response.json())
        .then((jsonresponse) => {
            stock = jsonresponse;            
            pintarProductos(stock);
        })
}

/*Funcion para recorrer array y renderizar los productos- se utiliza un TEMPLATE HTML con Fragment para que el tiempo de carga sea menor*/
function pintarProductos(array) {
    const fragment = document.createDocumentFragment();    

        array.forEach((producto) => {
            const copiaPlantilla = plantillaProductos.cloneNode(true);
            const { imagen, id, nombre, precio, descripcion } = producto; //desestructuracion//
            copiaPlantilla.querySelector("#imagenProducto").setAttribute("src", imagen);
            copiaPlantilla.querySelector("#ID").textContent = id;
            copiaPlantilla.querySelector("#nombreProducto").textContent = nombre;
            copiaPlantilla.querySelector("#precioProducto").textContent = precio;
            copiaPlantilla.querySelector("#descripcionProducto").textContent = descripcion;
            copiaPlantilla.querySelector(".botonComprar").setAttribute("data-id",id);
            
            fragment.appendChild(copiaPlantilla);            
        });
        contenedorProductos.appendChild(fragment);
}

const agregarProducto = evento =>{
    if(evento.target.classList.contains("botonComprar")){
        const idProducto = evento.target.getAttribute("data-id");
        const producto = stock.find((prod) => prod.id === idProducto);
        const productoCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen
        };
        carrito.push(productoCarrito);
        console.log(carrito);
    }
}

function main() {
    vincularElementos()   
    cargarProductosApi()
    inicializarEventos()
}

main()
