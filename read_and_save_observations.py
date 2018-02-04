import MySQLdb
import datetime
import time
from ruuvitag_sensor.ruuvitag import RuuviTag

# Read data from sensor
sensor = RuuviTag('E0:7F:A8:07:C2:36')
state = sensor.update()
state = sensor.state

date = datetime.datetime.utcnow()
time = time.time()
pres = state["pressure"]
temp = state["temperature"]
relhum = state["humidity"]

# Connect to sql
db = MySQLdb.connect("localhost", "writer", "writer", "observations")

curs=db.cursor()

# date DATE, time TIME, temperature NUMERIC, pressure NUMERIC, relativehumidity NUMERIC

# Write to database
curs.execute ("""INSERT INTO observations
                    values(CURRENT_DATE(),NOW(),{},{}, {}, UNIX_TIMESTAMP())""".format(temp, pres, relhum ))

db.commit()
db.close()

