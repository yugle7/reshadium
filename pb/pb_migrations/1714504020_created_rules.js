/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "galg16e6uj4k8x9",
    "created": "2024-04-30 19:07:00.972Z",
    "updated": "2024-04-30 19:07:00.972Z",
    "name": "rules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rbirpkpd",
        "name": "regexp",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3ats8kvo",
        "name": "match",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("galg16e6uj4k8x9");

  return dao.deleteCollection(collection);
})
