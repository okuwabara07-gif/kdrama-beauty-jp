const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_ID = process.env.AMAZON_TRACKING_ID || '';
const RAKUTEN_ID = process.env.RAKUTEN_AFFILIATE_ID || '';

const KEYWORDS = [
  {kw:"\u97d3\u56fd\u30c9\u30e9\u30de \u4e3b\u4eba\u516c \u30e1\u30a4\u30af \u518d\u73fe",genre:"drama"},
  {kw:"\u611b\u306e\u4e0d\u6642\u7740 \u30bd\u30f3\u30fb\u30a4\u30a7\u30b8\u30f3 \u30b3\u30b9\u30e1",genre:"drama"},
  {kw:"\u30f4\u30a3\u30f3\u30c1\u30a7\u30f3\u30c4\u30a9 \u97d3\u56fd\u30b3\u30b9\u30e1",genre:"drama"},
  {kw:"\u97d3\u56fd\u5973\u512a \u30b9\u30ad\u30f3\u30b1\u30a2 \u79d8\u8a23",genre:"beauty"},
  {kw:"\u97d3\u56fd\u30c9\u30e9\u30de \u30d8\u30a2\u30b9\u30bf\u30a4\u30eb \u518d\u73fe",genre:"beauty"},
  {kw:"IU \u30e1\u30a4\u30af \u4f7f\u7528\u30b3\u30b9\u30e1",genre:"beauty"},
  {kw:"\u30d6\u30e9\u30c3\u30af\u30d4\u30f3\u30af \u30e1\u30a4\u30af \u3084\u308a\u65b9",genre:"beauty"},
  {kw:"\u97d3\u56fd\u30a2\u30a4\u30c9\u30eb \u30b9\u30ad\u30f3\u30b1\u30a2 \u30eb\u30fc\u30c6\u30a3\u30f3",genre:"beauty"},
  {kw:"\u97d3\u56fd\u30c9\u30e9\u30de \u30d5\u30a1\u30c3\u30b7\u30e7\u30f3 \u771f\u4f3c",genre:"drama"},
  {kw:"K-POP \u30a2\u30a4\u30c9\u30eb \u7f8e\u5bb9 \u79d8\u8a23",genre:"beauty"}
];

const SYS = `あなたは韓国コスメ・K-Beauty専門ライターです。読者目線で分かりやすく、SEOに強い記事を書きます。見出しはH2/H3を使ってください。文字数2000字以上。Markdown形式で出力。記事内でおすすめ商品を紹介する箇所には[AMAZON:商品名]と[RAKUTEN:商品名]を合計5箇所挿入してください。`;

function insertLinks(text) {
  text = text.replace(/\[AMAZON:([^\]]+)\]/g, (_, p) => `[🛒 ${p}をAmazonでチェック](https://www.amazon.co.jp/s?k=${encodeURIComponent(p)}&tag=${AMAZON_ID})`);
  text = text.replace(/\[RAKUTEN:([^\]]+)\]/g, (_, p) => `[🛍 ${p}を楽天でチェック](https://search.rakuten.co.jp/search/mall/${encodeURIComponent(p)}/?rafcid=${RAKUTEN_ID})`);
  return text;
}

function toSlug(kw) {
  return kw.replace(/[\s\u3000]+/g, '-').replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF-]/g, '') + '-' + Date.now();
}

async function generateArticle(kw, genre) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01'},
    body: JSON.stringify({model: 'claude-sonnet-4-20250514', max_tokens: 3000, system: SYS, messages: [{role: 'user', content: `ジャンル：${genre}\nキーワード：「${kw}」\n\nSEO記事をMarkdownで書いてください。`}]}),
  });
  const data = await res.json();
  return data.content?.map(c => c.text || '').join('') || '';
}

async function main() {
  const contentDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
  const targets = KEYWORDS.sort(() => Math.random() - 0.5).slice(0, 5);
  for (const { kw, genre } of targets) {
    console.log(`生成中: ${kw}`);
    try {
      let text = await generateArticle(kw, genre);
      text = insertLinks(text);
      const slug = toSlug(kw);
      const content = `---\ntitle: "${kw}"\ndate: "${new Date().toISOString().split('T')[0]}"\ngenre: "${genre}"\ntags: [${genre}]\n---\n\n${text}\n`;
      fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), content);
      console.log(`完了: ${slug}.mdx`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) { console.error(`エラー: ${kw}`, e.message); }
  }
  console.log('全記事生成完了！');
}
main();
