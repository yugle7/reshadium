/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

  // remove
  collection.schema.removeField("mv1pzyvu")

  // remove
  collection.schema.removeField("s9a4bejq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cq5retvm",
    "name": "applied",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4vzruqru",
    "name": "deleted",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "biypubne",
    "name": "cancelled",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mv1pzyvu",
    "name": "applied",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s9a4bejq",
    "name": "deleted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("cq5retvm")

  // remove
  collection.schema.removeField("4vzruqru")

  // remove
  collection.schema.removeField("biypubne")

  return dao.saveCollection(collection)
})
