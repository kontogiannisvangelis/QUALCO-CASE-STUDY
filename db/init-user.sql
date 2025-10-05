CREATE USER IF NOT EXISTS 'nation_user'@'%' IDENTIFIED BY 'nation_user';
GRANT ALL PRIVILEGES ON nation.* TO 'nation_user'@'%';
FLUSH PRIVILEGES;
