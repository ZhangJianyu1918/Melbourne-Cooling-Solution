CREATE TABLE injury_deaths (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_range VARCHAR(7) NOT NULL,
    deaths INT NOT NULL
);

INSERT INTO injury_deaths (year_range, deaths) VALUES
('2011-12', 12),
('2012-13', 21),
('2013-14', 95),
('2014-15', 15),
('2015-16', 16),
('2016-17', 24),
('2017-18', 20),
('2018-19', 44),
('2019-20', 27),
('2020-21', 19);