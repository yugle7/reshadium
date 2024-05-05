// onAfterBootstrap((e) => {
//     // const src = '/Users/gleb/Projects/sveltekit/reshadium/pb/pb_hooks';
//     const src = '/pb/pb_hooks';

//     const count = new Array(2000).fill(0);
//     {
//         const collection = $app.dao().findCollectionByNameOrId("users");
//         const data = require(src + '/users.json')

//         for (const d of data) {
//             d.password = d.passwordConfirm = d.id;
//             d.email = d.username + '@reshadium.ru';

//             count[d.rating]++;

//             try {
//                 const record = new Record(collection)
//                 const form = new RecordUpsertForm($app, record)
//                 form.loadData(d)
//                 form.submit()
//             } catch (err) {
//                 console.log(JSON.stringify(d));
//                 console.log(err.message);
//             }
//         }
//     }
//     {
//         const collection = $app.dao().findCollectionByNameOrId('positions');

//         let users = 1;
//         $app.dao().runInTransaction((txDao) => {
//             for (let r = count.length - 1; r >= 0; r--) {
//                 try {
//                     const record = new Record(collection, { id: String(r).padStart(15, '0'), users });
//                     txDao.saveRecord(record);
//                 } catch (err) {
//                     console.log(err.message);
//                 }
//                 users += count[r];
//             }
//         });
//     }
//     for (let key of ["discussions", "problems"]) {
//         console.log(key);

//         const collection = $app.dao().findCollectionByNameOrId(key);
//         const data = require(`${src}/${key}.json`);

//         $app.dao().runInTransaction((txDao) => {
//             for (const d of data) {
//                 try {
//                     const record = new Record(collection, d);
//                     txDao.saveRecord(record);
//                 } catch (err) {
//                     console.log(JSON.stringify(d));
//                     console.log(err.message);
//                 }
//             }
//         });
//     }
// })
