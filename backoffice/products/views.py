from django.shortcuts import render
from django.http import JsonResponse
#Rest Framework
from rest_framework.decorators import  permission_classes, action
from rest_framework import viewsets, status, pagination
from rest_framework.response import Response
from rest_framework import permissions
#Models
from products import models
# Serializers
from products import serializers as products_serializers


# API COLOR
class ColorViewSet(viewsets.ModelViewSet):
    queryset = models.Color.objects.all()
    serializer_class = products_serializers.ColorModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user
    def list(self, request):
        colors=models.Color.objects.all()
        serializer = products_serializers.ColorModelSerializer(colors, many=True)
        return JsonResponse({'data': serializer.data}, safe=False, status=status.HTTP_200_OK)
    @action(detail=True)
    def get_latests_colors(self, request):
        colors= self.queryset.order_by('-created')[:10]
        serializer = products_serializers.ColorModelSerializer(colors, many=True)
        return Response(serializer.data)

#API CATEGORY
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = products_serializers.CategoryModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user
    def list(self, request):
        categories=models.Category.objects.all()
        serializer = products_serializers.CategoryModelSerializer(categories, many=True)
        return JsonResponse({'data': serializer.data}, safe=False, status=status.HTTP_200_OK)
    @action(detail=True)
    def get_latests_categories(self, request):
        categories= self.queryset.order_by('-created')[:10]
        serializer = products_serializers.CategoryModelSerializer(categories, many=True)
        return Response(serializer.data)
    @action(detail=True)
    def get_by_slug(self, request):
    	slug=request.GET.get('slug', '')
    	categories= self.queryset.filter(slug__exact=slug)
    	serializer = products_serializers.CategoryModelSerializer(categories, many=True)
    	return Response(serializer.data)
    @action(detail=True)
    def order(self, request):
        categories_order=request.data.getlist('categories_order_ids')#QueryDict
        categories= self.queryset
        i=1
        for category_id in categories_order:
            c=categories.get(id__exact=category_id)
            c.order=i
            c.save()
            i=i+1
        serializer = products_serializers.CategoryModelSerializer(categories, many=True)
        return Response(serializer.data)

#API STOCK
class StockViewSet(viewsets.ModelViewSet):
    queryset = models.Stock.objects.all()
    serializer_class = products_serializers.StockModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user

#API IMAGE OPTIONAL
class ImageOptionalViewSet(viewsets.ModelViewSet):
    queryset = models.ImageOptional.objects.all()
    serializer_class = products_serializers.ImageOptionalModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user

#API PRODUCT
class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = products_serializers.ProductModelSerializer
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user     
    def list(self, request):
    	category=request.GET.get('category', 0)
    	if int(category) >0:
    		products = models.Product.objects.all().filter(category_id=int(category))
    	else:
    		products = models.Product.objects.all()
    	serializer = products_serializers.ProductModelSerializer(products, many=True)
    	return Response(serializer.data)
    @action(detail=True)
    def get_latests_products(self, request):
        products= self.queryset.order_by('-created')[:10]
        serializer = products_serializers.ProductModelSerializer(products, many=True)
        return Response(serializer.data)
    @action(detail=True)
    def get_offer_latests_products(self, request):
        products= self.queryset.exclude(offer_discount__isnull=True).order_by('-created')[:10]
        serializer = products_serializers.ProductModelSerializer(products, many=True)
        return Response(serializer.data)
    @action(detail=True)
    def get_by_slug(self, request):
    	slug=request.GET.get('slug', '')
    	products= self.queryset.filter(slug__exact=slug)
    	serializer = products_serializers.ProductModelSerializer(products, many=True)
    	return Response(serializer.data)
    @action(detail=True)
    def order(self, request):
        products_order=request.data.getlist('products_order_ids')#QueryDict
        products= self.queryset
        i=1
        for product_id in products_order:        
            c=products.get(id__exact=product_id)
            c.order=i
            c.save()
            i=i+1
        serializer = products_serializers.ProductModelSerializer(products, many=True)
        return Response(serializer.data)
#API PRODUCT
class ProductPaginatedViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = products_serializers.ProductModelSerializer
    pagination_class = pagination.PageNumberPagination
    page_size=2
    #permission_classes = (permissions.AllowAny)
    def pre_save(self, obj):
        obj.owner = self.request.user