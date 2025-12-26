// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// 创建指示点
function createDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// 显示指定幻灯片
function showSlide(n) {
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    
    updateDots();
}

// 切换幻灯片
function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

// 跳转到指定幻灯片
function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// 更新指示点
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 自动播放
function autoPlay() {
    changeSlide(1);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    showSlide(currentSlide);
    
    // 每4秒自动切换
    setInterval(autoPlay, 4000);
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // 向左滑动
            changeSlide(1);
        }
        if (touchEndX > touchStartX + 50) {
            // 向右滑动
            changeSlide(-1);
        }
    }
});

// 照片墙懒加载动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.grid-item').forEach(item => {
    item.style.animationPlayState = 'paused';
    observer.observe(item);
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// 随机漂浮的爱心效果
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.opacity = '0.8';
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all 4s ease-in';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.bottom = '100vh';
        heart.style.opacity = '0';
        heart.style.transform = 'rotate(360deg)';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 4100);
}

// 每隔一段时间创建漂浮爱心
setInterval(createFloatingHeart, 3000);

// 点击照片放大效果
document.querySelectorAll('.grid-item img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 创建模态框
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            animation: zoomIn 0.3s;
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => modal.remove(), 300);
        });
    });
});
