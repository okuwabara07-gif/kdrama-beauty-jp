const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';

const KEYWORDS = ["韓国コスメ", "オルチャンメイク", "韓国スキンケア", "ガラス肌", "水光肌"];
const SITE_NAME = '韓国ドラマ美容';

function moshimoAmazonLink(keyword) {
  const searchUrl = encodeURIComponent(`https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_TRACKING_ID}`);
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_ID}&p_id=170&pc_id=185&pl_id=4062&url=${searchUrl}`;
}

function moshimoRakutenLink(keyword) {
  const searchUrl = encodeURIComponent(`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/?f=1&hd=1&af=${RAKUTEN_AFFILIATE_ID}`);
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_ID}&p_id=54&pc_id=54&pl_id=616&url=${searchUrl}`;
}

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function generateArticle(keyword) {
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);

  const prompt = `「${keyword}」について、日本語で800文字以上のブログ記事を書いてください。

以下の形式でMDXファイルとして出力してください：

---
title: "【2026年最新】${keyword}のおすすめ完全ガイド"
date: "${new Date().toISOString().split('T')[0]}"
description: "${keyword}について徹底解説。選び方のポイントとおすすめ商品を紹介します。"
---

記事本文（見出しh2・h3を使って構造化してください）

記事の最後に必ず以下のアフィリエイトリンクセクションを含めてください：

## おすすめ商品を探す

### Amazonで探す
[${keyword}をAmazonで見る](${amazonLink})

### 楽天市場で探す  
[${keyword}を楽天で見る](${rakutenLink})

※本記事はアフィリエイト広告を含みます。`;

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  });

  const res = await request({
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  const data = JSON.parse(res.body);
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const count = Math.min(5, KEYWORDS.length);
  console.log(`Generating ${count} articles for ${SITE_NAME}...`);

  for (let i = 0; i < count; i++) {
    const keyword = KEYWORDS[i % KEYWORDS.length];
    try {
      console.log(`Generating: ${keyword}`);
      const content = await generateArticle(keyword);
      const filename = `${Date.now()}-${keyword.replace(/[^a-zA-Z0-9぀-鿿]/g, '-')}.mdx`;
      fs.writeFileSync(path.join(blogDir, filename), content);
      console.log(`✅ Saved: ${filename}`);
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`Error: ${keyword}`, e.message);
    }
  }
  console.log('Done!');
}

main();
