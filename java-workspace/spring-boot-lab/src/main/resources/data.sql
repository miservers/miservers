 INSERT INTO user (id, username, email, password) VALUES
  (1, 'Aliko', 'aliko2@gm.com', 'pass123'),
  (2, 'Bill', 'bill3@gm.com', 'pass345'),
  (3, 'Folrunsho', 'runsho@gm.com', 'pass567');

 
 	
 INSERT INTO PICTURE VALUES(11, FILE_READ('classpath:/demo_files/tesla.png'));
 INSERT INTO PICTURE VALUES(12, FILE_READ('classpath:/demo_files/einstein.png'));
 INSERT INTO PICTURE VALUES(13, FILE_READ('classpath:/demo_files/merkel.png'));
 
 INSERT INTO patient 
 	  (pid, FIRST_NAME,  LAST_NAME, GENDER,  ADDRESS,        CITY,        COUNTRY, CELL_PHONE , BIRTH_DATE, CREATION_DATE, PICTURE_ID) VALUES
    (10000,  'youness',   'chawi',   'MALE', 'douar slahma', 'El jadida', 'maroc', '0678910111', '1970-06-20', PARSEDATETIME('2010-04-22','yyyy-MM-dd'), 11),
    (10001,  'khalid',    'mansour',  'MALE', 'ouled ganem',  'El jadida', 'maroc', '0666626253', '1930-06-20', PARSEDATETIME('2010-04-22','yyyy-MM-dd'), 12),
    (10002,  'halima',     'achrh',   'FEMALE', '12 cite anam', 'El jadida', 'maroc', '0666676666', '1921-11-20', PARSEDATETIME('2010-04-23','yyyy-MM-dd'), 13),
    (10003,  'siham',     'rali',   'FEMALE', '12 douar amr', 'El jadida', 'maroc', '0666676666', '1970-06-20', PARSEDATETIME('2010-04-23','yyyy-MM-dd'), 13),
    (10004,  'fatiha',     'sali',   'FEMALE', '12  rue atlas', 'El jadida', 'maroc', '06699676666', '1989-09-20', PARSEDATETIME('2010-04-23','yyyy-MM-dd'), 13),
    (10005,  'mina',     'malik',   'FEMALE', '12  rue atlas', 'El jadida', 'maroc', '0666676666', '1956-06-20', CURRENT_TIMESTAMP, 13),
    (10006,  'zohra',     'walis',   'FEMALE', '12  rue atlas', 'El jadida', 'maroc', '0666676666', '1912-05-20', CURRENT_TIMESTAMP, 13),
    (10007,  'souad7',     'frhan',   'FEMALE', '12  rue atlas', 'El jadida', 'maroc', '0666676666', '1999-06-20', CURRENT_TIMESTAMP, 13),
    (10008,  'souad8',     'frhan',   'FEMALE', '12 cite atlas', 'El jadida', 'maroc', '0666676666', '2000-04-20', CURRENT_TIMESTAMP, 13),
    (10009,  'souad9',     'frhan',   'FEMALE', '12 cite atlas', 'El jadida', 'maroc', '0666676666', '1945-03-20', CURRENT_TIMESTAMP, 13),
    (10010,  'souad10',     'frhan',   'FEMALE', '12 cite atlas', 'El jadida', 'maroc', '0666676666', '1992-06-20', CURRENT_TIMESTAMP, 13);
 	
 INSERT INTO Allergy 
    (id , pid, substance,     reaction,   severity, occurence, begin_date,  end_date,     referred_by) values
    (1, 10000, 'penicillin',  'cough',    'MILD',        '2Mo',    '2006-01-01', '2009-12-23', 'sqali'),
    (2, 10000, 'pollen',      'asthma',   'MODERATE',        '2Mo',    '2006-01-01', '2013-10-24', 'sqali'),
    (3, 10000, 'nuts',        'sneezing', 'SEVERE',        '2Mo',    '2006-01-01', '2012-11-25', 'sqali'),
    (4, 10000, 'aspirin',     'itchy',    'SEVERE',        '2Mo',    '2006-01-01', '2011-09-26', 'sqali');
    
 INSERT INTO Drug 
    (id , name) values
    (50, 'Ventoline'),
    (51, 'Celestine');
    
     
