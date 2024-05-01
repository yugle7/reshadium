routerAdd("GET", "/users", (c) => {

  console.log('position and rating');

  let src = arrayOf(new DynamicModel({ id: '', position: 0, rating: 0 }));
  $app.dao().db().newQuery("SELECT * FROM positions;").all(src)

  const dst = {};
  src.forEach(({ id, position, rating }) => (dst[id] = { position, rating }));

  console.log('impact');

  src = arrayOf(new DynamicModel({ id: '', impact: 0 }));
  $app.dao().db().newQuery("SELECT * FROM impacts;").all(src);

  src.forEach(({ id, impact }) => (dst[id].impact = impact));

  console.log('users');

  const records = arrayOf(new Record);
  $app.dao().recordQuery('users').all(records);

  // $app.dao().runInTransaction((tx) => {
  //   for (let record of records) {
  //     if (dst[record.id]) {
  //       const { position, rating, impact } = dst[record.id];

  //       record.set('position', position);
  //       record.set('rating', rating);
  //       record.set('impact', impact);

  //       tx.saveRecord(record);
  //     }
  //   }
  // });

  return c.json(200, dst)
})