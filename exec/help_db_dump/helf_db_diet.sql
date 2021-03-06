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
-- Table structure for table `diet`
--

DROP TABLE IF EXISTS `diet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diet` (
  `diet_no` int NOT NULL AUTO_INCREMENT,
  `weight` int DEFAULT '100',
  `diary_no` int DEFAULT NULL,
  `food_no` int DEFAULT NULL,
  PRIMARY KEY (`diet_no`),
  KEY `FKrkh5v0xjuedahaog1c8dgh9he` (`diary_no`),
  KEY `FK3cmym6v5jx26am8ndv9qfbxq7` (`food_no`),
  CONSTRAINT `FK3cmym6v5jx26am8ndv9qfbxq7` FOREIGN KEY (`food_no`) REFERENCES `food` (`food_no`) ON DELETE CASCADE,
  CONSTRAINT `FKrkh5v0xjuedahaog1c8dgh9he` FOREIGN KEY (`diary_no`) REFERENCES `diet_diary` (`diary_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet`
--

LOCK TABLES `diet` WRITE;
/*!40000 ALTER TABLE `diet` DISABLE KEYS */;
INSERT INTO `diet` VALUES (1,100,1,2),(3,150,3,5),(4,100,3,2),(5,100,3,6),(7,150,4,1),(12,100,7,2),(13,100,7,6),(14,200,8,4),(15,100,9,9),(16,100,9,8),(17,100,10,3),(18,300,11,4),(19,100,12,3),(20,100,12,10),(21,100,13,8),(22,150,13,9),(25,100,15,8),(26,100,15,9),(27,100,16,11),(28,200,16,10),(32,100,18,13),(33,150,18,2),(34,100,18,1),(35,200,19,4),(36,150,20,14),(37,150,20,3),(41,100,22,2),(42,100,22,15),(43,100,22,6),(44,150,23,12),(45,150,23,10),(47,150,25,6),(48,150,25,9),(51,300,2,1),(52,300,27,9),(53,150,5,6),(54,100,5,7),(55,100,28,6),(56,100,29,3),(57,300,29,14),(58,300,26,4),(59,300,30,2),(60,150,24,12),(61,100,6,11),(62,200,6,10),(63,200,31,6),(64,100,32,11),(65,100,32,10),(76,100,35,4),(77,100,35,2),(78,100,35,5),(79,200,36,1),(91,100,44,11),(92,200,44,10),(93,200,45,6),(94,200,45,9),(97,100,47,6),(98,250,47,7),(99,350,14,1),(100,200,48,8),(101,200,48,9),(102,250,17,6),(103,200,17,2),(104,300,17,10),(108,150,49,6),(109,200,49,7),(110,300,50,3),(114,150,51,5),(115,150,51,12),(116,150,51,2),(117,300,52,4),(118,200,52,13),(122,100,53,6),(123,100,53,11),(124,200,53,10),(125,100,54,15),(126,100,55,6),(127,150,55,14),(128,200,55,10),(131,350,46,6),(132,300,46,9),(133,350,21,4),(134,150,21,5),(135,150,21,13),(136,100,56,11),(137,100,56,10),(138,200,57,6),(139,200,57,9),(140,200,58,6),(141,250,58,9);
/*!40000 ALTER TABLE `diet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08  9:22:50
