CREATE TABLE heatwave_duration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    duration DECIMAL(5, 2) NOT NULL
);

INSERT INTO heatwave_duration (year, duration) VALUES
(2004, 3.00),
(2005, 4.00),
(2006, 9.00),
(2007, 6.00),
(2008, 7.00),
(2009, 4.00),
(2010, 3.00),
(2011, 3.00),
(2012, 7.00),
(2013, 6.00),
(2014, 3.00),
(2015, 4.00),
(2016, 7.00);