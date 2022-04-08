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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `board_no` bigint DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`comment_no`),
  KEY `FKrilojqs3pgwit0jblo04mc4uf` (`board_no`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `FKrilojqs3pgwit0jblo04mc4uf` FOREIGN KEY (`board_no`) REFERENCES `share_board` (`board_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'혹시 가격은 한 팩에 얼마정도 하나요???','2022-04-06 23:40:34',2,'bee1404'),(2,'1팩당 1659원 인대 저는 묶음으로 사서 잘은 모르겠어요 ㅠㅠㅠ 하지만 맛 있습니다!','2022-04-06 23:42:03',2,'hgi7201'),(3,'우유는 흰 우유인가요?','2022-04-07 00:26:06',7,'bee1404'),(4,'제 입맛엔 안맞더라고요ㅠㅠㅠ토달토달~','2022-04-07 00:27:20',10,'bee1404'),(5,'와... 디테일한 설명 너무 좋아요? 내일 점심은 너닷!!','2022-04-07 00:33:33',8,'youngjin'),(6,'뻑뻑해 보이는대 푹 삶으셨나요 ㅎㅎ?','2022-04-07 00:33:49',3,'hgi7201'),(7,'홈메이드인가요?? 레시피 공유좀 ㅠㅠㅠ 외식한거면 장소 공유좀 ㅠㅠㅠ','2022-04-07 00:47:12',5,'bee1404'),(8,'오 마늘 쫑이랑 닭 가슴살 거기다가 쯔유 베이스라니 맛있어 보이네요! 꼭 한번 해 먹어볼게요?','2022-04-07 00:47:31',8,'hgi7201'),(9,'아보카도랑 연어 같이먹으면 좀 느끼하지않나요??? 와사비가 비결인가...?','2022-04-07 00:47:33',12,'bee1404'),(10,'와.. 연어 빛깔이..','2022-04-07 00:49:36',12,'youngjin'),(11,'저도 두부로 다이어트하고 있어요! 다음에 이렇게 한번 만들어 먹어봐야겠어요?','2022-04-07 00:50:33',14,'youngjin'),(15,'풀무원 낫또 한번 도전해보세요 소스 버무려서 김에 싸먹으면 아주 맛있습니다!!!','2022-04-07 00:54:04',4,'youngjin'),(16,'영진님 거짓말 아니져? ','2022-04-07 01:16:58',15,'hgi7201'),(17,'서면에 스테이크 3found라고 있는대 거기도 맛있습니다!   레시피는 냉장고에서 꺼내 고기는 키친타월을 이용해 핏물을 닦아주고 그 위에 올리브오일, 소금, 후추로 밑간을 해둡니다. 실온에서 20분 정도 두세요. 고기를 굽기 전에 함께 곁들이 소스를 만들어요. 그릇에 다진 사과 2, 다진 양파 2, 부순 통깨 0.5, 매실청 2, 다진 마늘 0.5,간장 2, 레몬즙 1, 식초 1, 설탕 1, 올리브유 1을 넣고 고루 섞어주세요. 이젠 고기를 구워볼까요? 팬이 충분히 예열되면 고기를 구워줍니다. (고기를 올렸을 때 치~~~~익 소리가 나면 돼요)고기가 고르게 구워지면 뒤집어서 다른 면도 익혀 주세요. (고기 익힘 정도는 드시는 분 취향에 맞게~)앞뒤로 겉이 바삭 바삭하게 구워지면 버터 1조각을 녹이고 고기를 다시 한번 앞, 뒤로 살짝 한번 더 구워 마무리합니다.   익은 고기는 젓가락 위에 올려놓으면 육즙이 고르게 펴져 더 맛있다고 해서 저도 요렇게 올려놓았어요 ㅋ 구워서 바로 드시지 마시고 요렇게 따라 해보세요. 가운데  모여있던 육즙이 고루 고루 퍼진다네요.','2022-04-07 01:21:15',5,'hgi7201'),(18,'나름 맛있습니다! 다이어트 효과도 있구요ㅎㅎ 꼭 해 먹어보세요!?','2022-04-07 01:23:45',14,'hgi7201'),(19,'낫또는 한번 도 안 먹어 봤는대 맛은 어떤가요??... ?','2022-04-07 01:24:34',4,'hgi7201'),(20,'대박 기다릴게요','2022-04-07 01:24:57',15,'bee1404'),(21,'저 영진이 아닌데여','2022-04-07 01:38:41',15,'youngjin'),(22,'우와 너무 맛있어 보여요 ~~ ','2022-04-07 10:08:40',5,'daeun503'),(23,'ㅎㅎㅎ 정말 맛있습니다! 꼭 만들어 드셔보세요!','2022-04-07 10:28:26',5,'hgi7201'),(24,'넘 건강해보여요!!!','2022-04-07 11:35:46',16,'bee1404'),(25,'새로운 식단이네요 한번 먹어보겠습니다!','2022-04-07 13:21:59',10,'ehdwns'),(26,'작은 토마토 3개 룰루랄라','2022-04-07 13:45:41',17,'youngjin'),(27,'냠냠 배가 하나도 부르지 않다.','2022-04-07 13:42:34',17,'youngjin'),(28,'골고루 챙겨먹어요~','2022-04-07 17:27:36',16,'sorrow4468'),(29,'연어 맛있어보여요~ ㅠㅠ','2022-04-07 17:28:45',6,'sorrow4468'),(30,'오.. 완전 건강 식단!!!','2022-04-07 18:21:20',16,'mstkang'),(31,'토달토달 요리하기도 간편하고 한끼 식사로 충분!','2022-04-08 02:44:37',10,'youngjin');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
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
