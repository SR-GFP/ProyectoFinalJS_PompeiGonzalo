/*Variables de informacion*/
let stock = [];
let carrito = [];
let contadorCarrito = 0;

/*Variables para Nodos */
let contenedorProductos;
let plantillaProductos;
let cardProducto;
let imagenProducto;
let nombreProducto;
let precioProducto;
let descripcionProducto;
let contadorCarritoElemento;


/*Vincular Variables con nodos del DOM*/
function vincularElementos() {
    contenedorProductos = document.getElementById("contenedorProductos");
    plantillaProductos = document.getElementById("plantillaProductos").content;
    imagenProducto = document.getElementById("imagenProducto");
    nombreProducto = document.getElementById("nombreProducto");
    precioProducto = document.getElementById("precioProducto");
    descripcionProducto = document.getElementById("descripcionProducto");
    contadorCarritoElemento = document.getElementById("contadorCarrito");
}

/*Inicializador de eventos*/
function inicializarEventos() {
    document.addEventListener("DOMContentLoaded", () => cargarProductosApi());
    contenedorProductos.addEventListener("click", evento => { agregarProducto(evento) });

}

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
        console.log(carrito);
    }
}
/*Funcion Incrementa contador */ 
const sumarCantidadAContador = () => {
    contadorCarrito += 1;
    contadorCarritoElemento.textContent = contadorCarrito;
}

function main() {
    vincularElementos();
    inicializarEventos();
}

main()

