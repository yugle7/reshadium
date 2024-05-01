/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4isx6bph0xlmxtv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjmczazm",
    "name": "proved",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4isx6bph0xlmxtv")

  // remove
  collection.schema.removeField("cjmczazm")

  return dao.saveCollection(collection)
})
