document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');

        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery-item');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const fullscreenOverlay = document.getElementById('fullscreen-overlay');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenClose = document.getElementById('fullscreen-close');
    const fullscreenPrev = document.getElementById('fullscreen-prev');
    const fullscreenNext = document.getElementById('fullscreen-next');
    let currentIndex = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function showFullscreenImage(index) {
        const imageElement = items[index];
        if (imageElement.tagName === 'IMG') {
            fullscreenImage.src = imageElement.src;
        } else {
            const img = imageElement.querySelector('img');
            if (img) {
                fullscreenImage.src = img.src;
            }
        }
        fullscreenImage.classList.add('active');
        fullscreenOverlay.classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showFullscreenImage(currentIndex);
        });
    });

    fullscreenPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showFullscreenImage(currentIndex);
    });

    fullscreenNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showFullscreenImage(currentIndex);
    });

    fullscreenClose.addEventListener('click', () => {
        fullscreenOverlay.classList.remove('active');
        fullscreenImage.classList.remove('active');
    });

    fullscreenOverlay.addEventListener('click', (event) => {
        if (event.target === fullscreenOverlay) {
            fullscreenOverlay.classList.remove('active');
            fullscreenImage.classList.remove('active'); 
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fullscreenOverlay.classList.remove('active');
            fullscreenImage.classList.remove('active');
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showFullscreenImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % items.length;
            showFullscreenImage(currentIndex);
        }
    });

    showItem(currentIndex);
});