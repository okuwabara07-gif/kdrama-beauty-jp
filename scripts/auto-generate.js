const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';

const SITE_NAME = '韓国ドラマ美容';
const TOPIC = '韓国ドラマ・韓国女優の美容法';
const CRITERIA = '効果・続けやすさ・コスパ・安全性・口コミ';

function moshimoAmazonLink(keyword) {
  const searchUrl = encodeURIComponent(`https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_TRACKING_ID}`);
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_ID}&p_id=170&pc_id=185&pl_id=4062&url=${searchUrl}`;
}

function moshimoRakutenLink(keyword) {
  const searchUrl = encodeURIComponent(`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/?f=1&af=${RAKUTEN_AFFILIATE_ID}`);
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
  const year = new Date().getFullYear();

  const prompt = `あなたはプロのレビューライターです。「${keyword}」について、マイベスト・価格.comのような高品質な比較記事を日本語で書いてください。

以下の形式でMDXファイルとして出力してください：

---
title: "【${year}年最新】${keyword}おすすめランキングTOP5｜専門家が徹底比較"
date: "${new Date().toISOString().split('T')[0]}"
description: "${keyword}のおすすめ商品をランキング形式で徹底比較。${CRITERIA}の観点から選び方のポイントも解説します。"
---

## ${keyword}の選び方｜重要な5つのポイント

（選び方の解説を300文字以上で書く）

## 評価基準について

本記事では以下の基準で各商品を評価しています：
- ${CRITERIA.split('・').join('\n- ')}

各項目を5段階（★1〜★5）で評価しています。

## ${keyword}おすすめランキングTOP5

### 第1位：[商品名A]
**総合評価：★★★★★（5.0）**

| 評価項目 | スコア |
|---------|--------|
${CRITERIA.split('・').map(c => `| ${c} | ★★★★★ |`).join('\n')}

**おすすめポイント**
（200文字以上で詳しく解説）

**こんな人におすすめ**
- ○○を重視する人
- ○○に悩んでいる人
- 予算○○円以内で探している人

---

### 第2位：[商品名B]
**総合評価：★★★★☆（4.5）**

| 評価項目 | スコア |
|---------|--------|
${CRITERIA.split('・').map(c => `| ${c} | ★★★★☆ |`).join('\n')}

**おすすめポイント**
（200文字以上で詳しく解説）

**こんな人におすすめ**
- ○○を重視する人
- ○○に悩んでいる人

---

### 第3位：[商品名C]
**総合評価：★★★★☆（4.0）**

| 評価項目 | スコア |
|---------|--------|
${CRITERIA.split('・').map(c => `| ${c} | ★★★★☆ |`).join('\n')}

**おすすめポイント**
（200文字以上で詳しく解説）

---

### 第4位：[商品名D]
**総合評価：★★★☆☆（3.5）**

**おすすめポイント**（100文字以上）

---

### 第5位：[商品名E]
**総合評価：★★★☆☆（3.0）**

**おすすめポイント**（100文字以上）

---

## 商品比較表

| 商品名 | 総合評価 | 価格帯 | ${CRITERIA.split('・').join(' | ')} | こんな人向け |
|--------|---------|--------|${CRITERIA.split('・').map(() => '------').join('|')}|------|
| 商品A | ★★★★★ | ¥○○○○ | ${CRITERIA.split('・').map(() => '★★★★★').join(' | ')} | ○○な人 |
| 商品B | ★★★★☆ | ¥○○○○ | ${CRITERIA.split('・').map(() => '★★★★☆').join(' | ')} | ○○な人 |
| 商品C | ★★★★☆ | ¥○○○○ | ${CRITERIA.split('・').map(() => '★★★☆☆').join(' | ')} | ○○な人 |

## タイプ別おすすめ商品

**初心者・コスパ重視の人には**
→ [商品名]がおすすめ。理由：（100文字）

**品質・効果重視の人には**
→ [商品名]がおすすめ。理由：（100文字）

**プレゼントにおすすめ**
→ [商品名]がおすすめ。理由：（100文字）

## まとめ

（200文字以上のまとめ）

## おすすめ商品を購入する

### Amazonで探す
[${keyword}をAmazonで見る](${amazonLink})

### 楽天市場で探す
[${keyword}を楽天で見る](${rakutenLink})

※本記事はアフィリエイト広告を含みます。`;

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

  const keywords = [
    '韓国ドラマおすすめ',
    '韓国ドラマランキング',
    '韓国ドラマ比較',
    '韓国ドラマ選び方',
    '韓国ドラマ人気',
  ];

  console.log(`Generating comparison articles for ${SITE_NAME}...`);

  for (const keyword of keywords.slice(0, 3)) {
    try {
      console.log(`Generating: ${keyword}`);
      const content = await generateArticle(keyword);
      const filename = `${Date.now()}-${keyword.replace(/[^a-zA-Z0-9぀-鿿]/g, '-')}.mdx`;
      fs.writeFileSync(path.join(blogDir, filename), content);
      console.log(`✅ Saved: ${filename}`);
      await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      console.error(`Error: ${keyword}`, e.message);
    }
  }
  console.log('Done!');
}

main();
