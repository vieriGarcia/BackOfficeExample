from django.contrib import admin
from accounts import models
# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    list_display=("id","user","created","modified")

class ClientAdmin(admin.ModelAdmin):
    list_display=("id","user","phone_number")

admin.site.register(models.Employee,EmployeeAdmin)
admin.site.register(models.Client,ClientAdmin)