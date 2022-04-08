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
-- Table structure for table `diet_diary`
--

DROP TABLE IF EXISTS `diet_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diet_diary` (
  `diary_no` int NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  `diary_date` timestamp NULL DEFAULT NULL,
  `image_path` varchar(300) DEFAULT NULL,
  `is_shared` bit(1) DEFAULT b'0',
  `meal_time` varchar(20) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`diary_no`),
  KEY `FKffci363bc7nv03bua5rj923v1` (`user_id`),
  CONSTRAINT `FKffci363bc7nv03bua5rj923v1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet_diary`
--

LOCK TABLES `diet_diary` WRITE;
/*!40000 ALTER TABLE `diet_diary` DISABLE KEYS */;
INSERT INTO `diet_diary` VALUES (1,'간식은 뭐니 뭐니 해도 배부르고 살 안찌는 방울 토마토!! 그래도 조절 못하면 1kg까지 먹을 것 같지만... 아무튼 넘 맛나요!!','2022-04-06 16:15:00','0a268d0359cb469db200d84ef6a4c54b.jpg',_binary '','간식','bee1404'),(2,'닭가슴살은 퍽퍽해.... 차라리 행복한 돼지가 되고싶어..\n300g이나 먹었는데 배고픈건 기분탓인가\n','2022-04-06 18:05:00','b702068599544b10b18433edafcbd3f9.png',_binary '\0','저녁','bee1404'),(3,'점심은 간단하게 샐러드를 먹었다ㅎㅎㅎ 냠냠\n','2022-04-06 11:55:00','c53d3728a3494de39ed5d00e81042bb0.jpg',_binary '','점심','youngjin'),(4,'오늘은 운동하고 나서 저녁은 닭가슴살 섭취 했어요~~ㅎㅎㅎ','2022-04-06 18:31:00','ef1f2306b7bc4062a992df684858961e.PNG',_binary '\0','저녁','hgi7201'),(5,'늦은 아침겸 점심으로 계란과 오이. 넘 배고파서 사진 찍기 전에 계란 하나를 먹어버렸다 ㅎㅎ','2022-04-06 09:50:00','cf6bd81fab654fbb82d9c88897d24a60.jpeg',_binary '\0','아침','bee1404'),(6,'낫또가 다이어트에 좋다던데 맛은 좋지 않네ㅠㅠㅠ','2022-04-04 00:00:00','f61347e1974746e1abd3d6fbbb05b9cf.jpg',_binary '\0','아침','bee1404'),(7,'아침은 간단하게 토마토와 계란으로..!! 점심까지 잘 버텨보자','2022-04-05 09:14:00','4c952f0e82734ba0af58a7bb99660f8a.jpg',_binary '','아침','youngjin'),(8,'오늘은 가족들과 치팅 Day 느낌으로 안심 스테이크 먹었습니다 ㅎㅎㅎ 입에서 살살 녹아요!','2022-04-05 19:09:00','7bb269dea9fd4a64b2ef6e7bdbc81b01.PNG',_binary '','저녁','hgi7201'),(9,'고구마와 우유 환상의 조합','2022-03-24 11:55:00','64edfb43954140fe9bc16f077c71ed10.jfif',_binary '\0','점심','youngjin'),(10,'아침 걸렀으니깐 오늘 점심은 연어 연어~ 역시 회는 와사비와 함께 ?','2022-04-05 12:01:00','9edc68ac9cb84de0af19dab56b06c800.jpg',_binary '','점심','bee1404'),(11,'점심에 샐러드먹었으니까 저녁은 고기~~ 일찍먹으면 살안쪄','2022-04-06 17:30:00','6bf53afd19b045ce82dc101b64862f2d.jfif',_binary '\0','저녁','youngjin'),(12,'연어초밥 딱 한개만 먹어야지','2022-03-14 18:20:00','3df02f492343488c97e05a36d603f495.jfif',_binary '\0','저녁','youngjin'),(13,'아침은 간단히 우유랑 고구마로 ㅎㅎㅎ?','2022-04-06 07:29:00','ab3827da518f4830b55e0a9d4670e1e9.PNG',_binary '','아침','hgi7201'),(14,'약불, 소금물에 오래 삶아 촉촉하게 익힌 닭가슴살을, 마늘쫑, 샬롯과 함께 쯔유 베이스로 아보카도오일에 살짝 볶았습니다!\n샬롯이 포만감을 높여주고, 마늘쫑이 식이섬유를 채워주며, 쯔유베이스는 다른 소스들보다 칼로리가 낮아서 아침식사로 가볍고 좋아요~','2022-04-07 08:30:00','d827bd7fb8ff4b08bf9280deca4f29a4.jpg',_binary '\0','아침','sorrow4468'),(15,'아침은 배부르지만 간편한 고구마와 우유!','2022-04-03 09:00:00','bd3381699c0446cfad57c9e6a570ae53.jpg',_binary '','아침','bee1404'),(16,'낫또 도전!!!!','2022-04-02 18:19:00','da11a8fe1692465fbc4bb8db2af93ba0.jfif',_binary '\0','저녁','youngjin'),(17,'기름에 볶으면 좋은 채소인 토마토를 계란과 함께 볶은 간편한 한 끼 식사입니다. 저도 처음에는 토마토를 계란과 볶는 것에 거부감이 있었는데, 둘은 영양학적으로 균형이 매우 잘 맞고, 사실 우리는 예전부터 계란후라이나 오므라이스에 토마토케첩을 뿌려먹었기 때문에, 실제로 토마토계란볶음을 먹어보면 익숙한 맛이 납니다. 꼭 만들어보세요~!! 강추?','2022-04-07 12:30:00','b557aa1f63164c58879c53f559920c95.jpg',_binary '\0','점심','sorrow4468'),(18,'건강한 음식을 조금씩 골고루 챙겨먹기','2022-04-04 09:08:00','63f8fbb093d74162bb383bbf27205dde.jpg',_binary '','아침','youngjin'),(19,'오늘은 친구가 구워준 안심 스테이꾸~\n내꺼 한 덩어리, 친구꺼 한 덩어리~','2022-04-01 07:10:00','4523b5e14f4c4d70a08879c7beccfeda.jpg',_binary '\0','저녁','bee1404'),(20,'아보카도와 연어 다이어트 할때 너무 맛있어서 계속 찾아 먹는중이다?','2022-04-05 00:30:00','fa9306cc69b14cfc820cf66664f1c7c0.PNG',_binary '','점심','hgi7201'),(21,'철분이 많은 소고기는, 비타민 C가 많은 녹색채소와 궁합이 좋습니다. 관련된 유명한 노래도 있죠. \"참깨빵 위에 순쇠고기 패티 두 장, 특별한 소스, 양상추\" 양상추 외에도 특히 브로콜리의 독특한 향은 소고기와 잘 어울리며, 브로콜리는 기름과 친하기 때문에 기름에 조리하는 소고기와 같이 조리할 수 있어 효율도 아주 좋고, 함께 조리하면 브로콜리엔 육향이 베고, 소고기엔 브로콜리 향이 베는, 아주 찰떡궁합입니다.','2022-04-07 18:00:00','5d16f0a76a664ab09712a77bdff11957.png',_binary '\0','저녁','sorrow4468'),(22,'늦은 점심 이것저것 챙겨서 먹어야지','2022-04-07 13:50:00','c1c10ccbde0841df9cbe1133b41bb14a.jpg',_binary '\0','점심','youngjin'),(23,'다이어트를 위해 두부가 좋다고 하여 두부 밥을 해 먹었다 ㅎㅎ','2022-04-04 12:40:00','6c936eb7cbd6464bb00ea8589092431b.PNG',_binary '','아침','hgi7201'),(24,'두부 다이어트에 도전한다.','2022-04-07 08:55:00','a4a3e42e62f6479f931621fb9410e4b9.jfif',_binary '\0','아침','youngjin'),(25,'나의 헬스메이트 영진이랑 같이 나눠먹은 계란과 고구마... 퍽퍽해\n소금없이 먹는 계란은 잔혹하다 :(','2022-04-03 07:20:00','d15c55047182488281fa3d98e474bc2e.jpg',_binary '\0','저녁','bee1404'),(26,'안심~ 안심~ 마음의 안심~ 안심을 먹으면 마음이 안심되지~','2022-04-06 14:10:00','ee654cfaeb4b42cea56224f6bbdacb7d.jpg',_binary '\0','점심','bee1404'),(27,'고구마가 쭉쭉 들어간다','2022-04-06 11:00:00','1e5d036008d34b6a85c2a69ff9c449c8.jpg',_binary '\0','간식','bee1404'),(28,'맛있는 계란','2022-04-07 00:00:00','9b194c21a4d1429e9e8e11e246b959ac.jpg',_binary '\0','아침','hangi95'),(29,'오늘도 내가 제일 좋아하는 조합 연어 아보카드 셋트를 먹었다. 너무 맛있다!','2022-04-04 00:51:00','031bc0ce98dc4b51a5e0e86b00d1c87c.PNG',_binary '\0','점심','hgi7201'),(30,'일찍 일어났더니 배고파서 그만... ','2022-04-06 07:06:00','b21df8224d234c278f499ca66bd1a782.PNG',_binary '','간식','bee1404'),(31,'계란','2022-04-07 03:05:00','0030b8e463fd4b05b8193ee7ecf5f956.PNG',_binary '\0','아침','daeun503'),(32,'맛있는 정식','2022-04-07 12:30:00','c76ae8b67d934f60ad3aee55bf096d91.jpg',_binary '','점심','hangi95'),(35,'스테이크는 역시 안심 스테이크!!','2022-04-07 13:00:00','44f33874da6d4e4eb301945de675e439.jpg',_binary '\0','점심','mstkang'),(36,'후라이드 치킨을 닭가슴살 처럼~~','2022-04-07 18:30:00','36a6955b11794499a944dc19ae8ff618.png',_binary '\0','저녁','mstkang'),(44,'아침은 짱구의 기운을 받아 나또밥을 처음으로 먹어봤는데 맛이 없었다.. 분명 만화에선 맛있었는데 그냥 노맛!','2022-04-04 09:00:00','4f7857c54be54812a676e1a1d5a34ba3.jpg',_binary '\0','아침','sorrow4468'),(45,'계란에는 우리 몸에 좋은 성분들이 풍부합니다. \n특히나 계란과 함께 섭취하면 좋은 고구마!! 식이섬유도 다량 함유되어 있으니 오늘 점심으로 영양소 골고루 섭취 성공!','2022-03-28 11:54:00','09fc72bc51e74485b69f8e06d166f459.jpg',_binary '\0','점심','sorrow4468'),(46,'결코 과하지않아.. 점심 대신으로 먹는거니깐 이정도면 괜찮지않을까? ㅎㅎ','2022-04-04 13:05:00','4220a70ea9804e66aea03a9bf92288fb.jpg',_binary '\0','점심','sorrow4468'),(47,'왜 이렇게 출출하지. 점심에 먹은 고구마랑 계란이 충분하지 않았다보다... 라는 생각? 헷','2022-04-04 04:10:00','aba91a84a8e3452197c28fbb7b5b4348.jpeg',_binary '\0','간식','sorrow4468'),(48,'오늘 저녁은 간단하게 고구마랑 우유로! 고구마만 먹으면 목 막히니까 우유로 사알 내려주면 무한대로 고구마를 먹을 수 있지','2022-03-29 18:16:00','3f27e8cf3b9540bda0d6d5b3eda45935.jpg',_binary '\0','저녁','sorrow4468'),(49,'간식으로 오이와 계란 섭취! 배가 너무 고파서 저녁까지 견딜수가 없었당...\n대신 저녁을 조금만 먹어야지?','2022-03-29 16:11:00','a28f5a89bcf143cdb06466e90106632a.jpg',_binary '\0','간식','sorrow4468'),(50,'오늘 점심은 연어? 너무 좋아... 너무 맛있었다\n양심상 소스는 정말 조금만 먹었다. 사진보니까 또 먹고 싶어져...','2022-04-02 00:00:00','de60438cf03e4a8290c5a18307029da1.png',_binary '\0','점심','sorrow4468'),(51,'귀찮다고 거르지 말고 아침 꼭 챙겨먹기! \n10분 뚝딱이면 만드는 연두부 샐러드 가장 중요한 것은 바로 양념장?','2022-04-08 09:09:00','917a049318024144808100029b621b04.jpg',_binary '\0','아침','sorrow4468'),(52,'오늘 저녁은 어쩔 수 없다. 고기가 자꾸 눈에 밟혔다. 먹어야 했다.\n그래도 브로콜리랑 같이 먹었으니까 건강식이라고 생각해야지','2022-03-31 18:40:00','e7fd8d79bd354b49b3dd58ba1c82da6d.PNG',_binary '\0','저녁','sorrow4468'),(53,'오늘은 낫또 계란말이를 해봤다. 너무 잘만든 것같아 기분이 좋다.\n사진은 못찍었지만 밥도 많이 먹었당 든든하다','2022-04-04 18:19:00','a35d898752d64f7cabbba79d9080c9fc.jpg',_binary '\0','저녁','sorrow4468'),(54,'간식으로 바나나 냠냠 바나나먹으면 나한테 바나나??','2022-04-04 15:16:00','fcd21e451d1a44018104ba3739a5b2ab.jfif',_binary '\0','간식','sorrow4468'),(55,'오늘 점심은 아보카도밥 달걀이랑 슥슥해서 먹으면 너무 맛이 있지요','2022-03-27 00:00:00','24e9bab7b73a4fc1a975cd6f3533a882.jpg',_binary '\0','점심','sorrow4468'),(56,'맛있다','2022-04-06 00:00:00','18bb550bd72b4ef8818964ae53e04084.jpg',_binary '\0','저녁','hangi95'),(57,'아침으로 고구마와 계란!','2022-04-08 09:05:00','fcc7ef91d3204198a546ab0a47fe4bec.jpg',_binary '\0','아침','sorrow4468'),(58,'아침으로 고구마와 계란!','2022-04-08 08:55:00','a7d53baa393e48939646455d830c5f85.jpg',_binary '','아침','youngjin');
/*!40000 ALTER TABLE `diet_diary` ENABLE KEYS */;
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
