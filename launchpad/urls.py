from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload', views.upload_image, name="upload_image"),
    path('license', views.view_license, name="view_license"),
    path('mint', views.mint, name="mint")
]
