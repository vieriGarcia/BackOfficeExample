#SMTP
from django.core.mail import send_mail
from smtplib import SMTPException
from django.conf import settings

#Extras
from django.views.decorators.csrf import csrf_exempt
import calendar
from datetime import datetime, timedelta
import xlrd
import json

from django.shortcuts import render
#Rest Framework
from rest_framework.decorators import  permission_classes, action
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import permissions
#Models
from django.contrib.auth.models import User
from accounts import models
# Serializers
from accounts import serializers as account_serializers 

# API User
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = account_serializers.UserModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user
    @action(detail=True)
    def login(self,request):
    	payload=json.loads(request.body)
    	serializer = account_serializers.UserLoginSerializer(data=payload)
    	serializer.is_valid(raise_exception=True)
    	user, token = serializer.save()
    	#data = {'user': UserModelSerializer(user).data,'access_token': token}
    	data = {'token': token}
    	return Response(data)
    @action(detail=True)
    def logout(self,request):
    	serializer = account_serializers.UserLogoutSerializer(data={})
    	serializer.is_valid(raise_exception=True)
    	data = {}
    	return Response(data)

# API CLIENT 
class ClientViewSet(viewsets.ModelViewSet):
    queryset = models.Client.objects.all()
    serializer_class = account_serializers.ClientModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user
    