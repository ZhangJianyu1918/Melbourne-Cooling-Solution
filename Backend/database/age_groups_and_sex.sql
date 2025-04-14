CREATE TABLE age_groups_and_sex (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sex VARCHAR(10) NOT NULL,
    age_group VARCHAR(10) NOT NULL,
    count INT NOT NULL
);

INSERT INTO age_groups_and_sex (sex, age_group, count) VALUES
('Male', '0-14', 129),
('Male', '15-24', 225),
('Male', '25-44', 472),
('Male', '45-64', 438),
('Male', '65+', 592),
('Female', '0-14', 85),
('Female', '15-24', 131),
('Female', '25-44', 153),
('Female', '45-64', 146),
('Female', '65+', 384),
('Persons', '0-14', 214),
('Persons', '15-24', 356),
('Persons', '25-44', 625),
('Persons', '45-64', 584),
('Persons', '65+', 976);