INSERT INTO Medication 
    (id , pid,   drug_id,  dose,        frequency, condition, prescribed,  started_Taking,  end_Taking, status) values
    (1,   10000, 50,      '2 puffs',   '1 daily', 'asthma',   '2013-10-24','2013-10-24', '2013-12-15', 'ACTIVE'),
    (2,   10000, 51,      '110 goutes',   '2/ d', 'asthma',   '2013-10-24','2013-10-24', '2013-10-30', 'ACTIVE');

INSERT INTO Vaccine 
    (id , pid,   act_Date,     name,       category, lot, reminder) values
    (1,   10000, '2000-01-24', 'BCG',      'tuberculose', '123', '2020-12-24'),
    (2,   10000, '2000-01-24', 'Rougeole', 'Rougeole',    '111', '2020-09-08');

INSERT INTO Measure 
    (Name , Unit) values
    ('Taille', 'cm'),
    ('Poids', 'Kg'),
    ('IMC', 'Kg/m2'),
    ('SYS', 'mmHg'),
    ('DIA', 'mmHg'),
    ('PUL','PUL/min')
    ;

INSERT INTO Biometric 
    (id , pid,   measure_name,  value,       date) values
    (1,   10000, 'Taille',      169,         '2020-08-13'),
    (2,   10000, 'Poids',       70,          '2020-08-13'),
    (3,   10000, 'SYS',         129,         '2020-08-13'),
    (4,   10000, 'DIA',         95,          '2020-08-13'),
    (5,   10000, 'PUL',         89,          '2020-08-13'),    
    (6,   10000, 'Poids',       61,          '2020-08-15')
    ;
    
    
