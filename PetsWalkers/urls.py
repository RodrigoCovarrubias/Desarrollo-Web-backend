from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index_view, name='index'),
    path('index/', views.index_view, name='index'),
    path('registro/', views.registro_view, name='registro'),
    path('quienesSomos/', views.quienesSomos_view, name='quienesSomos'),
    path('api/', views.api_view, name='api'),
    path('puntosInteres/', views.puntosInteres_view, name='puntosInteres'),
    path('paseadores/', views.CuidadoresListView.as_view(), name='paseadores'),
    path('eliminar_cuidadores/', views.EliminarCuidadoresView.as_view(), name='eliminar_cuidadores'),
    path('editar_cuidador/<int:cuidador_id>/', views.editar_cuidador, name='editar_cuidador'),
   
    
]
