from django.contrib import admin
from products import models
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display=("id","name","slug","created","modified")

class ColorAdmin(admin.ModelAdmin):
    list_display=("id","name","hex_code")

class ProductAdmin(admin.ModelAdmin):
    list_display=("id","name","category","price","image")

class StockAdmin(admin.ModelAdmin):
    list_display=("id","product","color","quantity")

class ImageOptionalAdmin(admin.ModelAdmin):
    list_display=("id","product","image")

admin.site.register(models.Category,CategoryAdmin)
admin.site.register(models.Color,ColorAdmin)
admin.site.register(models.Product,ProductAdmin)
admin.site.register(models.Stock,StockAdmin)
admin.site.register(models.ImageOptional,ImageOptionalAdmin)