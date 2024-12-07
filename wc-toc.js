class ResponsiveTOC extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.render();
                this.setupIntersectionObserver();
                this.addEventListeners();
            }

            render() {
                const style = `
                    :host {
                        display: block;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
                    .toc {
                        background-color: #fff;
                        border: 1px solid #e2e8f0;
                        border-radius: 0.375rem;
                        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                        position: sticky;
                        top: 1rem;
                    }
                    h2 {
                        margin: 0;
                        font-size: 1.25rem;
                        font-weight: 600;
                        padding: 1rem;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0 1rem 1rem;
                        margin: 0;
                    }
                    li {
                        margin-bottom: 0.5rem;
                    }
                    a {
                        color: #4b5563;
                        text-decoration: none;
                        transition: color 0.3s;
                        display: flex;
                        align-items: center;
                    }
                    a:hover {
                        color: #1f2937;
                    }
                    a.active {
                        color: #2563eb;
                        font-weight: 500;
                    }
                    .circle {
                        width: 8px;
                        height: 8px;
                        margin-right: 0.5rem;
                        transition: fill 0.3s;
                    }
                    .toggle {
                        display: none;
                        background: none;
                        border: 1px solid #e2e8f0;
                        font-size: 1rem;
                        cursor: pointer;
                        padding: 0.5rem 1rem;
                        width: 100%;
                        text-align: left;
                        color: #4b5563;
                        border-radius: 0.25rem;
                    }
                    @media (max-width: 768px) {
                        .toc {
                            position: fixed;
                            top: 1rem;
                            left: 1rem;
                            right: 1rem;
                            z-index: 50;
                        }
                        .toggle {
                            display: block;
                        }
                        .toc-content {
                            display: none;
                            max-height: 50vh;
                            overflow-y: auto;
                        }
                        .toc-content.show {
                            display: block;
                        }
                    }
                `;

                const toc = this.generateTOC();

                this.shadowRoot.innerHTML = `
                    <style>${style}</style>
                    <nav class="toc">
                        <h2>Table of Contents</h2>
                        <button class="toggle">Toggle Table of Contents</button>
                        <div class="toc-content">
                            ${toc}
                        </div>
                    </nav>
                `;
            }

            generateTOC() {
                const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
                let toc = '<ul>';
                headings.forEach(heading => {
                    const level = parseInt(heading.tagName.charAt(1));
                    const title = heading.textContent;
                    const id = heading.id || this.slugify(title);
                    heading.id = id;

                    toc += `
                        <li style="margin-left: ${(level - 2) * 16}px;">
                            <a href="#${id}">
                                <svg class="circle" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" fill="#d1d5db" />
                                </svg>
                                ${title}
                            </a>
                        </li>
                    `;
                });
                toc += '</ul>';
                return toc;
            }

            slugify(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            }

            setupIntersectionObserver() {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const id = entry.target.id;
                                this.setActiveLink(id);
                            }
                        });
                    },
                    { rootMargin: '0px 0px -50% 0px' }
                );

                document.querySelectorAll('section[id]').forEach(section => {
                    observer.observe(section);
                });
            }

            setActiveLink(id) {
                this.shadowRoot.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    link.querySelector('circle').setAttribute('fill', '#d1d5db');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        link.querySelector('circle').setAttribute('fill', '#2563eb');
                    }
                });
            }

            addEventListeners() {
                const toggle = this.shadowRoot.querySelector('.toggle');
                const content = this.shadowRoot.querySelector('.toc-content');
                toggle.addEventListener('click', () => {
                    content.classList.toggle('show');
                });

                this.shadowRoot.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                        this.setActiveLink(targetId);
                        if (window.innerWidth <= 768) {
                            content.classList.remove('show');
                        }
                    });

                    link.addEventListener('mouseover', () => {
                        if (!link.classList.contains('active')) {
                            link.querySelector('circle').setAttribute('fill', '#9ca3af');
                        }
                    });

                    link.addEventListener('mouseout', () => {
                        if (!link.classList.contains('active')) {
                            link.querySelector('circle').setAttribute('fill', '#d1d5db');
                        }
                    });
                });
            }
        }

        customElements.define('responsive-toc', ResponsiveTOC);