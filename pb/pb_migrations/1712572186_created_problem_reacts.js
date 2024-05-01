/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4isx6bph0xlmxtv",
    "created": "2024-04-08 10:29:46.465Z",
    "updated": "2024-04-08 10:29:46.465Z",
    "name": "problem_reacts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mejgtyvq",
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
      },
      {
        "system": false,
        "id": "fdhpsfu7",
        "name": "profile_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ivzecxzp",
        "name": "problem_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "27rpm5hb2squrua",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_vB4RTqp` ON `problem_reacts` (`profile_id`)",
      "CREATE INDEX `idx_yNYcjep` ON `problem_reacts` (`problem_id`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4isx6bph0xlmxtv");

  return dao.deleteCollection(collection);
})
