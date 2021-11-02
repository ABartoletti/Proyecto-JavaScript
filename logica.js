$(() => {
	document.addEventListener('DOMcontentLoaded' , leerlocalStorage() );

	
  });
//VISIBILIDAD DE BOTONES
btnRegistro.style.display = "none"
cerrarSesion.style.visibility = "hidden"
btnVolverAComprar.style.visibility = "hidden"
const pills = document.getElementById("pills-contact-tab")

//OCULTAR BOTON CARRITO CUANDO NO HAYA PRODUCTOS EN EL CARRITO
if(localStorage.getItem('carrito') === null){
	pills.style.visibility = "hidden"
}else{
	pills.style.visibility = "visible"
}


/****************************************************INGRESAR/REGISTRARSE*****************************************************************/

const crearUsuario = () => {

	let nombre = inputNombre.value;
	let clave = inputClave.value;
	

   
    if (inputNombre.value.length < 4) {
		/*$("#validaciones").html("El usuario debe tener 4 caracteres o más") 
		
		$("#validaciones").style.color("red")*/

		validaciones.innerHTML = "El usuario debe tener 4 caracteres o más"
		validaciones.style.color = "red"
		

		

	} else if (inputClave.value.length < 4) {
		

		validaciones.innerHTML = "La clave debe tener 4 caracteres o más"
		validaciones.style.color = "red"
		

	} else {
      
		const usuario = new Usuario(nombre, clave)

        usuarios.push(usuario)
		
		validaciones.style.color = "green"
		localStorage.setItem("usuarios", JSON.stringify(usuarios))
		
		inputNombre.value = "";
		
		inputClave.value = "";
		 
		validaciones.innerHTML = "Usuario registrado con éxito"
		
		btnIngresar.style.display = "block"
		
		btnRegistro.style.display = "none"
		
		linkRegistro.style.display = "block"
		
       
		setTimeout(() => {
			validaciones.innerHTML = ""
		}, 2000
		)

	}


}

const mostrarRegistro = () => {

	btnRegistro.style.display = "block"
	linkRegistro.style.display = "none"
	btnIngresar.style.display = "none"
	
}

const login = (nombreUsuario,claveUsuario) => {
    
	
	const chequeoUsuario = usuarios.find(usuario => usuario.nombre === nombreUsuario)
	
	
	if (chequeoUsuario) {
	
		$("#validaciones").html("")
		
		
       
		if (claveUsuario === chequeoUsuario.clave) {
		
			
			localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario))
			
			cerrarSesion.style.visibility = "visible"
			botonLogin.style.display = "none"
			//MENSAJE BIENVENIDX
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
				didOpen: (toast) => {
				  toast.addEventListener('mouseenter', Swal.stopTimer)
				  toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			  })
			  
			  Toast.fire({
				icon: 'success',
				title: 'Bienvenidx' + " " + nombreUsuario
			  })
		
		} else {
			
			validaciones.innerHTML = "La clave ingresada es incorrecta"
			validaciones.style.color = "red"
			

		}
	} else {
		
		validaciones.innerHTML = "El usuario no esta registrado"
		validaciones.style.color = "red"
		
	}
}

const cerrarSesionFunc = ()=>{
    localStorage.removeItem("usuarioLogueado")
	

}
linkRegistro.onclick = (e) => {
	
	e.preventDefault()
	mostrarRegistro()
}

btnRegistro.onclick = (e) => {
	e.preventDefault()
	crearUsuario()
}

btnIngresar.onclick = (e) => {
	e.preventDefault()
	login(inputNombre.value,inputClave.value)
	


	
}

cerrarSesion.onclick = ()=>{
	
	cerrarSesionFunc()
}



if(localStorage.getItem("usuarioLogueado")){

	let nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
	let claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave

	login(nombreUsuario,claveUsuario)
}

/***********************************************************TIENDA*************************************************************************/

//PRODUCTOS GUARDADOS DE FORMA LOCAL EN DATA.JSON
$(() => {
  const url = "./data.json";
  $.get(url, (data) => {
    productos = [...productos, ...data];
    console.log(data)
    renderizarTienda(productos);
  });
});


