from rest_framework import serializers
from back_foundation.models import *

#Serializers de los modelos de back_foundation
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario_usu
        fields = '__all__'
        read_only_fields = ('usu_fecregistro', 'usu_fecmodificacion')

class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto_aut
        fields = '__all__'
        read_only_fields = ['aut_fecregistro', 'aut_fecmodificacion']