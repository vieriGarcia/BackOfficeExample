from django.db import models
from model_utils.models import TimeStampedModel
from products import models as products_models
from autoslug import AutoSlugField
from stdimage import StdImageField, JPEGField
# Create your models here.

class Order(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	address= models.CharField(max_length=100, null=True)
	city = models.CharField(max_length=50, null=True)
	province = models.CharField(max_length=50, null=True)
	district = models.CharField(max_length=50, null=True)
	dni = models.CharField(max_length=8, null=True)
	email = models.EmailField( null=True)
	first_name = models.CharField(max_length=50, null=True)
	last_name = models.CharField(max_length=50, null=True)
	payme = models.BooleanField()
	phone_number = models.CharField(max_length=9, null=True)
	purchase_operation_number = models.CharField(max_length=10, null=True)
	terms_and_conditions = models.BooleanField()
	state= models.PositiveSmallIntegerField()
	shipping = models.PositiveSmallIntegerField(null=True)
	class Meta:
		ordering = ['id']   

class Package(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	color= models.ForeignKey(products_models.Color,on_delete=models.CASCADE)
	order=models.ForeignKey(Order,on_delete=models.CASCADE)
	product= models.ForeignKey(products_models.Product,on_delete=models.CASCADE)
	quantity= models.PositiveSmallIntegerField()
