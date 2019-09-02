from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name="blog-home"),
    path('about/', views.about,name="blog-about"),
    #path('oldsite/',views.oldsite,name="blog-oldsite"),
    #path('troll/',views.troll,name="blog-troll")
]
