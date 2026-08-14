const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
  { file: 'chatgpt.svg', slug: 'openai' },
  { file: 'claude.svg', slug: 'anthropic' },
  { file: 'gemini.svg', slug: 'googlegemini' },
  { file: 'midjourney.svg', slug: 'midjourney' },
  { file: 'dalle.svg', slug: 'openai' },
  { file: 'perplexity.svg', slug: 'perplexity' },
  { file: 'runway.svg', slug: 'runway' }, // Not in simple-icons usually, but maybe?
  { file: 'canva.svg', slug: 'canva' },
  { file: 'cursor.svg', slug: 'cursor' },
  { file: 'copilot.svg', slug: 'githubcopilot' },
  { file: 'sora.svg', slug: 'openai' },
  { file: 'elevenlabs.svg', slug: 'elevenlabs' },
  { file: 'jasper.svg', slug: 'jasper' },
  { file: 'synthesia.svg', slug: 'synthesia' },
  { file: 'stable-diffusion.svg', slug: 'stablediffusion' },
  { file: 'v0.svg', slug: 'vercel' },
  { file: 'writesonic.svg', slug: 'writesonic' }
];

const destDir = path.join(__dirname, 'public', 'ai-tools');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (response) => {
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
    const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${icon.slug}.svg`;
    try {
      await download(url, dest);
      console.log(`✅ Downloaded ${icon.file}`);
    } catch (e) {
      console.log(`❌ Failed ${icon.file}: ${e.message}`);
      // Fallback: Create a placeholder SVG with text
      const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><rect width="24" height="24" rx="4" fill="#333333"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#ffffff">${icon.slug.substring(0,6)}</text></svg>`;
      fs.writeFileSync(dest, fallbackSvg);
    }
  }
}

main();
