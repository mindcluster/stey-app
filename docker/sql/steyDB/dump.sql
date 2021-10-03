SET  FOREIGN_KEY_CHECKS = 0;
SET  UNIQUE_CHECKS = 0;

DROP TABLE IF EXISTS CERTIFICATES CASCADE;
DROP TABLE IF EXISTS INTEGRATIONS CASCADE; 
DROP TABLE IF EXISTS SMUS CASCADE; 
DROP TABLE IF EXISTS INTEGRATIONS_EMPLOYEES CASCADE;
DROP TABLE IF EXISTS JOBS CASCADE;
DROP TABLE IF EXISTS EMPLOYEES CASCADE;

SET  FOREIGN_KEY_CHECKS = 1;
SET  UNIQUE_CHECKS = 1;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `stey_db` DEFAULT CHARACTER SET UTF8;

USE `stey_db`;

-- -----------------------------------------------------
-- Table `INTEGRATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `INTEGRATIONS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- TABLE `JOBS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `JOBS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(45) NULL,
  `MARKET_SALARY` DECIMAL NULL COMMENT 'CAMPO ATUALIZADO TODOS OS DIAS POR VOLTA DAS 19H00',
  PRIMARY KEY (`ID`)
) ENGINE = INNODB;

USE `stey_db`;

-- -----------------------------------------------------
-- TABLE `SMUS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SMUS` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `SMU_NAME` VARCHAR(255) NOT NULL,
  `BUDGET` DECIMAL NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE = INNODB DEFAULT CHARACTER SET = LATIN1;

-- -----------------------------------------------------
-- TABLE `EMPLOYEES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EMPLOYEES` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` VARCHAR(255) NOT NULL,
  `PASSWORD` VARCHAR(255) NOT NULL,
  `GPN` VARCHAR(255) NOT NULL,
  `NOME` VARCHAR(255) NULL DEFAULT NULL,
  `SALARIO_BASE_FY_ATUAL` DECIMAL NULL DEFAULT NULL,
  `EMPLOYEE_STATUS` VARCHAR(255) NULL DEFAULT NULL,
  `PAIS` VARCHAR(255) NULL DEFAULT NULL,
  `GENDER` VARCHAR(255) NULL DEFAULT NULL,
  `LOCATION_CITY` VARCHAR(255) NULL DEFAULT NULL,
  `SERVICE_LINE` VARCHAR(255) NULL DEFAULT NULL,
  `SUB_SL` VARCHAR(255) NULL DEFAULT NULL,
  `RANK_ATUAL` VARCHAR(255) NULL DEFAULT NULL,
  `EXP_LEV_ATUAL` INT NULL DEFAULT NULL,
  `JOB_TITLE` VARCHAR(255) NULL DEFAULT NULL,
  `HIRING_DATE` DATETIME NULL DEFAULT NULL,
  `PROPORCIONAL_HIRING_DATE` FLOAT NULL DEFAULT NULL,
  `UTILIZAÇAO` FLOAT NULL DEFAULT NULL,
  `PROMOÇAO` VARCHAR(255) NULL DEFAULT NULL,
  `LEAD_ATUAL` VARCHAR(255) NULL DEFAULT NULL,
  `RANK_FUTURO` VARCHAR(255) NULL DEFAULT NULL,
  `EXP_LEVEL_FUTURO` INT NULL DEFAULT NULL,
  `ACTUAL` DECIMAL NULL,
  `SMUS_ID` INT(11) NOT NULL,
  `JOBS_ID` INT NOT NULL,
  `LEVEL` INT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC),
  INDEX `FK_EMPLOYEES_SMUS1_IDX` (`SMUS_ID` ASC),
  INDEX `FK_EMPLOYEES_JOBS1_IDX` (`JOBS_ID` ASC),
  CONSTRAINT `FK_EMPLOYEES_SMUS1` FOREIGN KEY (`SMUS_ID`) REFERENCES `SMUS` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_EMPLOYEES_JOBS1` FOREIGN KEY (`JOBS_ID`) REFERENCES `JOBS` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB DEFAULT CHARACTER SET = LATIN1;

-- -----------------------------------------------------
-- TABLE `CERTIFICATES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CERTIFICATES` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(150) NOT NULL,
  `DATE` DATETIME NULL DEFAULT NULL,
  `EMPLOYEES_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_CERTIFICATES_EMPLOYEES_IDX` (`EMPLOYEES_ID` ASC),
  CONSTRAINT `FK_CERTIFICATES_EMPLOYEES` FOREIGN KEY (`EMPLOYEES_ID`) REFERENCES `EMPLOYEES` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB DEFAULT CHARACTER SET = LATIN1;

