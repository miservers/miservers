
### Compile and Run this example
    mvn compile exec:java

### Maven : project structure creatio/n
    mvn archetype:generate -DgroupId=ma.jpa -DartifactId=test-jpa \
                           -DarchetypeArtifactId=maven-archetype-quickstart \
                           -DinteractiveMode=false

### Install mySQL 
    install mysql-server
    install mysql-workbench


### Start mySQL      
    sudo systemctl start mysql

### Connect to MySQL console.    
    sudo mysql 


### create data base
    create DATABASE testdb CHARACTER SET 'utf8';
    
### create a user
    CREATE USER 'myuser1'@'localhost' IDENTIFIED BY 'pass123';
    GRANT ALL PRIVILEGES ON testdb.* TO 'myuser1'@'localhost';
    FLUSH PRIVILEGES;


