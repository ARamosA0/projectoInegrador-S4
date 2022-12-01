<<<<<<< HEAD
# Generated by Django 4.1.3 on 2022-11-29 00:57
=======
# Generated by Django 4.1.2 on 2022-11-29 00:51
>>>>>>> 0ece260ed4160853ed1012a40027f3f2e72fe379

import cloudinary.models
from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('celular', models.CharField(max_length=9)),
                ('imagen', cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/dm8aqmori/image/upload/v1666805714/usuario_tcf7ys.png', max_length=255, verbose_name='image')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Auto_aut',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aut_placa', models.CharField(max_length=7)),
                ('aut_color', models.CharField(max_length=20)),
                ('aut_imagen', cloudinary.models.CloudinaryField(blank=True, default='https://res.cloudinary.com/dm8aqmori/image/upload/v1666805846/autoIcono_ljytgv.png', max_length=255, null=True, verbose_name='aut_imagen')),
                ('aut_modelo', models.CharField(max_length=50)),
                ('aut_descripcion', models.TextField()),
                ('aut_fecadquisicion', models.DateField()),
                ('aut_fecregistro', models.DateTimeField(auto_now_add=True)),
                ('aut_fecmodificacion', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Documento_doc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doc_tipo', models.URLField()),
                ('doc_fecdoc', models.DateField()),
                ('doc_fecregistro', models.DateTimeField(auto_now_add=True)),
                ('doc_fecmodificacion', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Instrumento_ins',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ins_nombre', models.CharField(max_length=50, null=True)),
                ('ins_codigo', models.CharField(max_length=20)),
                ('ins_unidad', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='InstrumentoXAuto_ixa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ixa_fecinstalacion', models.DateTimeField(auto_now_add=True)),
                ('ixa_fecmodificacion', models.DateTimeField(auto_now=True)),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.auto_aut')),
                ('instrumento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.instrumento_ins')),
            ],
        ),
        migrations.CreateModel(
            name='Marca_mar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mar_nombre', models.CharField(max_length=20)),
                ('mar_year', models.CharField(max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='RegistroDatos_rda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rda_fecha', models.DateField(auto_now=True)),
                ('rda_hora', models.TimeField(auto_now=True)),
                ('rda_valor', models.DecimalField(decimal_places=2, max_digits=5)),
                ('ixa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.instrumentoxauto_ixa')),
            ],
        ),
        migrations.CreateModel(
            name='Taller_tal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tal_nombre', models.CharField(max_length=30)),
                ('tal_ubicaciondir', models.CharField(max_length=300)),
                ('tal_puntuacion', models.IntegerField(choices=[(5, 'Excelente'), (4, 'Muy Bueno'), (3, 'Bueno'), (2, 'Malo'), (1, 'Muy Malo')])),
                ('tal_ruc', models.CharField(max_length=8)),
                ('tal_descripcion', models.TextField()),
                ('tal_ubicacion_lat', models.FloatField()),
                ('tal_ubicacion_lon', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='TipoMantenimiento_tman',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tman_nombre', models.CharField(max_length=50)),
                ('tman_descripcion', models.TextField()),
                ('tman_precio', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='RegistroManual_rma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rma_nombre', models.CharField(max_length=100)),
                ('rma_descripcion', models.TextField()),
                ('rma_fecha', models.DateField()),
                ('rma_hora', models.TimeField()),
                ('rma_fecregistro', models.DateTimeField(auto_now_add=True)),
                ('rma_fecmodificacion', models.DateTimeField(auto_now=True)),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.auto_aut')),
            ],
        ),
        migrations.CreateModel(
            name='RegistroError_rer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rer_nombre', models.CharField(max_length=200)),
                ('rer_descripcion', models.TextField()),
<<<<<<< HEAD
                ('rer_fecregistro', models.DateTimeField(auto_now_add=True)),
=======
                ('rer_fecregistro', models.DateField(auto_now=True)),
                ('rer_horaregistro', models.TimeField(auto_now=True)),
>>>>>>> 0ece260ed4160853ed1012a40027f3f2e72fe379
                ('registro_datos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.registrodatos_rda')),
            ],
        ),
        migrations.CreateModel(
            name='Mantenimiento_man',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('man_fecha', models.DateField()),
                ('man_proxfecha', models.DateField()),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.auto_aut')),
                ('taller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.taller_tal')),
                ('tipo_matenimiento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.tipomantenimiento_tman')),
            ],
        ),
        migrations.CreateModel(
            name='DocumentoXAuto_dxa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.auto_aut')),
                ('documento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='back_foundation.documento_doc')),
            ],
        ),
        migrations.AddField(
            model_name='auto_aut',
            name='aut_marca',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marca', to='back_foundation.marca_mar'),
        ),
        migrations.AddField(
            model_name='auto_aut',
            name='aut_usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usuario', to=settings.AUTH_USER_MODEL),
        ),
    ]
