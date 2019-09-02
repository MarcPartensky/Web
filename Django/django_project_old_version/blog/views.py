from django.shortcuts import render

# Create your views here.

posts=[
    {
        'author'        :   'Marc Partensky',
        'title'         :   'Blog Post 1',
        'content'       :   'First Post Content',
        'date_posted'   :   'August 27, 2018'
    },
    {
        'author'        :   'Jane Doe',
        'title'         :   'Blog Post 2',
        'content'       :   'Second Post Content',
        'date_posted'   :   'August 28, 2018'
    }
]

def home(request):
    context = {
        'posts':posts
    }
    return render(request,'blog/home.html',context)


def about(request):
    context = {
        'posts':posts,
        'title':'About'
    }
    return render(request,'blog/about.html',context)

def oldsite(request):
    return render(request,'blog/oldsite/index.html')

def troll(request):
    return render(request,'blog/troll.html')
