# note app API modified from the class repo (https://github.com/codefellows/seattle-javascript-401d8)

# Resources
* List
``` javascript
{
  _id: String, 
  name: String,
  notes: [Note]
}
```

* Note
``` javascript
{
  _id: String,
  name: String,
  content: String,
  listId: List._id,

}
```

# List Endpoints
## POST `/api/list`
> To create a new list make a POST request to `/api/list`   

* expected Headers
 * `Accept: application/json`
 * `Content-Type: application/json`
* expected JSON data 
``` JSON
{
  "name": "todo list"
}
```  
#### Response
``` JSON
{
  "_id": "57a10f8653481f70fc61f71d",
  "_v": 0,
  "name": "todo list",
  "notes": []
}
```

## GET`/api/list/:id`
> To fetch a specific list make a GET request to `/api/list/:id`  

* expected Headers
 * `Accept: application/json`  

#### Response
``` JSON
{
  "_id": "57a10f8653481f70fc61f71d",
  "_v": 0,
  "name": "todo list",
  "notes": []
}
```

## GET`/api/list`
> To fetch an array of all the lists make a GET request to `/api/list`  

* expected Headers
 * `Accept: application/json`

#### Response
``` JSON
[
  {
    "_id": "57a10f8653481f70fc61f71d",
    "_v": 0,
    "name": "todo list",
    "notes": []
  },
  {
    "_id": "57a10f8653481f70fcaslfdk",
    "_v": 0,
    "name": "work list",
    "notes": []
  }
]
```

## PUT `/api/list/:id`
> To update an existing list make a PUT request to `/api/list/:id`   

* expected Headers
 * `Accept: application/json`
 * `Content-Type: application/json`
* expected JSON data 
``` JSON
{
  "name": "example list name"
} 
```  
#### Response
``` JSON
{
  "_id": "57a10f8653481f70fc61f71d",
  "_v": 0,
  "name": "example list name",
  "notes": []
}
```

## DELETE `/api/list/:id`
> To delete a specific list make a GET request to `/api/list/:id`  

* expected Headers
 * `Accept: application/json`  

#### Response 
``` JSON
{
  "_id": "5ka10f8653481f70fc61f71d",
  "_v": 0,
  "name": "todo list",
  "notes": []
}
```


# Note Endpoints
## POST `/api/note`
> To create a new note make a POST request to `/api/note`   

* expected Headers
 * `Accept: application/json`
 * `Content-Type: application/json`
* expected JSON data 
``` JSON
{
  "name": "todo note",
  "content": "example note content",
  "listId": "57a10f8653481f70fc61f71d"
}
```  

#### Response
``` JSON
{
  "_id": "57a113957ada0d8307cd3e3e",
  "_v": 0,
  "name": "todo note",
  "content": "example note content",
  "listId": "57a10f8653481f70fc61f71d"
}
```

## GET`/api/note/:id`
> To fetch a specific note make a GET request to `/api/note/:id`  

* expected Headers
 * `Accept: application/json`  

#### Response
``` JSON
{
  "_id": "57a113957ada0d8307cd3e3e",
  "_v": 0,
  "name": "todo note",
  "content": "example note content",
  "listId": "57a10f8653481f70fc61f71d"
}
```

## GET`/api/note`
> To fetch an array of all the notes make a GET request to `/api/note`  

* expected Headers
 * `Accept: application/json`  
 
#### Response
``` JSON
[
  {
    "_id": "57a113957ada0d8307cd3e3e",
    "_v": 0,
    "name": "paint boat",
    "content": "example note content",
    "listId": "57a10f8653481f70fc61f71d"
  },
  {
    "_id": "57a113957ada0d8307cdf7ad",
    "_v": 0,
    "name": "clean car",
    "content": "example note content",
    "listId": "57a10f8653481f70fc61f71d"
  }
]
```

## PUT `/api/note/:id`
> To update an existing note make a PUT request to `/api/note/:id`   

* expected Headers
 * `Accept: application/json`
 * `Content-Type: application/json`
* expected JSON data 
 * optional name
 * optional content
``` JSON
{
  "name": "todo note",
  "content": "example note content",
}
```  

#### Response
``` JSON
{
  "_id": "57a113957ada0d8307cdf7ad",
  "_v": 0,
  "name": "todo note",
  "content": "example note content",
  "listId": "57a10f8653481f70fc61f71d"
}
```

## DELETE `/api/note/:id`
> To delete a specific note make a GET request to `/api/note/:id`  

* expected Headers
 * `Accept: application/json`  

#### Response
``` JSON
{
  "_id": "57a113957ada0d8307cdf7ad",
  "_v": 0,
  "name": "todo note",
  "content": "example note content",
  "listId": "57a10f8653481f70fc61f71d"
}
```


# Noteapp-backend
