
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
    'https://s3.amazonaws.com/quickbits-resources/courses/qb001-hello_d3/01.html'
);

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
    'https://s3.amazonaws.com/quickbits-resources/courses/qb001-hello_d3/01.html'
);
