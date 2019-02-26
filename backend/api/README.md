# API with Swagger

## Description

This Directory contains API files and documenation

## Environment

* __OS:__ Ubuntu 14.04 LTS
* __language:__ Python 3.4.3
* __application server:__ Flask 0.12.2
* __web server gateway:__ gunicorn (version 19.7.1)
* __database:__ mysql Ver 14.14 Distrib 5.7.18
* __Style:__
  * __python:__ PEP 8 (v. 1.7.0)

## Testing API

* Execute program:

```
API_HOST=0.0.0.0 API_PORT=5001 python3 -m api.v1.app
```

* Testing from CLI:

```
curl -X GET http://0.0.0.0:5000/api/v1/[YOUR API REQUEST]
```
