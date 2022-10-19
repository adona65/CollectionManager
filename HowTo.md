# How to make this application working
## Documentation purpose
The goal of this document is explaining various informations about this project. It may contains : 
- basics informations like "how launching the application" or "how to configure it"
- explanations about some concepts for learning purposes
- indications about tricky issues and how to solve them

**What this documentation won't contains :** explanations about the code. All needed indications will be included in code itself as commentaries and docs.

## Application informations
#### Launch the application (for Windows)
- With command prompt, go to project's folder.
- Use <span style="color: green;">*mvnw spring-boot:run*</span>. This will launch both Spring boot and Angular, thanks to maven pluggins. The application will listen by default on Spring Boot's port "8080" : <a href="http://localhost:8080">http://localhost:8080</a> (and not on Angular's default port "4200").

#### Hot build application during developments (for Windows)
- Open another command prompt's window, then go to project's folder.
- Use <span style="color: green;">*ng build --watch*</span>. Updates are built (quickly) and pushed to target/classes where they can be picked up by Spring Boot. The changes may then be watched in browser.

#### Conveniently launch application for developments (for Windows)
Launch <span style="color: green;">*app-launch-dev.bat*</span> script stored inside project's root directory. It will open two command prompt, each with previous commands.
