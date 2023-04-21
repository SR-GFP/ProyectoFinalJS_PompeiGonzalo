/*Variables de informacion*/
let stock = [];
let carrito = [];
let contadorCarrito = 0;
let datosDesdeLocalStorage;

/*Variables para Nodos */
let contenedorProductos;
let plantillaProductos;
let cardProducto;
let imagenProducto;
let nombreProducto;
let precioProducto;
let descripcionProducto;
let contadorCarritoElemento;
let btnCarritoDeCompras;
let modal;


/*Vincular Variables con nodos del DOM*/
function vincularElementos() {
    contenedorProductos = document.getElementById("contenedorProductos");
    plantillaProductos = document.getElementById("plantillaProductos").content;
    imagenProducto = document.getElementById("imagenProducto");
    nombreProducto = document.getElementById("nombreProducto");
    precioProducto = document.getElementById("precioProducto");
    descripcionProducto = document.getElementById("descripcionProducto");
    contadorCarritoElemento = document.getElementById("contadorCarrito");
    btnCarritoDeCompras = document.getElementById("btnCarritoDeCompras");
}

/*Inicializador de eventos*/
function inicializarEventos() {
    document.addEventListener("DOMContentLoaded", () => cargarProductosApi());

    document.addEventListener("DOMContentLoaded", () => {obtenerDatosLocalStorage("carrito")});
    contenedorProductos.addEventListener("click", evento => { agregarProducto(evento)});
    btnCarritoDeCompras.addEventListener("click", () => {mostrarCarrito()});
};

/*Clase constructora de objetos para agregar Productos al carrito */
class ProductoCarrito {
    constructor(id, nombre, precio, imagen,) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

/*Obtener los datos de los productos desde API MOCKAPI*/
function cargarProductosApi() {
    fetch("https://643e078b6c30feced81e5b74.mockapi.io/productos")
        .then((response) => response.json())
        .then((jsonresponse) => {
            stock = jsonresponse;
            pintarProductos(stock);
        })
}

/*Funcion para recorrer array y renderizar los productos- se utiliza un TEMPLATE HTML con Fragment
para que el tiempo de carga sea menor y se desestrutura el objeto*/
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
        copiaPlantilla.querySelector(".botonComprar").setAttribute("data-id", id);

        fragment.appendChild(copiaPlantilla);
    });
    contenedorProductos.appendChild(fragment);
}

/*Funcion para cargar objeto al array Carrito al dar en boton comprar*/
const agregarProducto = evento => {
    if (evento.target.classList.contains("botonComprar")) {
        const idProducto = evento.target.getAttribute("data-id");
        const producto = stock.find((prod) => prod.id === idProducto);
        const productoCarrito = new ProductoCarrito(producto.id, producto.nombre, producto.precio, producto.imagen);
        const productoExiste = carrito.find((prod) => prod.id === idProducto);
        if (productoExiste) {
            productoExiste.cantidad++;
        } else {
            carrito.push(productoCarrito);
        }
        sumarCantidadAContador();
        guardarLocalStorage("carrito", carrito)
        console.log(carrito);
    }
}
/*Funcion Incrementa contador */
const sumarCantidadAContador = () => {
    contadorCarrito += 1;
    contadorCarritoElemento.textContent = contadorCarrito;
}

/* Funcion para guardar en localStorge*/
const guardarLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
}
/* Funcion para obtener datos almacenados en localStorge*/
const obtenerDatosLocalStorage = (clave) => {
    let datosJSON = localStorage.getItem(clave);
    datosDesdeLocalStorage = JSON.parse(datosJSON);
    if (datosDesdeLocalStorage) {
        carrito = datosDesdeLocalStorage;
        contadorCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        contadorCarritoElemento.textContent = contadorCarrito;
    }
    console.log(carrito);
}


/*Funciones mostrar modal de carrito de compras */
function mostrarCarrito(){
    const modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));
    modalCarrito.show();
}



function main() {
    vincularElementos();
    inicializarEventos();
}

main()

