# Gcode Viewer and Editor (gcoder V2)

A web-based tool for visualizing and editing G-code for 3D printing, built with Three.js and Codemirror. Enjoy the convenience and security of using it offline by downloading the files and running them locally on your desktop. Or you can check it out now at https://gygertech.com/gcoder

## Overview

This project provides a comprehensive interface for 3D printing enthusiasts to view, edit, and analyze G-code files directly in the browser, even without an internet connection. Key features include:

  - **Real-time 3D Visualization:** See your G-code in 3D as you scroll through your code.
  - **Interactive Editing:** Modify G-code directly with immediate visual feedback.
  - **Layer Navigation:** Easily jump between layers with custom search functionality.
  - **Measurement Tools:** Measure distances in the XY and Z planes for better understanding of your print paths.
  - **Customizable Build Plate:** Adjust the build plate size to match your printer.
  - **Offline Capability:** No need for a web server; just download and run in the browser.


### Prerequisites

  - Web Browser with WebGL support (for Three.js)

### Performance Considerations

 - For larger gcode files over 1,000,000 lines, performance might vary based on hardware capabilities.

### Installation (or lack thereof)

1. **Download the repository:**
    - You can download the project as a ZIP file from GitHub or clone it if you prefer.
     
2. **Run Locally:**
    - No server needed; just open `index.html` in your web browser by double-clicking it or drag it into your browser.

### Usage

- **Input G-code:** 
  - Allows you to directly type, paste, or load G-code into the editor.

- **Visualize:** 
  - The 3D visualization updates in real-time as you scroll through the G-code in the editor.
  - Scroll to Render: As you scroll through the G-code, the visualization reflects the current line.
  - Render Limit: Controls how many lines of G-code are rendered at once.

- **Interact:** 
  - Search: Search anything or by specific layer delimiter. Use Enter to go to the next match, Shift + Enter for the previous match.
  - Measurement: Turn on measure mode and click on two points in the 3D visualization to measure distances in XY and Z planes.
  
   - Key Bindings:
      - Arrow Up/Down: Move to the next/previous G-code line.
      - Shift + Arrow Up/Down: Move by search phrase up or down.
      - Spacebar: Toggle play/pause of G-code simulation (when textarea not focused).
      - Double Click on Points: Jump to the corresponding line in the G-code editor.
      - Enter key in search: Go to next search match.
      - Shift + Enter key in search: Go to previous search match.
      - Escape: Clears measurement selections.
  
  - Pan, Zoom, Orbit:
      - Pan: Click-drag on the canvas with the mouse.
      - Zoom: Use the mouse scroll wheel or pinch on touch devices.
      - Orbit: Right-click or Shift + Left-click and drag to rotate the view around the model.
        
  - Pan, Zoom, Orbit (Touch):        
      - Pan: Single finger touch and drag
      - Zoom: Two finger pinch to zoom
      - Orbit: Three finger touch and drag

  - Buttons for:
      - Toggle Travel Lines: Show/hide travel lines (🔹) 
      - Toggle 3d Mesh Lines - Switch between simple line and 3d mesh line representation (🔳)
      - Toggle Measure Mode = witch between measure mode and regular mode (📏)
      - Simulation: Play or pause (▶️) and adjust simulation speed with the scroll speed slider.
      - Search: Search up and down with (↑) and (↓).

- **Save:** 
    - Save G-code: Saves the current G-code in the editor to a file.
    - Load File: Loads G-code from a file into the editor. Supports drag and drop or file selection.

## Code Structure
  - **index.html:** Main HTML file with the structure for the viewer and editor.
  - **style.css:** Contains styling for the UI elements.
  - **three.js:** The Three.js library for 3D rendering (included for offline use).
  - **3.js:** Custom Three.js setup for the G-code visualization.
  - **gcodeCommands.js:** A JSON or JavaScript file defining G-code commands for quick reference.
  - codemirror.min.css:** Codemirror's stylesheet.
  - **codemirror.min.js:** Codemirror's js file.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE.md file for details.

## Acknowledgments

- Three.js for the amazing 3D library.
- Codemirror for the easy to use code editor.
- All contributors and testers who helped refine this tool.

## Contact

For any questions or suggestions, feel free to open an issue.
