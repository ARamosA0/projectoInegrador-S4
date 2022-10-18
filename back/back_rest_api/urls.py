from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('users/', views.UsuarioAPIGeneral.as_view()),
    path('users/<int:usuario_id>/', views.UsuarioAPIDetallado.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)