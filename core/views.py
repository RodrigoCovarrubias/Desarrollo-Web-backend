from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Cuidadores
from django.http import JsonResponse
from django.core.paginator import Paginator
from django import forms
import logging
import json


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
