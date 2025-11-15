---

## assets/app.js
```javascript
/**
 * IP FRIED CHICKEN - MAIN JAVASCRIPT
 * Mobile navigation, menu filtering, and smooth interactions
 */

'use strict';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ========================================================================
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            navMenu.classList.toggle('active');
            
            // Update ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open on mobile
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    
    // ========================================================================
    // STICKY HEADER ON SCROLL
    // ========================================================================
    
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow when scrolled
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    
    // ========================================================================
    // MENU CATEGORY FILTERING (Menu Page)
    // ========================================================================
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (tabButtons.length > 0 && menuCategories.length > 0) {
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active tab
                tabButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show/hide categories
                menuCategories.forEach(function(cat) {
                    const catName = cat.getAttribute('data-category');
                    
                    if (category === 'all') {
                        cat.classList.remove('hidden');
                    } else if (catName === category) {
                        cat.classList.remove('hidden');
                    } else {
                        cat.classList.add('hidden');
                    }
                });
                
                // Smooth scroll to menu items
                const menuContainer = document.querySelector('.menu-items-container');
                if (menuContainer) {
                    menuContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    
    // ========================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty hash links
            if (href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for sticky header
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========================================================================
    // FORM VALIDATION & SUBMISSION (Contact Page)
    // ========================================================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation is handled by HTML5 'required' attributes
            // This is just for additional custom handling if needed
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Form will submit to Formspree
            // You can add a success message or redirect here if needed
        });
    }
    
    
    // ========================================================================
    // LAZY LOADING IMAGES (if implemented)
    // ========================================================================
    
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    
    // ========================================================================
    // PREFERS REDUCED MOTION CHECK
    // ========================================================================
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable smooth scroll if user prefers reduced motion
        document.documentElement.style.scrollBehavior = 'auto';
    }
    
    
    // ========================================================================
    // CONSOLE MESSAGE (Optional - can be removed)
    // ========================================================================
    
    console.log('%c🍗 IP Fried Chicken', 'font-size: 20px; font-weight: bold; color: #E11D48;');
    console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #6B7280;');
    
});
```

---

## assets/logo.svg
```xml
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#E11D48"/>
    <path d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8ZM28 30H20C19.448 30 19 29.552 19 29V19C19 18.448 19.448 18 20 18H28C28.552 18 29 18.448 29 19V29C29 29.552 28.552 30 28 30Z" fill="#FACC15"/>
    <text x="24" y="30" font-size="16" font-weight="bold" fill="#111" text-anchor="middle">🍗</text>
</svg>
```

---

## robots.txt
```txt
# IP Fried Chicken - robots.txt
# Allow all search engines to index the site

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://ipfriedchicken.co.uk/sitemap.xml

# Crawl-delay (optional, uncomment if needed)
# Crawl-delay: 10
```

---

## sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ipfriedchicken.co.uk/</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ipfriedchicken.co.uk/menu.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://ipfriedchicken.co.uk/deals.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ipfriedchicken.co.uk/about.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://ipfriedchicken.co.uk/contact.html</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
```

