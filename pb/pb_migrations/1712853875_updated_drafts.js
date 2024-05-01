/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jt9uplsh",
    "name": "problem",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s5bkhyoqatb3tpu")

  // remove
  collection.schema.removeField("jt9uplsh")

  return dao.saveCollection(collection)
})
