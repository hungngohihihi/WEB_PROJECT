-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.31

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
  `commentID` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(100) DEFAULT NULL,
  `userID` int NOT NULL,
  `commentParentID` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `likeCount` int DEFAULT NULL,
  `filmID` int DEFAULT NULL,
  `episodeID` int DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  KEY `userID_idx` (`userID`),
  KEY `commentParentID_idx` (`commentParentID`),
  KEY `film_idx` (`filmID`),
  KEY `episode_idx` (`episodeID`),
  CONSTRAINT `commentParentID` FOREIGN KEY (`commentParentID`) REFERENCES `comment` (`commentID`),
  CONSTRAINT `episodeID` FOREIGN KEY (`episodeID`) REFERENCES `episode_film` (`episodeID`),
  CONSTRAINT `film` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `login_user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `episode_film`
--

DROP TABLE IF EXISTS `episode_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episode_film` (
  `filmID` int NOT NULL,
  `episodeID` int NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`episodeID`,`filmID`),
  KEY `filmID_idx` (`filmID`),
  CONSTRAINT `filmID` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `filmName` varchar(500) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `year` int DEFAULT NULL,
  `duration` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` text NOT NULL,
  `category` varchar(500) DEFAULT NULL,
  `url` text NOT NULL,
  `filmID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`filmID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_admin`
--

DROP TABLE IF EXISTS `login_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_admin` (
  `account` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `adminName` varchar(50) DEFAULT NULL,
  `adminID` int NOT NULL AUTO_INCREMENT,
  `avatar` text,
  `create_at` timestamp NULL DEFAULT NULL,
  `ruleID` int DEFAULT NULL,
  PRIMARY KEY (`adminID`),
  KEY `ruleID_idx` (`ruleID`),
  CONSTRAINT `ruleID` FOREIGN KEY (`ruleID`) REFERENCES `rule_admin` (`ruleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_user`
--

DROP TABLE IF EXISTS `login_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_user` (
  `account` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userID` int NOT NULL AUTO_INCREMENT,
  `dateOfBirth` date DEFAULT NULL,
  `avatar` text,
  `status` tinyint DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rate_film`
--

DROP TABLE IF EXISTS `rate_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate_film` (
  `userID` int NOT NULL,
  `filmID` int NOT NULL,
  `rate` float DEFAULT NULL,
  PRIMARY KEY (`userID`,`filmID`),
  KEY `fk_filmID_idx` (`filmID`),
  CONSTRAINT `fk_filmID` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`),
  CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `login_user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rule_admin`
--

DROP TABLE IF EXISTS `rule_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rule_admin` (
  `rule` varchar(100) DEFAULT NULL,
  `ruleID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ruleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-08  9:36:39
