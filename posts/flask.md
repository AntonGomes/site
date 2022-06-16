---
title: Making a Lightweight Backend JSON with Flask
description: Need a quick and easy backend server? Read on to learn how to read and write a JSON the using Python and the Flask framework.
date: 27/05/2022
readTime: 534
---


## Overview
In this tutorial, I'll deomnstrate how to create a flask app with two simple functions. Read a json and write to a json. No more, no less. This is because for simple sites, such as for personal use or to display a small project, a simple backend is all that's neccessary. With no SQL, no databases, just a json and an app.

## Stack
I used Python for its popularity, readability, and ease of use. The Flask framework, while primarily used as its own web development framework, is very useful for hosting simple backend data structures thanks to its simplicity. 

## Getting started
Create the project: 
```.bash
mkdir project
```
In your project directory add or initiate the json you wish to manipulate; I'll call mine 'person.json':
```shell
touch person.json
```
You'll want to add some data, so you have something to work with: 
```json
{
  "name": "anton", 
  "age": "19", 
  "skill-level": 9000
}
```

Now create an app directory (still within the project directory): 
```shell
mkdir app.py 
```
In the app directory create a python file called `main.py` ; this is where we'll create the app: 
```shell
touch main.py
```

## Building the app
First of all, let's import all of our dependencies. We'll just need the 'flask' class (from the Flask framework) and the 'json' API (python's inbuilt API used to work with json files). 

At the top of the file write: 

```py
from flask import Flask
import json
```

We then create an instanciation of the Flask class:
```py
app = Flask(__name__)
```

Now, we'll need two functions, which we can call on our json: one to read and one to write. I'll show each of the functions below, with a short descrpiton of how they work.

## Reading the Json

```py
def readFromJson(j): 
    file = open(j,'r')
    data = json.load(file)
    return data
```

First of all, we pass in the name of the file we want to read with a string `'j'`.

Now to access the file we use `open()` which takes two parameters: our file `'j'` and the `mode` in which we want to open it. We'll use `'r'` as we are *reading* the file. 

We assign the opened file to a variable `'file'`.

Then parse (i.e. read) '`file`' using `json.load()`. This converts the data in the json to a python dictionary.

We assign this to a variable `'data'` and return it.

*N.B.* `json`s and python dictionaries have an almost identical structure, allowing us to convert between them with no loss in information.

## Writing to the Json

In this example we are replacing a person's data, i.e. name, age, skill level. 
```py
def writeToJson(j, object, value):
    file = open(j, 'r+', encoding='utf-8')
    data = json.load(file)
    data[object] = value
    f.seek(0)
    json.dump(data, file)
    file.truncate()
    file.close()
```


To write to a json we pass in three parameters. 

The json file we are writing to:

```
    j (string)
```

An object whose data we want to alter: 

```
    object (string)
```

Some information to give to the object 

```
    value (any json supported data type )
```

As before, we `open` and `load` the file so that we have a dictionary with the contents of the json.

You might notice we also included *encoding* parameter. We chose `utf-8` as this is the standard unicode bit size, though this is essentially just a precaution.

We then access the object we want to change in the dictionary with `data[object]`, and assign it the new information.

Now that we've loaded the file, we move the cursor back to the start of the json with `f.seek(0)`, then use `json.dump()` to update the file.

For good practice, we have `file.truncate()` and `file.close()`. 

`truncate` will change the file size if the new data is smaller than the previous, and `close` will close the file.

## Adding App Routes

The app routes simply give us somewhere to call our functions. They are python functions which, when we host the app, can be accesed through url routes.

We set the default url to call the `readFromJson()` function:

```py
@app.route("/")
def getJson():
    return readFromJson('person.json')
```

Then we have to crate a route which calls `wirteToJson()`. We have three objects in our json, we can name the route depending on which object we want to write to. I'll use `name` as an example: 

```py
@app.route("/setName")
def setJson():
    newName  = request.args['name']
    writeToJson('person.json', name, newName)
```

To call this function and pass in our new data, we use a URL query. Simply add `?` after the url and specify the argument:

```
https://example.com/setName?name=shmanton
```
Then `request.args['name']` picks up this query and assigns our new value to `newName`, which is passed into `writeToJson()`.

## Test it out! 

Create another python file called wsgi.py in your project directory (not within app). 
    
*Note:*
`'wsgi'` stands for Web Server Gateway Interface and is just a calling convention used for web servers to forward requests to web apps.

In `wsgi.py` write:

```py
from app.main import app
if __name__ == "__main__":
    app.run()
```

This simply imports and runs our app, so if we want to try it out, all we need to do is run the wsgi.

```py
$ python3 wsgi.py
```

`Crtl` click on the link provided (usually http://127.0.0.1:5000) to view your json. This url is running our getJson() function.

Now we can use routes and queries just as in the example above:
```
http://127.0.0.1:5000/setJson?name=shmanton
```
#### before
```json
{
  "name": "anton",
  "age": 19,
  "skill-level": 9000
}
```

#### after
```json
{
  "name": "shmanton",
  "age": 19,
  "skill-level": 9000
}
```
And that's it! Your very own mini database. You can easily change the functions we wrote to allow you to edit your json further (i.e. append, overwrite, etc.). 

Use cases include an online leaderboard, a commenting system, or even my very own [bordle](https://antongomes.com/bordle) project!

If you want to deploy your app, I highly reccomend Heroku. It's free to use, easy to understand ad has excellent documentation. And the cherry on top... **I have a tutorial coming soon!** 

Of course you can use [the official tutorial](https://devcenter.heroku.com/articles/git) in the meantime, promise I won't take offence ;).
