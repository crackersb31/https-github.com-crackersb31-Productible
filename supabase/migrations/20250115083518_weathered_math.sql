/*
  # Add delete policy for project evaluations

  1. Security
    - Add policy to allow public deletion of project evaluations
*/

-- Add delete policy
CREATE POLICY "Allow public delete access"
  ON project_evaluations
  FOR DELETE
  TO public
  USING (true);