//AGREGAR LOS PRODUCTOS A LA TIENDA
const renderizarTienda = (productos) => {
	const tienda = $("#tienda");
	productos.forEach((producto)=>{
		
		tienda.append (
				`<div class="col d-flex justify-content-center mb-4">
			<div class="card" style="width: 18rem;">
            <img src="../img/${producto.id}.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">$${producto.precio}</p>
              <button class="btn btn-primary" id="${producto.id}">Comprar</button>
            </div>
          </div>
		 	</div>
			 </div>
			 </div>`
			 )
				$("#" + producto.id).on("click",function(e){
				let productoHtml = document.getElementById(e.target.id).parentElement 
				//console.log(productoHtml)
				//console.log(productoHtml.childNodes) 
				let producto = new Producto(productoHtml.childNodes[1].textContent,productoHtml.childNodes[3].textContent, 0 , productoHtml.childNodes[5].id)
				
			
				
				
				const InputElemnto = tbody.getElementsByClassName('input__elemento')
 				for(let i =0; i < carrito.length ; i++){
    			if(carrito[i].nombre.trim() === producto.nombre.trim()){
     			 carrito[i].cantidad ++;
     			 const inputValue = InputElemnto[i]
     			 inputValue.value++;

      			//MENSAJE PRODUCTO AGREGADO
				    Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Producto agregado',
					showConfirmButton: false,
					timer: 1000
				  })
				  pills.style.visibility = "visible"
				  CarritoTotal()
				  localStorage.setItem('carrito',JSON.stringify(carrito));

      			return null;
    }
  }
  
  				carrito.push(producto)
				renderizarCarro(producto)
				localStorage.setItem('carrito',JSON.stringify(carrito));
				
				
				//MENSAJE PRODUCTO AGREGADO
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Producto agregado',
					showConfirmButton: false,
					timer: 1000
				  })
				  pills.style.visibility = "visible"
				  CarritoTotal()
				  
			
			
			})
			
		
	});
	
	
}





/*************************************************************CARRITO*******************************************************************/









//FUNCION PARA RENDERIZAR EL CARRITO//
function renderizarCarro(producto){
	
	
	  
	

				const tr = document.createElement("tr")
				tr.classList.add('ItemCarrito')
				
				
				
				
				tr.innerHTML = `

				
				 
				<th scope="row"  > </th>	
						<td class="table__productos">
						<img src="../img/${producto.idFoto}.jpg" class="configurarFotoCarro" alt="...">
						<h6 class="title">${producto.nombre}</h6>
						</td>
						<td class="table__price"><p>${producto.precio}</p></td>
						<td class="table__cantidad">
						<button  class="btn btn-info btn-sm">
						+
						</button>
						<button  class="btn btn-danger btn-sm">
						-
						</button>
						<input  type="number" min="1" value=${producto.cantidad} class="input__elemento">
						  <button class="delete btn btn-danger">x</button>
						</td>
							
				
				`
				
				tbody.appendChild(tr)
				
				tr.querySelector(".delete").addEventListener('click', removerItemCarrito);
				tr.querySelector(".input__elemento").addEventListener('change', sumarCantidad);

				
				
	
				tr.querySelector(".btn-info").addEventListener('click', sumarProducto);
				tr.querySelector(".btn-danger").addEventListener('click', restarProducto);



			
		
}



//BOTON COMPRAR - BORRA CARRITO Y GENERA UN LOCALSTORAGE NUEVO CON LOS PRODUCTOS CARGADOS
btnComprar.onclick = (e) => {
	compra = JSON.parse(localStorage.getItem('carrito'))
	localStorage.setItem('compra', JSON.stringify(compra))
	const tb = document.getElementById("tbody")
	let Total = 0;
	const itemCartTotal = document.querySelector('.itemCartTotal')
	itemCartTotal.innerHTML = `Total $${Total}`
	tb.remove();
	btnComprar.style.visibility ="hidden"
	btnVolverAComprar.style.visibility = "visible"
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Compra realizada',
		showConfirmButton: false,
		timer: 1000
	  })

	
	localStorage.removeItem('carrito')
}
//BOTON VOLVER A COMPRAR - SE VISUALIZA CUANDO SE REALIZA LA COMPRA Y REFRESCA LA APP PARA REALIZAR UNA NUEVA COMPRA
btnVolverAComprar.onclick = (e) => {
	window.location.reload()
	localStorage.removeItem('compra')
}

