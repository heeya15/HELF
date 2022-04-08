-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: j6e102.p.ssafy.io    Database: helf_db
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercise_history`
--

DROP TABLE IF EXISTS `exercise_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_history` (
  `history_no` bigint NOT NULL AUTO_INCREMENT,
  `exercise_count` bigint DEFAULT NULL,
  `exercise_date` timestamp NULL DEFAULT NULL,
  `exercise_no` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`history_no`),
  KEY `FKeiaqq62fjifpf0xgywjbnhl1f` (`exercise_no`),
  KEY `FKbpuh7kq5k3fw0469e9llukm73` (`user_id`),
  CONSTRAINT `FKbpuh7kq5k3fw0469e9llukm73` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `FKeiaqq62fjifpf0xgywjbnhl1f` FOREIGN KEY (`exercise_no`) REFERENCES `exercise` (`exercise_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_history`
--

LOCK TABLES `exercise_history` WRITE;
/*!40000 ALTER TABLE `exercise_history` DISABLE KEYS */;
INSERT INTO `exercise_history` VALUES (17,12,'2022-04-07 03:02:16',2,'youngjin'),(18,18,'2022-04-07 03:03:51',4,'youngjin'),(19,10,'2022-04-07 03:07:29',5,'youngjin'),(20,7,'2022-04-07 04:32:23',1,'bee1404'),(21,30,'2022-04-07 09:35:35',5,'hgi7201'),(22,15,'2022-04-07 10:09:52',5,'ansgml6491'),(23,20,'2022-04-07 10:23:10',4,'daeun503'),(24,13,'2022-04-07 10:27:00',4,'daeun503'),(25,10,'2022-04-07 11:05:20',6,'sorrow4468'),(26,10,'2022-04-07 11:06:03',4,'sorrow4468'),(27,24,'2022-04-07 13:20:11',3,'ehdwns'),(28,3,'2022-04-07 13:22:20',5,'ehdwns'),(29,18,'2022-04-07 13:15:04',6,'mstkang'),(30,30,'2022-04-07 13:32:59',6,'mstkang'),(31,1,'2022-04-07 13:36:31',2,'mstkang'),(32,50,'2022-02-12 00:00:00',1,'hangi95'),(33,30,'2022-04-07 14:14:32',3,'hgi7201'),(34,23,'2022-04-07 14:16:51',4,'daeun503'),(35,12,'2022-04-07 14:18:36',2,'daeun503'),(36,15,'2022-02-18 00:00:00',3,'sorrow4468'),(37,20,'2022-02-21 00:00:00',2,'sorrow4468'),(38,25,'2022-02-21 00:00:00',4,'sorrow4468'),(39,25,'2022-03-03 00:00:00',1,'sorrow4468'),(40,25,'2022-03-05 00:00:00',1,'sorrow4468'),(41,25,'2022-01-28 00:00:00',6,'sorrow4468'),(42,20,'2022-01-28 00:00:00',4,'sorrow4468'),(44,15,'2022-01-18 00:00:00',6,'hangi95'),(45,15,'2022-01-18 00:00:00',3,'hangi95'),(47,20,'2022-02-21 00:00:00',1,'hangi95'),(48,20,'2022-03-03 00:00:00',3,'hangi95'),(49,15,'2022-03-03 00:00:00',6,'hangi95'),(50,15,'2022-04-07 00:00:00',2,'hangi95'),(51,15,'2022-04-04 00:00:00',2,'hangi95'),(52,25,'2022-04-04 00:00:00',4,'hangi95'),(53,25,'2022-04-04 00:00:00',3,'hangi95'),(54,20,'2022-04-04 00:00:00',1,'hangi95'),(55,20,'2022-02-18 00:00:00',1,'hangi95'),(56,20,'2022-02-12 00:00:00',6,'hangi95'),(57,6,'2022-04-07 15:17:24',6,'sorrow4468'),(58,1,'2022-04-07 18:26:20',1,'mstkang'),(59,1,'2022-04-07 22:11:55',4,'mstkang'),(60,3,'2022-04-08 00:14:15',1,'hgi7201'),(61,15,'2022-01-03 03:02:16',1,'sorrow4468'),(66,20,'2022-01-13 03:02:16',5,'sorrow4468'),(67,25,'2022-01-13 03:02:16',1,'sorrow4468'),(72,20,'2022-01-25 03:02:16',2,'sorrow4468'),(74,20,'2022-01-26 03:02:16',5,'sorrow4468'),(75,25,'2022-01-26 03:02:16',4,'sorrow4468'),(77,20,'2022-01-30 03:02:16',2,'sorrow4468'),(78,15,'2022-02-03 03:02:16',6,'sorrow4468'),(79,20,'2022-02-05 03:02:16',5,'sorrow4468'),(81,20,'2022-02-09 03:02:16',2,'sorrow4468'),(82,15,'2022-02-09 03:02:16',6,'sorrow4468'),(83,20,'2022-02-09 03:02:16',5,'sorrow4468'),(87,15,'2022-02-13 03:02:16',6,'sorrow4468'),(88,20,'2022-02-13 03:02:16',5,'sorrow4468'),(101,20,'2022-02-23 03:02:16',5,'sorrow4468'),(110,20,'2022-03-03 03:02:16',5,'sorrow4468'),(112,25,'2022-03-05 03:02:16',3,'sorrow4468'),(113,20,'2022-03-05 03:02:16',2,'sorrow4468'),(115,20,'2022-03-07 03:02:16',5,'sorrow4468'),(116,25,'2022-03-09 03:02:16',1,'sorrow4468'),(117,20,'2022-03-09 03:02:16',2,'sorrow4468'),(120,25,'2022-03-13 03:02:16',4,'sorrow4468'),(121,25,'2022-03-15 03:02:16',3,'sorrow4468'),(122,20,'2022-03-15 03:02:16',2,'sorrow4468'),(123,15,'2022-03-16 03:02:16',6,'sorrow4468'),(124,20,'2022-03-17 03:02:16',5,'sorrow4468'),(129,25,'2022-03-25 03:02:16',4,'sorrow4468'),(130,25,'2022-03-25 03:02:16',3,'sorrow4468'),(131,20,'2022-03-25 03:02:16',2,'sorrow4468'),(132,15,'2022-03-26 03:02:16',6,'sorrow4468'),(135,20,'2022-03-29 03:02:16',2,'sorrow4468'),(136,15,'2022-03-31 03:02:16',3,'sorrow4468'),(143,25,'2022-04-04 03:02:16',1,'sorrow4468'),(144,20,'2022-04-06 03:02:16',2,'sorrow4468'),(145,15,'2022-01-09 03:02:16',6,'sorrow4468'),(146,20,'2022-01-09 03:02:16',5,'sorrow4468'),(147,25,'2022-01-09 03:02:16',1,'sorrow4468'),(148,20,'2022-01-09 03:02:16',2,'sorrow4468'),(151,25,'2022-01-17 03:02:16',1,'sorrow4468'),(152,20,'2022-01-17 03:02:16',2,'sorrow4468');
/*!40000 ALTER TABLE `exercise_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08  9:22:52
