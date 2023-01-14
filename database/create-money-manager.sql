-- Database is created on tamk website

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
-- Insert values to table
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