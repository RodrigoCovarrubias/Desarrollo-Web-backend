from django.core.management.base import BaseCommand
from core.models import Cuidadores

class Command(BaseCommand):
    help = 'Seed database with initial caretakers'

    def handle(self, *args, **options):
        caretakers = [
            {
                "name": "Ana Martínez",
                "description": "Como cuidador y paseador de mascotas, me encargo de brindar un cuidado afectuoso y responsable para tus mascotas, asegurándome de que estén felices y saludables en todo momento.",
                "image": "img/cuidador-3.jpg"
            },
            {
                "name": "Laura Pérez",
                "description": "Soy un cuidador y paseador de mascotas con experiencia en el cuidado de diferentes tipos de animales. Me comprometo a proporcionar un servicio excepcional y a garantizar su bienestar y seguridad.",
                "image": "img/cuidador4.jpg"
            },
            {
                "name": "Carlos González",
                "description": "Como cuidador y paseador de mascotas, me encanta trabajar con animales y estoy dedicado a brindarles el mejor cuidado posible. Soy responsable y comprometido con garantizar su felicidad y salud.",
                "image": "img/cuidador7.jpg"
            },
            {
                "name": "David Fernández",
                "description": "Soy un apasionado cuidador y paseador de mascotas, comprometido con brindar un cuidado de alta calidad para tus queridas mascotas. Me aseguro de que reciban el ejercicio adecuado y estén cómodos y seguros en todo momento.",
                "image": "img/cuidador8.jpg"
            },
            {
                "name": "Sofía Torres",
                "description": "Como cuidador y paseador de mascotas, mi objetivo es ofrecer un servicio personalizado y profesional para tus mascotas. Soy amable y responsable, y me comprometo a garantizar su felicidad y bienestar en todo momento.",
                "image": "img/cuidador5.jpg"
            },
            {
                "name": "María García",
                "description": "Soy un cuidador y paseador de mascotas confiable y comprometido, con experiencia en el cuidado de diferentes tipos de mascotas. Me aseguro de proporcionarles el cuidado amoroso y responsable que necesitan para estar felices y saludables.",
                "image": "img/cuidador9.jpg"
            },
        ]

        for c in caretakers:
            Cuidadores.objects.create(**c)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
