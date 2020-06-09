from django.shortcuts import render
from django.http import HttpResponse


def dummy(request):
    return HttpResponse('<h1>Blog Home</h1>')

def circle(request):
    context = dict(title='Circle')
    return render(request, 'oldsite/circle.html', context)

def geometry(request):
    context = dict(title='Geometry')
    return render(request, 'oldsite/geometry.html', context)

def physics(request):
    context = dict(title='Physics')
    return render(request, 'oldsite/physics.html', context)

def intersection(request):
    context = dict(title='Intersection')
    return render(request, 'oldsite/intersection.html', context)


def home(request):
    context = {
        'title': "Website of Marc Partensky",
    }
    return render(request, 'oldsite/index.html', context)
