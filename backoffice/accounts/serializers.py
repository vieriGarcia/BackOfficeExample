from django.contrib.auth import password_validation, authenticate, logout
from django.contrib.auth.forms import PasswordResetForm

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Models
#from users.models import User
from django.contrib.auth.models import User
from accounts import models 


#USER SERIALIZERS
class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class UserLoginSerializer(serializers.Serializer):

    # Campos que vamos a requerir
    username= serializers.CharField(min_length=5, max_length=30)
    password = serializers.CharField(min_length=8, max_length=64)

    # Primero validamos los datos
    def validate(self, data):

        # authenticate recibe las credenciales, si son válidas devuelve el objeto del usuario
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')

        # Guardamos el usuario en el contexto para posteriormente en create recuperar el token
        self.context['user'] = user
        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

class UserLogoutSerializer(serializers.Serializer):
    def create(self, data):
        logout()

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError('Error')

        ###### FILTER YOUR USER MODEL ######
        if not User.objects.filter(email=value).exists():

            raise serializers.ValidationError('Invalid e-mail address')
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'EMAIL_HOST_USER'),

            ###### USE YOUR TEXT FILE ######
            'email_template_name': 'example_message.txt',

            'request': request,
        }
        self.reset_form.save(**opts)
# CLIENT SERIALIZERS
class ClientModelSerializer(serializers.ModelSerializer):
    first_name=serializers.CharField(source='user.first_name', read_only=True)
    last_name=serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = models.Client
        fields = ('id','user','phone_number','first_name','last_name')
        datatables_always_serialize = ('id','user','phone_number','first_name','last_name')