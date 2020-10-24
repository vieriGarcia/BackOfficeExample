from django.shortcuts import render, redirect

#BackOffice ruteador

def login(request):
    return render(request,"accounts/login.html")

def pedidos(request):
    return render(request,"dashboard/pedidos.html")

def productos(request):
	columnas=["ID","Nombres","Apellidos","Teléfono"]
	return render(request,"dashboard/productos.html",{"columnas":columnas,'products_panel':1})
def categorias(request):
	columnas=["ID","Name","Display","Display in home","Order","Acciones"]
	return render(request,"dashboard/categorias.html",{"columnas":columnas,'products_panel':1})
def colores(request):
	columnas=["ID","Nombre","Código Hex.","Color","Acciones"]
	return render(request,"dashboard/colores.html",{"columnas":columnas,'products_panel':1})
def clientes(request):
	columnas=["ID","Nombres","Apellidos","Teléfono"]
	return render(request,"dashboard/clientes.html",{"columnas":columnas})