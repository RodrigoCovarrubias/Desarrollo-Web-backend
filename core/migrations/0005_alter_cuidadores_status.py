# Generated by Django 4.2.1 on 2023-06-27 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_cuidadores_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cuidadores',
            name='status',
            field=models.BooleanField(default=True, verbose_name='Estado'),
        ),
    ]