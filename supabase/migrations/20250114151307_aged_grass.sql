/*
  # Update RLS policies for project evaluations

  1. Changes
    - Remove existing RLS policies
    - Add new policies for public access
  
  2. Security
    - Enable public access for insert and select operations
    - This is safe for this specific use case as we want all users to be able to create and view evaluations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own evaluations" ON project_evaluations;
DROP POLICY IF EXISTS "Users can read their own evaluations" ON project_evaluations;

-- Create new public access policies
CREATE POLICY "Allow public insert access"
  ON project_evaluations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access"
  ON project_evaluations
  FOR SELECT
  TO public
  USING (true);
