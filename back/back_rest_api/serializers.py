from rest_framework import serializers
from back_foundation.models import *

#Serializers de los modelos de back_foundation
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario_usu
        fields = '__all__'
        read_only_fields = ('usu_fecregistro', 'usu_fecmodificacion')

class AutoSerializer(serializers.ModelSerializer):
    marca = serializers.SlugField(
        queryset=Marca_mar.objects.all(), read_only=True, slug_field='mar_nombre'
    )

    usuario = serializers.SlugRelatedField(
        queryset= Usuario_usu.objects.all(), read_only=True, slug_field='usu_nombres'
    )

    class Meta:
        model = Auto_aut
        fields = (
            'marca',
            'usuario',
            'aut_placa',
            'aut_color',
            'aut_imagen',
            'aut_modelo',
            'aut_descripcion',
            'aut_fecadquisicion',
            'aut_fecregistro',
            'aut_fecmodificacion'
        )
        read_only_fields = ('marca', 'usuario', 'aut_fecregistro', 'aut_fecmodificacion')
