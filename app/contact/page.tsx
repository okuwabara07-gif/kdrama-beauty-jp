export default function ContactPage() {
  return (
    <main style={{maxWidth:'600px',margin:'0 auto',padding:'2rem 1rem'}}>
      <h1>お問い合わせ</h1>
      <p>当サイトへのお問い合わせは以下のフォームよりお送りください。</p>
      <p>※ご返信まで数日かかる場合があります。</p>
      <form
        action="https://formspree.io/f/xdoqgpvk"
        method="POST"
        style={{display:'flex',flexDirection:'column',gap:'1rem',marginTop:'1.5rem'}}
      >
        <div>
          <label style={{display:'block',marginBottom:'4px',fontWeight:'500'}}>お名前 <span style={{color:'red'}}>*</span></label>
          <input type="text" name="name" required
            style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'1rem'}}
            placeholder="山田 太郎" />
        </div>
        <div>
          <label style={{display:'block',marginBottom:'4px',fontWeight:'500'}}>メールアドレス <span style={{color:'red'}}>*</span></label>
          <input type="email" name="email" required
            style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'1rem'}}
            placeholder="example@email.com" />
        </div>
        <div>
          <label style={{display:'block',marginBottom:'4px',fontWeight:'500'}}>お問い合わせ内容 <span style={{color:'red'}}>*</span></label>
          <textarea name="message" required rows={6}
            style={{width:'100%',padding:'8px 12px',border:'1px solid #ddd',borderRadius:'6px',fontSize:'1rem',resize:'vertical'}}
            placeholder="お問い合わせ内容をご入力ください" />
        </div>
        <button type="submit"
          style={{padding:'12px',background:'#333',color:'white',border:'none',borderRadius:'6px',fontSize:'1rem',cursor:'pointer',fontWeight:'500'}}>
          送信する
        </button>
      </form>
    </main>
  )
}