//FUNCION PARA QUE SE IMPRIMA LOS PRODUCTOS DEL CARRITO GUARDADOS EN LOCALSTORAGE//
function leerlocalStorage(){
	
	localStorage.removeItem('carrito')
	if(carrito !== null){
		
	


	for(producto of carrito){	

		const tr = document.createElement("tr")
		tr.classList.add('ItemCarrito')
		
		
		
		
		tr.innerHTML = `

		
		 
		<th scope="row" > </th>	
				<td class="table__productos">
				<img src="../img/${producto.idFoto}.jpg" class="configurarFotoCarro" alt="...">
				<h6 class="title">${producto.nombre}</h6>
				</td>
				<td class="table__price"><p>${producto.precio}</p></td>
				<td class="table__cantidad">
				<button  class="btn btn-info btn-sm">
				+
				</button>
				<button  class="btn btn-danger btn-sm">
				-
				</button>
				<input  type="number" min="1" value=${producto.cantidad} class="input__elemento">
				  <button class="delete btn btn-danger">x</button>
				</td>
					
		
		`
		
		tbody.appendChild(tr)

				tr.querySelector(".delete").addEventListener('click', removerItemCarrito);
				tr.querySelector(".input__elemento").addEventListener('change', sumarCantidad);
				
	
				tr.querySelector(".btn-info").addEventListener('click', sumarProducto);
				tr.querySelector(".btn-danger").addEventListener('click', restarProducto);

	
}
}
}



//FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA
function CarritoTotal(){
	let Total = 0;
	const itemCartTotal = document.querySelector('.itemCartTotal')
	carrito.forEach((item) => {
	  const precio = Number(item.precio.replace("$", ''))
	  Total = Total + precio*item.cantidad
	})
  
	itemCartTotal.innerHTML = `Total $${Total}`
	
  }


//FUNCION PARA SUMAR PRODUCTOS
  function sumarCantidad(e){
	const sumaInput  = e.target
	const tr = sumaInput.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	console.log(title)
	for(let i=0; i<carrito.length ; i++){
		if(carrito[i].nombre.trim() === title.trim){
			sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
			carrito[i].cantidad = sumaInput.value;
			localStorage.setItem('carrito', JSON.stringify(carrito))
			CarritoTotal()
			
			  }
			  
		}
		
  
	}
	


//FUNCION PARA REMOVER ITEMS DEL CARRITO
  function removerItemCarrito(e){
	const buttonDelete = e.target
	const tr = buttonDelete.closest(".ItemCarrito")
	console.log(tr)
	const title = tr.querySelector('.title').textContent;
	console.log(title)
	for(let i=0; i<carrito.length ; i++){
  
	  if(carrito[i].nombre.trim() === title.trim()){
		console.log(carrito[i])
		carrito.splice(i, 1)
		
		
		//localStorage.removeItem('carrito')
		localStorage.setItem('carrito' , JSON.stringify(carrito))

	  }
	}
  
	
	tr.remove()
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: 'Producto Eliminado',
		showConfirmButton: false,
		timer: 1000
	  })
	CarritoTotal()


  }
	  
	



  










//FUNCION PARA SUMAR PRODUCTOS CON EL BOTO "+"


function sumarProducto(e){
	
	const btnSumar  = e.target
	const tr = btnSumar.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	const elemento = tr.querySelector('.input__elemento');
	console.log(elemento.value)
	for(item of carrito) {
	  if(item.nombre.trim() === title){
		item.cantidad
		console.log(item.cantidad++)
		if(item.cantidad >= 1){
			elemento.value++
			CarritoTotal()
			localStorage.setItem('carrito', JSON.stringify(carrito))
			console.log(carrito)
		
		}
	  }
	}
	
}
//FUNCION PARA RESTAR PRODUCTOS CON EL BOTON "-"
function restarProducto(e){
	const btnRestar  = e.target
	const tr = btnRestar.closest(".ItemCarrito")
	const title = tr.querySelector('.title').textContent;
	const elemento = tr.querySelector('.input__elemento');
	console.log(elemento.value)
	for(item of carrito) {
	  if(item.nombre.trim() === title){
		item.cantidad
		console.log(item.cantidad--)
		if(item.cantidad >= 1){
		elemento.value--
		CarritoTotal()
		console.log(carrito)
		localStorage.setItem('carrito', JSON.stringify(carrito))
		}else{
			item.cantidad = 1;
		}
	
		
	  }
	}
}


/******************************************ANIMACION EN LOS TITULOS DEL HOME+CARROUSEL********************************************/




const animacion = (id)=>{
$("#"+id).slideUp(3000)

}
const animacion2 = (id)=>{
$("#"+id).slideDown(3000)
	
}

animacion("bienvenidos")
animacion2("tituloHome")
animacion2("mostrarProductos")












