from django.core.management.base import BaseCommand
from core.models import Producto

class Command(BaseCommand):
    help = 'Seed database with initial caretakers'

    def handle(self, *args, **options):
        productos = [
            {
                'IdProducto': 1,
                'nombreProducto': 'Comida para perros - Razas pequeñas',
                'precioProducto': 12990,
                'stockProducto': 50,
            },
            {
                'IdProducto': 2,
                'nombreProducto': 'Juguete interactivo para gatos',
                'precioProducto': 8500,
                'stockProducto': 30,
            },
            {
                'IdProducto': 3,
                'nombreProducto': 'Cama cómoda para perros grandes',
                'precioProducto': 15000,
                'stockProducto': 20,
            },
            {
                'IdProducto': 4,
                'nombreProducto': 'Collar ajustable para cachorros',
                'precioProducto': 6990,
                'stockProducto': 100,
            },
            {
                'IdProducto': 5,
                'nombreProducto': 'Arena aglomerante para gatos',
                'precioProducto': 9500,
                'stockProducto': 40,
            },
            {
                'IdProducto': 6,
                'nombreProducto': 'Snacks de pollo para perros',
                'precioProducto': 10000,
                'stockProducto': 80,
            },
            {
                'IdProducto': 7,
                'nombreProducto': 'Juguete masticable para cachorros',
                'precioProducto': 7500,
                'stockProducto': 25,
            },
            {
                'IdProducto': 8,
                'nombreProducto': 'Peine desenredante para gatos',
                'precioProducto': 5990,
                'stockProducto': 60,
            },
            {
                'IdProducto': 9,
                'nombreProducto': 'Pañales desechables para perros',
                'precioProducto': 11000,
                'stockProducto': 30,
            },
            {
                'IdProducto': 10,
                'nombreProducto': 'Snacks de pescado para gatos',
                'precioProducto': 8000,
                'stockProducto': 70,
            },
            {
                'IdProducto': 11,
                'nombreProducto': 'Correa extensible para paseos',
                'precioProducto': 5000,
                'stockProducto': 40,
            },
            {
                'IdProducto': 12,
                'nombreProducto': 'Transportadora cómoda para viajes',
                'precioProducto': 25000,
                'stockProducto': 15,
            },
            {
                'IdProducto': 13,
                'nombreProducto': 'Bol de acero inoxidable para perros',
                'precioProducto': 3000,
                'stockProducto': 50,
            },
            {
                'IdProducto': 14,
                'nombreProducto': 'Rascador para gatos con escondite',
                'precioProducto': 8000,
                'stockProducto': 20,
            },
            {
                'IdProducto': 15,
                'nombreProducto': 'Shampoo suave para perros y gatos',
                'precioProducto': 4000,
                'stockProducto': 40,
            },
        ]

        for c in productos:
            Producto.objects.create(**c)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
