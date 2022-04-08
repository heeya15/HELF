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
-- Table structure for table `share_board`
--

DROP TABLE IF EXISTS `share_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_board` (
  `board_no` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `hit` int NOT NULL DEFAULT '0',
  `diary_no` int DEFAULT NULL,
  PRIMARY KEY (`board_no`),
  KEY `FK80ipnyolc44hxybmonuyerqjh` (`diary_no`),
  CONSTRAINT `FK80ipnyolc44hxybmonuyerqjh` FOREIGN KEY (`diary_no`) REFERENCES `diet_diary` (`diary_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_board`
--

LOCK TABLES `share_board` WRITE;
/*!40000 ALTER TABLE `share_board` DISABLE KEYS */;
INSERT INTO `share_board` VALUES (1,'2022-04-06 23:24:34','제가 주로 먹는 간식입니다!! 다이어트 간식이 걱정이신 분들은 방울토마토로 시작해보세요~!',75,1),(2,'2022-04-06 23:29:56','바디나인 닭가슴살 운동하고 나서 먹는대 안 뻑뻑 하고 맛 있네요 ㅎㅎㅎ',156,4),(3,'2022-04-06 23:34:57','닭가슴살을 안 질리게 먹으려면 삶아먹는게 최고입니다! (개인적으로 ㅎㅎ)',122,2),(4,'2022-04-06 23:38:23','낫또가 건강과 다이어트에 좋데요!!! 제 스타일은 아니지만 도전하실분들을 위해 공유해봐요 :)',122,6),(5,'2022-04-06 23:43:42','오늘은 가족들과 치팅 Day 느낌으로 안심 스테이크 먹었습니다 ㅎㅎㅎ 입에서 살살 녹아요!',153,8),(6,'2022-04-06 23:45:49','고단백 연어 잡숴보세요~!!! 추천 추천!!',160,10),(7,'2022-04-07 00:03:10','아침은 간단히 우유랑 고구마로 때웠습니다 ㅎㅎㅎ..',17,13),(8,'2022-04-07 00:13:21','약불, 소금물에 오래 삶아 촉촉하게 익힌 닭가슴살을, 마늘쫑, 샬롯과 함께 쯔유 베이스로 아보카도오일에 살짝 볶았습니다! 샬롯이 포만감을 높여주고, 마늘쫑이 식이섬유를 채워주며, 쯔유베이스는 다른 소스들보다 칼로리가 낮아서 아침식사로 가볍고 좋아요~',175,14),(9,'2022-04-07 00:14:01','고구마와 우유는 꿀 조합!',15,15),(10,'2022-04-07 00:21:05','기름에 볶으면 좋은 채소인 토마토를 계란과 함께 볶은 간편한 한 끼 식사입니다. 저도 처음에는 토마토를 계란과 볶는 것에 거부감이 있었는데, 둘은 영양학적으로 균형이 매우 잘 맞고, 사실 우리는 예전부터 계란후라이나 오므라이스에 토마토케첩을 뿌려먹었기 때문에, 실제로 토마토계란볶음을 먹어보면 익숙한 맛이 납니다. 꼭 만들어보세요~!! 강추?',224,17),(11,'2022-04-07 00:29:29','토마토 2개랑 계란 2개 꼭꼭 씹어 먹으면 배가 불러요!',48,7),(12,'2022-04-07 00:31:36','아보카도와 연어 다이어트 할 때 너무 맛있습니다...? 남자인 저도 주로 먹는대 거부감이 없습니다!! 추천드려요!',50,20),(13,'2022-04-07 00:31:40','철분이 많은 소고기는, 비타민 C가 많은 녹색채소와 궁합이 좋습니다. 관련된 유명한 노래도 있죠. \"참깨빵 위에 순쇠고기 패티 두 장, 특별한 소스, 양상추\" 양상추 외에도 특히 브로콜리의 독특한 향은 소고기와 잘 어울리며, 브로콜리는 기름과 친하기 때문에 기름에 조리하는 소고기와 같이 조리할 수 있어 효율도 아주 좋고, 함께 조리하면 브로콜리엔 육향이 베고, 소고기엔 브로콜리 향이 베는, 아주 찰떡궁합입니다.',102,21),(14,'2022-04-07 00:41:55','다이어트를 위해 두부가 좋다고 하여 두부 밥을 해 먹었습니다. ㅎㅎ\n어떤 한 블로거의 말씀으로 운동을 하지 않고 매일 먹어도 5kg이 빠질 것이라고 합니다. \n[ 재료 ]\n두부 1모\n계란 1개\n밥 2숟가락\n소금 취향 것\n[ 조리 순서 ]\n1. 두부를 덩어리 진게 없도록 으깨줍니다.\n2. 달군 팬에 두부를 수분이 거의 없어질 때 까지 볶아줍니다.\n3. 수분이 다날아가기전에 어느정도 볶아지면 소금을 취향것 넣어주시고 볶다가 수분이 어느정도 날아가면 계란을 넣고 볶아줍니다.\n4. 좀 볶다가 현미밥이나 쌀밥 2스푼을 넣고 밥알이 잘 흩어지도록 볶아주면 완성됩니다. \n다들 맛있게 해 드셔봐요!\n',177,23),(15,'2022-04-07 00:48:21','두부 다이어트 시작합니다. 10키로 빼서 돌아올게요!',131,24),(16,'2022-04-07 01:00:14','토마토, 브로콜리, 닭가슴살, 견과류 귀찮다고 대충 먹지 말고 이것저것 골고루 챙겨먹기! ',102,18),(17,'2022-04-07 02:33:37','아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야아무것도 안적었지 뭐야\n',35,30),(20,'2022-04-07 15:16:18','맛있는 공유',6,32),(23,'2022-04-08 02:43:50','몸에 좋은 샐러드!!!',0,3),(24,'2022-04-08 02:45:52','오늘 먹은 아침 공유합니다~!',0,58);
/*!40000 ALTER TABLE `share_board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08  9:22:49
