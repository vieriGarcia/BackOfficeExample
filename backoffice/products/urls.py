from django.conf.urls import url, include
from products import views
from django.urls import path

#Views API COLOR
color_list = views.ColorViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
color_index = views.ColorViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
color_latests = views.ColorViewSet.as_view({
    'get': 'get_latests_colors',
})

#Views API CATEGORY
category_list = views.CategoryViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
category_index = views.CategoryViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
category_latests = views.CategoryViewSet.as_view({
    'get': 'get_latests_categories',
})
category_get_by_slug = views.CategoryViewSet.as_view({
    'get': 'get_by_slug',
})
category_order = views.CategoryViewSet.as_view({
    'post': 'order',
})
#Views API PRODUCT
product_list = views.ProductViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
product_index = views.ProductViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
product_latests = views.ProductViewSet.as_view({
    'get': 'get_latests_products',
})
product_offer_latests = views.ProductViewSet.as_view({
    'get': 'get_offer_latests_products',
})
product_get_by_slug = views.ProductViewSet.as_view({
    'get': 'get_by_slug',
})
#Views API STOCK
stock_list = views.StockViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
stock_index = views.StockViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
#Views API IMAGE OPTIONAL
image_optional_list = views.ImageOptionalViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
image_optional_index = views.ImageOptionalViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
	#API COLOR
    url(r'^api/v1/color/$', color_list, name='color-list'),
    url(r'^api/v1/color/(?P<pk>\d+)$', color_index, name='color-detail'),
    #API CATEGORY
    url(r'^api/v1/category/$', category_list, name='category-list'),
    url(r'^api/v1/category/(?P<pk>\d+)$', category_index, name='category-detail'),
    url(r'^api/v1/category/get_by_slug/$', category_get_by_slug, name='category-get-by-slug'),
    url(r'^api/v1/category/order/$', category_order, name='category-order'),
    #API PRODUCT
    url(r'^api/v1/product/$', product_list, name='cproductlist'),
    url(r'^api/v1/product/(?P<pk>\d+)$', product_index, name='product-detail'),
    url(r'^api/v1/product/get_by_slug/$', product_get_by_slug, name='product-get-by-slug'),
    #API STOCK
    url(r'^api/v1/stock/$', stock_list, name='stock-list'),
    url(r'^api/v1/stock/(?P<pk>\d+)$', stock_index, name='stock-detail'),
     #API IMAGE OPTIONAL
    url(r'^api/v1/image_optional/$', image_optional_list, name='image-optional-list'),
    url(r'^api/v1/image_optional/(?P<pk>\d+)$', image_optional_index, name='image-optional-detail'),
    #Dashboard
    url(r'^api/v1/color/latests/$', color_latests, name='color-latests'),
    url(r'^api/v1/category/latests/$', category_latests, name='category-latests'),
    url(r'^api/v1/product/latests/$', product_latests, name='product-latests'),
    url(r'^api/v1/product/offer_latests/$', product_latests, name='product-offer-latests'),
]

