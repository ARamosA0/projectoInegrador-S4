
from django.http import Http404
from django.shortcuts import render

from back_foundation.models import *

#Imports relacionado a rest framework
from rest_framework.views import APIView
from rest_framework.response import Response
from back_rest_api.serializers import *
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed

import jwt, datetime

import cloudinary.uploader
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



#Registro

class RegisterView(APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Response(serializers.data) 

class LoginView(APIView):
    def post (self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'name':user.name,
            'email':user.email,
            'celular':user.celular,
            'imagen':user.imagen,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

#Usuarios
class UsuarioAPIGeneral(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Usuario no autenticado')
        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Usuario no autenticado')

        user = User.objects.filter(id=payload['id']).first()
        serializer =  UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message":"succese"
        }
        return response




class UsuarioAPIDetallado(APIView):
    def get_object(self, usuario_id):
        try:
            return User.objects.get(pk=usuario_id)
        except User.DoesNotExist:
            raise Http404
    
    def get(self, request, usuario_id):
        usuListaDet = User.objects.filter(pk=usuario_id).latest("id")
        serializer = UserSerializer(usuListaDet)
        context = {
            'status':True,
            'content':serializer.data
        }
        
        return Response(context)
    
    def put(self, request, usuario_id):
        usuListaDet = self.get_object(usuario_id)
        usuSerializer = UserSerializer(usuListaDet, data=request.data)

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

        try:
            aut_imagen = request.data.get('image')
            cloudinaryResponse = cloudinary.uploader.upload(aut_imagen)

            dictionaryData = {
                'image': '{}.{}'.format(cloudinaryResponse['public_id'], cloudinaryResponse['format'])
            }
            # serAuto = AutoSerializer(data = dictionaryData)

            autSerializer = AutoSerializer(data=[request.data, dictionaryData])

            if autSerializer.is_valid():
                autSerializer.save()
                return Response(autSerializer.data, status=status.HTTP_201_CREATED)

            return Response(autSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': None,
                'message': 'Internal server error'
            })    

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

class AutoMarca(APIView):
    def get(self, request):
        listaMarcas = Marca_mar.objects.all()
        serializer = MarcaSerializer(listaMarcas, many=True)

        return Response(serializer.data)

    def post(self, request):
        marcaSerializer = MarcaSerializer(data=request.data)
        
        if marcaSerializer.is_valid():
            marcaSerializer.save()
            return Response(marcaSerializer.data, status=status.HTTP_201_CREATED)

        return Response(marcaSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AutoIdUsuario(APIView):
    def get(self, request, id_usuario):
        listaAutos = Auto_aut.objects.filter(aut_usuario = id_usuario)
        serializer = AutoSerializer(listaAutos)

        return Response(serializer.data, many=True)

