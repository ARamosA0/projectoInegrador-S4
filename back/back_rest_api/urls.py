from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('usuario/', views.UsuarioAPIGeneral.as_view()),
    path('usuario/<int:usuario_id>/', views.UsuarioAPIDetallado.as_view()),
    path('auto/', views.AutoAPIGeneral.as_view()),
    path('auto/<int:auto_id>', views.AutoAPIDetallado.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)