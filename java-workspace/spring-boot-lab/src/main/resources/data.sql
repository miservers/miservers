CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  username VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL
);

/* 
INSERT INTO user (username, email, password) VALUES
  ('Aliko', 'aliko2@gm.com', 'pass123'),
  ('Bill', 'bill3@gm.com', 'pass345'),
  ('Folrunsho', 'runsho@gm.com', 'pass567');
*/