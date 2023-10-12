var carritoVisible = false;

document.addEventListener("DOMContentLoaded", function () {
  
    const contenedorItems = document.querySelector(".contenedor-items");

    const productos = [
    {
      nombre: "Fernet Branca 750cc",
      imagen: "img/fernet.jpg",
      precio: "$3499",
    },
    {
      nombre: "Arroz Gallo Oro",
      imagen: "img/arroz.jpg",
      precio: "$459",
    },
    {
      nombre: "Galletitas Diversion",
      imagen: "img/galletitas.jpg",
      precio: "$379",
    },
    {
      nombre: "Cerveza Patagonia 24.7 410cc",
      imagen: "img/cerveza.jpg",
      precio: "$319",
    },
    {
      nombre: "Desodorante Musk Axe 150ml",
      imagen: "img/desodorante.jpg",
      precio: "$349",
    },
    {
      nombre: "Leche Veronica 1L",
      imagen: "img/leche.jpg",
      precio: "$429",
    },
    {
      nombre: "Yerba Mate Playadito",
      imagen: "img/yerba.jpg",
      precio: "$1799",
    },
    {
      nombre: "Aceite Lira 900ml",
      imagen: "img/aceite.jpg",
      precio: "$1399",
    },
    {
      nombre: "Asado de novillito xKg",
      imagen: "img/asado.jpg",
      precio: "$2499",
    },
    {
      nombre: "Gaseosa Coca-Cola 1500ml",
      imagen: "img/cocacola.jpg",
      precio: "$569",
    },
    {
      nombre: "Papel Higienico Campanita XL",
      imagen: "img/papelhigienico.jpg",
      precio: "$479",
    },
    {
      nombre: "Whisky Red Label Johnnie Walker 750Cc",
      imagen: "img/whisky.jpg",
      precio: "$9599",
    },
  ];
  let productosSinOrden = productos.slice();
  let productosOrdenados = productos.slice();

  function agregarAlCarritoClicked(producto) {
    const titulo = producto.nombre;
    const precio = producto.precio;
    const imagenSrc = producto.imagen;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    guardarCarritoEnLocalStorage();
}


  function crearItem(producto) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.dataset.nombre = producto.nombre;
  
    const tituloItem = document.createElement("span");
    tituloItem.classList.add("titulo-item");
    tituloItem.textContent = producto.nombre;
  
    const imgItem = document.createElement("img");
    imgItem.classList.add("img-item");
    imgItem.src = producto.imagen;
    imgItem.alt = "";
  
    const precioItem = document.createElement("span");
    precioItem.classList.add("precio-item");
    precioItem.textContent = producto.precio;
  
    const botonItem = document.createElement("button");
    botonItem.classList.add("boton-item");
    botonItem.textContent = "Agregar al Carrito";
    botonItem.addEventListener("click", () => {
      agregarAlCarritoClicked(producto);
    });
  
    item.appendChild(tituloItem);
    item.appendChild(imgItem);
    item.appendChild(precioItem);
    item.appendChild(botonItem);
  
    return item;
  }
  function mostrarProductos(productos) {
    contenedorItems.innerHTML = "";
  
    productos.forEach((producto) => {
      const item = crearItem(producto);
      contenedorItems.appendChild(item);
    });
  }

  function agregarProductosAlContenedor() {
    mostrarProductos(productos);
  }
const ordenarPorSelect = document.getElementById("ordenarPor");
ordenarPorSelect.addEventListener("change", () => {
  const valorSeleccionado = ordenarPorSelect.value;

  if (valorSeleccionado === "nombre") {
    // Ordenar por nombre
    productos.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
  } else if (valorSeleccionado === "precioAsc") {
    // Ordenar por precio de menor a mayor
    productos.sort((a, b) => parseFloat(a.precio.replace("$", "")) - parseFloat(b.precio.replace("$", "")));
  } else if (valorSeleccionado === "precioDesc") {
    // Ordenar por precio de mayor a menor
    productos.sort((a, b) => parseFloat(b.precio.replace("$", "")) - parseFloat(a.precio.replace("$", "")));
    
  }
  const contenedorItems = document.querySelector(".contenedor-items");
contenedorItems.innerHTML = '';
agregarProductosAlContenedor(productos);
mostrarProductos(productos);
});
function mostrarProductos(productos) {
  contenedorItems.innerHTML = "";
  productos.forEach((producto) => {
    const item = crearItem(producto);
    contenedorItems.appendChild(item);
  });
}

function agregarProductosAlContenedor() {
  mostrarProductos(productos);
}
  mostrarProductos(productosOrdenados);

  function ready(){
    
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', function() {
        const productoIndex = parseInt(this.getAttribute("data-producto-index"));
        agregarAlCarritoClicked(productos[productoIndex]);
    });
}

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
    }
    function hacerVisibleCarrito() {
      if (!carritoVisible) {
        carritoVisible = true;
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.display = 'block';
        carrito.style.marginRight = '0';
        carrito.style.opacity = '1';
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '60%';
      }
    }
    // Función para agregar un item al carrito
    function agregarItemAlCarrito(titulo, precio, imagenSrc) {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      var item = document.createElement('div');
      item.classList.add('item');
      var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
  
      var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
      for (var i = 0; i < nombresItemsCarrito.length; i++) {
          if (nombresItemsCarrito[i].innerText == titulo) {
              Swal.fire({
                  title: 'El producto ya se encuentra en el carrito',
                  icon: 'info',
                  confirmButtonText: 'Aceptar'
              });
              return;
          }
      }
  
      var itemCarritoContenido = `
          <div class="carrito-item">
              <img src="${imagenSrc}" width="80px" alt="">
              <div class="carrito-item-detalles">
                  <span class="carrito-item-titulo">${titulo}</span>
                  <div class="selector-cantidad">
                      <i class="fa-solid fa-minus restar-cantidad"></i>
                      <input type="text" value="1" class="carrito-item-cantidad" disabled>
                      <i class="fa-solid fa-plus sumar-cantidad"></i>
                  </div>
                  <span class="carrito-item-precio">${precio}</span>
              </div>
              <button class="btn-eliminar">
                  <i class="fa-solid fa-trash"></i>
              </button>
          </div>
      `;
      item.innerHTML = itemCarritoContenido;
      itemsCarrito.append(item);
  
      item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
  
      var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
      botonRestarCantidad.addEventListener('click', restarCantidad);
  
      var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
      botonSumarCantidad.addEventListener('click', sumarCantidad);
  
      actualizarTotalCarrito();
      hacerVisibleCarrito();
      guardarCarritoEnLocalStorage();
  }
  document.getElementById('btnFiltrar').addEventListener('click', function () {
    const filtro = document.getElementById('filtroNombre').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filtro));

    mostrarProductos(productosFiltrados);
});
    //Aumentar en uno la cantidad del elemento elegido
    function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    }
    //Restar en uno la cantidad del elemento elegido
    function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
        }
    }

    //Eliminar el item seleccionado del carrito
    function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    guardarCarritoEnLocalStorage();

    actualizarTotalCarrito();

    
    ocultarCarrito();
    }   
    function ocultarCarrito() {
      var carritoItems = document.getElementsByClassName('carrito-items')[0];
      if (carritoItems.childElementCount === 0) {
          var carrito = document.getElementsByClassName('carrito')[0];
          carrito.style.marginRight = '-100%';
          carrito.style.opacity = '0';
          carritoVisible = false;
  
          var items = document.getElementsByClassName('contenedor-items')[0];
          items.style.width = '100%';
      }
  }
    //Actualizar el total del carrito
    function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";
    var btnPagar = document.querySelector('.btn-pagar');
    btnPagar.disabled = carritoItems.childElementCount === 0;


    }
    
    function obtenerCarrito() {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      return carrito;
    }
    
    const btnVaciarCarrito = document.getElementById('vaciarCarrito');
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    
    function vaciarCarrito() {
      var carritoItems = document.getElementsByClassName('carrito-items')[0];
      while (carritoItems.hasChildNodes()) {
          carritoItems.removeChild(carritoItems.firstChild);
      }
      guardarCarritoEnLocalStorage();
      actualizarTotalCarrito();
      ocultarCarrito();
      carritoVisible = false;
  }
  
    
  function pagarClicked() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
  
    if (carritoItems.childElementCount === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: 'No puedes realizar la compra sin productos en el carrito.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: 'Tu compra se ha completado con éxito, ¡muchas gracias!.',
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
    });
  
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
      carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
  }
    

    
    function guardarCarritoEnLocalStorage() {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    ready();
    agregarProductosAlContenedor(productos);
});
    
    
    
    
    
    
    
    
    