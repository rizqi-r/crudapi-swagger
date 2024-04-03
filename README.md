### Table movies

| id     | title  | director | release_year | is_available |
| ------ | ------ | -------- | ------------ | ------------ |
| Number | String | String   | Number       | Boolean      |

### API

##### Endpoint Listing all resources - GET /v1/movies
```http
GET http://localhost:3000/v1/movies
Content-Type: application/json
```
##### Endpoint Getting a resource - GET /v1/movies/:id
```http
GET http://localhost:3000/v1/movies/1
Content-Type: application/json
```
##### Endpoint Creating a resource - POST /v1/movies
```http
POST http://localhost:3000/v1/movies
Content-Type: application/json

{
    "title": "clean vote",
    "director": "rizqi",
    "release_year": 2023,
    "is_available": false
}
```
##### Endpoint Updating a resource - PUT /v1/movies/:id
```http
PUT http://localhost:3000/v1/movies/6
Content-Type: application/json

{
    "title": "clean vote",
    "director": "rizqi",
    "release_year": 2024,
    "is_available": false
}
```
##### Endpoint Deleting a resource - DELETE /v1/movies/:id
```http
DELETE http://localhost:3000/v1/movies/5
Content-Type: application/json
```

### SQL

```sql
CREATE database crudapi;
```

```sql
CREATE table movies (
    id bigserial primary key,
    title varchar(255) not null,
    director varchar(255) not null,
    release_year int not null,
    is_available boolean not null
);
```

```sql
INSERT INTO movies (title, director, release_year, is_available) VALUES
('Eternal Sunshine of the Spotless Mind', 'Michel Gondry', 2004, true),
('Breaking Bad', 'Vince Gilligan', 2008, true),
('Back to the Future', 'Robert Zemeckis', 1985, true),
('The Matrix', 'Lana Wachowski', 1999, true),
('Better Call Saul', 'Vince Gilligan', 2015, true);
```
