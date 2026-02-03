document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    let attempts = 0;
    const maxEvasions = 3;

    const moveButton = () => {
        // If we have already evaded 3 times, stop moving.
        if (attempts >= maxEvasions) {
            return;
        }

        attempts++;

        const buttonRect = noBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate safe area around the container
        // User requested "strictly" around the small card box.
        // We will reduce the offset significantly to keeping it "hugging" the box.
        const offset = 50; // Just 50px buffer

        // Allowed area:
        const minX = Math.max(0, containerRect.left - offset);
        const maxX = Math.min(window.innerWidth - buttonRect.width, containerRect.right + offset);
        const minY = Math.max(0, containerRect.top - offset);
        const maxY = Math.min(window.innerHeight - buttonRect.height, containerRect.bottom + offset);

        // Random position within these STRICT tighter bounds
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;

        noBtn.style.position = 'fixed'; // Switch to fixed on first move
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.zIndex = '1000'; // Ensure it stays on top
    };

    // Desktop: Mouseover behavior (The Evasion)
    noBtn.addEventListener('mouseover', moveButton);

    // Mobile/Touch: Touchstart behavior
    noBtn.addEventListener('touchstart', (e) => {
        if (attempts < maxEvasions) {
            e.preventDefault(); // Prevent click only if we are successful in evading
            moveButton();
        }
    });

    // Click/Enter behavior
    noBtn.addEventListener('click', (e) => {
        window.location.href = 'acceptance.html';
    });
});
