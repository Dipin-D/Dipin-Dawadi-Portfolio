from django.shortcuts import render

def home(request):
    return render(request, 'home.html') 
def experiences(request):
    return render(request, 'experiences.html')
def projects(request):
    return render(request, 'projects.html')