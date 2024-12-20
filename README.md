# Tab Guardian

A smart Chrome extension for efficient tab management and productivity insights.

## Features

- Intelligent tab tracking and analytics
- Productivity insights and metrics
- Workspace management
- Cross-device synchronization (Premium)
- Social sharing capabilities

## Development

### Prerequisites

- Node.js (v14 or higher)
- Chrome Browser
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/qaaph-zyld/tab_guardian.git
cd tab_guardian
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory

## Project Structure

```
tab_guardian/
├── src/
│   ├── background/
│   ├── popup/
│   ├── analytics/
│   └── utils/
├── public/
│   └── icons/
├── dist/
└── tests/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details
