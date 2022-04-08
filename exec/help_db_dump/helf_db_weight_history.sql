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
-- Table structure for table `weight_history`
--

DROP TABLE IF EXISTS `weight_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weight_history` (
  `created_at` date NOT NULL,
  `weight` int DEFAULT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`created_at`,`user_id`),
  KEY `FKbyof9wff5uo15xelrf0as7v29` (`user_id`),
  CONSTRAINT `FKbyof9wff5uo15xelrf0as7v29` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weight_history`
--

LOCK TABLES `weight_history` WRITE;
/*!40000 ALTER TABLE `weight_history` DISABLE KEYS */;
INSERT INTO `weight_history` VALUES ('2020-02-01',90,'hangi95'),('2021-04-23',81,'sorrow4468'),('2021-05-01',95,'hangi95'),('2021-05-13',81,'sorrow4468'),('2021-06-01',82,'sorrow4468'),('2021-06-29',78,'sorrow4468'),('2021-07-07',75,'sorrow4468'),('2021-09-02',82,'sorrow4468'),('2021-10-10',80,'sorrow4468'),('2022-01-01',55,'bee1404'),('2022-01-01',99,'hangi95'),('2022-01-01',85,'sorrow4468'),('2022-01-15',95,'hangi95'),('2022-02-01',90,'hangi95'),('2022-02-15',85,'hangi95'),('2022-02-17',88,'sorrow4468'),('2022-03-01',55,'youngjin'),('2022-03-02',56,'bee1404'),('2022-03-09',57,'bee1404'),('2022-03-15',99,'hangi95'),('2022-03-16',57,'bee1404'),('2022-03-18',70,'hgi7201'),('2022-03-19',66,'hgi7201'),('2022-03-20',65,'hgi7201'),('2022-03-23',55,'bee1404'),('2022-03-24',52,'youngjin'),('2022-03-25',67,'hgi7201'),('2022-03-26',66,'hgi7201'),('2022-03-27',69,'hgi7201'),('2022-03-28',66,'hgi7201'),('2022-03-30',56,'bee1404'),('2022-03-31',70,'hgi7201'),('2022-04-01',69,'hgi7201'),('2022-04-02',95,'daeun503'),('2022-04-05',50,'youngjin'),('2022-04-06',55,'bee1404'),('2022-04-06',80,'hangi95'),('2022-04-06',68,'hgi7201'),('2022-04-06',90,'sorrow4468'),('2022-04-06',70,'youngjin'),('2022-04-07',80,'ansgml6491'),('2022-04-07',78,'bandong92'),('2022-04-07',68,'choon72001'),('2022-04-07',100,'daeun503'),('2022-04-07',87,'ehdwns'),('2022-04-07',66,'hgi7201'),('2022-04-07',90,'mstkang'),('2022-04-08',70,'hgi7201'),('2022-04-08',40,'youngjin'),('2022-04-30',76,'youngjin'),('2022-08-02',55,'daeun503');
/*!40000 ALTER TABLE `weight_history` ENABLE KEYS */;
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
