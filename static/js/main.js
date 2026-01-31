// CNN Classifier - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize upload functionality
    initUpload();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize navbar scroll effect
    initNavbarScroll();
});

// =============================================
// Upload Functionality
// =============================================
function initUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const previewImage = document.getElementById('previewImage');
    const predictionResult = document.getElementById('predictionResult');

    if (!uploadArea || !fileInput) return;

    // Click to upload
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';

            // Simulate prediction (you can replace this with actual API call)
            simulatePrediction();
        };
        reader.readAsDataURL(file);
    }

    function simulatePrediction() {
        // Show loading state
        predictionResult.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Analyzing image...</p>
        `;

        // Simulate API delay
        setTimeout(() => {
            const predictions = [
                { label: 'Golden Retriever', confidence: 94.7 },
                { label: 'Labrador', confidence: 3.2 },
                { label: 'Poodle', confidence: 1.1 }
            ];

            // Show results
            predictionResult.innerHTML = `
                <div class="prediction-success">
                    <div class="success-icon">✅</div>
                    <h3>Classification Complete!</h3>
                    <div class="predictions-list">
                        ${predictions.map((p, i) => `
                            <div class="prediction-item ${i === 0 ? 'top-prediction' : ''}">
                                <span class="prediction-label">${p.label}</span>
                                <div class="prediction-bar">
                                    <div class="prediction-fill" style="width: ${p.confidence}%"></div>
                                </div>
                                <span class="prediction-confidence">${p.confidence}%</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-secondary" onclick="resetUpload()">
                        Try Another Image
                    </button>
                </div>
            `;

            // Add dynamic styles for prediction results
            addPredictionStyles();
        }, 2000);
    }
}

function resetUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const fileInput = document.getElementById('fileInput');

    uploadArea.style.display = 'block';
    previewArea.style.display = 'none';
    fileInput.value = '';
}

function addPredictionStyles() {
    if (document.getElementById('prediction-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'prediction-styles';
    styles.textContent = `
        .prediction-success {
            animation: fadeIn 0.5s ease;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 16px;
        }
        
        .prediction-success h3 {
            font-size: 1.5rem;
            margin-bottom: 24px;
            color: #22d3ee;
        }
        
        .predictions-list {
            width: 100%;
            margin-bottom: 24px;
        }
        
        .prediction-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prediction-item.top-prediction .prediction-label {
            color: #22d3ee;
            font-weight: 600;
        }
        
        .prediction-label {
            flex: 0 0 140px;
            text-align: left;
        }
        
        .prediction-bar {
            flex: 1;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .prediction-fill {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #22d3ee);
            border-radius: 4px;
            animation: fillBar 1s ease forwards;
        }
        
        .prediction-confidence {
            flex: 0 0 60px;
            text-align: right;
            font-weight: 600;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fillBar {
            from { width: 0; }
        }
    `;
    document.head.appendChild(styles);
}

// =============================================
// Smooth Scrolling
// =============================================
function initSmoothScroll() {
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
}

// =============================================
// Navbar Scroll Effect
// =============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
    });
}

// Make resetUpload available globally
window.resetUpload = resetUpload;
