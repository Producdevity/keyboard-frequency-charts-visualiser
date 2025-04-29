# Keyboard Frequency Visualizer

A web application that helps you visualize your keyboard usage patterns and optimize your custom keyboard layout.

## Features

- Upload and analyze keystroke log files
- Visualize key usage frequency with bar and pie charts
- Interactive keyboard layout visualization with color-coded key usage
- Get suggestions for optimizing your keyboard layout
- Support for custom keyboard layouts

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/keyboard-frequency-charts-visualiser.git
cd keyboard-frequency-charts-visualiser
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload your keystroke log file using the file input on the homepage.
2. View the visualization of your key usage patterns using the different chart types.
3. Check the layout suggestions to optimize your keyboard layout.
4. Use the insights to design a custom keyboard layout that better suits your typing patterns.

## Data Format

The application expects keystroke log files in the following format:

```text
timestamp key
timestamp key
...
```

Example:

```text
1234567890 a
1234567891 b
1234567892 c
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for optimized keyboard layouts
- Built with Next.js and React
- Uses Chart.js for data visualization
