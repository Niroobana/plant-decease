-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: plant_disease_db
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `plant_checks`
--

DROP TABLE IF EXISTS `plant_checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_checks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symptom` text NOT NULL,
  `ai_result` text,
  `checked_date` date NOT NULL,
  `plant_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plant_id` (`plant_id`),
  KEY `ix_plant_checks_id` (`id`),
  CONSTRAINT `plant_checks_ibfk_1` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_checks`
--

LOCK TABLES `plant_checks` WRITE;
/*!40000 ALTER TABLE `plant_checks` DISABLE KEYS */;
INSERT INTO `plant_checks` VALUES (1,'Yellow leaves with brown spots','*Disclaimer: This analysis is for educational purposes and is not a guaranteed diagnosis, as plant symptoms can stem from multiple overlapping factors.*\n\n**1. Possible Issue**\nEarly Blight (*Alternaria solani*), a common fungal infection often affecting tomato plants.\n\n**2. Short Explanation**\nEarly blight is caused by a fungus that thrives in warm, humid conditions. It typically starts on the older, lower leaves of the tomato plant, appearing as yellow patches that develop into brown spots with concentric rings. If left unmanaged, it can reduce the plant\'s overall vigor and fruit yield by causing premature leaf drop.\n\n**3. Three Simple Care Suggestions**\n* **Prune affected leaves:** Carefully remove the heavily spotted, lower leaves using clean shears to improve air circulation and prevent the fungus from spreading upward.\n* **Water at the base:** Always water the soil directly rather than overhead sprinkling. Keeping the foliage dry denies moisture that fungi need to reproduce.\n* **Apply mulch:** Place a layer of straw, wood chips, or plastic mulch around the base of the plant to prevent soil—which may harbor fungal spores—from splashing onto the lower leaves during rain or watering.\n\n**4. When Expert Agricultural Advice May Be Needed**\nConsult a local agricultural extension office or professional plant nursery if the spots rapidly spread to the upper leaves, stems, and fruit despite your preventative measures, or if you need guidance on applying safe, targeted fungicides for your specific region.','2026-09-29',1),(2,'Yellow leaves with brown spots',NULL,'2026-09-29',1),(3,'Yellow leaves with brown spots',NULL,'2026-09-29',1),(4,'yellow insects black drop','*Disclaimer: The following is an educational assessment based on the symptoms provided and is not a guaranteed diagnosis.*\n\n### 1. Possible Issue\nAphid infestation accompanied by a fungal infection (such as black spot). \n\n### 2. Short Explanation\nIn warm, tropical climates like Jaffna, roses are frequently targeted by sap-sucking yellow insects called aphids, which weaken the plant and secrete a sticky substance that can encourage mold. The \"black drop\" (likely black spots on the leaves and subsequent leaf drop) is typically a fungal disease caused by excess humidity, rain, or overhead watering, which stresses the plant further.\n\n### 3. Three Simple Care Suggestions\n* **Wash away pests:** Use a strong stream of water from a hose to physically spray the yellow insects off the stems and leaves.\n* **Prune affected foliage:** Carefully remove and dispose of leaves showing black spots to prevent the fungus from spreading. \n* **Improve air circulation:** Clear away weeds and debris around the base of the plant, and water the soil directly rather than wetting the leaves.\n\n### 4. When Expert Agricultural Advice May Be Needed\nConsult a local agricultural extension officer or plant nursery expert if the black drop and insect infestation continue to spread despite pruning and washing, or if the rose bush begins to rapidly lose all its leaves and stems begin to die back.','2026-09-29',2),(5,'yellow leave',NULL,'2026-09-29',2);
/*!40000 ALTER TABLE `plant_checks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plant_name` varchar(100) NOT NULL,
  `plant_type` varchar(100) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `ix_plants_id` (`id`),
  CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES (1,'Tomato Plant','Tomato','Home Garden',1),(2,'rose','plant','jaffna',1);
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ravi','ravi@example.com'),(2,'test','test@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-02  9:33:57
