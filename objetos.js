class Usuario {
	constructor(nombre, clave) {
		this.nombre = nombre
		this.clave = clave
		
	}


}

class Producto {

	constructor(nombre, precio, cantidad, idFoto) {
	
		this.nombre = nombre
		this.precio = precio
		this.cantidad = cantidad = 1;
		this.idFoto = idFoto;
	}
}
//PRODUCTOS DE LA TIENDA//
let productos = [];


//AGREGA EL USUARIO LOGEADO AL LOCALSTORAGE
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []


//AGREGA EL CARRITO AL LOCALSTORAGE
const carrito = JSON.parse(localStorage.getItem('carrito'))|| []


