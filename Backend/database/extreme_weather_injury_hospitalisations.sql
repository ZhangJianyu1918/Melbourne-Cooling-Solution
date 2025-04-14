CREATE TABLE extreme_weather_related_injury_hospitalisations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    weather_type VARCHAR(50) NOT NULL,
    hospitalisations INT NOT NULL
);

INSERT INTO extreme_weather_related_injury_hospitalisations (weather_type, hospitalisations) VALUES
('Heat', 7104),
('Cold', 773),
('Bushfire', 894),
('Rain and Storms', 348);