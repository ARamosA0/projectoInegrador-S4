from re import L
from django.http import Http404
from django.shortcuts import render

from back_foundation.models import *

#Imports relacionado a rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from back_rest_api.serializers import AutoSerializer, UsuarioSerializer
from rest_framework import status

# Create your views here.
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

#Auto
class AutoAPIGeneral(APIView):
    def get(self, request):
        autLista = Auto_aut.objects.all()
        autSerializer = AutoSerializer(autLista, many=True)

        return Response(autSerializer.data)

    def post(self, request):
        autSerializer = AutoSerializer(data=request.data)
        
        if autSerializer.is_valid():
            autSerializer.save()
            return Response(autSerializer.data, status=status.HTTP_201_CREATED)

        return Response(autSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AutoAPIDetallado(APIView):
    def get_object(self, auto_id):
        try:
            return Auto_aut.objects.get(pk=auto_id)
        except Auto_aut.DoesNotExist:
            raise Http404
    
    def get(self, request, auto_id):
        autListaDet = self.get_object(auto_id)
        autSerializer = AutoSerializer(autListaDet)
        
        return Response(autSerializer.data)
    
    def put(self, request, auto_id):
        autListaDet = self.get_object(auto_id)
        autSerializer = AutoSerializer(autListaDet, data=request.data)

        if autSerializer.is_valid():
            autSerializer.save()
            return Response(autSerializer.data)
        
        return Response(autSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, auto_id):
        autListaDet = self.get_object(auto_id)
        autListaDet.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)