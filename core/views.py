from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Cuidadores, Producto
from django.http import JsonResponse
import logging
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import Cuidadores
from rest_framework import status
import json


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def obtieneUsuarios(request,cuidador_id=None):
    if request.method == 'GET':
        cuidadores = Cuidadores.objects.all()
        data = []
        for cuidador in cuidadores:
            data.append({
                'name': cuidador.name,
                'last_name': cuidador.last_name,
                'age': cuidador.age,
                'email': cuidador.email,
                'phone': cuidador.phone,
                'description': cuidador.description,
                })
        return Response(data)
    if request.method== 'PUT':
        data = request.data
        try:
            cuidador = Cuidadores.objects.get(id=cuidador_id)
        except Cuidadores.DoesNotExist:
            return Response({"error": "Cuidador does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        cuidador.name = data.get('name', cuidador.name)
        cuidador.last_name = data.get('last_name', cuidador.last_name)
        cuidador.password = data.get('password', cuidador.password)
        cuidador.age = data.get('age', cuidador.age)
        cuidador.email = data.get('email', cuidador.email)
        cuidador.phone = data.get('phone', cuidador.phone)
        cuidador.description = data.get('description', cuidador.description)
        cuidador.save()
        return Response({"id": cuidador.id}, status=status.HTTP_200_OK)
    if request.method== 'DELETE':
        try:
            cuidador = Cuidadores.objects.get(id=cuidador_id)
            cuidador.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Cuidadores.DoesNotExist:
            return Response({"error": "Cuidador does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def creaUsuarios(request):
    data = request.data
    cuidador = Cuidadores.objects.create(
        name=data.get('name'),
        last_name=data.get('last_name'),
        password=data.get('password'),
        age=data.get('age'),
        email=data.get('email'),
        phone=data.get('phone'),
        description=data.get('description'),
        image=request.FILES.get('image'),
        status=data.get('status', True)
    )
    return Response({"id": cuidador.id}, status=status.HTTP_201_CREATED)




def index_view(request):
    return render(request, 'index.html')




def registro_view(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        password = request.POST.get('password')
        edad = request.POST.get('edad')
        correo = request.POST.get('correo')
        telefono = request.POST.get('telefono')
        descripcion = request.POST.get('descripcion')

        cuidador = Cuidadores(
            name=nombre,
            last_name=apellido,
            password=password,
            age=edad,
            email=correo,
            phone=telefono,
            description=descripcion
        )
        cuidador.save()
        return redirect('paseadores')

    return render(request, 'registro.html')


def quienesSomos_view(request):
    return render(request, 'quienesSomos.html')
def api_view(request):
    return render(request, 'api.html')

def puntosInteres_view(request):
    return render(request, 'puntosInteres.html')

class CuidadoresListView(View):
    template_name = 'paseadores.html'
    

    def get_queryset(self):
        return Cuidadores.objects.filter(status=True)

    def get_context_data(self, **kwargs):
        context = {}
        cuidadores = self.get_queryset()
        context['cuidadores'] = cuidadores
        return context

    def get(self, request, *args, **kwargs):
        context = self.get_context_data()
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        selected_cuidadores = request.POST.getlist('selected_cuidadores')
        Cuidadores.objects.filter(pk__in=selected_cuidadores).update(status=False)
        return redirect('paseadores')


class EliminarCuidadoresView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        selected_cuidadores = data.get('selected_cuidadores', [])
        logger = logging.getLogger(__name__)
        logger.info(f"Selected Cuidadores: {selected_cuidadores}")
        Cuidadores.objects.filter(pk__in=selected_cuidadores).update(status=False)
        return JsonResponse({'success': True})

def editar_cuidador(request, cuidador_id):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        print(nombre)
        apellido = request.POST.get('apellido')
        print(apellido)
        password = request.POST.get('password')
        edad = request.POST.get('edad')
        correo = request.POST.get('correo')
        telefono = request.POST.get('telefono')
        descripcion = request.POST.get('descripcion')
        
        cuidador = Cuidadores.objects.get(id=cuidador_id)
        cuidador.name = nombre
        cuidador.last_name = apellido
        cuidador.password = password
        cuidador.age = edad
        cuidador.email = correo
        cuidador.phone = telefono
        cuidador.description = descripcion
        cuidador.save()
        
        return redirect('paseadores')
    
    return redirect('paseadores')

class ProductoListView(View):
    template_name = 'carrito.html'

    def get_queryset(self):
        return Producto.objects.all()

    def get(self, request, *args, **kwargs):
        producto = self.get_queryset()
        context = {'producto': producto}
        return render(request, self.template_name, context)