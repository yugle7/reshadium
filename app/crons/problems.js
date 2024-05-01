routerAdd("GET", "/problems", (c) => {

  const problems = arrayOf(new DynamicModel({ id: '', weight: 0 }));
  $app.dao().db().newQuery("SELECT id, weight FROM problems;").all(problems);

  const dst = {};
  problems.forEach(p => dst[p.id] = {});

  // step

  let src = arrayOf(new DynamicModel({
    id: '',
    s1: 0, s2: 0, s3: 0, s4: 0,
    p1: 0, p2: 0, p3: 0, p4: 0
  }));
  $app.dao().db().newQuery("SELECT * from steps;").all(src);

  function getStep(s) {
    const q1 = s.p1 / (s.s1 + .1);
    const q2 = s.p2 / (s.s2 + .1);
    const q3 = s.p3 / (s.s3 + .1);
    const q4 = s.p4 / (s.s4 + .1);

    const step = q1 + (1 - q1) * (2 * q2 + (1 - q2) * (3 * q3 + (1 - q3) * (5 - q4)));
    return Math.floor(10 * step) / 10;
  }
  src.forEach(s => dst[s.id].step = getStep(s));

  // weight

  function getRate(s) {
    return (10 * s.p1 + 9 * s.p2 + 8 * s.p3 + 7 * s.p4) / (10 * s.s1 + s.s2 + s.s3 + s.s4 + 1.);
  }
  const weights = new Set(problems.filter(p => p.weight > 0).map(p => p.id));

  src = src.filter(s => weights.has(s.id)).map(s => ({ id: s.id, r: getRate(s) }));
  src.sort((a, b) => (a.r - b.r))

  function getWeight(i) {
    return Math.max(5 - Math.floor(i / 100), 1);
  }
  src.forEach((s, i) => dst[s.id].weight = getWeight(i));

  // like

  src = arrayOf(new DynamicModel({
    id: '',
    r0: 0, r1: 0, r2: 0,
    p0: 0, p1: 0, p2: 0
  }));
  $app.dao().db().newQuery("SELECT * from likes;").all(src);

  function getLike(r) {
    return Math.floor(100 * (10 * r.p1 + r.r1) / (10 * (r.p1 + r.p2) + r.r1 + r.r2 + r.p0));
  }
  src.forEach(r => dst[r.id].like = getLike(r));

  // problems

  const records = arrayOf(new Record);
  $app.dao().recordQuery('problems').all(records);

  // $app.dao().runInTransaction((tx) => {
  //   for (let record of records) {
  //     const { step, weight, like } = dst[record.id];

  //     record.set('step', step || 0);
  //     record.set('weight', weight || 0);
  //     record.set('like', like || 0);

  //     tx.saveRecord(record);
  //   }
  // });

  return c.json(200, dst)
})