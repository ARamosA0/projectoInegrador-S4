# Generated by Django 4.1.3 on 2022-11-18 22:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('back_foundation', '0016_merge_20221117_2340'),
    ]

    operations = [
        migrations.AddField(
            model_name='registrodatos_rda',
            name='rda_valor',
            field=models.DecimalField(decimal_places=2, default=django.utils.timezone.now, max_digits=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='registrodatos_rda',
            name='rda_fecha',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='registrodatos_rda',
            name='rda_hora',
            field=models.TimeField(auto_now=True),
        ),
    ]
