# SQL Basics: From Installation to Fundamental Concepts

## Part 1: Installing PostgreSQL Locally

### Why PostgreSQL?

PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development. It has earned a strong reputation for reliability, feature robustness, and performance.

Key advantages:
- Open-source and free
- ACID compliant (Atomicity, Consistency, Isolation, Durability)
- Excellent documentation and community support
- Advanced features like complex queries, foreign keys, triggers, views, and transactions
- Cross-platform compatibility

### Installation Instructions by Operating System

#### Windows Installation

1. **Download the installer**:
   - Visit the official PostgreSQL website: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
   - Select the latest version of PostgreSQL
   - Choose the appropriate Windows architecture (32-bit or 64-bit)

2. **Run the installer**:
   - Launch the downloaded .exe file
   - Follow the installation wizard
   - Select components to install (PostgreSQL Server, pgAdmin, Command Line Tools)
   - Choose installation directory (default is usually fine)
   - Set a password for the default PostgreSQL user (postgres)
   - Use the default port (5432) unless you have a specific reason to change it
   - Select default locale

3. **Verify installation**:
   - Open pgAdmin (included in the installation)
   - Connect to the local server with credentials created during installation
   - Or open Command Prompt and type: `psql -U postgres`

#### macOS Installation

1. **Using Homebrew** (recommended):
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install PostgreSQL
   brew install postgresql
   
   # Start PostgreSQL service
   brew services start postgresql
   ```

2. **Using the Postgres.app** (alternative approach):
   - Download from [https://postgresapp.com/](https://postgresapp.com/)
   - Drag to Applications folder
   - Open the app and click "Initialize" to create a PostgreSQL server

3. **Verify installation**:
   ```bash
   # Connect to default database
   psql postgres
   
   # Check version
   postgres=# SELECT version();
   ```

#### Linux Installation (Ubuntu/Debian)

1. **Install PostgreSQL**:
   ```bash
   # Update package lists
   sudo apt update
   
   # Install PostgreSQL and PostgreSQL client
   sudo apt install postgresql postgresql-contrib
   
   # Verify service is running
   sudo systemctl status postgresql
   ```

2. **Initial setup**:
   ```bash
   # Switch to postgres user
   sudo -i -u postgres
   
   # Access PostgreSQL prompt
   psql
   
   # Set password for postgres user
   \password postgres
   ```

3. **Verify installation**:
   ```bash
   # Check version
   postgres=# SELECT version();
   ```

## Part 2: PostgreSQL Configuration Basics

### Important Configuration Files

- **postgresql.conf**: Main configuration file for PostgreSQL parameters
- **pg_hba.conf**: Client authentication configuration file
- **pg_ident.conf**: User name mapping settings

### Basic Server Configuration

Important parameters in postgresql.conf:
- `listen_addresses`: Specifies which IP addresses PostgreSQL listens on ('localhost' by default)
- `port`: TCP port the server listens on (5432 by default)
- `max_connections`: Maximum number of concurrent connections
- `shared_buffers`: Memory allocation for caching (recommend 25% of system RAM)
- `work_mem`: Memory used for query operations

### pgAdmin Overview

pgAdmin is a graphical administration tool for PostgreSQL:
- Server connection management
- Database objects browser
- Query tool with SQL editor
- Server and database monitoring dashboards
- Backup and restore functionality

## Part 3: SQL Fundamentals

### Creating a Database

```sql
-- From psql command line
CREATE DATABASE my_database;

-- Connect to database
\c my_database

-- From SQL command within another connection
CREATE DATABASE another_database;
```

### Creating Tables

```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary NUMERIC(10, 2),
    department_id INTEGER
);

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);
```

### Data Types in PostgreSQL

Common data types:
- **Numeric**: INTEGER, SMALLINT, BIGINT, NUMERIC, REAL, DOUBLE PRECISION
- **Character**: CHAR, VARCHAR, TEXT
- **Date/Time**: DATE, TIME, TIMESTAMP, INTERVAL
- **Boolean**: BOOLEAN
- **UUID**: For unique identifiers
- **JSON/JSONB**: For storing JSON data
- **Arrays**: Any data type can be used as an array
- **Geometric**: POINT, LINE, CIRCLE, POLYGON

### Basic SQL Commands

#### INSERT Data

```sql
-- Insert a single row
INSERT INTO departments (department_name, location) 
VALUES ('Engineering', 'Building A');

