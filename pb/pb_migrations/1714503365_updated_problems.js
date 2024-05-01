/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("27rpm5hb2squrua")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjtzadqr",
    "name": "rule",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("27rpm5hb2squrua")

  // remove
  collection.schema.removeField("fjtzadqr")

  return dao.saveCollection(collection)
})
