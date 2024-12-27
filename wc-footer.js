// footer-component.js
class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create shadow DOM
        this.render(); // Call the render method
    }

    render() {
        // Template for the footer
        this.shadowRoot.innerHTML = `
            <style>
                .footer {
                    background-color: #333; /* Black background */
                    color: #fff; /* White text */
                    padding: 3rem 0 1rem;
                    font-family: 'Funnel Display', sans-serif;
                }
                
                .footer-content {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .footer-section {
                    flex: 1;
                    margin-bottom: 2rem;
                    min-width: 250px;
                    width:100%;
                }
                
                .footer-section h3 {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }
                
                .footer-section p {
                    margin-bottom: 1rem;
                }
                
                .social-icons a {
                    color: #fff; /* White icons */
                    font-size: 1.5rem;
                    margin-right: 1rem;
                    transition: color 0.3s ease;
                }
                
                .social-icons a:hover {
                    color: #fff; /* Change to blue on hover */
                }
                
                .footer-section.links ul {
                    list-style-type: none;
                    padding: 0;
                }
                
                .footer-section.links li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-section.links a {
                    color: #fff; /* White links */
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-section.links a:hover {
                    color: #007bff; /* Change to blue on hover */
                }
                
                .footer-section.contact i {
                    margin-right: 0.5rem;
                }
                
                .footer-bottom {
                    text-align: center;
                    padding-top: 1rem;
                    border-top: 1px solid #555; /* Dark gray border */
                }

                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        align-items: center; /* Center items on smaller screens */
                        padding: 0; /* Remove padding on smaller screens for better spacing */
                        width: calc(100% - 4rem); /* Adjust width for smaller screens */
                        margin-left: auto; 
                        margin-right: auto; 
                        max-width: none; /* Remove max-width for stacking */
                        box-sizing: border-box; /* Ensure padding is included in width */
                     }
                
                     .footer-section {
                       margin-bottom: 2rem; 
                     }
                 }
            </style>
            <footer class="footer">
              <div class="footer-content">
                  <div class="footer-section about">
                      <h3>Grant</h3>
                      <p>Product Designer crafting intuitive and beautiful digital experiences.</p>
                      <div class="social-icons">
                          <a href="https://www.linkedin.com/in/grantcrowder/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                          <a href="#" aria-label="Dribbble"><i class="fab fa-dribbble"></i></a>
                          <a href="#" aria-label="Behance"><i class="fab fa-behance"></i></a>
                      </div>
                  </div>
                  <div class="footer-section links">
                      <h3>Quick Links</h3>
                      <ul>
                          <li><a href="#work">Work</a></li>
                          <li><a href="#process">Process</a></li>
                          <li><a href="about.html">About</a></li>
                          <li><a href="#contact">Contact</a></li>
                      </ul>
                  </div>
                  <div class="footer-section contact">
                      <h3>Contact</h3>
                      <p>grantcrowderdesign@gmail.com</p>

                  </div>
              </div>
              <div class="footer-bottom">
                  <p>&copy; 2025 Grant Crowder Design| Crafted with care by me.</p>
              </div>
            </footer>
        `;
    }
}

// Define the new element
customElements.define('my-footer', MyFooter);