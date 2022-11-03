from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.
from . models import *

# admin.site.register(Usuario_usu)
admin.site.register(Auto_aut)
admin.site.register(Marca_mar)

admin.site.register(Instrumento_ins)
admin.site.register(InstrumentoXAuto_ixa)
admin.site.register(RegistroDatos_rda)