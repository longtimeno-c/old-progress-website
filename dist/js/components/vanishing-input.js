/**
 * Vanishing input functionality
 */

export function initVanishingInput() {
    const textarea = document.getElementById('contribution');
    if (!textarea) return;

    const canvas = document.getElementById('vanishing-canvas');
    if (!canvas) return;

    let vanishingInputIntervalId = null;
    let animating = false;
    let newDataRef = [];

    // Position the canvas correctly
    canvas.style.position = 'absolute';
    canvas.style.top = '10%';
    canvas.style.left = '12px';
    canvas.style.transform = 'scale(0.5)';
    canvas.style.transformOrigin = 'top left';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.3s';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';

    // Placeholders to cycle through
    const placeholders = [
        "To contribute to policy.",
        "To help build technology.",
        "To open a chapter in my town.",
        "Wait, I need some information first. Tell me more about what you're doing!"
    ];
    let currentPlaceholder = 0;

    /**
     * Cycle through placeholders with a fade effect
     */
    function cyclePlaceholders() {
        if (textarea.value) return;

        // Only fade the placeholder text, not the entire field
        textarea.style.setProperty('--placeholder-opacity', '0');

        setTimeout(() => {
            // Change placeholder text
            currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
            textarea.placeholder = placeholders[currentPlaceholder];

            // Fade in new placeholder
            setTimeout(() => {
                textarea.style.setProperty('--placeholder-opacity', '1');
            }, 50);
        }, 400);
    }

    // Set initial placeholder
    textarea.placeholder = placeholders[0];
    textarea.style.setProperty('--placeholder-opacity', '1');

    // Add custom CSS to textarea for placeholder opacity
    const style = document.createElement('style');
    style.textContent = `
        #contribution::placeholder {
            opacity: var(--placeholder-opacity, 1);
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Start cycling placeholders
    vanishingInputIntervalId = setInterval(cyclePlaceholders, 3000);

    /**
     * Draw text to canvas for animation
     */
    function drawToCanvas() {
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.clearRect(0, 0, 800, 800);

        ctx.font = '28px Montserrat';
        ctx.fillStyle = '#FFF';

        // Split text into lines to draw it correctly
        const text = textarea.value;
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (ctx.measureText(testLine).width < 700) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine) lines.push(currentLine);

        // Draw each line
        lines.forEach((line, index) => {
            ctx.fillText(line, 16, 40 + (index * 30));
        });

        // Get pixel data for animation
        const imageData = ctx.getImageData(0, 0, 800, 800);
        const pixelData = imageData.data;
        newDataRef = [];

        for (let y = 0; y < 800; y++) {
            let rowIndex = 4 * y * 800;
            for (let x = 0; x < 800; x++) {
                let pixelIndex = rowIndex + 4 * x;
                if (
                    pixelData[pixelIndex] !== 0 ||
                    pixelData[pixelIndex + 1] !== 0 ||
                    pixelData[pixelIndex + 2] !== 0
                ) {
                    newDataRef.push({
                        x: x,
                        y: y,
                        r: 1,
                        color: `rgba(${pixelData[pixelIndex]}, ${pixelData[pixelIndex + 1]}, ${pixelData[pixelIndex + 2]}, ${pixelData[pixelIndex + 3]})`
                    });
                }
            }
        }
    }

    /**
     * Animate particles flying away
     * @param {number} startX - Starting X position for animation
     */
    function animate(startX) {
        function animateFrame(pos = 0) {
            requestAnimationFrame(() => {
                const newArr = [];
                for (let i = 0; i < newDataRef.length; i++) {
                    const current = newDataRef[i];
                    if (current.x < pos) {
                        newArr.push(current);
                    } else {
                        if (current.r <= 0) {
                            current.r = 0;
                            continue;
                        }
                        current.x += Math.random() > 0.5 ? 1 : -1;
                        current.y += Math.random() > 0.5 ? 1 : -1;
                        current.r -= 0.05 * Math.random();
                        newArr.push(current);
                    }
                }
                newDataRef = newArr;

                const ctx = canvas.getContext('2d');
                ctx.clearRect(pos, 0, 800, 800);

                newDataRef.forEach(particle => {
                    const { x, y, r, color } = particle;
                    if (x > pos) {
                        ctx.beginPath();
                        ctx.rect(x, y, r, r);
                        ctx.fillStyle = color;
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    }
                });

                if (newDataRef.length > 0) {
                    animateFrame(pos - 8);
                } else {
                    textarea.value = '';
                    textarea.classList.remove('animating');
                    canvas.classList.remove('active');
                    canvas.style.opacity = '0';
                    animating = false;
                }
            });
        }

        animateFrame(startX);
    }

    /**
     * Handle text input event
     */
    textarea.addEventListener('input', function() {
        if (animating) return;
    });

    /**
     * Handle keydown event for Enter key
     */
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey && !animating && this.value.trim()) {
            e.preventDefault();
            vanishText();
        }
    });

    /**
     * Make text vanish with particle effect
     */
    function vanishText() {
        if (!textarea.value.trim() || animating) return;

        animating = true;
        textarea.classList.add('animating');
        textarea.style.color = 'transparent';
        canvas.style.opacity = '1';

        drawToCanvas();

        // Find the rightmost particle for animation starting point
        const maxX = newDataRef.reduce((max, current) =>
            current.x > max ? current.x : max, 0);

        animate(maxX);

        // Reset text color after animation
        setTimeout(() => {
            textarea.style.color = 'white';
        }, 2000);
    }

    /**
     * Submit form with vanishing animation
     * @param {HTMLFormElement} form - The form to submit
     */
    window.vanishAndSubmit = function(form, callback) {
        if (!textarea.value.trim() || animating) return;

        vanishText();

        // Submit the form or execute callback after animation completes
        setTimeout(() => {
            if (typeof callback === 'function') {
                // Execute the callback if provided
                callback();
            } else {
                // Default behavior if no callback provided
                alert('Your information has been submitted. Thank you for your interest in Progress!');
                form.reset();
            }
        }, 2000);
    };

    /**
     * Handle visibility change to pause/resume animation
     */
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState !== 'visible') {
            clearInterval(vanishingInputIntervalId);
            vanishingInputIntervalId = null;
        } else if (!vanishingInputIntervalId) {
            vanishingInputIntervalId = setInterval(cyclePlaceholders, 3000);
        }
    });
}