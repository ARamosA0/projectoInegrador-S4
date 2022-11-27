 
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

import requests
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

        print(user.imagen)
        imagen = str(user.imagen)

        payload = {
            'id': user.id,
            'name':user.name,
            'email':user.email,
            'celular':user.celular,
            'imagen':imagen,
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

    def put(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Usuario no autenticado')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Usuario no autenticado')
        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user, data=request.data)

        context = {
            'status':True,
            'content':serializer.data   
        }

        return Response(context) 

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Usuario no autenticado')
        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Usuario no autenticado')
        user = User.objects.filter(id=payload['id']).first()

        user.delete()

        context = {
            'status': True,
            'message':'Usuario Eliminado'
        }

        return Response(context)

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
        # autoTotal = len(autLista)
        # context = {
        #     "message":"OK",
        #     "tamano":autoTotal,
        #     "autdata":autSerializer.data,
        # }

        return Response(autSerializer)

    def post(self, request):

        try:
            aut_imagen = request.data.get('aut_imagen')
            cloudinaryResponse = cloudinary.uploader.upload(aut_imagen)

            
            imagenUrl = {
                'aut_imagen': '{}.{}'.format(cloudinaryResponse['public_id'], cloudinaryResponse['format']),
                'aut_placa': request.data.get('aut_placa'),
                'aut_color': request.data.get('aut_color'),
                'aut_modelo': request.data.get('aut_modelo'),
                'aut_descripcion': request.data.get('aut_descripcion'),
                'aut_fecadquisicion': request.data.get('aut_fecadquisicion'),
                'aut_marca': request.data.get('aut_marca'),
                'aut_usuario': request.data.get('aut_usuario')
            }
            
            

            autSerializer = AutoSerializer(data =imagenUrl )

            print(autSerializer)

            if autSerializer.is_valid():
                autSerializer.save()
                return Response(autSerializer.data, status=status.HTTP_201_CREATED)

            return Response(autSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
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

        try:
            aut_imagen = request.data.get('aut_imagen')
            cloudinaryResponse = cloudinary.uploader.upload(aut_imagen)

            
            imagenUrl = {
                'aut_imagen': '{}.{}'.format(cloudinaryResponse['public_id'], cloudinaryResponse['format']),
                'aut_placa': request.data.get('aut_placa'),
                'aut_color': request.data.get('aut_color'),
                'aut_modelo': request.data.get('aut_modelo'),
                'aut_descripcion': request.data.get('aut_descripcion'),
                'aut_fecadquisicion': request.data.get('aut_fecadquisicion'),
                'aut_marca': request.data.get('aut_marca'),
                'aut_usuario': request.data.get('aut_usuario')
            }
            
            
            autListaDet = Auto_aut.objects.get(pk=auto_id)
            autSerializer = AutoSerializer(autListaDet, data =imagenUrl )

            print(autSerializer)

            if autSerializer.is_valid():
                autSerializer.save()
                return Response(autSerializer.data, status=status.HTTP_201_CREATED)

            return Response(autSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as Error:
            print(Error)
            return Response({
                'status': False,
                'content': 'Error',
                'message': 'Internal server error'
            })   

    
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
        print(listaAutos)
        serializer = AutoSerializer(listaAutos, many=True)

        return Response(serializer.data)


#Instrumentos (sensores) y registro de datos
class InstrumentoAPIGeneral(APIView):
    def get(self, request):
        instrumentos = Instrumento_ins.objects.all()
        serializer = InstrumentoSerializer(instrumentos, many=True)

        return Response(serializer.data)
    
    def post(self, request):
        serializer = InstrumentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InstrumentoAPIDetallado(APIView):
    def get_object(self, instrumento_id):
        try:
            return Instrumento_ins.objects.get(pk=instrumento_id)
        except Instrumento_ins.DoesNotExist:
            raise Http404
    
    def get(self, request, instrumento_id):
        instrumento = self.get_object(instrumento_id)
        serializer = InstrumentoSerializer(instrumento)
        return Response(serializer.data)
    
    def put(self, request, instrumento_id):
        instrumento = self.get_object(instrumento_id)
        serializer = InstrumentoSerializer(instrumento, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, instrumento_id, format=None):
        instrumento = self.get_object(instrumento_id)
        instrumento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class InstrumentoXAutoAPIGeneral(APIView):
    def get(self, request):
        instrumento_auto = InstrumentoXAuto_ixa.objects.all()
        serializer = InstrumentoXAutoSerializer(instrumento_auto, many=True)

        return Response(serializer.data)
    
    def post(self, request):
        serializer = InstrumentoXAutoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroDatosAPIGeneral(APIView):
    def get(self, request):
        registro_datos = RegistroDatos_rda.objects.all()
        serializer = RegistroDatosSerializer(registro_datos, many=True)

        return Response(serializer.data)
    
    def post(self, request):

        serializer = RegistroDatosSerializer(data=request.data)
        lastId = RegistroDatos_rda.objects.latest('id')

        value = request.data.get("rda_valor")
        sensor = request.data.get("ixa")


        print("sensor",sensor)
        print("value",value)

        

        if serializer.is_valid():
            serializer.save()
            if(sensor == 1 and float(value) >= 30):
                print("entro")

                try :
                    r = requests.post("https://projectoinegrador-s4-production.up.railway.app/errsensor/", 
                                data ={
                                    'registro_datos':lastId.pk+1,
                                    'rer_nombre': "Error de Temperatura",
                                    'rer_descripcion': "La temperatura exedio de 30"
                                })
                    print(r)
                except Exception as Error:
                    print(Error)
                    return Response({
                        'status': False,
                        'content': 'Error',
                        'message': 'Internal server error'
                    })  

            if(sensor == 2 and float(value)>=5):
                try:
                    r = requests.post("https://projectoinegrador-s4-production.up.railway.app/errsensor/", 
                                    data ={
                                        'registro_datos':lastId.pk+1,
                                        'rer_nombre': "Error de Voltaje",
                                        'rer_descripcion': "El voltaje exedio de 5"
                                    })

                except Exception as Error:
                    print(Error)
                    return Response({
                        'status': False,
                        'content': 'Error',
                        'message': 'Internal server error'
                    })  

                print(r)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroDatosAPIDetallado (APIView):
    def get_object(self, registrodato_id):
        try:
            return RegistroDatos_rda.objects.get(pk=registrodato_id)
        except RegistroDatos_rda.DoesNotExist:
            raise Http404
    
    def get(self, request, registrodato_id):
        # registro_datos = self.get_object.get(pk=registrodato_id)
        inst = RegistroDatos_rda.objects.filter(ixa=registrodato_id)
        serializer = RegistroDatosSerializer(inst, many=True)
        print(serializer.data)
        return Response(serializer.data)

    # def get(self, request, id_isntrumento):
    #     fil_instrumento = RegistroDatos_rda.objects.filter()



class RegistroDatosPorAuto(APIView):
    def get(self, request, auto_id):
        insAuto = InstrumentoXAuto_ixa.objects.get(auto=auto_id)
        serializers = InstrumentoXAutoSerializer(insAuto)
        print(insAuto.id)
        return Response(serializers.data)

    


#Error manual
class RegistroErroresManuales(APIView):
    def get(self, request):
        errmanuall = RegistroManual_rma.objects.all()
        serializer = ErrManualSerializer(errmanuall, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = ErrManualSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroErroresManualesDetalle(APIView):
    def get(self, request, autoid):
        errmanual = RegistroManual_rma.objects.filter(auto=autoid)
        serializer = ErrManualSerializer(errmanual, many=True)

        return Response(serializer.data)

    def delete(self, request, autoid, format=None):
        errmanual = RegistroManual_rma.objects.get(pk=autoid)
        errmanual.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
class RegistroErrores(APIView):
    def get(self, request):
        registro_error = RegistroError_rer.objects.all()
        serializer = RegistroErrorSerializer(registro_error, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = RegistroErrorSerializer(data = request.data)

        

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
