SELECT
  id,
  ((1000 * p1 + 100 * r1) / (10 * (p1 + p2) + r1 + r2 + p0)) AS loves
FROM likes