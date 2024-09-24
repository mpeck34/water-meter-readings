BEGIN TRANSACTION;
CREATE TABLE current_route_assignment (
            meter_id TEXT PRIMARY KEY,
            route_id INTEGER,
            assigned_datetime TIMESTAMP,
            completed_datetime TIMESTAMP,
            reader_id INTEGER,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id),
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
INSERT INTO "current_route_assignment" VALUES('YAF0001',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0002',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0003',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0004',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0005',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0006',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0007',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0008',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0009',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0010',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0011',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0012',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0013',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0014',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0015',123,'2024-09-14 14:20:19.470571',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0016',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0017',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0018',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0019',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0020',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0021',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0022',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0023',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0024',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0025',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0026',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0027',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0028',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0029',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0030',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0031',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0032',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0033',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0034',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0035',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0036',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0037',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0038',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0039',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0040',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0041',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0042',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0043',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0044',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0045',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0046',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0047',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0048',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0049',123,'2024-09-14 14:20:19.471578',NULL,NULL);
INSERT INTO "current_route_assignment" VALUES('YAF0050',123,'2024-09-14 14:20:19.471578',NULL,NULL);
CREATE TABLE expected_range (
            meter_id TEXT PRIMARY KEY,
            range INTEGER,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
INSERT INTO "expected_range" VALUES('YAF0001',100);
INSERT INTO "expected_range" VALUES('YAF0002',100);
INSERT INTO "expected_range" VALUES('YAF0003',100);
INSERT INTO "expected_range" VALUES('YAF0004',100);
INSERT INTO "expected_range" VALUES('YAF0005',100);
INSERT INTO "expected_range" VALUES('YAF0006',100);
INSERT INTO "expected_range" VALUES('YAF0007',100);
INSERT INTO "expected_range" VALUES('YAF0008',100);
INSERT INTO "expected_range" VALUES('YAF0009',100);
INSERT INTO "expected_range" VALUES('YAF0010',100);
INSERT INTO "expected_range" VALUES('YAF0011',100);
INSERT INTO "expected_range" VALUES('YAF0012',100);
INSERT INTO "expected_range" VALUES('YAF0013',100);
INSERT INTO "expected_range" VALUES('YAF0014',100);
INSERT INTO "expected_range" VALUES('YAF0015',100);
INSERT INTO "expected_range" VALUES('YAF0016',100);
INSERT INTO "expected_range" VALUES('YAF0017',100);
INSERT INTO "expected_range" VALUES('YAF0018',100);
INSERT INTO "expected_range" VALUES('YAF0019',100);
INSERT INTO "expected_range" VALUES('YAF0020',100);
INSERT INTO "expected_range" VALUES('YAF0021',100);
INSERT INTO "expected_range" VALUES('YAF0022',100);
INSERT INTO "expected_range" VALUES('YAF0023',100);
INSERT INTO "expected_range" VALUES('YAF0024',100);
INSERT INTO "expected_range" VALUES('YAF0025',100);
INSERT INTO "expected_range" VALUES('YAF0026',100);
INSERT INTO "expected_range" VALUES('YAF0027',100);
INSERT INTO "expected_range" VALUES('YAF0028',100);
INSERT INTO "expected_range" VALUES('YAF0029',100);
INSERT INTO "expected_range" VALUES('YAF0030',100);
INSERT INTO "expected_range" VALUES('YAF0031',100);
INSERT INTO "expected_range" VALUES('YAF0032',100);
INSERT INTO "expected_range" VALUES('YAF0033',100);
INSERT INTO "expected_range" VALUES('YAF0034',100);
INSERT INTO "expected_range" VALUES('YAF0035',100);
INSERT INTO "expected_range" VALUES('YAF0036',100);
INSERT INTO "expected_range" VALUES('YAF0037',100);
INSERT INTO "expected_range" VALUES('YAF0038',100);
INSERT INTO "expected_range" VALUES('YAF0039',100);
INSERT INTO "expected_range" VALUES('YAF0040',100);
INSERT INTO "expected_range" VALUES('YAF0041',100);
INSERT INTO "expected_range" VALUES('YAF0042',100);
INSERT INTO "expected_range" VALUES('YAF0043',100);
INSERT INTO "expected_range" VALUES('YAF0044',100);
INSERT INTO "expected_range" VALUES('YAF0045',100);
INSERT INTO "expected_range" VALUES('YAF0046',100);
INSERT INTO "expected_range" VALUES('YAF0047',100);
INSERT INTO "expected_range" VALUES('YAF0048',100);
INSERT INTO "expected_range" VALUES('YAF0049',100);
INSERT INTO "expected_range" VALUES('YAF0050',100);
CREATE TABLE master_index (
            index_position INTEGER PRIMARY KEY,
            meter_id TEXT UNIQUE NOT NULL,
            address TEXT NOT NULL,
            route_id INTEGER,
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
INSERT INTO "master_index" VALUES(1,'YAF0001','1 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(2,'YAF0002','2 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(3,'YAF0003','3 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(4,'YAF0004','4 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(5,'YAF0005','5 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(6,'YAF0006','6 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(7,'YAF0007','7 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(8,'YAF0008','8 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(9,'YAF0009','9 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(10,'YAF0010','10 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(11,'YAF0011','11 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(12,'YAF0012','12 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(13,'YAF0013','13 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(14,'YAF0014','14 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(15,'YAF0015','15 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(16,'YAF0016','16 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(17,'YAF0017','17 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(18,'YAF0018','18 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(19,'YAF0019','19 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(20,'YAF0020','20 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(21,'YAF0021','21 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(22,'YAF0022','22 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(23,'YAF0023','23 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(24,'YAF0024','24 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(25,'YAF0025','25 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(26,'YAF0026','26 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(27,'YAF0027','27 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(28,'YAF0028','28 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(29,'YAF0029','29 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(30,'YAF0030','30 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(31,'YAF0031','31 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(32,'YAF0032','32 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(33,'YAF0033','33 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(34,'YAF0034','34 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(35,'YAF0035','35 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(36,'YAF0036','36 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(37,'YAF0037','37 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(38,'YAF0038','38 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(39,'YAF0039','39 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(40,'YAF0040','40 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(41,'YAF0041','41 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(42,'YAF0042','42 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(43,'YAF0043','43 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(44,'YAF0044','44 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(45,'YAF0045','45 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(46,'YAF0046','46 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(47,'YAF0047','47 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(48,'YAF0048','48 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(49,'YAF0049','49 Smith St Kingsbury',123);
INSERT INTO "master_index" VALUES(50,'YAF0050','50 Smith St Kingsbury',123);
CREATE TABLE meter_readings (
            meter_id TEXT PRIMARY KEY,
            route_id INTEGER,
            read_value INTEGER,
            read_status TEXT,
            sync_status TEXT,
            last_sync TIMESTAMP,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id),
            FOREIGN KEY (route_id) REFERENCES routes (route_id)
        );
INSERT INTO "meter_readings" VALUES('YAF0001',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0002',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0003',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0004',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0005',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0006',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0007',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0008',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0009',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0010',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0011',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0012',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0013',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0014',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0015',123,0,'N/A','Pending','2024-09-14 14:20:19.470571');
INSERT INTO "meter_readings" VALUES('YAF0016',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0017',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0018',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0019',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0020',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0021',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0022',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0023',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0024',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0025',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0026',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0027',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0028',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0029',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0030',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0031',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0032',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0033',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0034',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0035',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0036',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0037',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0038',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0039',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0040',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0041',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0042',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0043',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0044',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0045',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0046',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0047',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0048',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0049',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
INSERT INTO "meter_readings" VALUES('YAF0050',123,0,'N/A','Pending','2024-09-14 14:20:19.471578');
CREATE TABLE queue (
	id INTEGER NOT NULL, 
	data VARCHAR, 
	processed BOOLEAN, 
	PRIMARY KEY (id)
);
CREATE TABLE routes (
            route_id INTEGER PRIMARY KEY,
            route_message TEXT
        );
INSERT INTO "routes" VALUES(123,'Initial Route Data');
CREATE TABLE skip_status (
            meter_id TEXT PRIMARY KEY,
            skip_status TEXT,
            skip_reason TEXT,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
INSERT INTO "skip_status" VALUES('YAF0001','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0002','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0003','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0004','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0005','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0006','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0007','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0008','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0009','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0010','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0011','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0012','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0013','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0014','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0015','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0016','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0017','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0018','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0019','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0020','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0021','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0022','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0023','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0024','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0025','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0026','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0027','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0028','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0029','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0030','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0031','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0032','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0033','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0034','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0035','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0036','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0037','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0038','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0039','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0040','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0041','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0042','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0043','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0044','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0045','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0046','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0047','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0048','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0049','Nominal','N/A');
INSERT INTO "skip_status" VALUES('YAF0050','Nominal','N/A');
CREATE TABLE special_message (
            meter_id TEXT PRIMARY KEY,
            message TEXT,
            FOREIGN KEY (meter_id) REFERENCES master_index (meter_id)
        );
INSERT INTO "special_message" VALUES('YAF0001','N/A');
INSERT INTO "special_message" VALUES('YAF0002','N/A');
INSERT INTO "special_message" VALUES('YAF0003','N/A');
INSERT INTO "special_message" VALUES('YAF0004','N/A');
INSERT INTO "special_message" VALUES('YAF0005','N/A');
INSERT INTO "special_message" VALUES('YAF0006','N/A');
INSERT INTO "special_message" VALUES('YAF0007','N/A');
INSERT INTO "special_message" VALUES('YAF0008','N/A');
INSERT INTO "special_message" VALUES('YAF0009','N/A');
INSERT INTO "special_message" VALUES('YAF0010','N/A');
INSERT INTO "special_message" VALUES('YAF0011','N/A');
INSERT INTO "special_message" VALUES('YAF0012','N/A');
INSERT INTO "special_message" VALUES('YAF0013','N/A');
INSERT INTO "special_message" VALUES('YAF0014','N/A');
INSERT INTO "special_message" VALUES('YAF0015','N/A');
INSERT INTO "special_message" VALUES('YAF0016','N/A');
INSERT INTO "special_message" VALUES('YAF0017','N/A');
INSERT INTO "special_message" VALUES('YAF0018','N/A');
INSERT INTO "special_message" VALUES('YAF0019','N/A');
INSERT INTO "special_message" VALUES('YAF0020','N/A');
INSERT INTO "special_message" VALUES('YAF0021','N/A');
INSERT INTO "special_message" VALUES('YAF0022','N/A');
INSERT INTO "special_message" VALUES('YAF0023','N/A');
INSERT INTO "special_message" VALUES('YAF0024','N/A');
INSERT INTO "special_message" VALUES('YAF0025','N/A');
INSERT INTO "special_message" VALUES('YAF0026','N/A');
INSERT INTO "special_message" VALUES('YAF0027','N/A');
INSERT INTO "special_message" VALUES('YAF0028','N/A');
INSERT INTO "special_message" VALUES('YAF0029','N/A');
INSERT INTO "special_message" VALUES('YAF0030','N/A');
INSERT INTO "special_message" VALUES('YAF0031','N/A');
INSERT INTO "special_message" VALUES('YAF0032','N/A');
INSERT INTO "special_message" VALUES('YAF0033','N/A');
INSERT INTO "special_message" VALUES('YAF0034','N/A');
INSERT INTO "special_message" VALUES('YAF0035','N/A');
INSERT INTO "special_message" VALUES('YAF0036','N/A');
INSERT INTO "special_message" VALUES('YAF0037','N/A');
INSERT INTO "special_message" VALUES('YAF0038','N/A');
INSERT INTO "special_message" VALUES('YAF0039','N/A');
INSERT INTO "special_message" VALUES('YAF0040','N/A');
INSERT INTO "special_message" VALUES('YAF0041','N/A');
INSERT INTO "special_message" VALUES('YAF0042','N/A');
INSERT INTO "special_message" VALUES('YAF0043','N/A');
INSERT INTO "special_message" VALUES('YAF0044','N/A');
INSERT INTO "special_message" VALUES('YAF0045','N/A');
INSERT INTO "special_message" VALUES('YAF0046','N/A');
INSERT INTO "special_message" VALUES('YAF0047','N/A');
INSERT INTO "special_message" VALUES('YAF0048','N/A');
INSERT INTO "special_message" VALUES('YAF0049','N/A');
INSERT INTO "special_message" VALUES('YAF0050','N/A');
COMMIT;

select * from routes;
select * from master_index;

rollback;