from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),  
    path('experiences/', views.experiences, name='experiences'), 
    path('projects/', views.projects, name='projects'), 

]
