document.addEventListener('DOMContentLoaded', () => {
    const imageGallery = document.querySelector('.image-gallery');
    const categories = document.querySelectorAll('#categories a');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 模拟图片数据
    const images = [
        { src: 'img/img1.jpg', category: 'category1', title: '中国大五人格问卷的初步编制', description: '在中国大五人格问卷（CBF-PI）的基础上编制中国大五人格问卷简式版Chinese Big Five Personality Inventory brief version, CBF-PI-B', likes: 15, link: 'questionnaire/Personality.html' },
        { src: 'img/img1.jpg', category: 'category5', title: 'SCL-90', description: '90项症状自评量表', likes: 15, link: 'questionnaire/scl-90.html' },

        // { src: 'img/img2.jpg', category: 'category2', title: '智力测试1', description: '这是一个简短的智力测试描述...', likes: 23, link: 'questionnaire/Intelligence.html' },
        

        // { src: 'img/img2.jpg', category: 'category2', title: '智力测试2', description: '这是一个简短的智力测试描述...', likes: 23, link: 'questionnaire/Intelligence.html' },

        // { src: 'img/img3.jpg', category: 'category3', title: '态度测试1', description: '这是一个简短的态度测试描述...', likes: 8, link: 'questionnaire/Attitude.html' },
        // { src: 'img/img4.jpg', category: 'category4', title: '兴趣测试1', description: '这是一个简短的兴趣测试描述...', likes: 42, link: 'questionnaire/Interest.html' },
        
       
     
        // { src: 'img/img3.jpg', category: 'category3', title: '态度测试1', description: '这是一个简短的态度测试描述...', likes: 8, link: 'questionnaire/Attitude.html' },
        // { src: 'img/img4.jpg', category: 'category4', title: '兴趣测试1', description: '这是一个简短的兴趣测试描述...', likes: 42, link: 'questionnaire/Interest.html' }


        // ... 添加更多图片
    ];

    function renderImages(filteredImages) {
        imageGallery.innerHTML = '';
        filteredImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.title;
            
            const titleElement = document.createElement('div');
            titleElement.className = 'title';
            titleElement.textContent = image.title;
            
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'description';
            descriptionElement.textContent = image.description;
            
            const likesElement = document.createElement('div');
            likesElement.className = 'likes';
            likesElement.innerHTML = `<i class="fas fa-heart"></i> ${image.likes}`;
            
            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(titleElement);
            galleryItem.appendChild(descriptionElement);
            galleryItem.appendChild(likesElement);
            
            galleryItem.addEventListener('click', () => {
                window.location.href = image.link;
            });
            
            imageGallery.appendChild(galleryItem);
        });
    }

    function filterImages(category) {
        if (category === 'all') {
            return images;
        }
        return images.filter(image => image.category === category);
    }

    categories.forEach(categoryLink => {
        categoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredImages = filterImages(category);
            renderImages(filteredImages);
        });
    });

    function searchImages(query) {
        return images.filter(image => 
            image.title.toLowerCase().includes(query.toLowerCase()) ||
            image.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const searchResults = searchImages(query);
        renderImages(searchResults);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value;
            const searchResults = searchImages(query);
            renderImages(searchResults);
        }
    });

    // 初始加载所有图片
    renderImages(images);

    // 轮播图功能
    const slides = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');
    let currentSlide = 0;

    function createDots() {
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 20}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % 5;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + 5) % 5;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    createDots();
    showSlide(currentSlide);

    // 自动轮播
    setInterval(nextSlide, 5000);
});
