


#### SQL SCHEMA ####

CREATE TABLE Authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    UNIQUE (first_name, last_name)
);

CREATE TABLE Genres (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL,
    UNIQUE (genre_name)
);

CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(200) NOT NULL,
    author_id INT,
    genre_id INT,
    published_date DATE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

CREATE INDEX idx_books_isbn ON Books (isbn);
CREATE INDEX idx_books_published_date ON Books (published_date);




###

## USING DOCKER

# Interactive Book Search Project

This project is a web application for searching and exploring books. It uses MySQL as the database backend buit with React as Front END.

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. If not, you can download and install Docker from [Docker's official website](https://www.docker.com/get-started).

## Getting Started

1. Clone this repository to your local machine:
   git clone https://github.com/your-username/interactive-book-search.git
   cd interactive-book-search


2. Start the MySQL container:

 docker-compose up -d

This command will pull the official MySQL Docker image and start a MySQL container. It will also set the necessary environment variables for the root password and database name.

3. Access the MySQL container:

docker exec -it interactive-book-search-db bash


4. Log in to MySQL:

mysql -u root -p


Enter the root password you provided in the `docker-compose.yml` file.

5. Create the database and tables:

```sql
CREATE DATABASE interactive_book_search;
USE interactive_book_search;
-- Create your tables here
-- from above schema

6) exit MYSQL SHELL
7) exit Coainter Shell

Configuration

You can configure the MySQL connection settings in your application's configuration file. Use the following details:

Host: localhost
Port: 3306
Database: interactive_book_search
Username: root
Password: (the root password you provided in docker-compose.yml)

Usage
Start your web application and connect it to the MySQL database using the configuration you've set.

## DOCKER YAML FILE


**docker-compose.yml:**

yaml
version: '3'
services:
  interactive-book-search-db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: your-root-password
      MYSQL_DATABASE: interactive_book_search
    ports:
      - "3306:3306"
    volumes:
      - ./mysql-data:/var/lib/mysql


## DOCKER YAML FILE



---## Php SCRIPT FOR IMPORT CSV DATA SET INTO MYSQL ##

Create a Symfony Project 

step 1) symfony new BookstoreApp --full
step 2) edit .env in root of project 
DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name

step 3) Create Entity:
In Symfony, you work with entities to define the structure of your data. Create an entity for your books: php bin/console make:entity Book

step 4) Run the Migration to create necessary tables
php bin/console doctrine:migrations:migrate

step 5) CSV Data Import:
Create a command that reads the CSV file and imports the data into the database: php bin/console make:command ImportCsvCommand

step 6) Edit the generated command file in src/Command/ImportCsvCommand.php to read and import the CSV data:

// src/Command/ImportCsvCommand.php

// ... (use statements)

class ImportCsvCommand extends Command
{
    // ... (configure method)

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $csvFilePath = 'path/to/your/csv/file.csv';

        $em = $this->getDoctrine()->getManager();

        if (($handle = fopen($csvFilePath, "r")) !== false) {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                $book = new Book();
                $book->setIsbn($data[0]);
                $book->setTitle($data[1]);
                // Set other properties based on CSV columns
                $em->persist($book);
            }
            fclose($handle);
        }

        $em->flush();

        $output->writeln('CSV data imported successfully!');
        return Command::SUCCESS;
    }
}

step 7) 
Run the command to import data set
php bin/console app:import-csv


---SQL QUERIES -----

1)  Find the oldest book for each author.

WITH OldestBooks AS (
    SELECT
        author_id,
        MIN(published_date) AS oldest_published_date
    FROM
        Books
    GROUP BY
        author_id
)

SELECT
    A.author_id,
    A.first_name,
    A.last_name,
    B.title AS oldest_book_title,
    OB.oldest_published_date
FROM
    Authors A
JOIN
    OldestBooks OB ON A.author_id = OB.author_id
JOIN
    Books B ON A.author_id = B.author_id AND OB.oldest_published_date = B.published_date
ORDER BY
    A.author_id;


2)Find the authors who have written the most books in each genre.

SELECT genre, author, book_count
FROM (
    SELECT genre, author, COUNT(*) AS book_count,
           ROW_NUMBER() OVER (PARTITION BY genre ORDER BY COUNT(*) DESC) AS rank
    FROM books
    GROUP BY genre, author
) ranked_authors
WHERE rank = 1;


3)SELECT publication_year, COUNT(*) AS total_books
FROM (
    SELECT YEAR(published_date) AS publication_year
    FROM books
) AS years
GROUP BY publication_year
ORDER BY publication_year;


## ---MAKE SURE TO USE PREPERAED STATEMENTS IN CODE yo further improve code security ##

PART 1 & 2 END


TESTS

# Run npm test to start tests

