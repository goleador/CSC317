# MongoDB Complex Logical Queries

## Basic Pattern: (A AND B) OR C

```javascript
db.collection.find({
  $or: [
    { 
      $and: [
        { field1: value1 },  // Condition A
        { field2: value2 }   // Condition B
      ]
    },
    { field3: value3 }       // Condition C
  ]
})
```

## Practical Examples

### Example 1: Product Query

Find products that are either:
- Electronics with price under $500 OR
- On clearance sale

```javascript
db.products.find({
  $or: [
    {
      $and: [
        { category: "electronics" },
        { price: { $lt: 500 } }
      ]
    },
    { clearance: true }
  ]
})
```

### Example 2: User Query

Find users who are either:
- Premium members with active subscriptions OR
- Have free trial status

```javascript
db.users.find({
  $or: [
    {
      $and: [
        { membershipType: "premium" },
        { subscriptionStatus: "active" }
      ]
    },
    { accountStatus: "free-trial" }
  ]
})
```

### Example 3: Complex Document Conditions

Find documents that either:
- Have both tags "urgent" and "important" OR
- Were created in the last 24 hours

```javascript
db.tasks.find({
  $or: [
    {
      $and: [
        { tags: "urgent" },
        { tags: "important" }
      ]
    },
    { createdAt: { $gt: new Date(Date.now() - 24*60*60*1000) } }
  ]
})
```

## Simplified AND Syntax

MongoDB has an implicit AND when you specify multiple conditions in a single document:

```javascript
db.products.find({
  $or: [
    {
      category: "electronics",
      price: { $lt: 500 }
    },
    { clearance: true }
  ]
})
```

## More Complex Nested Logic

### (A AND B) OR (C AND D)

```javascript
db.collection.find({
  $or: [
    {
      $and: [
        { conditionA: true },
        { conditionB: true }
      ]
    },
    {
      $and: [
        { conditionC: true },
        { conditionD: true }
      ]
    }
  ]
})
```

### A AND (B OR C)

```javascript
db.collection.find({
  $and: [
    { conditionA: true },
    {
      $or: [
        { conditionB: true },
        { conditionC: true }
      ]
    }
  ]
})
```

## Practical Considerations

- MongoDB doesn't have a hard limit on nesting depth, but excessive nesting can:
  - Impact query performance
  - Make code harder to maintain
  - Potentially hit internal expression depth limits

- Consider using the aggregation pipeline for very complex logical conditions
- Well-designed data models often reduce the need for deeply nested logical expressions
- Compound indexes can improve performance for common query patterns
