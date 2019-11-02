from django.shortcuts import render
from django.http import HttpResponse


def dummy(request):
    return HttpResponse('<h1>Blog Home</h1>')


def home(request):
    context = {
        'title': "Website of Marc Partensky",
    }
    return render(request, 'oldsite/index.html', context)
