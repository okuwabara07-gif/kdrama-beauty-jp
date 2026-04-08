const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';

const SITE_NAME = 'kdrama beauty';
const TOPIC = 'ヘアカラー・白髪染め・セルフカラー';
const CRITERIA = '染まりやすさ・色持ち・ダメージ・コスパ・使いやすさ';

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


function getUnsplashImage(keyword) {
  const seed = keyword.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  return `https://picsum.photos/seed/${Math.abs(seed)}/800/450`;
}


// キーワードタイプ定義
const KEYWORD_PATTERNS = {
  ranking: (topic) => [
    `${topic}おすすめランキング`,
    `${topic}人気ランキング`,
    `${topic}コスパ最強ランキング`,
    `${topic}プロおすすめランキング`,
    `${topic}口コミランキング`,
  ],
  question: (topic) => [
    `${topic}どれがいい`,
    `${topic}選び方 失敗しない`,
    `${topic}違いは何`,
    `${topic}効果ある`,
    `${topic}初心者 どれ`,
    `${topic}コスパ 比較`,
  ],
  worry: (topic) => [
    `${topic}効果なかった 原因`,
    `${topic}失敗した 対処法`,
    `${topic}やめた理由`,
    `${topic}デメリット`,
    `${topic}注意点`,
  ],
  howto: (topic) => [
    `${topic}正しい使い方`,
    `${topic}始め方 初心者`,
    `${topic}続け方 コツ`,
    `${topic}効果的な方法`,
    `${topic}タイミング いつ`,
  ],
  comparison: (topic) => [
    `${topic}市販 サロン 違い`,
    `${topic}安い 高い 比較`,
    `${topic}プチプラ デパコス 比較`,
    `${topic}国産 海外 比較`,
  ],
};

function getKeywords() {
  const topicBase = TOPIC.split('・')[0];
  const all = [];
  Object.values(KEYWORD_PATTERNS).forEach(fn => all.push(...fn(topicBase)));
  return all;
}

function getArticleType(keyword) {
  if (keyword.includes('どれ') || keyword.includes('選び方') || keyword.includes('違い')) return 'question';
  if (keyword.includes('失敗') || keyword.includes('効果なかった') || keyword.includes('やめた') || keyword.includes('注意')) return 'worry';
  if (keyword.includes('方法') || keyword.includes('使い方') || keyword.includes('始め方') || keyword.includes('コツ')) return 'howto';
  if (keyword.includes('比較') || keyword.includes('vs') || keyword.includes('市販')) return 'comparison';
  return 'ranking';
}

function getTitleByType(keyword, year, type) {
  switch(type) {
    case 'question': return `【${year}年】${keyword}｜プロが本音で答えます`;
    case 'worry': return `${keyword}を解決｜原因と正しい対処法【${year}年版】`;
    case 'howto': return `【${year}年最新】${keyword}完全ガイド｜プロが徹底解説`;
    case 'comparison': return `【${year}年】${keyword}｜違いをプロが徹底比較`;
    default: return `【${year}年最新】${keyword}おすすめTOP5｜専門家が徹底比較`;
  }
}

