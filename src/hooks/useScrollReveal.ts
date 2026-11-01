import { useEffect } from 'react';

/**
 * High-performance Scroll Reveal Hook
 * Uses IntersectionObserver to reveal elements as they enter the viewport.
 * Automatically unobserves elements once revealed, ensuring each section
 * animates only once and never repeatedly triggers distracting animations
 * when scrolling up and down.
 */
export const useScrollReveal = (selector = '.reveal-on-scroll') => {
  useEffect(() => {
    // Respect user's reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve immediately so animation only fires ONCE
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    // Handle any elements added dynamically
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(`${selector}:not(.is-revealed)`);
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector]);
};
