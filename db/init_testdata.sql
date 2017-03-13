
insert into mailqueue (
    deliveron,
    coursename,
    courseid,
    studentname,
    studentemail,
    template
) values (
    to_char(current_timestamp, 'YYYY/MM/DD'),
    'Hello D3.js',
    'test001-hello_d3',
    'Michael Bowman',
    'bowmanmc@gmail.com',
    's3:bucket:location'
);