async function generateArticle(keyword) {
  
  const articleType = getArticleType(keyword);
  const title = getTitleByType(keyword, year, articleType);
  const amazonSearchLink = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_TRACKING_ID}`;
  const rakutenSearchLink = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/?af=${RAKUTEN_AFFILIATE_ID}`;
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);

  const typePrompts = {
    question: `「${keyword}」で悩む読者に、プロとして本音で答える記事を書いてください。読者の疑問に直接答え、最終的に商品購入へ自然に誘導してください。`,
    worry: `「${keyword}」というネガティブな体験をした読者に共感しつつ、正しい解決策と適切な商品を提案する記事を書いてください。`,
    howto: `「${keyword}」について、初心者でもわかる具体的なステップで解説し、必要な商品・道具を自然に紹介してください。`,
    comparison: `「${keyword}」について、読者が最も知りたい具体的な違いを明確に比較し、読者のタイプ別におすすめを提示してください。`,
    ranking: `「${keyword}」について、訪問者が即座に購買行動を起こしやすい比較ランキング記事を書いてください。`,
  };

  const prompt = \`あなたはCRO専門家でもあるプロのレビューライターです。
${typePrompts[articleType] || typePrompts.ranking}

サイト名：${SITE_NAME}
テーマ：${TOPIC}
評価基準：${CRITERIA}

以下のCRO原則を守ってください：
1. 冒頭に結論・1位商品を先に書く
2. 各商品に「こんな人には向かない」デメリットも正直に書く（信頼性UP）
3. 読者の悩みに共感する書き出し
4. 数字・具体例を入れる
5. アフィリエイトリンクを自然に3箇所以上挿入

MDX形式で出力：

---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
genre: "${TOPIC.split('・')[0]}"
excerpt: "${keyword}について専門家が解説。選び方のポイントと実際におすすめできる商品を紹介します。"
---

[→ Amazonで${keyword}を探す](${amazonLink})
[→ 楽天で${keyword}を探す](${rakutenLink})

\`\`\`;

  const prompt = `あなたはCRO（コンバージョン率最適化）の専門家でもあるプロのレビューライターです。
「${keyword}」について、訪問者が即座に購買行動を起こしやすい、マイベスト・価格.com級の高品質な比較記事を日本語で書いてください。

以下のCROの原則を必ず守ってください：
1. 冒頭に「結論・1位商品」を先に書く（読者はすぐ答えを求めている）
2. CTAボタンのテキストは「Amazonで今すぐ確認する」「楽天で価格を見る」など具体的に
3. 比較表は記事の上部（選び方の前）に配置する
4. 各商品に「こんな人には向かない」デメリットも正直に書く（信頼性UP）
5. 緊急性・限定性を自然に入れる（「2026年最新」「在庫限り」など）
6. 読者の悩みに共感する書き出しにする

以下の形式でMDXファイルとして出力してください：

---
title: "【${year}年最新】${keyword}おすすめランキングTOP5｜専門家が徹底比較"
date: "${new Date().toISOString().split('T')[0]}"
description: "${keyword}のおすすめ商品をランキング形式で徹底比較。${CRITERIA}の観点から選び方のポイントも解説します。"
---


## アイキャッチ画像（記事冒頭）

![${keyword}のイメージ](${`https://picsum.photos/seed/${Math.abs(keyword.split('').reduce((a,c)=>a+c.charCodeAt(0),0))}/800/450`})

## 結論：迷ったらこれを買えば間違いなし

> **編集部イチ推し：[商品名]**
> ${keyword}を探しているなら、まずこれを確認してください。（30文字で理由）

[→ Amazonで今すぐ価格を確認する](${amazonLink})
[→ 楽天市場で最安値を見る](${rakutenLink})

---

## ${keyword}おすすめ比較表（クリックで詳細へ）

| 順位 | 商品名 | 総合評価 | 価格帯 | おすすめの人 |
|------|--------|---------|--------|------------|
| 🥇1位 | 商品A | ★★★★★ | ¥○○○○ | ○○な人 |
| 🥈2位 | 商品B | ★★★★☆ | ¥○○○○ | ○○な人 |
| 🥉3位 | 商品C | ★★★★☆ | ¥○○○○ | ○○な人 |
| 4位 | 商品D | ★★★☆☆ | ¥○○○○ | ○○な人 |
| 5位 | 商品E | ★★★☆☆ | ¥○○○○ | ○○な人 |

---

## 「どれを選べばいいかわからない」あなたへ

（読者の悩みに共感する書き出し100文字以上。「○○で悩んでいませんか？」から始める）

## ${keyword}の選び方｜絶対に外さない3つのポイント

