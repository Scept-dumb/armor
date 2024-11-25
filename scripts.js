// Get elements
const circles = document.querySelectorAll('.circle');
const mainImage = document.getElementById('mainImage');
const mainText = document.getElementById('mainText');
const menuIcon = document.querySelector('.menu-icon');
const menu = document.getElementById('menu');
const subCircleContainers = document.querySelectorAll('.sub-circle-container');

// Add click event listeners to the circles
circles.forEach(circle => {
    circle.addEventListener('click', function() {
        updateMainContent(this);
        this.classList.add('pulse');
    });
});

// Function to update image and text when blue circle is clicked
function updateMainContent(element) {
    const image = element.getAttribute('data-image');
    const text = element.getAttribute('data-text');
    mainImage.src = image;
    mainText.innerHTML = text;

    // Trigger subtle shake animation on the image
    mainImage.parentElement.style.animation = 'shake 1.5s';  // Slower shake
    setTimeout(() => {
        mainImage.parentElement.style.animation = '';
    }, 1500);  // Shake duration
    
    // Remove pulse effect from all circles
    circles.forEach(circle => circle.classList.remove('pulse'));

    // Add pulse effect to the clicked blue circle
    element.classList.add('pulse');

    // Hide all sub-circle containers first
    subCircleContainers.forEach(container => {
        container.classList.remove('show'); // Hide all sub-circle containers
        container.classList.remove('single-item'); // Remove single-item class if present
    });

    // Get the sub-circle container associated with the clicked circle
    const subCircleContainer = element.nextElementSibling;  // Assuming sub-circle container is the next sibling
    if (subCircleContainer) {
        // Check if the sub-circle container has only one sub-circle
        const subCircles = subCircleContainer.querySelectorAll('.sub-circle');
        if (subCircles.length === 1) {
            subCircleContainer.classList.add('single-item');  // Center it if there's only one sub-circle
        }

        subCircleContainer.classList.add('show');  // Show the clicked circle's sub-circle container

        // Add functionality to sub-circles within this container
        subCircles.forEach(subCircle => {
            subCircle.addEventListener('click', function() {
                const subImage = this.getAttribute('data-image');
                const subText = this.getAttribute('data-text');
                
                mainImage.src = subImage;
                mainText.innerHTML = subText;

                // Trigger subtle shake animation on the image
                mainImage.parentElement.style.animation = 'shake 1.5s';  // Slower shake
                setTimeout(() => {
                    mainImage.parentElement.style.animation = '';
                }, 1500);  // Shake duration

                // Remove pulse effect from all other sub-circles
                subCircles.forEach(sc => sc.classList.remove('pulse'));

                // Add pulse effect to the clicked sub-circle
                this.classList.add('pulse');
            });
        });
    }
}

// Toggle menu visibility and switch between hamburger and "X"
menuIcon.addEventListener('click', function() {
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        menuIcon.classList.remove('active');
    } else {
        menu.style.display = 'flex';
        menuIcon.classList.add('active');
    }
});
