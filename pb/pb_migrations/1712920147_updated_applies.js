/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ei9pgxln6nx97is")

  collection.name = "draft_reacts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ei9pgxln6nx97is")

  collection.name = "applies"

  return dao.saveCollection(collection)
})
