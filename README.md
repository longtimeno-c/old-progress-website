# Progress Website

A modern, interactive website for the Progress political party.

## Getting Started

Follow these steps to get the website running locally:

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript if you want to make modifications

### Installation

1. Clone or download this repository to your local machine
2. Ensure the directory structure is maintained as is
3. Make sure to add the required images:
   - Add `whistlejacket.jpg` to the `assets/images/` directory
   - Add any other images referenced in the code

### Running the Website

You can run the website using one of these methods:

#### Option 1: Using Python's built-in server

If you have Python installed:

```bash
# For Python 3
python -m http.server

# For Python 2
python -m SimpleHTTPServer
```

Then open your browser and go to `http://localhost:8000`

#### Option 2: Using Node.js

If you have Node.js installed:

```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server
```

Then open your browser and go to the URL shown in the terminal (typically `http://localhost:8080`)

#### Option 3: Using VSCode Live Server extension

1. Install the "Live Server" extension in VSCode
2. Right-click on index.html and select "Open with Live Server"

### Directory Structure

```
progress-website/
├── index.html             # Main HTML file
├── assets/                # Static assets
│   └── images/            # Image files
│       ├── whistlejacket.jpg
│       └── ... other images
├── css/                   # CSS files
│   ├── main.css           # Main stylesheet
│   ├── components/        # Component-specific styles
│   │   ├── aurora.css
│   │   ├── navigation.css
│   │   ├── highlights.css
│   │   └── vanishing-input.css
│   └── pages/             # Page-specific styles
│       ├── home.css
│       ├── about.css
│       ├── contact.css
│       └── nda.css
└── js/                    # JavaScript files
    ├── main.js            # Main JavaScript file
    ├── utils/             # Utility functions
    │   └── helpers.js
    ├── components/        # Component-specific scripts
    │   ├── navigation.js
    │   ├── highlights.js
    │   └── vanishing-input.js
    └── pages/             # Page-specific scripts
        ├── about.js
        ├── contact.js
        └── nda.js
```

## Features

- Interactive navigation with glowing borders
- Smooth page transitions
- Text highlighting effects
- Vanishing text input with particle animation
- Responsive design
- Aurora background effect
- Signature canvas for NDA form

## Customization

To customize the website:

1. **Colors**: Edit the CSS files to change colors, fonts, and other styling
2. **Content**: Modify the HTML in index.html to update text and structure
3. **Images**: Replace images in the assets/images directory
4. **Behavior**: Modify JavaScript files to change interactive behavior

## Browser Support

This website works on all modern browsers that support:
- CSS Variables
- Flexbox
- CSS Animations
- ES6 JavaScript
- Canvas API