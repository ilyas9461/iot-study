 --DROP DATABASE IF EXISTS "iot-lys";

CREATE DATABASE "iot-lys"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Turkish_Turkey.1254'
    LC_CTYPE = 'Turkish_Turkey.1254'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- create table

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY NOT NULL,
    device_id character varying(10)  NOT NULL,
    socket_id character varying(50)  NOT NULL DEFAULT '0',	
    user_name character varying(50)  NOT NULL,
    user_pass character varying(10)  NOT NULL
)

DROP TABLE IF EXISTS "digital_sensor_log";

CREATE TABLE digital_sensor_log(
   id SERIAL PRIMARY KEY NOT NULL,
   device_id character varying(10) NOT NULL,
   socket_id character varying(50) NOT NULL,	
   user_name character varying(50) NOT NULL,
   data_value character varying(50) NOT NULL,	
   date_time date not null,
   time_stamp int not null,
   sample_count int not null
);

DROP TABLE IF EXISTS "tag_data_log";

CREATE TABLE tag_data_log(
   id SERIAL PRIMARY KEY NOT NULL,
   device_id character varying(10) NOT NULL,
   socket_id character varying(50) NOT NULL,	
   user_name character varying(50) NOT NULL,
   tag_id character varying(50)    NOT NULL,
   tag_remain character varying(50)NOT NULL,		
   date_time character varying(50) NOT NULL
);

DROP TABLE IF EXISTS "temp_humidity_log";

CREATE TABLE temp_humidity_log(
   id SERIAL PRIMARY KEY NOT NULL,
   device_id character varying(10) NOT NULL,
   socket_id character varying(50) NOT NULL,	
   user_name character varying(50) NOT NULL,
   temperature character varying(50)NOT NULL,
   humidity character varying(50)   NOT NULL,		
   date_time timestamp NOT NULL
);