-- -----------------------------------------------------
-- Table `INTEGRATIONS_EMPLOYEES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `INTEGRATIONS_EMPLOYEES` (
  `INTEGRATIONS_ID` INT NOT NULL,
  `EMPLOYEES_ID` INT(11) NOT NULL,
  PRIMARY KEY (`INTEGRATIONS_ID`, `EMPLOYEES_ID`),
  INDEX `fk_integrations_has_EMPLOYEES_EMPLOYEES1_idx` (`EMPLOYEES_ID` ASC),
  INDEX `fk_integrations_has_EMPLOYEES_integrations_idx` (`INTEGRATIONS_ID` ASC),
  CONSTRAINT `fk_integrations_has_EMPLOYEES_integrations`
    FOREIGN KEY (`INTEGRATIONS_ID`)
    REFERENCES `INTEGRATIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_integrations_has_EMPLOYEES_EMPLOYEES1`
    FOREIGN KEY (`EMPLOYEES_ID`)
    REFERENCES `stey_db`.`EMPLOYEES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET
  SQL_MODE = @OLD_SQL_MODE;

SET
  FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET
  UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;

/* DELETE TABLES */
DELETE FROM EMPLOYEES WHERE ID > 0;
DELETE FROM CERTIFICATES WHERE ID > 0;
DELETE FROM EMPLOYEES WHERE ID > 0;
DELETE FROM JOBS WHERE ID > 0;
DELETE FROM SMUS WHERE ID > 0; 
DELETE FROM INTEGRATIONS_EMPLOYEES WHERE INTEGRATIONS_ID > 0;
COMMIT;

/* ============================================== INSERTS ============================================== */
INSERT INTO
  JOBS (NAME, MARKET_SALARY)
VALUES
  ('Analista Senior', NULL),
  ('Gerente', NULL),
  ('Gerente Senior', NULL),
  ('Especialista', NULL),
  ('Analista Junior', NULL),
  ('Diretor', NULL),
  ('Analista Pleno', NULL);

INSERT INTO
  SMUS (SMU_NAME, BUDGET)
VALUES
  ('0316020 - SUPPLY CHAIN & OPERATIONS', 5000),
  ('0399005 - ADVISORY Q & RM', 5000),
  ('0304031 - RISK TRANSFORMATION', 5000),
  ('0316028 - PI-Customer', 5000),
  ('0304032 - RISK ASSURANCE', 5000),
  ('0316063 - PI-Enterprise Intelligence', 5000),
  ('0316044 - IT ADVISORY', 5000),
  ('0304033 - INFORMATION SECURITY', 5000),
  ('0304001 - Risk', 5000),
  ('0316009 - PI-STRATEGY', 5000),
  ('0316011 - PI-FINANCE', 5000),
  ('0316062 - Program Management', 5000);

INSERT INTO INTEGRATIONS ( ID, NAME) VALUES (1, 'Glassdoor'); 
INSERT INTO INTEGRATIONS ( ID, NAME) VALUES (2, 'Google');
INSERT INTO INTEGRATIONS ( ID, NAME) VALUES (3, 'Hubspot');
INSERT INTO INTEGRATIONS ( ID, NAME) VALUES (4, 'Indeed');

INSERT INTO EMPLOYEES(EMAIL, PASSWORD, GPN, NOME, SALARIO_BASE_FY_ATUAL, EMPLOYEE_STATUS, PAIS, GENDER, LOCATION_CITY, SERVICE_LINE, SUB_SL, RANK_ATUAL, EXP_LEV_ATUAL, JOB_TITLE, HIRING_DATE, PROPORCIONAL_HIRING_DATE, UTILIZAÇAO, PROMOÇAO, LEAD_ATUAL, RANK_FUTURO, EXP_LEVEL_FUTURO, ACTUAL, SMUS_ID, JOBS_ID, LEVEL)
        VALUES("BR110101010@ey.com.br", "$2a$08$QmivfICA/QZdeqxlC0Dv6eM.W2oOkXZCpAreFyW6H4TyU3a8.6742", "BR110101010", "Eric Messina", "5000", "Active",    
               "Brasil", "M", "São Paulo", "Advisory", "PI", "44-Staff/Assistant", 1,
               "Analista Senior", "2018-07-01 00:00:00", "1.0", "0.7495361566543579", "Progression", "nan",
               "44-Staff/Assistant", 1, 0.13123, 6, 1, 1);
COMMIT;

INSERT INTO INTEGRATIONS_EMPLOYEES (INTEGRATIONS_ID, EMPLOYEES_ID)  VALUES (1, 1);

COMMIT;