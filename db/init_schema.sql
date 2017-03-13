CREATE TABLE mailqueue (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    deliveron VARCHAR(12) NOT NULL,
    sent TIMESTAMP WITH TIME ZONE,
    errors TEXT,
    coursename VARCHAR(512) NOT NULL,
    courseid VARCHAR(128) NOT NULL,
    studentname VARCHAR(512),
    studentemail VARCHAR(512) NOT NULL,
    template VARCHAR(512) NOT NULL
);
