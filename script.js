// Datos de los desafíos laborales
const desafiosData = {
    desigualdad: {
        titulo: "Desigualdad Salarial",
        icono: "⚖️",
        descripcion: "La desigualdad salarial es uno de los problemas más persistentes en el mundo laboral moderno.",
        contenido: `
            <h3>Aspectos clave de la desigualdad salarial:</h3>
            <ul>
                <li><strong>Brecha de género:</strong> Las mujeres ganan en promedio 20% menos que los hombres por el mismo trabajo</li>
                <li><strong>Diferencias étnicas:</strong> Minorías étnicas enfrentan discriminación salarial sistemática</li>
                <li><strong>Geografía:</strong> Grandes diferencias entre regiones urbanas y rurales</li>
                <li><strong>Educación:</strong> El acceso limitado a educación de calidad perpetúa las desigualdades</li>
            </ul>
            <p><strong>Beneficios de la inclusión:</strong> Empresas diversas son 35% más rentables y más innovadoras.</p>
        `
    },
    precariedad: {
        titulo: "Trabajo Precario",
        icono: "📉",
        descripcion: "Empleos sin estabilidad, beneficios sociales ni protección laboral adecuada.",
        contenido: `
            <h3>Características del trabajo precario:</h3>
            <ul>
                <li><strong>Contratos temporales:</strong> Aumento del 50% en los últimos 20 años</li>
                <li><strong>Gig economy:</strong> Trabajadores sin beneficios sociales tradicionales</li>
                <li><strong>Salarios bajos:</strong> Ingresos insuficientes para cubrir necesidades básicas</li>
                <li><strong>Inseguridad:</strong> Falta de protección ante despidos o enfermedades</li>
            </ul>
            <p><strong>Sectores afectados:</strong> Servicios, retail, delivery y trabajo doméstico.</p>
        `
    },
    formacion: {
        titulo: "Brecha de Habilidades",
        icono: "📚",
        descripcion: "Desajuste entre las habilidades de los trabajadores y las demandas del mercado laboral.",
        contenido: `
            <h3>Aspectos de la brecha de habilidades:</h3>
            <ul>
                <li><strong>Habilidades digitales:</strong> 40% de trabajadores carece de competencias digitales básicas</li>
                <li><strong>Soft skills:</strong> Demanda creciente de habilidades interpersonales y de liderazgo</li>
                <li><strong>Educación desactualizada:</strong> Sistemas educativos no alineados con necesidades del mercado</li>
                <li><strong>Aprendizaje continuo:</strong> Necesidad de formación permanente a lo largo de la carrera</li>
            </ul>
            <p><strong>Solución:</strong> Programas de capacitación continua y colaboración entre empresas y instituciones educativas.</p>
        `
    }
};

// Estadísticas animadas
const estadisticas = {
    desempleo: 5.4,
    brecha: 20,
    precario: 35,
    burnout: 76
};

