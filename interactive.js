document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // 3. Mouse Parallax Effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        const x = (window.innerWidth - e.clientX * 2) / 100;
        const y = (window.innerHeight - e.clientY * 2) / 100;

        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 1;
            // Set CSS variables instead of direct transform
            el.style.setProperty('--parallax-x', `${x * speed}px`);
            el.style.setProperty('--parallax-y', `${y * speed}px`);
        });
    });

    // Add hover effect for clickable elements
    const clickableElements = document.querySelectorAll('a, button, .clickable, section, .intro-title, .story-line, .keyword');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // 2. Click Ripple Effect
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // 4. Dynamic Cursor based on Dialogue Content
    const observer = new MutationObserver((mutations) => {
        // Ignore mutations on the cursor itself to prevent infinite loops
        if (mutations.every(m => m.target.classList.contains('custom-cursor'))) return;

        const visibleLine = document.querySelector('.story-line.visible');
        if (visibleLine) {
            const text = visibleLine.innerText;
            const cursor = document.querySelector('.custom-cursor');

            if (cursor) {
                // Check for keywords
                const hasApple = text.includes('사과');
                const hasHeart = text.includes('행복') || text.includes('사랑') || text.includes('엄마');

                // Determine new state
                let newClass = '';
                if (hasHeart) newClass = 'cursor-heart';
                else if (hasApple) newClass = 'cursor-apple';

                // Check current state
                const isHeart = cursor.classList.contains('cursor-heart');
                const isApple = cursor.classList.contains('cursor-apple');
                const currentClass = isHeart ? 'cursor-heart' : (isApple ? 'cursor-apple' : '');

                // Only update if changed
                if (newClass !== currentClass) {
                    cursor.classList.remove('cursor-apple', 'cursor-heart');
                    if (newClass) {
                        cursor.classList.add(newClass);
                    }
                }
            }
        } else {
            // No visible line, reset cursor
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                // Only remove if present
                if (cursor.classList.contains('cursor-apple') || cursor.classList.contains('cursor-heart')) {
                    cursor.classList.remove('cursor-apple', 'cursor-heart');
                }
            }
        }
    });

    // Observe body for attribute changes (class changes on children)
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class', 'style'] // Watch for class/style changes that might make lines visible
    });
});

// Helper to change cursor text (4.html 스타일로 통일)
function setCursorText(text) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        if (text) {
            cursor.innerText = text;
            cursor.style.width = "auto";
            cursor.style.height = "auto";
            cursor.style.padding = "5px 10px";
            cursor.style.borderRadius = "20px";
        } else {
            cursor.innerText = "";
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.padding = "0";
            cursor.style.borderRadius = "50%";
        }
    }
}


