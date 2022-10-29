from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [

    # Se agrego la urls de la view Index.
    # Para verla es http://localhost:8000/
    path('', views.Index.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('users/', views.UsuarioAPIGeneral.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('usuario/<int:usuario_id>/', views.UsuarioAPIDetallado.as_view()),
    path('vehicles/', views.AutoAPIGeneral.as_view()),
    path('vehicles/<int:auto_id>', views.AutoAPIDetallado.as_view()),
    path('marcas/', views.AutoMarca.as_view()),
    path('auto/<int:id_usuario>', views.AutoIdUsuario.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)