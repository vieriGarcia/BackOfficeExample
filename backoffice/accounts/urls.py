from django.conf.urls import url, include
from accounts import views
from django.urls import path

#Views API USER
user_list = views.UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
user_index = views.UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
user_login = views.UserViewSet.as_view({
    'post': 'login',
})
user_logout = views.UserViewSet.as_view({
    'post': 'logout',
})
#Views API CLIENT
client_list = views.ClientViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
client_index = views.ClientViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
	#API USER
    #url(r'^api/v1/user/$', color_list, name='user-list'),
    #url(r'^api/v1/user/(?P<pk>\d+)$', color_index, name='user-detail'),
    url(r'^api/v1/login/employee/$', user_login, name='user-login'),
    url(r'^api/v1/logout/$', user_logout, name='user-logout'),
    #API CLIENT
    url(r'^api/v1/client/$', client_list, name='client-list'),
    url(r'^api/v1/client/(?P<pk>\d+)$', client_index, name='client-detail'),

]
