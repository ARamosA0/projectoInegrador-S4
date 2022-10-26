from rest_framework import serializers
from back_foundation.models import *

#Serializers de los modelos de back_foundation
# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta: 
#         model = Usuario_usu
#         fields = '__all__'
        # read_only_fields = ('usu_fecregistro', 'usu_fecmodificacion')

class UserSerializer(serializers.ModelSerializer):
    # Usuario = UsuarioSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id','name','email','celular','password']
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



class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto_aut
        fields = '__all__'
        read_only_fields = ['aut_fecregistro', 'aut_fecmodificacion']

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca_mar
        fields = '__all__'
