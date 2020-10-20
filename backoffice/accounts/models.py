from django.db import models
from django.contrib.auth.models import User
from model_utils.models import TimeStampedModel
# Create your models here.

class PasswordReset(models.Model):
	id = models.AutoField(primary_key=True)
	user =models.ForeignKey(User,on_delete=models.CASCADE)
	entry_date =models.DateTimeField(auto_now=True)
	last_updated = models.DateTimeField(auto_now=False)
	reset_code = models.IntegerField()
	used = models.BooleanField()

class Client(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	user =models.OneToOneField(User,on_delete=models.CASCADE)
	phone_number = models.CharField(max_length=9)
	def getAll():
		query_set=Client.objects.raw('SELECT u.id, u.first_name, u.last_name, c.phone_number  from accounts_client c INNER JOIN auth_user u ON c.user_id = u.id')
		clients=list()
		for o in query_set:
			d=dict()
			d['id']=o.id
			d['first_name']=o.first_name
			d['last_name']=o.last_name
			d['phone_number']=o.phone_number
			clients.append(d)
		return clients
class Employee(TimeStampedModel):
	id = models.AutoField(primary_key=True)
	user =models.OneToOneField(User,on_delete=models.CASCADE)