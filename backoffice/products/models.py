from django.db import models
from model_utils.models import TimeStampedModel
from autoslug import AutoSlugField
from stdimage import StdImageField, JPEGField
# Create your models here.

class Category(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	name= models.CharField(max_length=30)
	display = models.BooleanField(null=True)
	display_in_home = models.BooleanField(null=True)
	order = models.PositiveSmallIntegerField(null=True)
	slug= AutoSlugField(populate_from='name')

class Color(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	hex_code = models.CharField(max_length=7)
	name= models.CharField(max_length=30)
	def getLatests(top):
		colors=Color.objects.all().order_by('-created')[:10]
		return colors

class Product(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	category= models.ForeignKey(Category,on_delete=models.CASCADE,related_name="category")
	code = models.CharField(max_length=6, null=True)
	description= models.TextField(max_length=200)
	display = models.BooleanField()
	display_in_home = models.BooleanField()
	image = StdImageField(upload_to='images', null=True)
	name= models.CharField(max_length=30)
	offer_discount= models.PositiveSmallIntegerField()
	order = models.PositiveSmallIntegerField(null=True)
	price =models.DecimalField(decimal_places=2,max_digits=6)
	slug= AutoSlugField(populate_from='name')
	class Meta:
		ordering = ['id']   

class Stock(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	color= models.ForeignKey(Color,on_delete=models.CASCADE,related_name="color")
	product= models.ForeignKey(Product,on_delete=models.CASCADE,related_name="product")
	quantity= models.PositiveSmallIntegerField()

class ImageOptional(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	product= models.ForeignKey(Product,on_delete=models.CASCADE)
	image = StdImageField(upload_to='images')