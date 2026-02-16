-- Insert sample subjects (safe)
INSERT INTO subjects (name) VALUES 
('Physics'),
('Mathematics'),
('Chemistry'),
('Biology'),
('Computer Science')
ON CONFLICT (name) DO NOTHING;

-- Insert sample student user (safe)
INSERT INTO users (name, email, password_hash, role, is_verified) VALUES
('John Doe', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7eU1oU.lM6', 'student', true)
ON CONFLICT (email) DO NOTHING;

-- Insert student profile safely
INSERT INTO students (user_id, bio)
SELECT id, 'Aspiring physicist'
FROM users
WHERE email = 'john@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample tutor user (safe)
INSERT INTO users (name, email, password_hash, role, is_verified) VALUES
('Dr. Smith', 'smith@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7eU1oU.lM6', 'tutor', true)
ON CONFLICT (email) DO NOTHING;

-- Insert tutor profile safely
INSERT INTO tutors (user_id, education, experience_years, status, average_rating)
SELECT id, 'PhD in Physics', 10, 'active', 4.8
FROM users
WHERE email = 'smith@example.com'
ON CONFLICT (user_id) DO NOTHING;