FROM postgres

# Copy sql to init db
ADD init_schema.sql /docker-entrypoint-initdb.d/
ADD init_testdata.sql /docker-entrypoint-initdb.d/

# Set env vars
ENV POSTGRES_USER=qb
ENV POSTGRES_PASSWORD=qb
ENV POSTGRES_DB=qb
