document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
});

function initHeader() {
    const header = document.querySelector('.jlwy-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (!btn || !menu) return;
    
    btn.addEventListener('click', function() {
        menu.classList.toggle('hidden');
        const isHidden = menu.classList.contains('hidden');
        const icon = btn.querySelector('i');
        if (isHidden) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            btn.setAttribute('aria-expanded', 'false');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
    
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    document.querySelectorAll('.jlwy-mobile-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.add('hidden');
            btn.querySelector('i').classList.remove('fa-times');
            btn.querySelector('i').classList.add('fa-bars');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.jlwy-fade-in');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(function(el) {
        observer.observe(el);
    });
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    
    if (!btn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openImageModal(src) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openGalleryImage(src) {
    openImageModal(src);
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('jlwy-modal') && e.target.id === 'image-modal') {
        closeImageModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

function copyCode(code) {
    navigator.clipboard.writeText(code).then(function() {
        showToast('已复制到剪贴板: ' + code);
    }).catch(function() {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('已复制到剪贴板: ' + code);
    });
}

function showToast(message) {
    let toast = document.querySelector('.jlwy-toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'jlwy-toast';
        toast.innerHTML = '<div class="jlwy-toast-icon"><i class="fas fa-check"></i></div><span class="jlwy-toast-text"></span>';
        document.body.appendChild(toast);
    }
    
    toast.querySelector('.jlwy-toast-text').textContent = message;
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}

function shareToWeibo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open('https://service.weibo.com/share/share.php?url=' + url + '&title=' + title, '_blank');
}

function shareToWechat() {
    showToast('请使用微信扫一扫分享此页面');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(function() {
        showToast('链接已复制到剪贴板');
    }).catch(function() {
        showToast('链接复制失败，请手动复制');
    });
}

function filterArticles(category) {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach(function(card) {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = cardCategory === category ? 'block' : 'none';
        }
    });
}

(function() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            filterArticles(filter);
        });
    });
})();