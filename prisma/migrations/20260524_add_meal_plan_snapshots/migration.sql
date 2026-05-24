ALTER TABLE meal_plans
  ADD COLUMN IF NOT EXISTS snapshot_recipe_name jsonb,
  ADD COLUMN IF NOT EXISTS snapshot_json_data jsonb,
  ADD COLUMN IF NOT EXISTS snapshot_image_url text;

UPDATE meal_plans mp
SET
  snapshot_recipe_name = COALESCE(mp.snapshot_recipe_name, r.recipe_name),
  snapshot_json_data = COALESCE(mp.snapshot_json_data, r."jsonData"),
  snapshot_image_url = COALESCE(mp.snapshot_image_url, r.image_url)
FROM recipes r
WHERE mp.recipe_id = r.id;

DO $$
DECLARE
  constraint_name text;
BEGIN
  SELECT tc.constraint_name INTO constraint_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'meal_plans'
    AND kcu.column_name = 'recipe_id'
  LIMIT 1;

  IF constraint_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE meal_plans DROP CONSTRAINT %I', constraint_name);
  END IF;
END $$;

ALTER TABLE meal_plans
  ADD CONSTRAINT "FK_meal_plans_recipe_id_recipes_id"
  FOREIGN KEY (recipe_id)
  REFERENCES recipes(id)
  ON DELETE SET NULL;
