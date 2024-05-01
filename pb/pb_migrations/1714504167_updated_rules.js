/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("galg16e6uj4k8x9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "icfu2sxf",
    "name": "problem_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "27rpm5hb2squrua",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("galg16e6uj4k8x9")

  // remove
  collection.schema.removeField("icfu2sxf")

  return dao.saveCollection(collection)
})
