class ButtonLink extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._text = this.getAttribute('text') || 'Click me';
      this.render();
    }
  
    static get observedAttributes() {
      return ['text', 'href'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text') {
        this._text = newValue;
        this.render();
      } else if (name === 'href') {
        this.shadowRoot.querySelector('a').href = newValue;
      }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          a:hover {
            background-color: #45a049;
          }
        </style>
        <a href="${this.getAttribute('href') || '#'}">${this._text}</a>
      `;
    }
  