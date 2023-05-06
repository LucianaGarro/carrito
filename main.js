//** Mi supermercado Online */

//¿Qué funcionalidades debería tener un carrito de compras?
// 1)Necesitamos mostrar productos en el html de forma dinámica. No voy a desarrollar las card en el html, sino que lo voy a mostrar con js modificando el dom
/// 2)Debe agregar productos al carrito, tomando el eventos cuando el usuario hace click en un boton e introducir esto en un array
//3)Evitar la carga de productos repetidos, para esto modificamos la CANTIDAD
//4)Mostrar el carrito en el html de forma dinámica, me tiene que mostrar que fue seleccionando el usuario
//5)Debe poder eliminar productos del carrito (estaban muy caros!!)
//6) calcular el total de la compra: el usuario quiere saber cuanto va a pagar
//7)vaciar el carrito y que se limpie por completo
//8) localStorage: guardar el carrito, si se me cierra la ventana del navegador puedo recuperar el carrito de compras

//Hacemos una clase de tipo Producto

class Producto {
    constructor(id, nombre, precio, img){
        this.id= id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

//crear productos (objetos)
const arroz = new Producto (1, "Arroz", 100, "img/arroz.png");
const azucar = new Producto(2, "Azúcar", 50, "img/azucar.png");
const fideos = new Producto(3, "Fideos", 80, "img/fideos.png");
const mermelada = new Producto(4, "Mermelada", 150, "img/mermelada.png");
const queso = new Producto(5, "Queso", 200, "img/queso.png");
const sal = new Producto(6, "Sal", 30, "img/sal.png");
const tomate = new Producto(7, "Tomate", 70, "img/tomate.png");
const yerba = new Producto(8, "Yerba", 120, "img/yerba.png");

//Crear un array con todo nuestro catálogo de productos:

const productos = [arroz, azucar, fideos, mermelada, queso,sal, tomate, yerba];

//Creamos el array del carrito y lo vamos a inicializar vacío porque a medidad que avancemos con la ejecución del programa lo vamos a ir llenando.
let carrito = [];

if(localStorage.getItem("carrito")){
    carrito= JSON.parse(localStorage.getItem("carrito"));
}

//Modificamos el DOM mostrando los productos

const contenedorProductos = document.getElementById("contenedorProductos");

//Creamos una función para mostrar los productos

const mostrarProductos = () =>{
    productos.forEach( producto =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12")
        card.innerHTML= `
                        <div class= "card">
                            <img src="${producto.img}" class="card-img-top imgProductos">
                            <div class= "card-body">
                                <h5>${producto.nombre}</h5>
                                <p>${producto.precio}</p>
                                <button class= "btn colorBoton" id="boton${producto.id}">Agregar al Carrito
                                </button>
                            </div>
                        </div>
        `
        contenedorProductos.appendChild(card);
        //Agregar productos al carrito:
         const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", ()=>{
        agregarAlCarrito(producto.id);
        })
    })
}
mostrarProductos();

//Crear la función para agregar productos al carrito
//como parámetro debe recibir el id de los productos

const agregarAlCarrito = (id)=>{
    const productoEnCarrito = carrito.find(producto => producto.id === id);
   if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
       const producto = productos.find (producto=> producto.id ===id);
        carrito.push(producto);
     }
     //trabajamos con LocalStorage:
     localStorage.setItem("carrito", JSON.stringify(carrito));
     calcularTotal();
 }

//Mostrar el carrito de compras:

const contenedorCarrito =document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
 mostrarCarrito();
})

// //Función para mostrar el carrito:

const mostrarCarrito = ()=> {
    contenedorCarrito.innerHTML= "";
  carrito.forEach(producto => {
         const card = document.createElement("div"); 
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                 <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos">
                     <div class= "card-body">
                            <h5>${producto.nombre}</h5>
                            <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                       <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto 
                       </button>
                    </div>
                </div>
                        `
         contenedorCarrito.appendChild(card);
        //Eliminar productos del carrito:
        const boton= document.getElementById(`eliminar${producto.id}`);
         boton.addEventListener("click", ()=>{
             eliminarDelCarrito(producto.id)
         })
 })
    calcularTotal();
 }

 const eliminarDelCarrito = (id) => {
    const producto= carrito.find(producto=> producto.id ===id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
 }

 //Funcion que elimine todos los productos
 //Vaciamos todo el carrito de compras. 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {

    ///Creamos esta función que la desarrollamos más abajo
    eliminarTodoElCarrito();
})
 const eliminarTodoElCarrito = () =>{
    carrito=[];
    mostrarCarrito();
 }

 //mostrar un mensaje con el total de la compra:
 const total = document.getElementById("total");

 //Función para calcular el total
 const calcularTotal = ()=>{
    let totalCompra = 0;
    carrito.forEach(producto =>{
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total:$${totalCompra}`;
 }






