
function CopaWidgetFloat() {
  if (typeof window === "undefined") return null;
  return (
    <>
      <style>{`
        @keyframes cw-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes cw-blink{0%,86%,100%{transform:scaleY(1)}93%{transform:scaleY(.06)}}
        @keyframes cw-wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(10deg)}75%{transform:rotate(-8deg)}}
        #cw-bubble{position:fixed;right:88px;bottom:100px;z-index:10000;background:rgba(15,13,11,.93);border:1.5px solid rgba(192,132,252,.5);border-radius:14px 14px 0 14px;padding:10px 13px;font-size:12px;line-height:1.65;color:#fff;width:165px;font-family:-apple-system,sans-serif;display:none;pointer-events:auto}
        #cw-bubble a{color:#c084fc;font-weight:700;text-decoration:none}
        #cw-bubble::after{content:"";position:absolute;bottom:-7px;right:14px;border:7px solid transparent;border-top-color:rgba(15,13,11,.93)}
        #cw-wrap{position:fixed;right:14px;bottom:80px;z-index:9999;display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none}
        #cw-wrap svg{pointer-events:all;cursor:pointer;animation:cw-float 3s ease-in-out infinite;filter:drop-shadow(0 4px 14px rgba(136,88,200,.55))}
        #cw-badge{font-size:9px;font-weight:900;letter-spacing:1.5px;padding:2px 8px;border-radius:12px;color:white;background:#c084fc;pointer-events:none}
      `}</style>
      <div id="cw-bubble"></div>
      <div id="cw-wrap">
        <svg width="64" height="77" viewBox="0 0 80 96" onClick={() => {
          const msgs = [
            '今日の運勢、気になる？<br><a href="https://colorpass-web.vercel.app/fortune" target="_blank">→ COPA占いはこちら✨</a>',
            'COLORPASSに登録すると<br>占いが1週間無料！<br><a href="https://colorpass-web.vercel.app" target="_blank">→ 登録する💜</a>',
            'あなたのこと応援してるよ✨<br><a href="https://colorpass-web.vercel.app/fortune" target="_blank">→ 今日を占う🔮</a>',
          ];
          if (!window._cwIdx) window._cwIdx = 0;
          const b = document.getElementById("cw-bubble");
          if (b) { b.innerHTML = msgs[window._cwIdx++ % msgs.length]; b.style.display = "block"; clearTimeout(window._cwTimer); window._cwTimer = setTimeout(() => b.style.display = "none", 4500); }
        }}>
          <defs>
            <radialGradient id="cw-g" cx="42%" cy="32%" r="68%"><stop offset="0%" stopColor="#e8d8ff"/><stop offset="45%" stopColor="#c8a8f0"/><stop offset="100%" stopColor="#7c58c8"/></radialGradient>
            <linearGradient id="cw-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e85080"/><stop offset="50%" stopColor="#b87333"/><stop offset="100%" stopColor="#7c5ca8"/></linearGradient>
          </defs>
          <path d="M40 91 Q18 91 12 72 Q6 53 14 36 Q22 19 30 10 Q35 3 40 1 Q45 3 50 10 Q58 19 66 36 Q74 53 68 72 Q62 91 40 91Z" fill="url(#cw-g)"/>
          <ellipse cx="27" cy="38" rx="15" ry="22" fill="rgba(255,255,255,.18)" transform="rotate(-18,27,38)"/>
          <path d="M24 10 Q40 2 56 10" stroke="url(#cw-h)" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <ellipse cx="28" cy="40" rx="9" ry="9" fill="rgba(255,255,255,.95)"/>
          <ellipse cx="52" cy="40" rx="9" ry="9" fill="rgba(255,255,255,.95)"/>
          <circle cx="29" cy="40" r="6.5" fill="#111" style={{animation:"cw-blink 4s ease-in-out infinite",transformOrigin:"29px 40px"}}/>
          <circle cx="53" cy="40" r="6.5" fill="#111"/>
          <circle cx="31" cy="37" r="3" fill="#fff"/>
          <circle cx="55" cy="37" r="3" fill="#fff"/>
          <circle cx="18" cy="50" r="7" fill="rgba(232,80,128,.18)"/>
          <circle cx="62" cy="50" r="7" fill="rgba(232,80,128,.18)"/>
          <path d="M30 56 Q40 64 50 56" stroke="rgba(100,60,180,.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="16" cy="72" r="11" fill="url(#cw-g)" style={{animation:"cw-wiggle 2.5s ease-in-out infinite",transformOrigin:"16px 72px"}}/>
          <circle cx="64" cy="72" r="11" fill="url(#cw-g)"/>
          <circle cx="13" cy="67" r="4" fill="rgba(255,255,255,.28)"/>
        </svg>
        <div id="cw-badge">COPA ✨</div>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'K-Drama Beauty',
  description: '韓国ドラマ・韓国女優の美容法',
  twitter: { card: 'summary_large_image', site: '@beauty_note_j' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3460729726810386" crossOrigin="anonymous"></script>
      </head>
      <body>{children}<CopaWidgetFloat />
</body>
    </html>
  );
}
