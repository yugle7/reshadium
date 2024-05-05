/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("27rpm5hb2squrua")

  collection.indexes = [
    "CREATE INDEX `idx_j0jFo6D` ON `problems` (`slug`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "se5gikgy",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("27rpm5hb2squrua")

  collection.indexes = []

  // remove
  collection.schema.removeField("se5gikgy")

  return dao.saveCollection(collection)
})
