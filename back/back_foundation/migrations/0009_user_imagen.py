# Generated by Django 4.1.2 on 2022-10-26 18:29

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('back_foundation', '0008_remove_user_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='imagen',
            field=cloudinary.models.CloudinaryField(default='https://res.cloudinary.com/dm8aqmori/image/upload/v1666805714/usuario_tcf7ys.png', max_length=255, verbose_name='imagen'),
        ),
    ]
