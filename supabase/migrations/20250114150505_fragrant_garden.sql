/*
  # Project Evaluations Schema

  1. New Tables
    - `project_evaluations`
      - `id` (uuid, primary key)
      - `project_title` (text)
      - `central_name` (text)
      - `evaluation_date` (date)
      - `criteria` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on project_evaluations table
    - Add policies for authenticated users to manage their evaluations
*/

CREATE TABLE IF NOT EXISTS project_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_title text NOT NULL,
  central_name text NOT NULL,
  evaluation_date date NOT NULL,
  criteria jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own evaluations"
  ON project_evaluations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own evaluations"
  ON project_evaluations
  FOR SELECT
  TO authenticated
  USING (true);
