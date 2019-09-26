import os

os.chdir('/Users/olivierpartensky')
o1=os.getcwd()
#o2=os.environ.get('AWS_ACCESS_KEY_ID')
o2=os.environ.get('EMAIL_USER')
print(o1)
print(o2)
