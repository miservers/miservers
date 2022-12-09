
### Build a Docker Image
Create the  *Dockerfile*

    FROM httpd:2.4
    COPY ./public-html  /usr/local/apache2/htdocs/

Build the Image

    docker build -t myhttpd:2.4 .


### Manage Docker Images
List of installed images

    docker images

Remove an image

    docker rmi [IMAGE_ID]


### Docker Containers
List of Running containers

    docker ps

Start/start a container

    docker stop myhttpd2

Remove a container

    docker rm myhttpd2

### Command Help
All Docker Commands

    docker -h

Help on a Command(eg. build)

    docker build -h