（選び方を300文字以上で解説）

## 評価基準

本記事では以下の基準で評価しています：
${CRITERIA.split('・').map(c => `- **${c}**：（評価の観点を20文字で説明）`).join('\n')}

---

## 第1位への画像

![${keyword} 第1位](${`https://picsum.photos/seed/${Math.abs((keyword+'1').split('').reduce((a,c)=>a+c.charCodeAt(0),0))}/800/400`})

## 第1位：[商品名A]｜総合評価★★★★★

**「○○な人には絶対これ」編集部イチ推し**

| 評価項目 | スコア | コメント |
|---------|--------|---------|
${CRITERIA.split('・').map(c => `| ${c} | ★★★★★ | （20文字のコメント） |`).join('\n')}

### おすすめポイント3つ
1. （具体的なポイント・数字を使う）
2. （具体的なポイント・数字を使う）
3. （具体的なポイント・数字を使う）

### こんな人におすすめ ✅
- ○○を重視する人
- 予算○○円以内で探している人
- ○○に悩んでいる人

### こんな人には向かない ❌
- ○○を求める人（正直なデメリット）
- ○○な人には過剰スペック

[→ Amazonで今すぐ確認する（送料無料）](${amazonLink})
[→ 楽天で最安値をチェック](${rakutenLink})

---

## 第2位：[商品名B]｜総合評価★★★★☆

**「コスパ重視ならこれ一択」**

| 評価項目 | スコア | コメント |
|---------|--------|---------|
${CRITERIA.split('・').map(c => `| ${c} | ★★★★☆ | （20文字のコメント） |`).join('\n')}

### おすすめポイント
（150文字以上）

### こんな人におすすめ ✅ / 向かない ❌
- ✅ ○○な人
- ❌ ○○な人

[→ Amazonで価格を確認する](${amazonLink})

---

## 第3位：[商品名C]｜総合評価★★★★☆

### おすすめポイント（100文字以上）

### こんな人におすすめ ✅ / 向かない ❌
- ✅ ○○な人
- ❌ ○○な人

[→ Amazonで価格を確認する](${amazonLink})

---

## 第4位・第5位（簡易レビュー）

**第4位：[商品名D]**
おすすめポイント：（50文字）
向かない人：（30文字）

**第5位：[商品名E]**
おすすめポイント：（50文字）
向かない人：（30文字）

---

## タイプ別おすすめ早見表

| あなたのタイプ | おすすめ商品 | 理由 |
|-------------|------------|------|
| 初心者・コスパ重視 | 商品B | ○○だから |
| 品質・効果重視 | 商品A | ○○だから |
| プレゼント用途 | 商品C | ○○だから |
| 予算○○円以内 | 商品D | ○○だから |

## よくある質問（FAQ）

**Q：${keyword}はどこで買うのが一番安いですか？**
A：（50文字で回答）

**Q：初心者でも使いやすい${keyword}はどれですか？**
A：（50文字で回答）

**Q：${keyword}の効果はいつから出ますか？**
A：（50文字で回答）

## 参考画像

![関連画像](https://picsum.photos/seed/42/800/400)

## まとめ：結局どれを買えばいいの？

（200文字以上。最後にもう一度1位商品を推す）

**迷ったらこれ！編集部おすすめ👇**

[→ 【1位】商品AをAmazonで今すぐ確認する](${amazonLink})
[→ 楽天市場で最安値を見る](${rakutenLink})

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
  if (!data.content || !data.content[0]) throw new Error('API error: ' + res.body.slice(0,200));
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  
  const keywords = getKeywords();
  console.log(\`Generating \${keywords.length} articles for \${SITE_NAME}...\`);

  for (const keyword of keywords) {
.slice(0, 30)) {
    try {
      console.log(`Generating: ${keyword}`);
      const content = await generateArticle(keyword);
      const filename = `${Date.now()}.mdx`;
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
