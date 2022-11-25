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
- Use <span style="color: green;">*mvnw spring-boot:run*</span>. This will launch the back-end Spring boot's part. It will listen by default on Spring Boot's port "8080".
- With a second command prompt, go to project's folder as well.
- Use <span style="color: green;">*ng serve --o*</span>. This will launch the front-end Angular's part (and open a browser on application's home page). It will listen by default on Angular's port "4200" : <a href="http://localhost:4200">http://localhost:4200</a>

#### Hot build application during developments
- Spring boot's hot build is managed by a dependency added to maven configuration (in pom.xml file) : org.springframework.boot.spring-boot-devtools
- Angular's hot build is automatically done thanks to <span style="color: green;">*ng serve --o*</span> command we used for launching front-end part.

#### Conveniently launch application for developments (for Windows)
Launch <span style="color: green;">*app-launch-dev.bat*</span> script stored inside project's root directory. It will open two command prompt, each executing launch of either front-end or back-end part of application. One will contain logs from Sprint boot, the other from Angular.
