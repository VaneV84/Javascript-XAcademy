// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, categoria, precio, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }
}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 'lacteos', 10, 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 'bebidas', 5);
const cerveza = new Producto('PV332MJ', 'Cerveza', 'bebidas', 20);
const arroz = new Producto('XX92LKI', 'Arroz', 'alimentos', 7, 20);
const fideos = new Producto('UI999TY', 'Fideos', 'alimentos', 5);
const lavandina = new Producto('RT324GD', 'Lavandina', 'limpieza', 9);
const shampoo = new Producto('OL883YE', 'Shampoo', 'higiene', 3, 50);
const jabon = new Producto('WE328NJ', 'Jabon', 'higiene', 4, 3);


// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada producto que se agrega al carrito del cliente es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    // Función que agrega @{cantidad} de productos con @{sku} al carrito
     async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        // Busco el producto por sku en la "base de datos"
        try {
            const producto = await findProductBySku(sku);
            console.log("Producto encontrado:", producto);

            // Verifico si el producto ya existe en el Carrito
            const productoExistente = this.productos.find(producto => producto.sku === sku);
            if (productoExistente) {
                // Si el producto ya existe en Carrito, sumo las cantidades
                productoExistente.cantidad += cantidad;
                this.precioTotal += cantidad * productoExistente.precio;
                console.log("Cantidades agregadas a Producto existente en Carrito");
            } else {
                // Si el producto no existe en Carrito, lo creo y lo agrego
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
                this.productos.push(nuevoProducto);
                this.precioTotal = this.precioTotal + (producto.precio * cantidad);
                // Verifico si la categoría del producto no está en la lista de categorías y la agrego
                 if (!this.categorias.includes(producto.categoria)) {
                    this.categorias.push(producto.categoria);
                    console.log("Categoria agregada a la lista");
                }
                console.log("Producto agregado al Carrito");
            }

          } catch (error) {
            console.log("Product no encontrado");
          }
        }
    
    
    // Función que elimina @{cantidad} de productos con @{sku} del carrito
    eliminarProducto(sku, cantidad) {
        console.log(`Eliminando ${cantidad} ${sku}`);

        // Busco el producto por SKU en el carrito
        findProductBySkuCarrito(sku)
            .then(producto => {
                if (cantidad < producto.cantidad) {
                    // Si la cantidad del producto es menor, se resta del producto en el carrito
                    producto.cantidad -= cantidad;
                    console.log("Cantidad restada del producto en el carrito");
                  } else {
                    // Si la cantidad del producto es mayor o igual, se elimina el producto del carrito
                    this.productos = this.productos.filter(producto => producto.sku !== sku);
                    console.log("Producto eliminado del carrito");
                  }
            })
            .catch (error => {
                console.log("Product no encontrado en el carrito");
            })      
    }
}

   
// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found in Database`);
            }
        }, 1500);
    });
}


// Función que busca un producto por su sku en "la base de datos"
function findProductBySkuCarrito(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = carrito.productos.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found in Cart`);
            }
        }, 1500);
    });
}


const carrito = new Carrito();
carrito.agregarProducto('FN312PPE', 4);
carrito.eliminarProducto('FN312PPE', 2);