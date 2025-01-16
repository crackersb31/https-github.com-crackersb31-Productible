/*
  # Add GEH and GU fields to project_evaluations

  1. Changes
    - Add `geh_name` column to store the GEH name
    - Add `gu_name` column to store the GU name
    - Both columns are required (NOT NULL)
    - Add default empty string for existing records
*/

DO $$ 
BEGIN
  -- Add geh_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'project_evaluations' AND column_name = 'geh_name'
  ) THEN
    ALTER TABLE project_evaluations 
    ADD COLUMN geh_name text NOT NULL DEFAULT '';
  END IF;

  -- Add gu_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'project_evaluations' AND column_name = 'gu_name'
  ) THEN
    ALTER TABLE project_evaluations 
    ADD COLUMN gu_name text NOT NULL DEFAULT '';
  END IF;
END $$;
