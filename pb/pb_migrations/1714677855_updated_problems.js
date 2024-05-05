/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("27rpm5hb2squrua")

  // remove
  collection.schema.removeField("fjtzadqr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s7y4n20e",
    "name": "rule",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("s7y4n20e")

  return dao.saveCollection(collection)
})
