/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

  // remove
  collection.schema.removeField("biypubne")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

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
})
