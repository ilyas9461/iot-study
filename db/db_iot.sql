-- DROP DATABASE IF EXISTS "iot-lys";

CREATE DATABASE "iot-lys"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Turkish_Turkey.1254'
    LC_CTYPE = 'Turkish_Turkey.1254'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- create table
DROP TABLE IF EXISTS "digital_sensor_log";

CREATE TABLE IF NOT EXISTS digital_sensor_log(
   id SERIAL PRIMARY KEY NOT NULL,
   device_id character varying(10) NOT NULL,
   user_name character varying(50) NOT NULL,
   date_time date not null,
   time_stamp int not null,
   sample_count int not null
);