const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';
const SITE_NAME = '韓ドラビューティー';
const TOPIC = '韓国コスメ・韓国美容・Kビューティー';
const CRITERIA = '品質・使用感・コスパ・トレンド・人気';
const A8_NAME = 'オルビス ザ クレンジングオイル';
const A8_URL = 'https://px.a8.net/svt/ejp?a8mat=4AZR8U+CRMNSI+1USQ+4YM976';
const A8_DESC = '美容師も愛用する人気クレンジング';

function moshimoAmazonLink(keyword) {
  const searchUrl = encodeURIComponent('https://www.amazon.co.jp/s?k=' + encodeURIComponent(keyword) + '&tag=' + AMAZON_TRACKING_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=170&pc_id=185&pl_id=4062&url=' + searchUrl;
}

function moshimoRakutenLink(keyword) {
  const searchUrl = encodeURIComponent('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(keyword) + '/?f=1&af=' + RAKUTEN_AFFILIATE_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=54&pc_id=54&pl_id=616&url=' + searchUrl;
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

function getKeywords() {
  const base = TOPIC.split('・')[0];
  return [
    base + 'おすすめランキング',
    base + '人気商品 比較',
    base + '選び方 失敗しない',
    base + '効果 口コミ',
    base + '初心者 どれがいい',
  ];
}

async function generateArticle(keyword) {
  const year = new Date().getFullYear();
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);
  const imgSeed = Math.abs(keyword.split('').reduce((a,c) => a + c.charCodeAt(0), 0));
  const title = '【' + year + '年最新】' + keyword + 'おすすめTOP5｜専門家が徹底比較';

  const prompt = 'あなたはプロのレビューライター兼SEO専門家です。\n' +
    '「' + keyword + '」について、読者が購入したくなる高品質な比較記事を日本語で書いてください。\n\n' +
    '必須条件:\n' +
    '1. 冒頭に結論（おすすめ1位）を書く\n' +
    '2. 実際の商品名を使う（架空商品名は禁止）\n' +
    '3. 各商品のメリット・デメリットを正直に書く\n' +
    '4. 読者タイプ別におすすめを提示する\n' +
    '5. 評価基準: ' + CRITERIA + '\n\n' +
    '---\n' +
    'title: "' + title + '"\n' +
    'date: "' + new Date().toISOString().split('T')[0] + '"\n' +
    'genre: "' + TOPIC.split('・')[0] + '"\n' +
    'excerpt: "' + keyword + 'のおすすめ商品を専門家が徹底比較。失敗しない選び方も解説。"\n' +
    '---\n\n' +
    '![' + keyword + '](https://picsum.photos/seed/' + imgSeed + '/800/450)\n\n' +
    '> **注目**: ' + A8_DESC + '\n' +
    '> [→ ' + A8_NAME + 'をチェックする](' + A8_URL + ')\n\n' +
    '[→ Amazonで探す](' + amazonLink + ') | [→ 楽天で探す](' + rakutenLink + ')\n\n' +
    '## ' + keyword + ' おすすめTOP5\n\n' +
    '(実際の商品名を使い各商品150文字以上でレビュー)\n\n' +
    '## 選び方のポイント\n\n' +
    CRITERIA.split('・').map(c => '### ' + c).join('\n') + '\n\n' +
    '[→ ' + A8_NAME + 'の詳細を見る](' + A8_URL + ')\n\n' +
    '[→ Amazonで今すぐ確認](' + amazonLink + ') | [→ 楽天で最安値を見る](' + rakutenLink + ')\n\n' +
    '## まとめ\n\n' +
    '※本記事はアフィリエイト広告を含みます。';

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
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
  if (!data.content || !data.content[0]) throw new Error('API error: ' + res.body.slice(0, 200));
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  const keywords = getKeywords();
  console.log('Generating ' + keywords.length + ' articles for ' + SITE_NAME);
  for (const keyword of keywords) {
    try {
      console.log('Generating: ' + keyword);
      const content = await generateArticle(keyword);
      const filename = Date.now() + '.mdx';
      fs.writeFileSync(path.join(blogDir, filename), content);
      console.log('Saved: ' + filename);
      await new Promise(r => setTimeout(r, 15000));
    } catch (e) {
      console.error('Error: ' + keyword, e.message);
    }
  }
  console.log('Done!');
}

main();
