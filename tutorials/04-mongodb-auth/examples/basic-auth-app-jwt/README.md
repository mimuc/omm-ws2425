# OMM JWT example project

## How to use

1. Login: Call localhost:3000/login and login with username _student_ and password _ommisawesome_. If successful, this will return a JWT token
2. Copy that JWT token and add it as url parameter to any further request like _localhost:3000?token==eyJ0eXAiOiJKV1QiLCJ..._