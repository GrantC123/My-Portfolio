// Button.js
const { useState } = React;

const Button = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
};

// Render the Button component
const domContainer = document.querySelector('#react-button-container');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(Button));