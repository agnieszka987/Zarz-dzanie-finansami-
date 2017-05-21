CREATE TABLE Grupy (
id_grupy INT AUTO_INCREMENT, 
login VARCHAR(255) NOT NULL, 
haslo VARCHAR(100) NOT NULL,
PRIMARY KEY (id_grupy),
UNIQUE (id_grupy)
);

CREATE TABLE Uzytkownicy (
id_uzytkownika INT AUTO_INCREMENT,
id_grupy INT,
imie VARCHAR(255) NOT NULL,
nazwisko VARCHAR(255) NOT NULL,
login VARCHAR(100) NOT NULL UNIQUE,
haslo VARCHAR(100) NOT NULL,
email VARCHAR(255),
PRIMARY KEY (id_uzytkownika),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy),
UNIQUE (login)
); 

CREATE TABLE Zadania_typ (
id_zadania_typ INT AUTO_INCREMENT,
nazwa VARCHAR(255) NOT NULL,
id_grupy INT,
PRIMARY KEY (id_zadania_typ),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy)
);

CREATE TABLE Zadania (
id_zadania INT AUTO_INCREMENT,
id_uzytkownika INT,
id_grupy INT,
id_zadania_typ INT,
data_od DATE,
data_do DATE,
PRIMARY KEY (id_zadania),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy),
FOREIGN KEY (id_uzytkownika) REFERENCES Uzytkownicy(id_uzytkownika),
FOREIGN KEY (id_zadania_typ) REFERENCES Zadania_typ(id_zadania_typ)
);

CREATE TABLE Zakupy (
id_zakupu INT AUTO_INCREMENT,
id_uzytkownika INT,
id_grupy INT,
nazwa VARCHAR(255) NOT NULL,
koszt DOUBLE(100,10) NOT NULL,
data_zakupu DATE,
PRIMARY KEY(id_zakupu),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy),
FOREIGN KEY(id_uzytkownika) REFERENCES Uzytkownicy(id_uzytkownika)
);

CREATE TABLE Koszty_wsp_typ (
id_koszt_wsp_typ INT AUTO_INCREMENT,
nazwa VARCHAR(255),
id_grupy INT,
PRIMARY KEY(id_koszt_wsp_typ),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy)
);

CREATE TABLE Koszty_wsp (
id_koszt_wsp INT AUTO_INCREMENT,
id_grupy INT,
id_koszt_wsp_typ INT,
data_od DATE,
data_do DATE,
koszt DOUBLE(100,10) NOT NULL,
PRIMARY KEY(id_koszt_wsp),
FOREIGN KEY (id_grupy) REFERENCES Grupy(id_grupy),
FOREIGN KEY (id_koszt_wsp_typ) REFERENCES Koszty_wsp_typ(id_koszt_wsp_typ)
);



