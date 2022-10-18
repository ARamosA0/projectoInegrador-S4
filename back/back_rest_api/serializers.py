from rest_framework import serializers
from back_foundation.models import *

#Serializers de los modelos de back_foundation
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario_usu
        fields = ('id', 'usu_nombres', 'usu_email', 'usu_password', 'usu_celular', 'usu_fecregistro', 'usu_fecmodificacion')
        read_only_fields = ('usu_fecregistro', 'usu_fecmodificacion')