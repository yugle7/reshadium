SELECT
  id,
  SUM((1 - p) * (r = 0) * c) AS r0,
  SUM((1 - p) * (r = 1) * c) AS r1,
  SUM((1 - p) * (r = 2) * c) AS r2,
  SUM(p * (r = 0) * c) AS p0,
  SUM(p * (r = 1) * c) AS p1,
  SUM(p * (r = 2) * c) AS p2
FROM (
  SELECT
    id, p, r,
    COUNT(*) AS c
  FROM (
    SELECT
      problem_id AS id,
      (progress = 5) AS p,
      react as r
    FROM solutions
  )
  GROUP BY id, p, r
)
GROUP BY id