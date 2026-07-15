"use client";

import { useMemo, useState } from "react";

const cafes = [
  { name: "ねこの間 代官山", area: "東京", mood: "静か", price: "¥1,600〜", cats: "保護猫 14匹", note: "読書席と小さな縁側。ひとりで過ごしやすい。", tags: ["おひとり歓迎", "撮影OK"], image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85" },
  { name: "mellow cat 吉祥寺", area: "東京", mood: "交流", price: "¥1,400〜", cats: "猫 18匹", note: "スタッフの距離感が心地よく、初めてでも安心。", tags: ["初心者向け", "夜20時まで"], image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=85" },
  { name: "猫灯り 鎌倉", area: "神奈川", mood: "静か", price: "¥1,800〜", cats: "保護猫 11匹", note: "古民家の光と影。写真をゆっくり撮りたい日に。", tags: ["撮影OK", "予約優先"], image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85" },
];

const items = [
  { icon: "◌", title: "暗い室内でも、やさしく撮れる", name: "小型ミラーレス入門セット", price: "参考 ¥89,800", tag: "撮影したい人へ" },
  { icon: "⌁", title: "猫の毛を気にせず、余韻を持ち帰る", name: "携帯クリーナー＆ケアセット", price: "参考 ¥3,280", tag: "帰宅後のケア" },
  { icon: "▤", title: "会えない夜に、記録を一冊に", name: "写真日記フォトブック", price: "参考 ¥2,980〜", tag: "思い出を残す" },
];

export default function Home() {
  const [area, setArea] = useState("すべて");
  const [quiet, setQuiet] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [quiz, setQuiz] = useState(false);

  const shown = useMemo(() => cafes.filter((c) => (area === "すべて" || c.area === area) && (!quiet || c.mood === "静か")), [area, quiet]);
  const toggleSave = (name: string) => setSaved((s) => s.includes(name) ? s.filter((x) => x !== name) : [...s, name]);

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="ねこ日和 ホーム"><span>ね</span>こ日和</a>
        <nav aria-label="メインナビゲーション">
          <a href="#find">猫カフェを探す</a><a href="#guide">はじめてガイド</a><a href="#journal">読みもの</a>
        </nav>
        <a className="saved" href="#find">♡ 保存したお店 <b>{saved.length}</b></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A QUIET PLACE WITH CATS</p>
          <h1>今日は、<br /><em>猫に会いにいこう。</em></h1>
          <p className="lead">ひとりの時間に、あたたかな気配を。<br />あなたの過ごし方に合う猫カフェを、丁寧に選びました。</p>
          <div className="hero-actions"><a className="button primary" href="#find">近くの猫カフェを探す <span>→</span></a><button className="text-button" onClick={() => setQuiz(true)}>3つの質問で相性診断</button></div>
          <div className="trust"><span>掲載店は編集部が確認</span><span>ひとり客目線でレビュー</span><span>広告も正直に表示</span></div>
        </div>
        <div className="hero-image"><div className="photo-label"><small>EDITOR&apos;S NOTE 012</small><strong>言葉のいらない午後</strong><span>at 猫灯り 鎌倉</span></div></div>
      </section>

      <section className="search-section" id="find">
        <div className="section-heading"><div><p className="eyebrow">FIND YOUR PLACE</p><h2>あなたに合う、猫のいる場所。</h2></div><p>混雑、静けさ、猫との距離。<br />実際に訪れてわかったことを載せています。</p></div>
        <div className="filters" aria-label="店舗絞り込み">
          <div>{["すべて", "東京", "神奈川"].map((x) => <button key={x} className={area === x ? "active" : ""} onClick={() => setArea(x)}>{x}</button>)}</div>
          <label><input type="checkbox" checked={quiet} onChange={(e) => setQuiet(e.target.checked)} /> 静かに過ごせる</label>
        </div>
        <div className="cafe-grid">
          {shown.map((c, i) => <article className="cafe-card" key={c.name}>
            <div className="card-image" style={{backgroundImage: `url(${c.image})`}}><span className="rank">0{i + 1}</span><button aria-label={`${c.name}を保存`} onClick={() => toggleSave(c.name)} className={saved.includes(c.name) ? "heart on" : "heart"}>{saved.includes(c.name) ? "♥" : "♡"}</button></div>
            <div className="card-body"><div className="meta">{c.area} ・ {c.cats}</div><h3>{c.name}</h3><p>{c.note}</p><div className="tags">{c.tags.map(t => <span key={t}>{t}</span>)}</div><div className="card-foot"><strong>{c.price}</strong><a href="#guide">詳しく見る →</a></div></div>
          </article>)}
        </div>
      </section>

      <section className="guide" id="guide">
        <div className="guide-photo"><span>猫に選ばれる人は、<br />待つのが上手。</span></div>
        <div className="guide-copy"><p className="eyebrow">FIRST VISIT GUIDE</p><h2>はじめての日も、<br />心地よく。</h2><p>猫に好かれようとしなくて大丈夫。同じ部屋で、それぞれの時間を過ごす。その距離がいちばん自然です。</p>
          <ol><li><b>01</b><span><strong>香りは控えめに</strong>香水や強い柔軟剤を避けると、猫も安心。</span></li><li><b>02</b><span><strong>フラッシュは使わない</strong>静音モードと明るいレンズが味方です。</span></li><li><b>03</b><span><strong>追わずに、待つ</strong>近くに来てくれた時間を楽しみましょう。</span></li></ol>
          <a className="button ink" href="#journal">はじめてガイドを読む →</a></div>
      </section>

      <section className="shop" id="journal">
        <div className="section-heading"><div><p className="eyebrow">TAKE THE FEELING HOME</p><h2>余韻を、日常へ。</h2></div><p>通い続けてわかった、本当に役立つものだけ。<br /><small>※商品リンクにはアフィリエイト広告が含まれます。</small></p></div>
        <div className="item-grid">{items.map((item) => <article className="item" key={item.name}><div className="item-art">{item.icon}</div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.name}</p><div><strong>{item.price}</strong><button aria-label={`${item.name}を見る`}>→</button></div></article>)}</div>
      </section>

      <section className="story"><p>「また会いたい」が、<br />明日の予定になった。</p><span>このサイトは、犬との別れをきっかけに<br />猫カフェへ通い始めた一人の記録から生まれました。</span></section>
      <footer><div className="brand"><span>ね</span>こ日和</div><p>猫と人、どちらにもやさしい時間を。</p><div><a href="#find">猫カフェを探す</a><a href="#guide">運営ポリシー</a><a href="#journal">広告掲載について</a></div><small>© 2026 NEKOBIYORI. Photos are for demonstration.</small></footer>

      {quiz && <div className="modal-backdrop" role="presentation" onClick={() => setQuiz(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setQuiz(false)} aria-label="閉じる">×</button><p className="eyebrow">YOUR CAT CAFE TYPE</p><h2 id="quiz-title">あなたには「静かな観察席」</h2><p>猫を追わず、写真や読書と一緒にゆっくり過ごせるお店がおすすめです。</p><button className="button primary" onClick={() => { setQuiet(true); setQuiz(false); document.querySelector("#find")?.scrollIntoView({behavior:"smooth"}); }}>おすすめを見る →</button></section></div>}
    </main>
  );
}
