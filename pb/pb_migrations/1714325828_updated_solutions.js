/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lyfhfpwoteyvl0q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihhksfns",
    "name": "react",
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
  const collection = dao.findCollectionByNameOrId("lyfhfpwoteyvl0q")

  // remove
  collection.schema.removeField("ihhksfns")

  return dao.saveCollection(collection)
})
