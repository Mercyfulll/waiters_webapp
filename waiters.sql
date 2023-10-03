CREATE TABLE workdays (
    id SERIAL PRIMARY KEY,
    daysOfWeek TEXT NOT NULL
);

CREATE TABLE schedule(
    id SERIAL PRIMARY KEY ,
    waiters_name TEXT NOT NULL,  
    days_id INT REFERENCES workdays (id) 
);


INSERT INTO workdays (daysOfWeek) VALUES 
    ('Monday'),
    ('Tuesday'),
    ('Wednesday'),
    ('Thursday'),
    ('Friday'),
    ('Saturday'),
    ('Sunday');