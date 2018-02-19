CREATE DATABASE observations;
USE observations;
CREATE TABLE observations (date DATE, time TIME, temperature NUMERIC, pressure NUMERIC, relativehumidity NUMERIC, timestamp NUMERIC);
GRANT ALL PRIVILEGES ON *.* TO writer@'localhost' IDENTIFIED BY 'writer';