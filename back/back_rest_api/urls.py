from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [

    # Se agrego la urls de la view Index.
    # Para verla es http://localhost:8000/
    path('', views.Index.as_view()),
    path('users/', views.UsuarioAPIGeneral.as_view()),
    path('users/<int:usuario_id>/', views.UsuarioAPIDetallado.as_view()),
    path('vehicles/', views.AutoAPIGeneral().as_view()),
    path('vehicles/<int:auto_id>', views.AutoAPIDetallado.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)