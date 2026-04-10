const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';
const SITE_NAME =  + site_name + ;
const TOPIC =  + topic + ;
const CRITERIA =  + criteria + ;

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
    base + '人気ランキング',
    base + 'コスパ最強',
    base + '選び方 失敗しない',
    base + '初心者 どれがいい',
  ];
}

async function generateArticle(keyword) {
  const year = new Date().getFullYear();
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);
  const imgSeed = Math.abs(keyword.split('').reduce((a,c) => a + c.charCodeAt(0), 0));
  const title = '【' + year + '年最新】' + keyword + 'おすすめTOP5｜専門家が徹底比較';

  const prompt = 'あなたはプロのレビューライターです。\n' +
    '「' + keyword + '」について購買意欲を高める比較記事を日本語で書いてください。\n\n' +
    '以下の形式で出力してください:\n\n' +
    '---\n' +
    'title: "' + title + '"\n' +
    'date: "' + new Date().toISOString().split('T')[0] + '"\n' +
    'genre: "' + TOPIC.split('・')[0] + '"\n' +
    'excerpt: "' + keyword + 'について専門家が解説。おすすめ商品を紹介します。"\n' +
    '---\n\n' +
    '![' + keyword + '](https://picsum.photos/seed/' + imgSeed + '/800/450)\n\n' +
    '[→ Amazonで探す](' + amazonLink + ')\n' +
    '[→ 楽天で探す](' + rakutenLink + ')\n\n' +
    '## ' + keyword + ' おすすめTOP5\n\n' +
    '(各商品150文字以上でレビュー。メリット・デメリット・こんな人におすすめを含める)\n\n' +
    '[→ Amazonで今すぐ確認](' + amazonLink + ')\n' +
    '[→ 楽天で最安値を見る](' + rakutenLink + ')\n\n' +
    '## まとめ\n\n' +
    '※本記事はアフィリエイト広告を含みます。';

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
