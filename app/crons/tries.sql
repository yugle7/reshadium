SELECT
  id,
  (q1 + (1 - q1) * (2 * q2 + (1 - q2) * (3 * q3 + (1 - q3) * (5 - q4)))) as tries
FROM (
  SELECT
    id,
    (p1 / (s1 + .1)) as q1,
    (p2 / (s2 + .1)) as q2,
    (p3 / (s3 + .1)) as q3,
    (p4 / (s4 + .1)) as q4
  FROM steps
)