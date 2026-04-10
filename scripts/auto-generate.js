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
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_ARTICLES = 100;
const DAILY_ARTICLES = 10;

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

function getKeywords(existing) {
  const base = TOPIC.split('・')[0];
  const all = [
    base + 'おすすめランキング',
    base + '人気商品 比較',
    base + '選び方 失敗しない',
    base + '効果 口コミ',
    base + '初心者 どれがいい',
    base + '最新 トレンド',
    base + 'コスパ最強',
    base + '徹底レビュー',
    base + 'プロが教える',
    base + '2026年版',
    base + '購入前に読む',
    base + 'メリット デメリット',
    base + '人気ブランド',
    base + '安い おすすめ',
    base + '高評価 まとめ',
  ];
  const seed = (Date.now() + existing * 7) % all.length;
  const result = [];
  for (let i = 0; i < DAILY_ARTICLES; i++) {
    result.push(all[(seed + i) % all.length]);
  }
  return result;
}

async function countExisting() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) return 0;
  return fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx')).length;
}

async function generateArticle(keyword) {
  const year = new Date().getFullYear();
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);
  const imgSeed = Math.abs(keyword.split('').reduce((a,c) => a + c.charCodeAt(0), 0));
  const title = '【' + year + '年最新】' + keyword + 'おすすめTOP5｜専門家が徹底比較';

  const prompt = 'あなたはプロのレビューライターです。\n' +
    '「' + keyword + '」について高品質な比較記事を日本語で書いてください。\n\n' +
    '必須条件:\n' +
    '1. 冒頭に結論（おすすめ1位）を書く\n' +
    '2. 実際の商品名を使う\n' +
    '3. 各商品のメリット・デメリットを書く\n' +
    '4. 評価基準: ' + CRITERIA + '\n\n' +
    '---\n' +
    'title: "' + title + '"\n' +
    'date: "' + new Date().toISOString().split('T')[0] + '"\n' +
    'genre: "' + TOPIC.split('・')[0] + '"\n' +
    'excerpt: "' + keyword + 'のおすすめを徹底比較。"\n' +
    '---\n\n' +
    '![' + keyword + '](https://picsum.photos/seed/' + imgSeed + '/800/450)\n\n' +
    '> **注目**: ' + A8_DESC + '\n' +
    '> [→ ' + A8_NAME + 'をチェック](' + A8_URL + ')\n\n' +
    '[→ Amazon](' + amazonLink + ') | [→ 楽天](' + rakutenLink + ')\n\n' +
    '## TOP5比較\n(実際の商品名で各150文字以上。メリット・デメリット記載)\n\n' +
    '## 選び方\n' + CRITERIA.split('・').map(c=>'### '+c).join('\n') + '\n\n' +
    '## よくある質問\n\n' +
    '[→ ' + A8_NAME + '](' + A8_URL + ') | [→ Amazon](' + amazonLink + ')\n\n' +
    '## まとめ\n※アフィリエイト広告含みます。';

  const body = JSON.stringify({
    model: MODEL,
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
  if (!data.content || !data.content[0]) throw new Error('API error: ' + res.body.slice(0, 200));
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const existing = await countExisting();
  console.log('既存記事数: ' + existing + ' / 目標: ' + MAX_ARTICLES);

  if (existing >= MAX_ARTICLES) {
    console.log('目標達成済み！生成をスキップします。');
    return;
  }

  const remaining = MAX_ARTICLES - existing;
  const todayCount = Math.min(DAILY_ARTICLES, remaining);
  const keywords = getKeywords(existing);

  console.log('本日生成数: ' + todayCount + ' [' + MODEL + ']');

  for (let i = 0; i < todayCount; i++) {
    const keyword = keywords[i];
    try {
      console.log('Generating: ' + keyword);
      const content = await generateArticle(keyword);
      fs.writeFileSync(path.join(blogDir, Date.now() + '.mdx'), content);
      console.log('Saved!');
      await new Promise(r => setTimeout(r, 10000));
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
  console.log('Done! 残り: ' + Math.max(0, remaining - todayCount) + '記事');
}

main();
