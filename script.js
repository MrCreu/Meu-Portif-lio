// ===== CONFIGURAÇÕES GERAIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initPreloader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initSkillBars();
    initTypingEffect();
    initSmoothScroll();
    initMobileMenu();
    initParticles();
    initParallax();
    initCounters();
    initProjectModals();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Simular carregamento
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            
            // Iniciar animações após preloader
            setTimeout(() => {
                initHeroAnimations();
            }, 100);
        }, 2000);
    }
}

// ===== ANIMAÇÕES DO HERO =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animar card do código
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        setTimeout(() => {
            heroCard.style.opacity = '0';
            heroCard.style.transform = 'translateX(50px) scale(0.9)';
            heroCard.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                heroCard.style.opacity = '1';
                heroCard.style.transform = 'translateX(0) scale(1)';
            }, 100);
        }, 800);
    }
}

// ===== NAVEGAÇÃO E SCROLL =====
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mudar estilo do header no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Navegação ativa baseada na seção visível
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.projeto-card, .habilidade-categoria, .depoimento-card, .feature-card');
    animateElements.forEach(el => observer.observe(el));
}

// ===== ANIMAÇÕES =====
function initAnimations() {
    // Animação de hover nos cards
    const cards = document.querySelectorAll('.projeto-card, .habilidade-categoria, .depoimento-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== BARRAS DE HABILIDADES =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.habilidade-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width;
                
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 100);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== CONTADORES =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== EFEITO DE DIGITAÇÃO =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar efeito quando a seção estiver visível
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroTitle);
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter dados do formulário
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.email || !data.mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simular envio (substitua por sua lógica real)
            showNotification('Enviando mensagem...', 'info');
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
            }, 2000);
        });
        
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// ===== VALIDAÇÃO DE CAMPOS =====
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'nome':
            if (value.length < 2) {
                showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Email inválido');
            }
            break;
        case 'mensagem':
            if (value.length < 10) {
                showFieldError(field, 'Mensagem deve ter pelo menos 10 caracteres');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '4px';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fechar notificação
    const closeNotification = () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto-remover após 5 segundos
    setTimeout(closeNotification, 5000);
}

// ===== PARTÍCULAS =====
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Criar partículas dinâmicas
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animação
    const duration = 3000 + Math.random() * 2000;
    const delay = Math.random() * 2000;
    
    particle.style.animation = `float ${duration}ms ease-in-out ${delay}ms infinite`;
    
    container.appendChild(particle);
}

// ===== EFEITOS PARALLAX =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== MODAIS DE PROJETOS =====
function initProjectModals() {
    const projectCards = document.querySelectorAll('.projeto-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Evitar abrir modal se clicar nos links
            if (e.target.closest('.projeto-links')) return;
            
            const projectData = {
                title: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                image: card.querySelector('img').src,
                category: card.querySelector('.projeto-category').textContent,
                technologies: Array.from(card.querySelectorAll('.projeto-tech span')).map(span => span.textContent)
            };
            
            showProjectModal(projectData);
        });
    });
}

function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <div class="modal-category">${project.category}</div>
                    <h2>${project.title}</h2>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-description">
                        <p>${project.description}</p>
                    </div>
                    <div class="modal-tech">
                        <h4>Tecnologias Utilizadas:</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        background: var(--bg-card);
        border-radius: 16px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        border: 1px solid var(--border-color);
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        padding: 32px 32px 0;
        border-bottom: 1px solid var(--border-color);
        margin-bottom: 24px;
    `;
    
    const modalCategory = modal.querySelector('.modal-category');
    modalCategory.style.cssText = `
        background: var(--gradient-primary);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
        margin-bottom: 12px;
    `;
    
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.style.cssText = `
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    `;
    
    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        padding: 0 32px 32px;
    `;
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.style.cssText = `
        margin-bottom: 24px;
        border-radius: 12px;
        overflow: hidden;
    `;
    
    const modalImageImg = modal.querySelector('.modal-image img');
    modalImageImg.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
    `;
    
    const modalDescription = modal.querySelector('.modal-description');
    modalDescription.style.cssText = `
        margin-bottom: 24px;
    `;
    
    const modalDescriptionP = modal.querySelector('.modal-description p');
    modalDescriptionP.style.cssText = `
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1rem;
        margin: 0;
    `;
    
    const modalTech = modal.querySelector('.modal-tech');
    modalTech.style.cssText = `
        margin-top: 24px;
    `;
    
    const modalTechH4 = modal.querySelector('.modal-tech h4');
    modalTechH4.style.cssText = `
        color: var(--text-primary);
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 12px;
    `;
    
    const techTags = modal.querySelector('.tech-tags');
    techTags.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    `;
    
    const techSpans = modal.querySelectorAll('.tech-tags span');
    techSpans.forEach(span => {
        span.style.cssText = `
            background: var(--bg-tertiary);
            color: var(--primary-color);
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
            border: 1px solid rgba(99, 102, 241, 0.2);
        `;
    });
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = 'var(--text-primary)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = 'var(--text-secondary)';
    });
    
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        overlay.style.transform = 'scale(1)';
    }, 100);
    
    // Fechar modal
    const closeModal = () => {
        modal.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== INICIALIZAÇÃO ADICIONAL =====
window.addEventListener('load', function() {
    // Inicializar funcionalidades adicionais após carregamento completo
    initParallax();
    
    // Preloader (se existir)
    const preloader = document.querySelector('.preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }
});

// ===== HANDLERS DE ERRO =====
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript:', e.error);
});

// ===== PERFORMANCE =====
// Otimizar scroll com throttle
const throttledScrollHandler = throttle(() => {
    // Handlers de scroll otimizados
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// ===== SERVICE WORKER (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(error => {
                console.log('SW falhou:', error);
            });
    });
}

