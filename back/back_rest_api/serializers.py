from rest_framework import serializers
from back_foundation.models import *

#Serializers de los modelos de back_foundation
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Usuario_usu
        fields = '__all__'
        read_only_fields = ('usu_fecregistro', 'usu_fecmodificacion')

class AutoSerializer(serializers.ModelSerializer):
    """
    marca = serializers.SlugRelatedField(
        read_only=True, slug_field='aut_marca'
    )

    usuario = serializers.SlugRelatedField(
        read_only=True, slug_field='aut_usuario'
    )"""

    class Meta:
        model = Auto_aut
        fields = [
            'aut_marca',
            'aut_usuario',
            'aut_placa',
            'aut_color',
            'aut_imagen',
            'aut_modelo',
            'aut_descripcion',
            'aut_fecadquisicion',
            'aut_fecregistro',
            'aut_fecmodificacion'
        ]
        read_only_fields = ['aut_marca', 'aut_usuario','aut_fecregistro', 'aut_fecmodificacion']