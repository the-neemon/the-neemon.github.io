document.addEventListener('DOMContentLoaded', function() {
    function logEvent(eventType, element) {
        const timestamp = new Date().toISOString();
        const tagName = element.tagName.toLowerCase();
        const elementDescription = element.id || element.className || element.alt || element.title || tagName;
        console.log(`[${timestamp}] ${eventType}: ${tagName} (${elementDescription})`);
    }
    document.addEventListener('click', function(event) {
        logEvent('click', event.target);
    });
    const viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logEvent('view', entry.target);
            }
        });
    }, { threshold: 0.5 });
    const elementsToObserve = document.querySelectorAll('section, img, .project-card, .education-card, .skill-tag');
    elementsToObserve.forEach(element => viewObserver.observe(element));
});