# syntax=docker/dockerfile:1.7

### ===== Stage 1: Build (usa tu Maven Wrapper) =====
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

# Copiamos wrapper y POM primero para cachear dependencias
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Usa caché de Maven (BuildKit) para acelerar builds repetidos
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw -B -DskipTests dependency:go-offline

# Ahora sí copiamos el código
COPY src ./src

# Compilamos (sin tests) y generamos el jar
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw -B clean package -DskipTests

### ===== Stage 2: Runtime (solo JRE, usuario no root) =====
FROM eclipse-temurin:17-jre AS runtime
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:InitialRAMPercentage=25 -XX:MinRAMPercentage=25" \
    SPRING_PROFILES_ACTIVE=prod \
    TZ=America/Bogota

WORKDIR /app

# Usuario no root
RUN addgroup --system app && adduser --system --ingroup app --home /app app

# Copiamos el jar compilado (cualquiera que esté en target/)
COPY --from=builder /app/target/*.jar /app/app.jar

EXPOSE 8080
USER app

# Tip: si usas actuator puedes habilitar este HEALTHCHECK instalando curl (sube un poco la imagen)
# RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
#   CMD curl -fsS http://localhost:8080/actuator/health | grep -q '"status":"UP"' || exit 1

ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
