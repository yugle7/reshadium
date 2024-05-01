/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ryy5wmm5v6nr09l")

  collection.options = {
    "query": "SELECT\n  id,\n  SUM((1 - p) * (r = 0) * c) AS r0,\n  SUM((1 - p) * (r = 1) * c) AS r1,\n  SUM((1 - p) * (r = 2) * c) AS r2,\n  SUM(p * (r = 0) * c) AS p0,\n  SUM(p * (r = 1) * c) AS p1,\n  SUM(p * (r = 2) * c) AS p2\nFROM (\n  SELECT\n    id, p, r,\n    COUNT(*) AS c\n  FROM (\n    SELECT\n      problem_id AS id,\n      proved AS p,\n      react as r\n    FROM problem_reacts\n  )\n  GROUP BY id, p, r\n)\nGROUP BY id"
  }

  // remove
  collection.schema.removeField("a0w1hewi")

  // remove
  collection.schema.removeField("jizpd3co")

  // remove
  collection.schema.removeField("5w0deskh")

  // remove
  collection.schema.removeField("cxmfx6n6")

  // remove
  collection.schema.removeField("ngs7w2ei")

  // remove
  collection.schema.removeField("qtjnf5ss")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dzh6nagy",
    "name": "r0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zrilibl1",
    "name": "r1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8wkyrfng",
    "name": "r2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jpgetezv",
    "name": "p0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p0hs26de",
    "name": "p1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qibwjht",
    "name": "p2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ryy5wmm5v6nr09l")

  collection.options = {
    "query": "SELECT\n  id,\n  SUM((1 - p) * (r = 0) * c) AS r0,\n  SUM((1 - p) * (r = 1) * c) AS r1,\n  SUM((1 - p) * (r = 2) * c) AS r2,\n  SUM(p * (r = 0) * c) AS p0,\n  SUM(p * (r = 1) * c) AS p1,\n  SUM(p * (r = 2) * c) AS p2\nFROM (\n  SELECT\n    id, p, r,\n    COUNT(*) AS c\n  FROM (\n    SELECT\n      problem_id AS id,\n      (progress = 5) AS p,\n      react as r\n    FROM solutions\n  )\n  GROUP BY id, p, r\n)\nGROUP BY id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a0w1hewi",
    "name": "r0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jizpd3co",
    "name": "r1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5w0deskh",
    "name": "r2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cxmfx6n6",
    "name": "p0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ngs7w2ei",
    "name": "p1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qtjnf5ss",
    "name": "p2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("dzh6nagy")

  // remove
  collection.schema.removeField("zrilibl1")

  // remove
  collection.schema.removeField("8wkyrfng")

  // remove
  collection.schema.removeField("jpgetezv")

  // remove
  collection.schema.removeField("p0hs26de")

  // remove
  collection.schema.removeField("5qibwjht")

  return dao.saveCollection(collection)
})
