# Reto Técnico - Practicante Fullstack

**Empresa**: Trigono Inversiones S.A.C.  
**Puesto**: Practicante Profesional Fullstack  
**Postulante**: Mariajose Soles  
**Fecha de entrega**: 2 de julio de 2025

---

## Descripción

Aplicación web fullstack que permite a un usuario registrarse, iniciar sesión mediante autenticación JWT, y gestionar (CRUD) sus productos personales.

---

## Tecnologías usadas

### Backend
- Python 3.13
- Django 5.2.3
- Django REST Framework
- SimpleJWT
- PostgreSQL

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

---

## Configuración del entorno

### Base de datos PostgreSQL

La conexión está configurada en `tri_backend/api/settings.py`:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'trigono_db',
        'USER': 'trigono_user',
        'PASSWORD': 'animales',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

---

Comandos para crear y configurar la base de datos:
  CREATE DATABASE trigono_db;
  CREATE USER trigono_user WITH PASSWORD 'animales';
  ALTER ROLE trigono_user SET client_encoding TO 'utf8';
  ALTER ROLE trigono_user SET default_transaction_isolation TO 'read committed';
  ALTER ROLE trigono_user SET timezone TO 'UTC';
  GRANT ALL PRIVILEGES ON DATABASE trigono_db TO trigono_user;

---

Backend:
  git clone https://github.com/TU_USUARIO/ProyectoTrigono.git
  cd ProyectoTrigono/tri_backend
  
  python -m venv .venv
  source .venv/Scripts/activate  # En Windows
  # source .venv/bin/activate    # En Linux/macOS
  
  pip install -r requirements.txt
  
  python manage.py migrate
  python manage.py createsuperuser
  
  python manage.py runserver

---

Frontend:
  cd ProyectoTrigono/frontend
  npm install
  npm run dev

---
