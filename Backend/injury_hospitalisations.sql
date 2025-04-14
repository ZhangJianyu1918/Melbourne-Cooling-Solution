CREATE TABLE injury_hospitalisations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_range VARCHAR(7) NOT NULL,
    hospitalisations INT NOT NULL
);

INSERT INTO injury_hospitalisations (year_range, hospitalisations) VALUES
('2012-13', 530),
('2013-14', 807),
('2014-15', 566),
('2015-16', 669),
('2016-17', 840),
('2017-18', 710),
('2018-19', 832),
('2019-20', 830),
('2020-21', 741),
('2021-22', 579);