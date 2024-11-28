class NavigationMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    background-color: #333;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    position: fixed; /* Fixed positioning */
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    height: 60px; /* Fixed height for the navbar */
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .nav-menu {
                    display: flex;
                    list-style: none;
                }

                .nav-menu li {
                    margin-left: 2rem;
                }

                .nav-menu a {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .nav-menu a:hover, .nav-menu a:focus {
                    color: #007bff;
                }

                .hamburger {
                    display: none; /* Hidden by default */
                    cursor: pointer;
                }

                .bar {
                    display: block;
                    width: 25px;
                    height: 3px;
                    margin: 5px auto;
                    background-color: #fff;
                    transition: all 0.3s ease-in-out;
                }

                @media (max-width: 768px) {
                    .nav-menu {
                        display: none; /* Hide menu by default on mobile */
                        flex-direction: column; /* Stack items vertically */
                        position: absolute; /* Positioning for dropdown */
                        top: 60px; /* Position below the navbar */
                        left: 0;
                        right: 0;
                        background-color: #333; /* Same background for dropdown */
                        z-index: 999; /* Ensure it appears above other content */
                        padding-top: 10px; /* Add some padding */
                    }

                    .nav-menu.show {
                        display: flex; /* Show menu when active */
                    }

                    .hamburger {
                        display: block; /* Show hamburger icon on mobile */
                        float: right; /* Align to the right */
                    }

            </style>

            <nav class="navbar">
                <div class="logo">
                  <img src="Images/logo.svg" alt="Logo">
                </div>
                <ul class="nav-menu">
                    <li><a href="#work">Work</a></li>
                    <li><a href="#process">Process</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="#contact">yerp</a></li>
                    <li><a href="https://www.linkedin.com/in/grantcrowder/"><img src="Images/LinkedIn-Icon.svg" alt="LinkedIn"></a></li>
                </ul>
                <div class="hamburger" id="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        `;

        // Add event listener for the hamburger menu
        const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-menu a");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
    }
}

// Define the custom element
customElements.define('navigation-menu', NavigationMenu);

