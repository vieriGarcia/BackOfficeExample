# Django REST Framework
from rest_framework import serializers

# Models
#from users.models import User
from products import models


#COLOR SERIALIZERS
class ColorModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Color
        fields = '__all__'

class CategoryModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Category
        fields = '__all__'

class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:

        model = models.Product
        fields = '__all__'

class StockModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stock
        fields = '__all__'

class ImageOptionalModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ImageOptional
        fields = '__all__'