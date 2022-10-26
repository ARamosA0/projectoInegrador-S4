from rest_framework import serializers
from back_foundation.models import *


class UserSerializer(serializers.ModelSerializer):
    # Usuario = UsuarioSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id','name','email','celular','password', 'imagen']
        extra_key = {
            "password": {'write_only':True}
        }
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance     

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['imagen'] = instance.imagen
        return representation



class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto_aut
        fields = '__all__'
        read_only_fields = ['aut_fecregistro', 'aut_fecmodificacion']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['aut_imagen'] = instance.aut_imagen
        return representation

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca_mar
        fields = '__all__'
