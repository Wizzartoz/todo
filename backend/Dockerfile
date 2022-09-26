#FROM maven:3.6.0-jdk-11-slim AS build
#COPY src /home/app/src
#COPY pom.xml /home/app
#RUN mvn -f pom.xml clean package
#
#
#FROM openjdk:11-jre-slim
#COPY --from=build /home/app/target/pet-0.0.1-SNAPSHOT.jar /usr/local/lib/pet.jar
#ENTRYPOINT ["java","-jar","/usr/local/lib/pet.jar"]


FROM maven:3.8.6-jdk-11-slim as builder
WORKDIR /building

ADD . .
RUN mvn package -T 4 -B -D maven.javadoc.skip=true -DskipTests
RUN mv target/$(ls ./target | grep \.jar | grep -v original | grep -v javadoc | grep -v sources) ./pet.jar

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /building/pet.jar .

ENTRYPOINT java \
	-XX:MaxDirectMemorySize=10M -XX:ReservedCodeCacheSize=240M -Xss1M -Xmx261240K \
	-jar pet.jar