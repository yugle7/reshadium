SELECT
  id,
  (ROW_NUMBER() OVER(ORDER BY -rating, changed)) AS position,
  rating
FROM (
  SELECT
    id,
    SUM(weight) AS rating,
    MAX(changed) AS changed
  FROM (
    SELECT
      author_id AS id,
      problem_id,
      changed
    FROM solutions
    WHERE progress=5
  ) AS s
  INNER JOIN (
    SELECT
      id as problem_id,
      weight
    FROM problems
    WHERE weight > 0
  ) AS p
  on p.problem_id = s.problem_id
  GROUP BY id
)