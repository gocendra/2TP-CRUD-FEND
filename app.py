from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__) #Crea el objeto app de la clase Flask
CORS(app) #permite acceder desde el front al back

# configuro la base de datos, con el nombre el usuario y la clave
# app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://user:password@localhost/proyecto'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://user:user@localhost/proyecto'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

# ---------fin configuracion-----------

#definimos la tabla
class Producto(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    Dni=db.Column(db.Integer)
    telefono=db.Column(db.Integer)
    direccion=db.Column(db.String(150))
    fechnac=db.Column(db.Date())
    feching=db.Column(db.Date())
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,Dni,telefono,direccion,fechnac,feching,imagen):
        self.nombre = nombre
        self.Dni = Dni
        self.telefono = telefono
        self.direccion = direccion
        self.fechnac = fechnac
        self.feching = feching
        self.imagen = imagen

    #Si hay mas tablas para crear las definimos aca

with app.app_context():
    db.create_all() #Crea las tablas

class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','Dni','telefono','direccion','fechnac','feching','imagen')
    
producto_schema=ProductoSchema() #El objeto para traer un producto
productos_schema=ProductoSchema(many=True) #Trae muchos registro de producto



#Creamos los endpoint
#GET
#POST
#Delete
#Put

#Get endpoint del get
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos = Producto.query.all() #heredamos del db.model
    result= productos_schema.dump(all_productos) #lo heredamos de ma.schema
                                                #Trae todos los registros de la tabla y los retornamos en un JSON
    return jsonify(result)


@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro




@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)   # me devuelve un json con el registro eliminado


@app.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    Dni=request.json['Dni']
    telefono=request.json['telefono']
    direccion=request.json['direccion']
    fechnac=request.json['fechnac']
    feching=request.json['feching']
    imagen=request.json['imagen']
    new_producto=Producto(nombre,Dni,telefono,direccion,fechnac,feching,imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)


@app.route('/productos/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
 
    producto.nombre=request.json['nombre']
    producto.Dni=request.json['Dni']
    producto.telefono=request.json['telefono']
    producto.direccion=request.json['direccion']
    producto.fechnac=request.json['fechnac']
    producto.feching=request.json['feching']
    producto.imagen=request.json['imagen']


    db.session.commit()
    return producto_schema.jsonify(producto)

#Programa Principal
if __name__ == '__main__':
    app.run(debug=False, port=5000)

