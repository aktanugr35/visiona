'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimatorProps {
    children: ReactNode;
    className?: string;
}

export default function ScrollAnimator({ children, className = '' }: ScrollAnimatorProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animateEls = entry.target.querySelectorAll('.animate-in, .animate-in-left, .animate-in-right, .animate-scale');
                        animateEls.forEach(animateEl => {
                            const delay = parseInt((animateEl as HTMLElement).dataset.delay || '0');
                            setTimeout(() => {
                                animateEl.classList.add('visible');
                            }, delay);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
