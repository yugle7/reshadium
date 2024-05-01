SELECT
  id,
  SUM((s > 0) * c) AS s1,
  SUM((s > 1) * c) AS s2,
  SUM((s > 2) * c) AS s3,
  SUM((s > 3) * c) AS s4,
  SUM(p * (s = 1) * c) AS p1,
  SUM(p * (s = 2) * c) AS p2,
  SUM(p * (s = 3) * c) AS p3,
  SUM(p * (s = 4) * c) AS p4
FROM (
  SELECT
    id, p, s,
    COUNT(*) AS c
  FROM (
    SELECT
      problem_id AS id,
      (progress = 5) AS p,
      MIN(4, step / 2) AS s
    FROM solutions
    WHERE step > 1
  )
  GROUP BY id, p, s
)
GROUP BY id