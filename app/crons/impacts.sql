SELECT
  id,
  SUM(i) AS impact
FROM (
  SELECT
    reviewer_id AS id,
    (1 + (progress = 5)) AS i
  FROM solutions
  WHERE reviewer_id > ''
  UNION ALL
  SELECT
    author_id AS id,
    (5 + 10 * (status > 0) + 20 * (status = 5)) AS i
  FROM problems
  WHERE author_id > ''
)
GROUP BY id