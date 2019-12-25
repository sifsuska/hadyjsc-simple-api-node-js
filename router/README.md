## Role

#### Create
route
```{host}/role/create```

role : controller
create : action

data body (form url encoded)
scope : string (e.g *admin*)
description : string (e.g *this is super admin*)

result : json
```{
  "message": "New role is created",
  "result": {
    "id": 1,
    "scope": "admin",
    "description": "this is super admin",
    "created_at": "1577293487",
    "created_by": null,
    "updated_at": null,
    "updated_by": null,
    "deleted_at": null,
    "deleted_by": null
  }
}```

## Registration
registration route (POST)
```{host}/register```

register : controller
index : action

data body
fullname : string (e.g Hady Eka Saputra)
email : string (e.g service.hady@gmail.com)
role : integer (e.g 1)

result : json
```{
  "message": "Thank you for signing up, you must verify your email address.",
  "newUser": {
    "id": 1,
    "email": "service.hady@gmail.com",
    "username": "service.hady1577293721557",
    "password": "$2a$13$GU4mz4Xa1fzkcirK.JPcSOhNpY7Qjugf1WjqteRAVeUGJ7VjpQDUC",
    "fullname": "Hady Eka Saputra",
    "verification_token": "hNF0AmjNOvYnPpH73aejqMv97sQf3YOG3LBhgz2Mu1sEEfce3l",
    "status": 1,
    "created_at": "1577293722",
    "auth_key": null,
    "role_id": null,
    "login_pin": null,
    "password_reset_token": null,
    "created_by": null,
    "updated_at": null,
    "updated_by": null,
    "deleted_at": null,
    "deleted_by": null
  }
}```

verify route (GET)
```{host}/verify/email/:email/token/:token```

result : json
```{
  "message": "Your account successfully for activate, you can log in to application",
  "updated": [
    1
  ]
}```
## Login