from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  
    path('experiences/', views.experiences, name='experiences'), 
    path('projects/', views.projects, name='projects'), 
]

if not settings.DEBUG:  # Only in production
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
