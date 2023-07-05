from django.db import models

class Cuidadores(models.Model):
    name = models.CharField("Nombres", max_length=200,null=True)
    last_name = models.CharField("Apellidos", max_length=200,null=True)  # new
    password = models.CharField("Contraseña", max_length=100,null=True)  # new
    age = models.IntegerField("Edad",null=True)  # new
    email = models.EmailField("Correo Electrónico", max_length=254,null=True)  # new
    phone = models.CharField("Teléfono", max_length=12,null=True)  # new
    description = models.TextField("Descripción",null=True)
    image = models.ImageField("Imagen", upload_to='caretaker_images',null=True)
    status = models.BooleanField("Estado", default=True)

    def __str__(self):
        return self.name
    
class Producto(models.Model):
    idProducto = models.AutoField(primary_key=True,name="IdProducto", null=False)
    nombreProducto = models.CharField("NombreProducto",  max_length=200,null=False)
    precioProducto = models.IntegerField("PrecioProducto", null=False)
    stockProducto = models.IntegerField("StockProducto", null=False)
    imagen = models.ImageField("Imagen", null=True)

    def __str__(self):
        return self.name