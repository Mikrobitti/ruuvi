from ruuvitag_sensor.ruuvitag import RuuviTag

sensor = RuuviTag('E0:7F:A8:07:C2:36')

# update state from the device
state = sensor.update()
print(state)
# get latest state (does not get it from the device)
state = sensor.state

print(state["pressure"])
