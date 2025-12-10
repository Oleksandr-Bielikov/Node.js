# DB, collection

```javascript
use site
show dbs
show collections
```

## Base

Gets all documents from collection:
```javascript
db.users.find()
```

Choose fields:
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0})
```

Limits:
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).limit(4)
```

Sort result
```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : 1}).limit(4)


db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : -1}).limit(4)
```

Skips some results

```javascript
db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : 1}).skip(1).limit(4)


db.users.find({}, {name : 1, age : 1, _id : 0}).sort({age : -1}).skip(1).limit(4)
```

Find min and max value

```javascript
db.users.find({}, {age : 1, _id : 0}).sort({age : 1}).limit(1)

db.users.find({}, {age : 1, _id : 0}).sort({age : -1}).limit(1)
```

Field exists

```javascript
db.users.find({notes : {$exists: true}}, {name : 1, notes: 1, _id: 0})

db.users.find({notes : {$exists: false}}, {name : 1, notes: 1, _id: 0})
```



## Find

several criteria

```javascript
db.users.find({active : true}, {name : 1, active:1, role: 1,  _id: 0})
db.users.find({active : true, role : 'user'}, {name : 1, active:1, role: 1,  _id: 0})

```

Expressions $and / $or

```javascript
db.users.find({$and : [{age: 22}, {age:40}]}, {name : 1, age: 1, role: 1,  _id: 0})
db.users.find({$or : [{age: 22}, {age:40}]}, {name : 1, age: 1, role: 1,  _id: 0})
```

Expressions $ne

```javascript
db.users.find({role : {$ne : "admin"}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions $nin

```javascript
db.users.find({role : {$nin : ["admin", "user"]}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions $in

```javascript
db.users.find({role : {$in : ["admin", "user"]}}, {name : 1, age: 1, role: 1,  _id: 0})

```

Expressions is greater / is less

```javascript
db.users.find({age : {$gt : 30}}, {name: 1, age : 1, _id : 0})
db.users.find({age : {$gte : 30}}, {name: 1, age : 1, _id : 0})

db.users.find({age : {$lt : 30}}, {name: 1, age : 1, _id : 0})
db.users.find({age : {$lte : 30}}, {name: 1, age : 1, _id : 0})
```

Ranges

```javascript
db.users.find({$and : [{age : {$gte : 25}}, {age : {$lte : 30}}]}, {name: 1, age : 1, _id : 0})

db.users.find({$or : [{age : {$lt : 25}}, {age : {$gt : 30}}]}, {name: 1, age : 1, _id : 0})

db.users.find({
  age: { $not: { $gt: 25 } }
},{name: 1, age : 1, _id : 0})

```

Dot notation

```javascript
db.users.find(
    {"address.country" : "UA"},
    {name: 1, age : 1, _id : 0, address: 1})
```

```javascript
db.users.find(
    {"address.country" : {$ne: "UA"}},
    {name: 1, age : 1, _id : 0, address: 1})
```

## Find in array

Value of array

```javascript
db.users.find(
    { tags : "js"},
    {name: 1, age : 1, _id : 0, tags: 1})
```

Size of array

```javascript
db.users.find(
    { tags : {$size: 2}},
    {name: 1, age : 1, _id : 0, tags: 1})
```

all values from array

```javascript
db.users.find(
    { tags : {$all: ["js", "node"]}},
    {name: 1, age : 1, _id : 0, tags: 1})
```

## Test search

** create index before use
create index

```javascript
db.goods.createIndex({ title: "text"});
```


```javascript
db.goods.find(
    {$text: {$search : "pro"}},
    {title: 1, _id :0}
)
```
```javascript
db.goods.find({$text: {$search: "\"Samsung Galaxy\""}},
    {title: 1, _id :0}
)
```

RegExp
```javascript
db.goods.find(
  { $text: { $search: "iphone pro -max" } },
  { title: 1 }
)
```