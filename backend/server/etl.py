from app import app
from models import db, Zipcode
from pprint import pprint 
import re

with app.app_context():
  with open('../2023_Gaz_zcta_national.txt', 'rt') as file:
    values = [(re.split(r'\t+', value.rstrip('\t'))) for value in file.read().splitlines()]
    for i in range (10, len(values)):
      pprint(values[i][0]) #zipcode
      pprint(values[i][5]) #lat
      pprint(values[i][6]) #long
      pprint("======")
      new_zip = Zipcode(zipcode=values[i][0],
                        longitude=values[i][6], 
                        latitude=values[i][5])
      db.session.add(new_zip)
    db.session.commit()