-- Insert multiple rows
INSERT INTO departments (department_name, location) 
VALUES 
    ('Marketing', 'Building B'),
    ('Finance', 'Building C'),
    ('Human Resources', 'Building A');

-- Insert with returning clause
INSERT INTO departments (department_name, location) 
VALUES ('Research', 'Building D')
RETURNING department_id, department_name;
```

#### SELECT Data

```sql
-- Select all columns and rows
SELECT * FROM departments;

-- Select specific columns
SELECT department_name, location FROM departments;

-- Select with conditions
SELECT * FROM departments WHERE location = 'Building A';

-- Select with ordering
SELECT * FROM departments ORDER BY department_name ASC;

-- Select with limit
SELECT * FROM departments LIMIT 2;

-- Select with offset
SELECT * FROM departments OFFSET 2 LIMIT 2;
```

#### UPDATE Data

```sql
-- Update a single column for all rows
UPDATE departments SET location = 'Main Campus';

-- Update with condition
UPDATE departments 
SET location = 'East Campus' 
WHERE department_name = 'Engineering';

-- Update multiple columns
UPDATE departments 
SET 
    department_name = 'Engineering & Design',
    location = 'Innovation Center'
WHERE department_id = 1;

-- Update with returning clause
UPDATE departments 
SET location = 'Financial District' 
WHERE department_id = 3
RETURNING *;
```

#### DELETE Data

```sql
-- Delete specific rows
DELETE FROM departments WHERE department_name = 'Research';

-- Delete all rows
DELETE FROM departments;

-- Delete with returning clause
DELETE FROM departments WHERE department_id = 4 RETURNING *;
```

### Adding Constraints

```sql
-- Add a foreign key constraint
ALTER TABLE employees 
ADD CONSTRAINT fk_department 
FOREIGN KEY (department_id) 
REFERENCES departments (department_id);

-- Add a check constraint
ALTER TABLE employees 
ADD CONSTRAINT check_salary 
CHECK (salary > 0);

-- Add a unique constraint
ALTER TABLE employees 
ADD CONSTRAINT unique_email_phone 
UNIQUE (email);

-- Add a not null constraint
ALTER TABLE employees 
ALTER COLUMN first_name SET NOT NULL;
```

### Basic Joins

```sql
-- Inner join
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Left join
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- Right join
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- Full outer join
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;
```

### Aggregation and Grouping

```sql
-- Count rows
SELECT COUNT(*) FROM employees;

-- Sum values
SELECT SUM(salary) FROM employees;

-- Average
SELECT AVG(salary) FROM employees;

-- Min and max
SELECT MIN(salary), MAX(salary) FROM employees;

-- Group by
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id;

-- Having clause
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;
```

## Part 4: Database Administration Basics

### User Management

```sql
-- Create a new user (role)
CREATE USER app_user WITH PASSWORD 'secure_password';

-- Grant privileges to a user
GRANT SELECT, INSERT, UPDATE ON employees TO app_user;
GRANT SELECT ON departments TO app_user;

-- Create a role with specific attributes
CREATE ROLE read_only_users NOLOGIN;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read_only_users;

-- Add a user to a role
GRANT read_only_users TO app_user;

-- Revoke privileges
REVOKE INSERT ON employees FROM app_user;
```

### Backup and Restore

```bash
# Create a backup
pg_dump -U postgres -d my_database -f backup.sql

# Backup specific tables
pg_dump -U postgres -d my_database -t employees -t departments -f tables_backup.sql

# Backup in custom format
pg_dump -U postgres -d my_database -Fc -f backup.dump

# Restore from SQL backup
psql -U postgres -d my_database -f backup.sql

# Restore from custom format
pg_restore -U postgres -d my_database backup.dump
```

### Indexing Basics

```sql
-- Create a B-tree index (default)
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- Create a unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Create a multi-column index
CREATE INDEX idx_employee_names ON employees(first_name, last_name);

-- Create a partial index
CREATE INDEX idx_high_salary ON employees(salary) WHERE salary > 50000;

-- Drop an index
DROP INDEX idx_employee_lastname;
```

## Next Steps

After mastering these basics, you might want to explore:

1. Advanced SQL queries and window functions
2. Database design and normalization
3. Performance tuning and query optimization
4. Transaction management
5. Stored procedures and functions
6. PostgreSQL extensions (PostGIS, hstore, etc.)
7. Replication and high availability

## Resources

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [PostgreSQL Exercises](https://pgexercises.com/)
