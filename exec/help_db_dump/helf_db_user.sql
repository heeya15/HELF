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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` bit(1) DEFAULT b'0',
  `height` int DEFAULT '0',
  `join_date` timestamp NULL DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `weight` int DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('ansgml6491','1960-11-22',_binary '',180,'2022-04-07 10:07:40','ansgml6491@naver.com','김문희','$2a$10$K354UDWnbD2dMbv54K96iuqm7xAIdieyshIegeAuMxkQOrj./JDWS',80),('bandong92','1992-04-18',_binary '\0',182,'2022-04-07 14:34:19','bandong92@gmail.com','반동','$2a$10$l5.fLtMW9oIyUSkPh1zyY.r/6Il1ap.pKyAk8vrYb2F2uM5JcsPgm',78),('bee1404','1996-02-05',_binary '',170,'2022-04-06 23:01:50','bee1404@naver.com','한성희','$2a$10$d9.Fn16ES1VbM94VJB4j/OGqN0mhOHL02DeDrhoQ6hgxU/wpBhmIW',55),('choon72001','1996-10-08',_binary '\0',180,'2022-04-07 07:50:50','choon72001@gmail.com','희야','$2a$10$oM3gvZKqU6igrlQ/VRNYIuo1wzz6PRzZP60T48yoLq86tBfAfgU8q',68),('daeun503','1900-05-03',_binary '',200,'2022-04-07 09:31:51','daeun503@naver.com','daeun','$2a$10$4/SPXj.W.bZ68uffsV5fu.8W/YvxIq55P4Ii0RXq8uXZ6izOoeExu',100),('ehdwns','1996-01-03',_binary '\0',180,'2022-04-07 13:19:09','qkrehdwns96@naver.com','박동준','$2a$10$M7CrRpS2cyLVUm/2xLJr9OaC8e4qvogy7EhK2J8YKMXOKAuNZyENS',87),('hangi95','1995-12-16',_binary '\0',190,'2022-04-06 23:08:23','wwenxt@naver.com','손한기','$2a$10$a16CQO3.DAKERFsFtIjIBe.g.lo1qOtduHbMYtNWnGlh.xh2H09LS',80),('hgi7201','1996-10-08',_binary '\0',172,'2022-04-06 23:01:28','hgi7201@naver.com','김광희','$2a$10$H57nil/YpKf2Z.kXtQnzleNJ4Q1C8GAzMtfdB932G3QnHOmtfjYba',70),('mstkang','1980-01-01',_binary '\0',180,'2022-04-07 11:12:00','mstkang@gmail.com','Simon','$2a$10$qwMbZD8mX6VdUqb4lURfTeMPIELqpvnR3B3HTS9CBG3Yb4uQ4qdfi',90),('sorrow4468','1995-08-28',_binary '\0',186,'2022-04-06 23:21:42','sorrow4468@gmail.com','이정원','$2a$10$XwEXS2.m/oQF0Qmv6Tx6WehU26dWpS9h6ATKwOKH8/HsAZA71NNpC',90),('youngjin','1998-02-21',_binary '',180,'2022-04-06 23:01:32','cyjcmb98@naver.com','최영진','$2a$10$PGcpxSWSo3xpGh6ABrjYe.TxTJOQj.aH0NBKGM1r0IVWwwRTlsv5W',40),('zerojin',NULL,_binary '\0',0,'2022-04-07 21:26:54','zerojin00@naver.com','최0진','$2a$10$c2z21oaPy847FMfYVKhGCufQg1IKyx5/OWbXXkOGi4vE7OaokgFpi',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08  9:22:51
