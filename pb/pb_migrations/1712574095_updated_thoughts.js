/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7a4zhd8g426mbq")

  collection.name = "discussion_reacts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7a4zhd8g426mbq")

  collection.name = "thoughts"

  return dao.saveCollection(collection)
})
