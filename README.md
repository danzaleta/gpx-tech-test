# PRUEBA TÉCNICA

## Instrucciones de Instalación y Ejecución
Sigue estos pasos en orden para levantar el proyecto completo.

## Requisitos Previos
Asegúrate de tener instalado el siguiente software en tu sistema:

**Git:** Para clonar el repositorio.

**Node.js:** Se recomienda la versión 18.x o superior. Puedes descargarlo desde nodejs.org.

**Docker y Docker Compose:** Para ejecutar la base de datos PostgreSQL en un contenedor. Puedes descargarlo desde docker.com.

---
### Paso 1: Clonar el Repositorio
```
git clone https://github.com/danzaleta/gpx-tech-test.git

cd gpx-tech-test
```
---
### Paso 2: Configuración del Backend y Base de Datos

#### 1. Crea el archivo de variables de entorno:
Dentro de la carpeta backend, hay un archivo .env.example para que sirva de plantilla.
```
# backend/.env.example

# URL de conexión a la base de datos.
# Los valores (usuario, contraseña, puerto, nombre de la DB) deben coincidir con los definidos en el archivo docker-compose.yml.

DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/personas_db"
```

#### 2. Inicia el contenedor de la Base de Datos:
Esto descargará la imagen de PostgreSQL (si no la tienes) y creará e iniciará el contenedor en segundo plano (-d).
```
cd backend

docker-compose up -d
```

#### 3. Instalar dependencias
```
cd backend

npm install
```

#### 4. Ejecuta las Migraciones de la Base de Datos:

Se leerá el schema.prisma y creará la tabla Person en la base de datos que está corriendo en Docker.
```
npx prisma migrate dev
```
---
### Paso 3: Configuración del Frontend

#### 1. Navega a la carpeta frontend:
Abre una nueva terminal o navega desde la raíz del proyecto.
```
cd ../frontend  # Si estás en la carpeta backend
# o
cd frontend     # Si estás en la raíz del proyecto
```
#### 2. Instala las dependencias del Frontend:
```
npm install
```

---
### Paso 4: Ejecutar la Aplicación Completa
Necesitas tener dos terminales abiertas para correr el backend y el frontend simultáneamente.

- **En la Terminal 1 (Backend):**
```
cd backend

npm run dev
```
El servidor de la API estará corriendo en http://localhost:4000.

- **En la Terminal 2 (Frontend):**
```
cd frontend

npm start
```
La aplicación de React se abrirá automáticamente en tu navegador en http://localhost:3000.