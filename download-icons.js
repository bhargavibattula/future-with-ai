const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
  { file: 'chatgpt.png', domain: 'chatgpt.com' },
  { file: 'claude.png', domain: 'anthropic.com' },
  { file: 'gemini.png', domain: 'gemini.google.com' },
  { file: 'midjourney.png', domain: 'midjourney.com' },
  { file: 'dalle.png', domain: 'openai.com' },
  { file: 'perplexity.png', domain: 'perplexity.ai' },
  { file: 'runway.png', domain: 'runwayml.com' },
  { file: 'canva.png', domain: 'canva.com' },
  { file: 'cursor.png', domain: 'cursor.sh' },
  { file: 'copilot.png', domain: 'github.com' },
  { file: 'sora.png', domain: 'openai.com' },
  { file: 'elevenlabs.png', domain: 'elevenlabs.io' },
  { file: 'jasper.png', domain: 'jasper.ai' },
  { file: 'synthesia.png', domain: 'synthesia.io' },
  { file: 'stable-diffusion.png', domain: 'stability.ai' },
  { file: 'v0.png', domain: 'v0.dev' },
  { file: 'writesonic.png', domain: 'writesonic.com' }
];

const destDir = path.join(__dirname, 'public', 'ai-tools');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  for (const icon of icons) {
    const dest = path.join(destDir, icon.file);
    const url = `https://www.google.com/s2/favicons?domain=${icon.domain}&sz=256`;
    try {
      await download(url, dest);
      console.log(`✅ Downloaded ${icon.file}`);
    } catch (e) {
      console.log(`❌ Failed ${icon.file}: ${e.message}`);
    }
  }
}

main();
