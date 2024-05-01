/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uhi133mn6ewt4vh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nifzdbpq",
    "name": "7",
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
  const collection = dao.findCollectionByNameOrId("uhi133mn6ewt4vh")

  // remove
  collection.schema.removeField("nifzdbpq")

  return dao.saveCollection(collection)
})
