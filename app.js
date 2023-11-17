const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {masterToPDF} = require('relaxedjs');
const puppeteer = require('puppeteer');
const plugins = require('relaxedjs/src/plugins');

class Html2pdf {
  constructor() {
    this.puppeteerConfig = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-translate',
        '--disable-extensions',
        '--disable-sync',
      ],
    };

    this.relaxedGlobals = {
      busy: false,
      config: {},
      configPlugins: [],
    };

    this._initializedPlugins = false;
  }

  async _initializePlugins() {
    if (this._initializedPlugins) return; // Do not initialize plugins twice
    for (const [i, plugin] of plugins.builtinDefaultPlugins.entries()) {
      plugins.builtinDefaultPlugins[i] = await plugin.constructor();
    }
    await plugins.updateRegisteredPlugins(this.relaxedGlobals, '/');

    const chrome = await puppeteer.launch(this.puppeteerConfig);
    this.relaxedGlobals.puppeteerPage = await chrome.newPage();
    this._initializedPlugins = true;
  }

  async createPdf(templatePath, json_data, tempHtmlPath, outputPdfPath) {
    await this._initializePlugins();
    if (this._initializedPlugins) {
      const defaultTempHtmlPath = tempHtmlPath || path.resolve(__dirname, 'test.html');
      const defaultOutputPdfPath =
        outputPdfPath || path.resolve(__dirname, 'output.pdf');

      await masterToPDF(
        templatePath,
        this.relaxedGlobals,
        defaultTempHtmlPath,
        defaultOutputPdfPath,
        json_data
      );
    }
  }
}

const createPdf = async (templatePath, json_data, tempHtmlPath, outputPdfPath) => {
  return new Html2pdf().createPdf(templatePath, json_data, tempHtmlPath, outputPdfPath);
};

const workdir = `./dump`;
(() => {
  if (!fs.existsSync(workdir)) {
    fs.mkdirSync(workdir);
  }
})();

const deleteFile = (paths) => {
  paths.forEach(path => {
    fs.rmSync(path, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 10000
    });
  });
}
const printH2P = async (model, res) => {
  const outputDir = path.resolve(workdir, `output-${uuidv4()}`);
  const zipPath = path.resolve(outputDir, `output-${uuidv4()}.zip`);
  const cleanUpCallbacks = [() => {
    deleteFile([zipPath, outputDir]);
  }];
  const cleanUp = () => {
    try {
      cleanUpCallbacks.forEach(clean => clean());
    } catch (e) {
    }
  }

  let {name, html} = model;
  if (!name.endsWith(".pdf")) name += ".pdf"
  const templatePath = path.resolve(workdir, `template-${uuidv4()}.html`);
  const tempHTMLPath = path.resolve(workdir, `temp-${uuidv4()}.html`);
  const outputPath = path.resolve(workdir, `result-${name}-${uuidv4()}.pdf`);

  cleanUpCallbacks.push(() => {
    deleteFile([templatePath, tempHTMLPath, outputPath]);
  });

  fs.writeFileSync(tempHTMLPath, html);
  fs.writeFileSync(templatePath, html);

  await createPdf(templatePath, {}, tempHTMLPath, outputPath).then(() => {
    res.sendFile(outputPath, () => cleanUp());
  });
}

app.options('*', cors());
app.use(cors());

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());


app.post('/api/pdf', async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send('Missing Request Body');
  }
  if (!body.html) {
    return res.status(400).send('Missing HTML file');
  }
  if (!body.name) body.name = uuidv4();
  if (!body.name.endsWith('.pdf')) body.name += '.pdf';
  printH2P(body, res);
});

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Start the server
const port = process.env.PORT || 3588; // Use the provided PORT environment variable or default to 3000
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
