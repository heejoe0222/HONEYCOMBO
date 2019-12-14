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
	('chocobar', 2100, 'CU', '2019-11-19', 'chocobar.jpg'),
	('conchip', 1200, 'GS', '2019-11-18', 'conchip.jpeg'),
	('buldak', 1000, 'GS', '2019-12-09', 'buldak.jpg'),
	('bananamilk', 1100, 'CU', '2019-12-09', 'bananamilk.jpg');

insert into recipe values (
    'making-soup', 'test', 'makingSoup.jpg', '#chocobar#conchip', '30min', 4370, 'mid',
	'레시피 1단계', '레시피 2단계','레시피 3단계','레시피 4단계','레시피 5단계','8CDFVcMrK4g'
	);

insert into recipe values (
	'boil-ramyeon', 'test', 'boilingRamyeon.jpg', '#conchip', '14min', 1350, 'low',
    '레시피 1단계', '레시피 2단계','레시피 3단계','레시피 4단계','레시피 5단계','GLj0MyVyhaU'
   );

insert into comment values ('making-soup', 'test', 'the greatest soup!', 4);

insert into comment values("making-soup", "test2", "Amazing!", 5);

insert into product values
    ('pocket-cheeze', 1200, 'GS', '2019-12-14', 'pocket-cheeze.jpg'),
	('sinramyeoun-black', 1600, 'GS', '2019-12-14', 'sinramyeoun-black.jpg');

insert into recipe values (
	'고기요리', 'test2', 'cooking_beef.jpg', '#buldak#pocket-cheeze', '20min', 5600, 'high',
    '재료를 준비한다', '재료를 다듬는다','재료를 모은다','재료를 조리한다','요리를 세팅한다','cyS8ycmGs1U'
   );