// Variables globales
let opiniones = [];

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para mostrar detalles del desafío en modal
function mostrarDetalle(desafio) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const data = desafiosData[desafio];
    
    if (data) {
        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon">${data.icono}</div>
                <h2>${data.titulo}</h2>
            </div>
            <div class="modal-description">
                <p>${data.descripcion}</p>
            </div>
            <div class="modal-content-body">
                ${data.contenido}
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para animar números en estadísticas
function animarEstadisticas() {
    const statElements = {
        'stat-desempleo': estadisticas.desempleo,
        'stat-brecha': estadisticas.brecha,
        'stat-precario': estadisticas.precario,
        'stat-burnout': estadisticas.burnout
    };
    
    Object.entries(statElements).forEach(([id, targetValue]) => {
        const element = document.getElementById(id);
        if (element) {
            animateValue(element, 0, targetValue, 2000, id.includes('desempleo') || id.includes('brecha'));
        }
    });
}

// Función auxiliar para animar valores
function animateValue(element, start, end, duration, isDecimal = false) {
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de easing para animación más suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (end - start) * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(currentValue) + '%';
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Función para manejar el formulario de opiniones
function manejarFormulario() {
    const form = document.getElementById('opinion-form');
    const resultDiv = document.getElementById('form-result');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const opinion = {
            desafio: formData.get('principal-desafio'),
            sector: formData.get('sector'),
            opinion: formData.get('opinion'),
            fecha: new Date().toLocaleDateString()
        };
        
        // Validar que todos los campos estén completos
        if (!opinion.desafio || !opinion.sector || !opinion.opinion) {
            mostrarResultado('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Simular envío de datos
        opiniones.push(opinion);
        
        // Mostrar resultado exitoso
        mostrarResultado('¡Gracias por tu opinión! Tu perspectiva es valiosa para entender mejor los desafíos laborales.', 'success');
        
        // Limpiar formulario
        form.reset();
        
        // Actualizar estadísticas locales (simulación)
        actualizarEstadisticasLocales(opinion.desafio);
    });
}

// Función para mostrar resultado del formulario
function mostrarResultado(mensaje, tipo) {
    const resultDiv = document.getElementById('form-result');
    resultDiv.innerHTML = mensaje;
    resultDiv.className = `form-result ${tipo}`;
    resultDiv.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}

// Función para actualizar estadísticas locales
function actualizarEstadisticasLocales(desafio) {
    // Simular impacto en estadísticas basado en las opiniones
    const impacts = {
        'precariedad': () => {
            const currentStat = parseFloat(document.getElementById('stat-precario').textContent);
            const newValue = Math.min(currentStat + 0.1, 100);
            document.getElementById('stat-precario').textContent = newValue.toFixed(1) + '%';
        },
        'equilibrio': () => {
            const currentStat = parseFloat(document.getElementById('stat-burnout').textContent);
            const newValue = Math.min(currentStat + 0.1, 100);
            document.getElementById('stat-burnout').textContent = newValue.toFixed(1) + '%';
        }
    };
    
    if (impacts[desafio]) {
        impacts[desafio]();
    }
}

// Función para detectar cuando las estadísticas están en vista
function observarEstadisticas() {
    const statsSection = document.getElementById('estadisticas');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarEstadisticas();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Función para añadir efectos de hover a las cartas
function añadirEfectosHover() {
    const cards = document.querySelectorAll('.desafio-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para manejar navegación suave
function configurarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Función para cerrar modal al hacer clic fuera
function configurarModal() {
    const modal = document.getElementById('modal');
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            cerrarModal();
        }
    });
}

// Función para añadir efecto parallax suave
function añadirEfectoParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Función para mostrar/ocultar header en scroll
function configurarHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Función para crear partículas de fondo (opcional)
function crearParticulasFondo() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        hero.appendChild(particle);
    }
    
    // Añadir CSS para animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-1000px) rotate(360deg); opacity: 0; }
        }
        .hero { position: relative; overflow: hidden; }
        .particle { pointer-events: none; }
    `;
    document.head.appendChild(style);
}

// Función de inicialización
function inicializar() {
    // Configurar todas las funcionalidades
    manejarFormulario();
    observarEstadisticas();
    añadirEfectosHover();
    configurarNavegacion();
    configurarModal();
    añadirEfectoParallax();
    configurarHeaderScroll();
    crearParticulasFondo();
    
    // Mensaje de bienvenida en consola
    console.log('🌍 Página de Desafíos Sociales Laborales cargada correctamente');
    console.log('📊 Estadísticas:', estadisticas);
    console.log('💡 Funcionalidades activas: Modal, Animaciones, Formulario, Navegación');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);

// Función para debugging (solo en desarrollo)
function debug() {
    return {
        opiniones: opiniones,
        estadisticas: estadisticas,
        desafios: Object.keys(desafiosData)
    };
}

// Hacer disponible para debugging
window.debug = debug;<strong>Impacto:</strong> Afecta la cohesión social, reduce el crecimiento económico y perpetúa ciclos de pobreza.</p>
        `
    },
    automatizacion: {
        titulo: "Automatización y Tecnología",
        icono: "🤖",
        descripcion: "La revolución tecnológica está transformando radicalmente el mercado laboral.",
        contenido: `
            <h3>Efectos de la automatización:</h3>
            <ul>
                <li><strong>Desplazamiento laboral:</strong> 375 millones de trabajadores necesitarán reentrenarse para 2030</li>
                <li><strong>Nuevas oportunidades:</strong> Creación de empleos en tecnología e innovación</li>
                <li><strong>Polarización:</strong> Aumento de trabajos altamente calificados y de baja calificación</li>
                <li><strong>Velocidad del cambio:</strong> Las habilidades se vuelven obsoletas más rápidamente</li>
            </ul>
            <p><strong>Sectores más afectados:</strong> Manufactura, transporte, atención al cliente y contabilidad.</p>
        `
    },
    equilibrio: {
        titulo: "Equilibrio Vida-Trabajo",
        icono: "⚖️",
        descripcion: "La dificultad para mantener un balance saludable entre la vida personal y profesional.",
        contenido: `
            <h3>Desafíos del equilibrio vida-trabajo:</h3>
            <ul>
                <li><strong>Cultura de siempre conectado:</strong> Tecnología difumina límites entre trabajo y vida personal</li>
                <li><strong>Burnout:</strong> 76% de empleados reportan agotamiento laboral</li>
                <li><strong>Trabajo remoto:</strong> Nuevos desafíos de organización y límites</li>
                <li><strong>Presión económica:</strong> Necesidad de trabajar más horas para mantener el nivel de vida</li>
            </ul>
            <p><strong>Consecuencias:</strong> Problemas de salud mental, relaciones familiares afectadas y menor productividad.</p>
        `
    },
    inclusion: {
        titulo: "Falta de Inclusión",
        icono: "🤝",
        descripcion: "Barreras sistemáticas que enfrentan grupos minoritarios en el ámbito laboral.",
        contenido: `
            <h3>Aspectos de la exclusión laboral:</h3>
            <ul>
                <li><strong>Personas con discapacidad:</strong> Solo 29% tiene empleo, comparado con 75% de la población general</li>
                <li><strong>Minorías étnicas:</strong> Menor representación en puestos directivos</li>
                <li><strong>Edad:</strong> Discriminación contra trabajadores mayores de 50 años</li>
                <li><strong>LGBTQ+:</strong> 27% ha experimentado discriminación laboral</li>
            </ul>
            <p>
