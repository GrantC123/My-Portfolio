class ProjectTile extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: #f5f5f5;
            overflow: hidden;
            transition: transform 0.5s ease;
            border: 1px solid #333;
          }
          :host(:hover) {
         transform: translate(-8px, -8px);
          box-shadow: 8px 8px 0 0 black;
          transition: 0.5s;
  
  
          }
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .project-info {
            padding: clamp(1rem, 2vw, 1.5rem);
          }
          .project-year {
            font-size: 0.9rem;
            color: #666;
          }
          .project-title {
            margin: 0.5rem 0;
            font-size: clamp(1.2rem, 2vw, 1.5rem);
          }
          .project-description {
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            color: #333;
            margin-bottom: 1rem;
          }
          .project-label {
            display: inline-block;
            background-color: #fff;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-bottom: 1rem;
          }
          .project-button {
          color:white;
            display:block;
             padding: 10px 20px;
             background-color: black;
              border: 1px solid black;
              font-size: 16px;
              cursor: pointer;
              transition: all 0.3s ease;
            transition: background-color 0.3s ease;
            width:100%;
          }
          .project-button:hover {
       
          }
        </style>
        <img src="${this.getAttribute('image')}" alt="${this.getAttribute('title')}">
        <div class="project-info">
          <span class="project-year">${this.getAttribute('year')}</span>
          <h3 class="project-title">${this.getAttribute('title')}</h3>
          <p class="project-description">${this.getAttribute('description')}</p>
          <span class="project-label">${this.getAttribute('label')}</span>
          <button class="project-button">View Project</button>
        </div>
      `;
    }
  }
  
  customElements.define('project-tile', ProjectTile);
  