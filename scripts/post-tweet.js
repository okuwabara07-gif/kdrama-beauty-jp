
const SITE_NAME = "韓国ドラマ美容";
const SITE_URL = "https://kdrama-beauty-jp.vercel.app";
const TAGS = "#韓国ドラマ #韓国コスメ #Kビューティー #美容";
const TOPIC = "韓国ドラマ";
const PORTAL_URL = "https://beauty-portal-jp.vercel.app";

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const blogDir = path.join(process.cwd(), 'content/blog');
let latestTitle = TOPIC + 'の最新情報';
try {
  const files = fs.readdirSync(blogDir).filter(f=>f.endsWith('.mdx')).sort().reverse();
  if(files.length > 0) {
    const content = fs.readFileSync(path.join(blogDir, files[0]), 'utf8');
    const m = content.match(/title: ["\'"]?([^"\'\n]+)["\'"]?/);
    if(m) latestTitle = m[1].slice(0, 40);
  }
} catch(e) {}

const dayOfWeek = new Date().getDay();
const hour = new Date().getHours();
const pattern = (dayOfWeek + hour) % 5;

let tweetText = '';

if(pattern === 0) {
  tweetText = `📝 ${TOPIC}について知っておくべき3つのこと

①正しい方法を知ると効果が変わる
②コスパ最強の商品がある
③継続することが最大のコツ

詳しくはこちら👇
${SITE_URL}

🎨 AIパーソナルカラー診断も無料！
${PORTAL_URL}

${TAGS}`;

} else if(pattern === 1) {
  tweetText = `みなさんはどれ？🙋‍♀️

A: 毎日ケアする
B: 週数回
C: 気が向いたら
D: まだ始めてない

${TOPIC}の正しいケア方法はこちら👇
${SITE_URL}

✨ 韓国コスメランキングもチェック
${PORTAL_URL}

${TAGS}`;

} else if(pattern === 2) {
  tweetText = `🔬 知らないと損する${TOPIC}の豆知識

「${latestTitle}」

これを知っているだけで差がつきます✨

詳しくはこちら👇
${SITE_URL}

💄 AIカラー診断 × 韓国コスメランキング
${PORTAL_URL}

${TAGS}`;

} else if(pattern === 3) {
  tweetText = `わかる人いる？😂

${TOPIC}あるある

・始めるまでが一番大変
・正しい方法を知らずにやってた
・やったら思ったより簡単だった

詳しくはこちら👇
${SITE_URL}

🌸 韓国コスメポータルはこちら
${PORTAL_URL}

${TAGS}`;

} else {
  tweetText = `✨ 新着記事

「${latestTitle}」

${TOPIC}についての役立つ情報をまとめました📝

👇詳しくはこちら
${SITE_URL}

🎨 AIパーソナルカラー診断も無料！
${PORTAL_URL}

${TAGS}`;
}

// X API投稿（OAuth 1.0a）
const CK = process.env.X_CONSUMER_KEY;
const CS = process.env.X_CONSUMER_SECRET;
const AT = process.env.X_ACCESS_TOKEN;
const ATS = process.env.X_ACCESS_TOKEN_SECRET;

const nonce = crypto.randomBytes(16).toString('hex');
const ts = Math.floor(Date.now()/1000).toString();
const params = {
  oauth_consumer_key: CK, oauth_nonce: nonce,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: ts, oauth_token: AT, oauth_version: '1.0'
};
const baseStr = 'POST&' + encodeURIComponent('https://api.twitter.com/2/tweets') + '&' +
  encodeURIComponent(Object.keys(params).sort().map(k=>k+'='+encodeURIComponent(params[k])).join('&'));
const sig = crypto.createHmac('sha1', encodeURIComponent(CS)+'&'+encodeURIComponent(ATS)).update(baseStr).digest('base64');
params.oauth_signature = sig;
const authHeader = 'OAuth ' + Object.keys(params).sort().map(k=>k+'="'+encodeURIComponent(params[k])+'"').join(', ');

const body = JSON.stringify({text: tweetText});
const req = https.request({
  hostname: 'api.twitter.com', path: '/2/tweets', method: 'POST',
  headers: {'Authorization': authHeader, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body)}
}, res => {
  let d=''; res.on('data',c=>d+=c);
  res.on('end',()=>{
    if(res.statusCode===201) console.log('✅ Posted with portal link');
    else console.log('⚠️ X Error:', res.statusCode, d.slice(0,100));
  });
});
req.on('error', e=>console.error('Error:', e.message));
req.write(body); req.end();
