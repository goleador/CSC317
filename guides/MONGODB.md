# MongoDB Crash Course

MongoDB is a popular NoSQL document database that provides high performance, high availability, and easy scalability. This crash course covers the essentials you need to get started with MongoDB.

## Table of Contents
- [Installation](#installation)
- [Basic Concepts](#basic-concepts)
- [Starting MongoDB Server](#starting-mongodb-server)
- [MongoDB Shell](#mongodb-shell)
- [CRUD Operations](#crud-operations)
  - [Create](#create)
  - [Read](#read)
  - [Update](#update)
  - [Delete](#delete)
- [Advanced Queries](#advanced-queries)
- [Indexing](#indexing)
- [Aggregation](#aggregation)
- [Best Practices](#best-practices)

## Installation

### On Windows
1. Download the MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the instructions
3. Add MongoDB's bin directory to your system PATH

### On macOS
Using Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
```

### On Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Basic Concepts

MongoDB stores data in flexible, JSON-like documents called BSON (Binary JSON). Key concepts include:

- **Database**: Container for collections
- **Collection**: Group of documents (similar to a table in relational databases)
- **Document**: A record in a collection (similar to a row in a relational database)
- **Field**: A key-value pair in a document
- **_id**: Unique identifier automatically added to each document

## Starting MongoDB Server

### On Windows
```bash
mongod --dbpath="C:\data\db"
```

### On macOS/Linux
```bash
sudo systemctl start mongod   # For systems using systemd
# OR
sudo service mongod start     # For systems using System V
# OR
mongod --dbpath /data/db      # Manual start
```

To verify the server is running:
```bash
mongosh
```

## MongoDB Shell

MongoDB provides a powerful interactive shell called `mongosh`. To connect:

```bash
mongosh
```

Basic shell commands:
```javascript
// Show all databases
show dbs

// Switch to a database (creates it if it doesn't exist)
use myDatabase

// Show collections in current database
show collections

// Display help
help
```

## CRUD Operations

### Create

#### Insert a Single Document
```javascript
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  status: "active"
})
```

#### Insert Multiple Documents
```javascript
db.users.insertMany([
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    status: "active"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 42,
    status: "inactive"
  }
])
```

### Read

#### Find All Documents
```javascript
db.users.find()
```

#### Find with Formatting
```javascript
db.users.find().pretty()
```

#### Find the First Document
```javascript
db.users.findOne()
```

#### Find with Specific Criteria
```javascript
db.users.find({ status: "active" })
```

#### Find with Selected Fields (Projection)
```javascript
// Include only name and email (1 = include)
db.users.find({}, { name: 1, email: 1 })

// Exclude age (0 = exclude)
db.users.find({}, { age: 0 })
```

#### Limit Results
```javascript
db.users.find().limit(2)
```

#### Skip Results
```javascript
db.users.find().skip(1)
```

#### Sort Results
```javascript
// Ascending order (1)
db.users.find().sort({ age: 1 })

// Descending order (-1)
db.users.find().sort({ age: -1 })
```

### Update

#### Update a Single Document
```javascript
db.users.updateOne(
  { name: "John Doe" },  // filter
  { $set: { age: 31 } }  // update
)
```

#### Update Multiple Documents
```javascript
db.users.updateMany(
  { status: "inactive" },  // filter
  { $set: { status: "active" } }  // update
)
```

#### Replace a Document
```javascript
db.users.replaceOne(
  { name: "John Doe" },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 32,
    status: "active",
    interests: ["sports", "music"]
  }
)
```

### Delete

#### Delete a Single Document
```javascript
db.users.deleteOne({ name: "John Doe" })
```

#### Delete Multiple Documents
```javascript
db.users.deleteMany({ status: "inactive" })
```

#### Delete All Documents
```javascript
db.users.deleteMany({})
```

## Advanced Queries

### Comparison Operators

```javascript
// Greater than
db.users.find({ age: { $gt: 30 } })

// Greater than or equal
db.users.find({ age: { $gte: 30 } })

// Less than
db.users.find({ age: { $lt: 30 } })

// Less than or equal
db.users.find({ age: { $lte: 30 } })

// Not equal
db.users.find({ status: { $ne: "active" } })

// In array
db.users.find({ status: { $in: ["active", "pending"] } })

// Not in array
db.users.find({ status: { $nin: ["inactive", "disabled"] } })
```

### Logical Operators

```javascript
// AND
db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { status: "active" }
  ]
})

// OR
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } }
  ]
})

// NOT
db.users.find({
  age: { $not: { $gt: 30 } }
})

// NOR
db.users.find({
  $nor: [
    { status: "inactive" },
    { age: { $lt: 18 } }
  ]
})
```

### Element Operators

```javascript
// Check if field exists
db.users.find({ phone: { $exists: true } })

// Check field type
db.users.find({ age: { $type: "number" } })
```

### Array Operators

```javascript
// Array contains element
db.posts.find({ tags: "mongodb" })

// Array contains all elements
db.posts.find({ tags: { $all: ["mongodb", "database"] } })

// Array size
db.posts.find({ tags: { $size: 3 } })

// Element match in array
db.inventory.find({ dimensions: { $elemMatch: { $gt: 10, $lt: 20 } } })
```

### Regular Expressions

```javascript
// Find documents where name starts with "J"
db.users.find({ name: /^J/ })

// Case insensitive search
db.users.find({ name: /john/i })
```

## Indexing

Indexes improve query performance but add overhead to write operations.

### Create a Single Field Index
```javascript
db.users.createIndex({ email: 1 })  // 1 for ascending, -1 for descending
```

### Create a Compound Index
```javascript
db.users.createIndex({ status: 1, age: -1 })
```

### Create a Unique Index
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
```

### View Indexes
```javascript
db.users.getIndexes()
```

### Drop an Index
```javascript
db.users.dropIndex("email_1")
```

## Aggregation

The aggregation pipeline is a powerful way to transform and analyze data.

### Basic Example
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
```

### Common Aggregation Stages

#### $match
```javascript
// Filter documents
db.users.aggregate([
  { $match: { age: { $gt: 25 } } }
])
```

#### $group
```javascript
// Group by status and count
db.users.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" }
    }
  }
])
```

#### $project
```javascript
// Shape the output document
db.users.aggregate([
  {
    $project: {
      _id: 0,
      fullName: "$name",
      isAdult: { $gte: ["$age", 18] }
    }
  }
])
```

#### $sort
```javascript
// Sort the documents
db.users.aggregate([
  { $sort: { age: -1 } }
])
```

#### $limit
```javascript
// Limit the number of documents
db.users.aggregate([
  { $limit: 5 }
])
```

#### $unwind
```javascript
// Deconstruct an array field
db.inventory.aggregate([
  { $unwind: "$tags" }
])
```

#### $lookup
```javascript
// Join with another collection
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  }
])
```

## Best Practices

1. **Design your schema for your query patterns** - Unlike relational databases, denormalization is often beneficial in MongoDB
2. **Use appropriate indexes** - But be aware of the overhead they add to write operations
3. **Limit the size of your documents** - MongoDB has a 16MB document size limit
4. **Use aggregation for complex data analysis** - It's more efficient than multiple queries
5. **Ensure proper security measures** - Set up authentication and proper network security
6. **Regularly backup your data** - Use MongoDB's built-in backup solutions
7. **Monitor performance** - Use MongoDB Compass or monitoring tools

## Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University - Free Courses](https://university.mongodb.com/)
- [MongoDB Compass - GUI Tool](https://www.mongodb.com/products/compass)

---

This crash course covers the fundamentals of MongoDB. As you become more comfortable with these concepts, explore advanced topics like sharding, replication, and more complex aggregation pipelines.