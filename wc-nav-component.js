class NavigationMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    background-color: #f4f4f4;
                    color: #333;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    height: 2rem;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    display: flex;
                }

                .nav-menu {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-menu li {
                    margin-left: 2rem;
                }

                .nav-menu a {
                    color: #333;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .nav-menu a:hover,
                .nav-menu a:focus {
                    color: #949494;
                }

                .hamburger {
                    display: none;
                    cursor: pointer;
                }

                .bar {
                    display: block;
                    width: 25px;
                    height: 3px;
                    margin: 5px auto;
                    background-color: #333;
                    transition: all 0.3s ease-in-out;
                }

                @media (max-width: 768px) {
                    .hamburger {
                        display: block;
                    }

                    .nav-menu {
                    position: fixed; 
                        left: -100%;
                        top: 64px;
                        flex-direction: column;
                        background-color: #f4f4f4;
                        width: 100%;
                        text-align: center;
                        transition: 0.3s;
                    }

                    .nav-menu.active {
                        left: 0;
                    }

                    .nav-menu li {
                        margin: 2rem 0;
                    }

                    .hamburger.active .bar:nth-child(2) {
                        opacity: 0;
                    }

                    .hamburger.active .bar:nth-child(1) {
                        transform: translateY(8px) rotate(45deg);
                    }

                    .hamburger.active .bar:nth-child(3) {
                        transform: translateY(-8px) rotate(-45deg);
                    }
                }
            </style>

            <nav class="navbar">
                <div class="logo">
                    <a href="index.html">
                        <svg width="41" height="41" viewBox="0 0 41 41" fill="#333" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.2794 30.2506C37.6458 33.2501 35.2654 35.7866 32.3639 37.6194C29.4624 39.4523 26.1361 40.5207 22.7006 40.7233C19.2651 40.926 15.8342 40.2561 12.7335 38.7773C9.63279 37.2985 6.96507 35.0598 4.98343 32.2736C3.00178 29.4873 1.77192 26.246 1.41052 22.857C1.04912 19.468 1.56816 16.0438 2.91841 12.9092C4.26866 9.77461 6.40534 7.03358 9.12575 4.94616C11.8461 2.85873 15.0601 1.49414 18.4626 0.98183C18.9683 0.90608 19.4868 0.847164 20.0011 0.813497C20.5154 0.779831 20.9999 0.758789 21.5014 0.758789C24.1586 0.75828 26.7896 1.27862 29.2427 2.28981C31.6958 3.30099 33.9225 4.78302 35.7943 6.65043C36.252 7.10078 36.5102 7.71269 36.5122 8.35156C36.5142 8.99043 36.2598 9.60391 35.805 10.0571C35.3501 10.5102 34.7321 10.7659 34.0869 10.7678C33.4417 10.7698 32.8222 10.5179 32.3645 10.0676C30.7949 8.49182 28.896 7.27523 26.8012 6.50313V6.50313L26.3762 6.35163C23.6138 5.43494 20.6445 5.31825 17.8174 6.01528C14.9903 6.71232 12.4229 8.1941 10.4172 10.2864C7.69215 13.106 6.17113 16.8582 6.17113 20.7609C6.17113 24.6636 7.69215 28.4157 10.4172 31.2354C12.089 32.9684 14.1513 34.285 16.4356 35.0774C18.7198 35.8698 21.161 36.1155 23.5595 35.7946C25.9581 35.4736 28.2458 34.5949 30.2357 33.2306C32.2255 31.8662 33.8609 30.0547 35.0081 27.9445C35.2158 27.5679 35.5236 27.2547 35.8981 27.0388C36.2727 26.8229 36.6998 26.7127 37.1331 26.7199H37.1884C37.6046 26.7238 38.0127 26.8345 38.373 27.0412C38.7332 27.2478 39.0332 27.5433 39.2438 27.8988C39.4544 28.2544 39.5683 28.6579 39.5746 29.0701C39.5808 29.4822 39.4791 29.889 39.2794 30.2506Z" fill="#333"/>
                <path d="M35.4088 20.0287C35.2586 19.5612 34.9607 19.1539 34.559 18.8667C34.1572 18.5796 33.673 18.4278 33.1776 18.4338C30.3173 18.4338 24.4522 18.4338 21.5961 18.4338H21.4219C21.0863 18.456 20.7593 18.549 20.4629 18.7064C20.1665 18.8638 19.9074 19.0821 19.7031 19.3466C19.4987 19.6111 19.3537 19.9158 19.2778 20.2403C19.2019 20.5647 19.1968 20.9015 19.2629 21.2281C19.3844 21.7578 19.6831 22.2314 20.1104 22.572C20.5378 22.9127 21.0688 23.1005 21.6174 23.105C23.0454 23.105 24.2567 23.105 25.6847 23.105C27.1127 23.105 31.7878 23.105 33.2243 23.105C33.5945 23.0987 33.9579 23.0059 34.2849 22.8341C34.612 22.6624 34.8934 22.4166 35.1063 22.1167C35.3193 21.8169 35.4577 21.4714 35.5102 21.1086C35.5628 20.7458 35.5281 20.3757 35.4088 20.0287V20.0287Z" fill="#333"/>
                <path d="M30.7543 27.4272C30.7548 26.8748 30.5689 26.338 30.2261 25.9021C29.8833 25.4663 29.4033 25.1563 28.8623 25.0214C28.3213 24.8865 27.7502 24.9344 27.2399 25.1576C26.7295 25.3807 26.309 25.7663 26.0452 26.2531V26.2741C24.9943 27.1145 23.7245 27.6432 22.3828 27.7991C21.0411 27.955 19.6823 27.7317 18.4634 27.1551C17.2444 26.5785 16.2152 25.672 15.4947 24.5406C14.7741 23.4091 14.3917 22.0988 14.3916 20.7612C14.3966 19.9533 14.5403 19.1521 14.8166 18.3919C14.9521 17.9908 15.1227 17.6021 15.3266 17.2304V17.2304C15.8131 16.3899 16.4686 15.6571 17.2525 15.0774C18.0364 14.4977 18.9321 14.0834 19.8842 13.8602C20.8363 13.6369 21.8245 13.6094 22.7877 13.7794C23.7509 13.9494 24.6687 14.3133 25.4842 14.8485V14.8485C25.5707 14.9231 25.6631 14.9907 25.7605 15.0505L25.8455 15.101C26.3058 15.3676 26.8428 15.4742 27.3713 15.404V15.404L27.5413 15.3746C27.6264 15.36 27.7102 15.3389 27.792 15.3115C28.2865 15.1564 28.718 14.8491 29.0238 14.4343C29.3296 14.0195 29.4936 13.5189 29.492 13.0053C29.4922 12.8912 29.4836 12.7773 29.4665 12.6644C29.4494 12.5211 29.4166 12.38 29.3688 12.2436C29.2386 11.8527 29.0105 11.5009 28.7058 11.221V11.221C28.6249 11.1382 28.5398 11.0595 28.4508 10.9853L28.1363 10.7707C26.0396 9.40926 23.5665 8.72889 21.0611 8.82424C18.5557 8.9196 16.1426 9.78595 14.1577 11.3027C12.1728 12.8195 10.7148 14.9112 9.98655 17.2869C9.25834 19.6625 9.29617 22.2038 10.0948 24.5571C10.6152 26.0866 11.4426 27.4962 12.5272 28.701C13.6117 29.9058 14.9312 30.8811 16.4061 31.5682C18.5795 32.5739 21.0063 32.9153 23.3765 32.5487C25.7468 32.1822 27.9529 31.1243 29.713 29.5103L29.6748 29.4724C30.0088 29.2438 30.2815 28.9381 30.4696 28.5818C30.6577 28.2255 30.7554 27.8292 30.7543 27.4272V27.4272Z" fill="#333"/>
                <path d="M37.6859 15.4092C39.0214 15.4092 40.1042 14.3371 40.1042 13.0146C40.1042 11.6922 39.0214 10.6201 37.6859 10.6201C36.3503 10.6201 35.2676 11.6922 35.2676 13.0146C35.2676 14.3371 36.3503 15.4092 37.6859 15.4092Z" fill="#333"/>
                <path d="M26.802 6.50404C26.6548 6.47004 26.5122 6.4192 26.377 6.35254L26.802 6.50404Z" fill="#333"/>
                <path d="M20.0014 0.81347C19.4872 0.847136 18.9686 0.906052 18.4629 0.981802C18.9436 0.761508 19.4837 0.702411 20.0014 0.81347V0.81347Z" fill="#333"/>
                </svg>
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="index-final.html#project-section">Work</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="PDF/Grant Crowder - Resume.pdf">Resume</a></li>
                    <li><a href="https://www.linkedin.com/in/grantcrowder/"><img src="Images/linkedin.svg" alt="LinkedIn"></a></li>
                </ul>
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const hamburger = this.shadowRoot.querySelector(".hamburger");
        const navMenu = this.shadowRoot.querySelector(".nav-menu");
        
        hamburger.addEventListener("click", () => this.mobileMenu());
        
        const navLinks = this.shadowRoot.querySelectorAll(".nav-menu a");
        navLinks.forEach(n => n.addEventListener("click", () => this.closeMenu()));
    }

    mobileMenu() {
        const hamburger = this.shadowRoot.querySelector(".hamburger");
        const navMenu = this.shadowRoot.querySelector(".nav-menu");
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    closeMenu() {
        const hamburger = this.shadowRoot.querySelector(".hamburger");
        const navMenu = this.shadowRoot.querySelector(".nav-menu");
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}

// Define the custom element
customElements.define('navigation-menu', NavigationMenu);