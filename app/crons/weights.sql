SELECT
  id,
  MAX(1, 5 - (ROW_NUMBER() OVER(ORDER BY p DESC)) / 100) AS weight
FROM (
  SELECT
    steps.id as id, 
    ((10 * p1 + 9 * p2 + 8 * p3 + 7 * p4) / (10 * s1 + s2 + s3 + s4 + 
  1.)) AS p
  FROM (
    steps
    INNER JOIN
    (SELECT id FROM problems WHERE weight > 0) AS p
    ON steps.id = p.id
  )
)