console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        telefono:0,
        Dni:0,
        url:'http://localhost:5000/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre =data.nombre
                    this.telefono=data.telefono
                    this.Dni=data.Dni
                    this.direccion=data.direccion,
                    this.fechnac=data.fechnac,
                    this.feching=data.feching,                    
                    this.imagen=data.imagen
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
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
                alert('La fecha de nacimiento debe ser anterior a la fecha actual');
            return;
            }
            if (this.feching <= this.fechnac) {
                alert('La fecha de ingreso debe ser posterior a la fecha de nacimiento');
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
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html";             
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
