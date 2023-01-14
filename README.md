## FOR TAMK course 4A00EZ62 Backend Development - Final Project

## Topic

Most of us want to know where our money goes. An application for tracking your personal expenses.

**OR**

## General Project to see on render

Backend server address and implemented endpoints


## Frontend server address (not done yet)

Upcoming...

## Instructions for running the application locally

### Node instructions

**Install npm packages**

'npm install'

**Start**

´npm run start´

**Test enpoints**

`npm run test`
![image](https://user-images.githubusercontent.com/98017948/212475730-509ed327-e558-4c1a-92ba-d1a040842609.png)



### SQL statements for creating and adding default data
```
-- Create Table
CREATE TABLE IF NOT EXISTS money_manager (
  id int(11) NOT NULL AUTO_INCREMENT,
  amount decimal(11,2) NOT NULL,
  category varchar(100),
  shop varchar(100),
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
-- Insert values to table, id, created and updated colums will autocreate
INSERT INTO money_manager ( amount, category, shop)
VALUES (
    '8.95',
    'alcohol',
    'Alko'
  );
INSERT INTO money_manager ( amount, category, shop)
VALUES (
    '10.00',
    'crocery',
    'Prisma'
  );
INSERT INTO money_manager ( amount, category, shop)
VALUES (
    '20.00',
    'crocery',
    'Prisma'
  );
INSERT INTO money_manager ( amount, category, shop)
VALUES (
    '100.20',
    'crocery',
    'Prisma'
  );

```

## Project self evaluation,
use project evaluation criteria (see Evaluation section)
