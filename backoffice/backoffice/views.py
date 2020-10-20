from django.shortcuts import render, redirect

#BackOffice ruteador

def login(request):
    return render(request,"accounts/login.html")

def pedidos(request):
    return render(request,"dashboard/pedidos.html")

def productos(request):
    return render(request,"dashboard/productos.html")

def clientes(request):
	columnas=["ID","Nombres","Apellidos","Teléfono"]
	return render(request,"dashboard/clientes.html",{"columnas":columnas})