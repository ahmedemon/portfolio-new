
let currentProject = 0;
let currentImageIndex = 0;

function openLightbox(projectIndex, imageIndex) {
    currentProject = projectIndex;
    currentImageIndex = imageIndex;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    updateLightboxImage();
    createThumbnails();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function changeImage(direction) {
    const gallery = projectGalleries[currentProject];
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = gallery.length - 1;
    } else if (currentImageIndex >= gallery.length) {
        currentImageIndex = 0;
    }

    updateLightboxImage();
    updateThumbnails();
}

function updateLightboxImage() {
    const gallery = projectGalleries[currentProject];
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');

    img.src = gallery[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${gallery.length}`;
}

function createThumbnails() {
    const gallery = projectGalleries[currentProject];
    const thumbnailStrip = document.getElementById('thumbnail-strip');
    thumbnailStrip.innerHTML = '';

    gallery.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'thumbnail';
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        }
        thumb.onclick = () => {
            currentImageIndex = index;
            updateLightboxImage();
            updateThumbnails();
        };
        thumbnailStrip.appendChild(thumb);
    });
}

function updateThumbnails() {
    const thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});