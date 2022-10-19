from django.http import Http404
from django.shortcuts import render

from back_foundation.models import *

#Imports relacionado a rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from back_rest_api.serializers import UsuarioSerializer
from rest_framework import status

# Create your views here.

#Index 
## Se agrego esta vista para tener una vista principal que
## no requiera nada en la url
class Index(APIView):
    def get(self, request):
        context = {
            'status':True,
            'content':'api activa'
        }
        return Response(context)


#Usuarios
class UsuarioAPIGeneral(APIView):
    def get(self, request):
        usuLista = Usuario_usu.objects.all()
        usuSerializer = UsuarioSerializer(usuLista, many=True)

        return Response(usuSerializer.data)

    def post(self, request):
        usuSerializer = UsuarioSerializer(data=request.data)
        
        if usuSerializer.is_valid():
            usuSerializer.save()
            return Response(usuSerializer.data, status=status.HTTP_201_CREATED)

        return Response(usuSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioAPIDetallado(APIView):
    def get_object(self, usuario_id):
        try:
            return Usuario_usu.objects.get(pk=usuario_id)
        except Usuario_usu.DoesNotExist:
            raise Http404
    
    def get(self, request, usuario_id):
        usuListaDet = self.get_object(usuario_id)
        usuSerializer = UsuarioSerializer(usuListaDet)
        
        return Response(usuSerializer.data)
    
    def put(self, request, usuario_id):
        usuListaDet = self.get_object(usuario_id)
        usuSerializer = UsuarioSerializer(usuListaDet, data=request.data)

        if usuSerializer.is_valid():
            usuSerializer.save()
            return Response(usuSerializer.data)
        
        return Response(usuSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, usuario_id):
        usuListaDet = self.get_object(usuario_id)
        usuListaDet.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)