INSERT INTO patient (pid, FIRST_NAME, LAST_NAME, GENDER, ADDRESS, CITY, COUNTRY, CELL_PHONE ) VALUES (100020, 'souad20', 'frhan20', 'FEMALE', '20 cite anam', 'El jadida', 'maroc', '0666676620'),(100021, 'souad21', 'frhan21', 'FEMALE', '21 cite anam', 'El jadida', 'maroc', '0666676621'),(100022, 'souad22', 'frhan22', 'FEMALE', '22 cite anam', 'El jadida', 'maroc', '0666676622'),(100023, 'souad23', 'frhan23', 'FEMALE', '23 cite anam', 'El jadida', 'maroc', '0666676623'),(100024, 'souad24', 'frhan24', 'FEMALE', '24 cite anam', 'El jadida', 'maroc', '0666676624'),(100025, 'souad25', 'frhan25', 'FEMALE', '25 cite anam', 'El jadida', 'maroc', '0666676625'),(100026, 'souad26', 'frhan26', 'FEMALE', '26 cite anam', 'El jadida', 'maroc', '0666676626'),(100027, 'souad27', 'frhan27', 'FEMALE', '27 cite anam', 'El jadida', 'maroc', '0666676627'),(100028, 'souad28', 'frhan28', 'FEMALE', '28 cite anam', 'El jadida', 'maroc', '0666676628'),(100029, 'souad29', 'frhan29', 'FEMALE', '29 cite anam', 'El jadida', 'maroc', '0666676629'),(100030, 'souad30', 'frhan30', 'FEMALE', '30 cite anam', 'El jadida', 'maroc', '0666676630'),(100031, 'souad31', 'frhan31', 'FEMALE', '31 cite anam', 'El jadida', 'maroc', '0666676631'),(100032, 'souad32', 'frhan32', 'FEMALE', '32 cite anam', 'El jadida', 'maroc', '0666676632'),(100033, 'souad33', 'frhan33', 'FEMALE', '33 cite anam', 'El jadida', 'maroc', '0666676633'),(100034, 'souad34', 'frhan34', 'FEMALE', '34 cite anam', 'El jadida', 'maroc', '0666676634'),(100035, 'souad35', 'frhan35', 'FEMALE', '35 cite anam', 'El jadida', 'maroc', '0666676635'),(100036, 'souad36', 'frhan36', 'FEMALE', '36 cite anam', 'El jadida', 'maroc', '0666676636'),(100037, 'souad37', 'frhan37', 'FEMALE', '37 cite anam', 'El jadida', 'maroc', '0666676637'),(100038, 'souad38', 'frhan38', 'FEMALE', '38 cite anam', 'El jadida', 'maroc', '0666676638'),(100039, 'souad39', 'frhan39', 'FEMALE', '39 cite anam', 'El jadida', 'maroc', '0666676639'),(100040, 'souad40', 'frhan40', 'FEMALE', '40 cite anam', 'El jadida', 'maroc', '0666676640'),(100041, 'souad41', 'frhan41', 'FEMALE', '41 cite anam', 'El jadida', 'maroc', '0666676641'),(100042, 'souad42', 'frhan42', 'FEMALE', '42 cite anam', 'El jadida', 'maroc', '0666676642'),(100043, 'souad43', 'frhan43', 'FEMALE', '43 cite anam', 'El jadida', 'maroc', '0666676643'),(100044, 'souad44', 'frhan44', 'FEMALE', '44 cite anam', 'El jadida', 'maroc', '0666676644'),(100045, 'souad45', 'frhan45', 'FEMALE', '45 cite anam', 'El jadida', 'maroc', '0666676645'),(100046, 'souad46', 'frhan46', 'FEMALE', '46 cite anam', 'El jadida', 'maroc', '0666676646'),(100047, 'souad47', 'frhan47', 'FEMALE', '47 cite anam', 'El jadida', 'maroc', '0666676647'),(100048, 'souad48', 'frhan48', 'FEMALE', '48 cite anam', 'El jadida', 'maroc', '0666676648'),(100049, 'souad49', 'frhan49', 'FEMALE', '49 cite anam', 'El jadida', 'maroc', '0666676649'),(100050, 'souad50', 'frhan50', 'FEMALE', '50 cite anam', 'El jadida', 'maroc', '0666676650'),(100051, 'souad51', 'frhan51', 'FEMALE', '51 cite anam', 'El jadida', 'maroc', '0666676651'),(100052, 'souad52', 'frhan52', 'FEMALE', '52 cite anam', 'El jadida', 'maroc', '0666676652'),(100053, 'souad53', 'frhan53', 'FEMALE', '53 cite anam', 'El jadida', 'maroc', '0666676653'),(100054, 'souad54', 'frhan54', 'FEMALE', '54 cite anam', 'El jadida', 'maroc', '0666676654'),(100055, 'souad55', 'frhan55', 'FEMALE', '55 cite anam', 'El jadida', 'maroc', '0666676655'),(100056, 'souad56', 'frhan56', 'FEMALE', '56 cite anam', 'El jadida', 'maroc', '0666676656'),(100057, 'souad57', 'frhan57', 'FEMALE', '57 cite anam', 'El jadida', 'maroc', '0666676657'),(100058, 'souad58', 'frhan58', 'FEMALE', '58 cite anam', 'El jadida', 'maroc', '0666676658'),(100059, 'souad59', 'frhan59', 'FEMALE', '59 cite anam', 'El jadida', 'maroc', '0666676659'),(100060, 'souad60', 'frhan60', 'FEMALE', '60 cite anam', 'El jadida', 'maroc', '0666676660'),(100061, 'souad61', 'frhan61', 'FEMALE', '61 cite anam', 'El jadida', 'maroc', '0666676661'),(100062, 'souad62', 'frhan62', 'FEMALE', '62 cite anam', 'El jadida', 'maroc', '0666676662'),(100063, 'souad63', 'frhan63', 'FEMALE', '63 cite anam', 'El jadida', 'maroc', '0666676663'),(100064, 'souad64', 'frhan64', 'FEMALE', '64 cite anam', 'El jadida', 'maroc', '0666676664'),(100065, 'souad65', 'frhan65', 'FEMALE', '65 cite anam', 'El jadida', 'maroc', '0666676665'),(100066, 'souad66', 'frhan66', 'FEMALE', '66 cite anam', 'El jadida', 'maroc', '0666676666'),(100067, 'souad67', 'frhan67', 'FEMALE', '67 cite anam', 'El jadida', 'maroc', '0666676667'),(100068, 'souad68', 'frhan68', 'FEMALE', '68 cite anam', 'El jadida', 'maroc', '0666676668'),(100069, 'souad69', 'frhan69', 'FEMALE', '69 cite anam', 'El jadida', 'maroc', '0666676669'),(100070, 'souad70', 'frhan70', 'FEMALE', '70 cite anam', 'El jadida', 'maroc', '0666676670');
