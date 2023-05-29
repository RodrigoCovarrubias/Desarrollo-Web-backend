from django.shortcuts import render

def index_view(request):
    return render(request,'index.html')
def registro_view(request):
    return render(request, 'registro.html')
def paseadores_view(request):
    return render(request, 'paseadores.html')
def quienesSomos_view(request):
    return render(request, 'quienesSomos.html')
def puntosInteres_view(request):
    return render(request, 'puntosInteres.html')