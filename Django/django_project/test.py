import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE_URL = 'sqlite://' + os.path.join(BASE_DIR, 'db.sqlite3')

print(DATABASE_URL)

from django.db import connection
#db_name = connection.settings_dict['NAME']

print(connection.settings_dict)
