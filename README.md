# F1 Comunicación

Curso e-learning **"Comunicación"** con temática de Fórmula 1, empaquetado como **SCORM 1.2**. El participante avanza por 3 módulos con videos, cómics, preguntas y juegos, y va ganando logros (llanta, casco, guantes, traje, zapatos, volante…) y un trofeo por módulo.

Desarrollado por **Kannbal**.

---

## Contenido del curso

| Módulo | Archivo | Contenido principal |
|---|---|---|
| Intro | `index.html` | Splash, video de bienvenida, menú de módulos y trofeos |
| 1 | `module_1.html` | Estilos de comunicación (búho, delfín, pantera, pavorreal) |
| 2 | `module_2.html` | Cómic, preguntas y SARP |
| 3 | `module_3.html` + `juego3.html` | Manejo de emociones, impacto biológico, carácter/temperamento y juego final |

Los módulos se cargan dinámicamente dentro de `index.html` (`#carga_materia`) con `$.load("module_N.html")`.

## Estructura

```
.
├── imsmanifest.xml            # Manifiesto SCORM 1.2 (punto de entrada: index.html)
├── *.xsd                      # Esquemas requeridos por SCORM 1.2
├── index.html                 # Shell del curso: splash, menú, trofeos
├── module_1.html … module_3.html
├── juego3.html                # Juego del módulo 3
└── assets/
    ├── css/                   # styles.css (general) + module-N.css
    │   └── lib/               # w3.css, jquery-ui, animate.css, swiper
    ├── js/
    │   ├── app.js             # Navegación general, menú, música, carga de módulos
    │   ├── funciones_base_scorm.js  # Inicio, guardado y cierre SCORM
    │   ├── module-1.js … module-3.js
    │   ├── lib/               # jQuery 2.2.4, scormfunctions.js, swiper, etc.
    │   └── gsap/              # GSAP y plugins
    ├── img/  (~134 MB)
    ├── vid/  (~216 MB)
    ├── aud/  (~15 MB)
    └── fonts/
```

## Seguimiento SCORM

Lógica en `assets/js/funciones_base_scorm.js` (usa `assets/js/lib/scormfunctions.js` para hablar con el LMS):

- **Inicio** (`doStart`, al presionar *Comenzar*): lee `cmi.core.lesson_status`.
  - `not attempted` → marca `incomplete` y crea el objeto de avance inicial.
  - `incomplete` → restaura el avance desde `cmi.suspend_data`.
  - `completed` / `passed` → restaura avance y marca el curso como terminado.
- **Avance** (`save_Status`): guarda en `cmi.suspend_data` el progreso por módulo (`ch1`, `ch2`, `ch3`), logros, trofeos, respuestas, última slide y preferencia de música.
- **Completado** (`setComplete`): `cmi.core.lesson_status = completed` y score `100/100`.
- **Salida** (`doUnload`): registra `cmi.core.session_time` y `cmi.core.exit = suspend` si no terminó.

## Ramas

| Rama | Uso |
|---|---|
| `main` | Versión estable / la que se entrega |
| `developer` | Desarrollo; aquí se integra todo antes de pasar a `main` |
| `gepp` | Versión adaptada para **GEPP** (logo, ajustes UAT, lazy loading de videos) |
| `marca_blanca` | Versión **marca blanca** (sin marca cliente) |

> `gepp` y `marca_blanca` son versiones independientes: **no se fusionan** con `developer` ni con `main`. Si un fix aplica a todas, se hace un commit en cada rama.

Flujo: trabajar en `developer` → probar → pasar a `main`.

## Correr en local

Es HTML/JS estático, pero los módulos se cargan con AJAX, así que **no funciona abriendo el archivo directo** (`file://`). Levanta un servidor:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Fuera de un LMS no hay API SCORM: el curso se ve, pero el avance no se guarda (la consola mostrará avisos de SCORM).

## Generar el paquete SCORM

`imsmanifest.xml` debe quedar en la **raíz** del zip:

```bash
git archive --format=zip -o f1-comunicacion.zip main
```

Se puede cambiar `main` por `gepp` o `marca_blanca` para generar esa versión. El paquete pesa ~356 MB.

## Publicar en Reach 360

1. **Manage → Courses → Add Courses → Import course (.zip)** y subir el zip (límite 5 GB).
2. Abrir el curso → **Publish Course**.
3. **Enroll Groups / Enroll Learners** para asignarlo.

Para actualizar un curso ya publicado usar **Upload new version** (sobrescribe la versión anterior, Reach 360 no guarda historial).

## Repositorios

- GitHub: `EduMejKannbal/f1-comunicacion`
- GitLab: `kannbal-dev/f1-comunicacion`
