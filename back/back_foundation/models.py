from enum import unique
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,AbstractUser
)
from django.dispatch import receiver
from django.db.models.signals import post_save
# User Manager


# Create your models here.
#Relacionado a usuario



## Cambiar usuario 



# class UserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         """
#         Creates and saves a User with the given email and password.
#         """
#         if not email:
#             raise ValueError('Users must have an email address')

#         user = self.model(
#             email=self.normalize_email(email),
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_staffuser(self, email, password):
#         """
#         Creates and saves a staff user with the given email and password.
#         """
#         user = self.create_user(
#             email,
#             password=password,
#         )
#         user.staff = True
#         user.save(using=self._db)
#         return user




class User(AbstractUser):
    # user = models.OneToOneField(User, related_name='Usuario_usu',on_delete=models.RESTRICT)

    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    celular = models.CharField(max_length=9)
    username = None
    is_staff = True

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    

#Relacionado a auto
class Documento_doc(models.Model):
    doc_tipo = models.URLField()
    doc_fecdoc = models.DateField()
    doc_fecregistro = models.DateTimeField(auto_now_add=True)
    doc_fecmodificacion = models.DateTimeField(auto_now=True)

class Marca_mar(models.Model):
    mar_nombre = models.CharField(max_length=20)
    mar_year = models.CharField(max_length=6)

class Auto_aut(models.Model):
    aut_marca = models.ForeignKey(Marca_mar, related_name='marca', on_delete=models.CASCADE)
    aut_usuario = models.ForeignKey(User, related_name='usuario', on_delete=models.CASCADE)
    #Datos de auto
    aut_placa = models.CharField(max_length=7)
    aut_color = models.CharField(max_length=20)
    aut_imagen = models.URLField()
    aut_modelo = models.CharField(max_length=50)
    aut_descripcion = models.TextField()
    aut_fecadquisicion = models.DateField()
    aut_fecregistro = models.DateTimeField(auto_now_add=True)
    aut_fecmodificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.aut_placa

class DocumentoXAuto_dxa(models.Model):
    auto = models.ForeignKey(Auto_aut, on_delete=models.CASCADE)
    documento = models.ForeignKey(Documento_doc, on_delete=models.CASCADE)

#Relacionado a mantenimiento
class Taller_tal(models.Model):

    class Puntuacion(models.IntegerChoices):
        EXCELENTE = 5
        MUY_BUENO = 4
        BUENO = 3
        MALO = 2
        MUY_MALO = 1

    tal_nombre = models.CharField(max_length=30)
    tal_ubicaciondir = models.CharField(max_length=300)
    tal_puntuacion = models.IntegerField(choices=Puntuacion.choices)
    tal_ruc = models.CharField(max_length=8)
    tal_descripcion = models.TextField()
    tal_ubicacion_lat = models.FloatField()
    tal_ubicacion_lon = models.FloatField()

    def __str__(self):
        return self.tal_nombre

class TipoMantenimiento_tman(models.Model):
    tman_nombre = models.CharField(max_length=50)
    tman_descripcion = models.TextField()
    tman_precio = models.FloatField()

class Mantenimiento_man(models.Model):
    auto = models.ForeignKey(Auto_aut, on_delete=models.CASCADE)
    taller = models.ForeignKey(Taller_tal, on_delete=models.CASCADE)
    tipo_matenimiento = models.ForeignKey(TipoMantenimiento_tman, on_delete=models.CASCADE)
    #Datos de mantenimiento
    man_fecha = models.DateField()
    man_proxfecha = models.DateField()

    def __str__(self):
        return self.tipo_matenimiento.tman_nombre

#Relacionado a instrumento
class InsNombre_ino(models.Model):
    ino_nombre = models.CharField(max_length=50)

class InsCodigo_inc(models.Model):
    inc_nombre = models.ForeignKey(InsNombre_ino, on_delete=models.CASCADE)
    inc_codigo = models.CharField(max_length=20)

class Instrumento_ins(models.Model):
    ins_codigo = models.ForeignKey(InsCodigo_inc, on_delete=models.CASCADE)
    ins_unidad = models.CharField(max_length=5)

    def __str__(self):
        return self.ins_codigo.inc_nombre

class InstrumentoXAuto_ixa(models.Model):
    auto = models.ForeignKey(Auto_aut, on_delete=models.CASCADE)
    instrumento = models.ForeignKey(Instrumento_ins, on_delete=models.CASCADE)

#Relacionado a registro de datos
class RegistroDatos_rda(models.Model):
    ixa = models.ForeignKey(InstrumentoXAuto_ixa, on_delete=models.CASCADE)
    #Datos para registro de datos
    rda_fecha = models.DateField()
    rda_hora = models.TimeField()

    def __str__(self):
        return self.ixa.instrumento.ins_codigo.inc_nombre

class RegistroManual_rma(models.Model):
    auto = models.ForeignKey(Auto_aut, on_delete=models.CASCADE)
    #Datos de registro manual
    rma_nombre = models.CharField(max_length=100)
    rma_descripcion = models.TextField()
    rma_fecha = models.DateField()
    rma_hora = models.TimeField()
    rma_fecregistro = models.DateTimeField(auto_now_add=True)
    rma_fecmodificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.rma_nombre

class RegistroError_rer(models.Model):
    registro_datos = models.ForeignKey(RegistroDatos_rda, on_delete=models.CASCADE)
    registro_manual = models.ForeignKey(RegistroManual_rma, on_delete=models.CASCADE)
    #Datos de registro de error
    rer_nombre = models.CharField(max_length=100)
    rer_descripcion = models.TextField()
    rer_fecha = models.DateField()
    rer_hora = models.TimeField()
    rer_fecregistro = models.DateTimeField(auto_now_add=True)
    rer_fecmodificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.rer_nombre