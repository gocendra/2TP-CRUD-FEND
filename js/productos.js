const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'http://localhost:5000/productos', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        telefono:0,
        Dni:0,
        direccion:"",
        fechnac: new Date(),
        feching: new Date(),
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(producto) {
            if (!confirm('¿Estás seguro/a de que deseas eliminar este producto?')) {
                return; 
            }
            const url = this.url+'/' + producto;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar(){
            if (this.nombre.trim() === '') {
                alert('El campo "nombre" es obligatorio');
            return; 
            }
            if (!Number.isInteger(this.Dni) || this.Dni <= 0) {
                alert('El campo "Dni" debe ser un número válido');
            return;
            }
            if (!Number.isInteger(this.telefono) || this.telefono <= 0) {
                alert('El campo "telefono" debe ser un número válido');
            return;
            }
            if (this.direccion.trim() === '') {
                alert('El campo "direccion" es obligatorio');
            return;
            }
            const fechaActual = new Date();
            if (this.fechnac >= fechaActual) {
                alert('Debe Ingresar la fecha de Nacimiento');
            return;
            }
            if (this.feching <= this.fechnac) {
                alert('Debe Ingresar la fecha de Ingreso a la empresa');
            return;
            }
            let producto = {
                nombre:this.nombre,
                Dni: this.Dni,
                telefono: this.telefono,
                direccion:this.direccion,
                fechnac:this.fechnac,
                feching:this.feching,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./empleados.html";  
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
