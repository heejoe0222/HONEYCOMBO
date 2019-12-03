create database honeycombo default CHARACTER SET UTF8;

create user 'honeycombo'@'localhost' identified by 'honeycombo123';

GRANT ALL PRIVILEGES ON honeycombo.* TO 'honeycombo'@'localhost' IDENTIFIED BY 'honeycombo123';

use honeycombo;

CREATE TABLE USER (
	ID varchar(10) NOT NULL,
	PW varchar(60) NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE PRODUCT (
	ITEMNAME VARCHAR (20) NOT NULL,
	ITEMPRICE INT(5) NOT NULL,
	COMPANY VARCHAR(7) NOT NULL,
	REGISTRATIONDATE DATETIME NOT NULL,
	IMGFILENAME VARCHAR(30) NOT NULL,
	PRIMARY KEY (ITEMNAME)
);

CREATE TABLE RECIPE (
	TITLE VARCHAR(30) NOT NULL,
	USERID VARCHAR(10) NOT NULL,
	IMGFILENAME VARCHAR(30) NOT NULL,
	TAGCONTENTS VARCHAR(200) NOT NULL,
	TOTALTIME VARCHAR(8) NOT NULL,
	TOTALPRICE INT(6) NOT NULL,
	DIFFICULTY VARCHAR(5) NOT NULL,
	-- CONTENTS VARCHAR(4096) NOT NULL,
	CONTENTS1 VARCHAR(300) NOT NULL,
	CONTENTS2 VARCHAR(300) NOT NULL,
	CONTENTS3 VARCHAR(300) NOT NULL,
	CONTENTS4 VARCHAR(300) NOT NULL,
	CONTENTS5 VARCHAR(300) NOT NULL,
	VIDEOURL VARCHAR(300) NOT NULL,
	PRIMARY KEY(TITLE),
	FOREIGN KEY (USERID) REFERENCES USER(ID)
		ON DELETE CASCADE
);

CREATE TABLE COMMENT(
	RECIPETITLE VARCHAR(30) NOT NULL,
	USERID VARCHAR(10) NOT NULL,
	COMMENTCONTENTS VARCHAR(50) NOT NULL,
	RATE INT(2) NOT NULL,
	PRIMARY KEY (USERID, RECIPETITLE),
	FOREIGN KEY (USERID) REFERENCES USER(ID)
		ON DELETE CASCADE,
	FOREIGN KEY (RECIPETITLE) REFERENCES RECIPE(TITLE)
		ON DELETE CASCADE
);

-- sample data
-- make user in signup page
insert into user values ('test', 'test123');
insert into user values("test2", "test22");

insert into product values 
	('chocobar', 2100, 'CU', '2019-11-19', 'chocobar.jpeg'),
	('conchip', 1200, 'GS', '2019-11-18', 'conchip.jpeg');

insert into recipe values 
	('making-soup', 'test', 'makingSoup.jpg', '#chocobar#conchip', '30min', 4370, 'mid', '
		<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>레시피</title> </head> <body> <h2>테스트 수프만들기 레시피 상세보기 입니다.</h2> </body> </html>'
);

insert into recipe values (
	'boil-ramyeon', 'test', 'boilingRamyeon.jpg', '#conchip', '14min', 1350, 'low', '
		<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>레시피</title> </head> <body> <h2>테스트 라면끓이기 레시피 상세보기 입니다.</h2> </body> </html>'
);

insert into comment values ('making-soup', 'test', 'the greatest soup!', 4);

insert into comment values("making-soup", "test2", "Amazing!", 5);