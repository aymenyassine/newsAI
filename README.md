# NewsAI – Backend Spring Boot pour application d'actualités

API REST Spring Boot servant de backend à une application d'actualités, avec authentification sécurisée. Ce backend est associé au frontend Angular du projet [newsAI_frontend](https://github.com/aymenyassine/newsAI_frontend).

## Fonctionnalités

- Authentification et autorisation avec Spring Security + JWT
- Gestion des utilisateurs et des ressources d'actualités
- Monitoring de l'application avec Spring Actuator
- Persistance des données avec Spring Data JPA + MySQL

## Stack technique

- Java 21, Spring Boot 4
- Spring Data JPA, Spring Security, JWT (jjwt)
- MySQL, Lombok
- Maven

## Lancer le projet

```bash
./mvnw spring-boot:run
```

## Projet lié

Frontend Angular : [newsAI_frontend](https://github.com/aymenyassine/newsAI_frontend)

