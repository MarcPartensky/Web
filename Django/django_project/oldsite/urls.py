from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='oldsite-home'),
    path('dummy/',views.dummy,name="oldsite-dummy"),
]
