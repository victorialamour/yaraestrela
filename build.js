// Gera index.html da Yara a partir do design da landing da Nina (mesmo CSS e estrutura).
const fs = require('fs');
const base = 'C:/Users/victo/OneDrive/Área de Trabalho/';
const src = fs.readFileSync(base + 'nina-costa/index.html', 'utf8').split('\n');
let css = src.slice(45, 472).join('\n');      // <style> ... </style>
const jsCfg = src.slice(809, 909).join('\n');  // <script> + config + comportamentos (sem dicionário EN)
const waIcon = src[806].trim();

const WA = 'https://wa.me/5511970803436?text=Oi%20Yara!%20Vi%20seu%20site%20e%20quero%20consultar%20a%20disponibilidade%20da%20minha%20data%20de%20casamento.';
const wa = (label, cls = 'btn') => `<a${cls ? ` class="${cls}"` : ''} href="${WA}" target="_blank" rel="noopener" data-wa>${label}</a>`;

css = css.replace('Nina Costa: 5 passos e 6 serviços', 'Yara Estrela: passos e serviços');

const extra = `
  /* Rótulo de foto pendente: some quando a imagem existe */
  .ph-l{position:absolute;left:10px;bottom:10px;z-index:1;font-size:11px;line-height:1.35;color:var(--black);background:rgba(255,255,255,.85);padding:4px 8px;width:fit-content;max-width:calc(100% - 20px)}
  img + .ph-l{display:none}
  .svc-card,.pf__img,.split__half{background:linear-gradient(160deg,#e2e2e2 0%,#c4c4c4 55%,#a2a2a2 100%)}
  .svc-card .ph-l{top:10px;bottom:auto}
  /* vídeo do topo só aparece depois de posicionado no trecho maquiado (a foto fica de poster) */
  .split__half--noiva{background:#222 url(fotos/hero-noiva-perfil.webp) 50% 30%/cover no-repeat}
  .split__half video{opacity:0;transition:opacity .5s}
  .split__half video.is-ready{opacity:1}
  /* A proposta: colagem de fotos sem moldura + selo, texto à esquerda */
  .prop{padding:70px 0 40px}
  .prop__grid{display:grid;gap:56px;align-items:center}
  .prop__col{position:relative;width:100%;max-width:520px;margin:0 auto;aspect-ratio:1/1.28}
  .prop__col .ph{position:absolute}
  .prop__a{left:0;top:0;width:58%;aspect-ratio:3/4}
  .prop__b{left:52%;top:22%;width:46%;aspect-ratio:4/5}
  .prop__c{left:14%;top:55%;width:38%;aspect-ratio:4/5}
  .prop .prop__seal{right:auto;bottom:auto;left:47%;top:15.5%;width:78px;height:78px;z-index:4}
  .prop__title{font-size:clamp(2.2rem,7vw,3.6rem)}
  .prop__txt p{max-width:34em}
  .prop__actions{display:flex;flex-wrap:wrap;align-items:center;gap:18px 30px;margin-top:26px}
  @media (min-width:900px){
    .prop{padding:110px 0 70px}
    .prop__grid{grid-template-columns:1fr 1fr;gap:90px}
    .prop__col{max-width:none}
    .prop .prop__seal{width:100px;height:100px}
  }
  /* Galeria de noivas: colunas em movimento */
  .gallery{background:var(--white)}
  .gal-cols{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;height:clamp(440px,62vw,760px);overflow:hidden;padding:0 var(--gutter);max-width:1240px;margin:0 auto;
    -webkit-mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent)}
  .gal-c{display:flex;flex-direction:column;gap:12px;animation:galup 70s linear infinite}
  .gal-c:nth-child(even){animation-direction:reverse;animation-duration:84s}
  .gal-c:nth-child(3){animation-duration:62s}
  .gal-dup{display:contents}
  .gal-i{display:block;width:100%;flex:none;padding:0;border:0;background:#e6e6e6;position:relative;overflow:hidden;cursor:zoom-in}
  .gal-i img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease)}
  .gal-i:hover img{transform:scale(1.04)}
  .gal-cols:hover .gal-c,.gal-cols:focus-within .gal-c{animation-play-state:paused}
  @keyframes galup{to{transform:translateY(calc(-50% - 6px))}}
  @media (max-width:699px){ .gal-cols{grid-template-columns:repeat(3,1fr);gap:8px;height:clamp(420px,120vw,620px)} .gal-c{gap:8px} .gal-c:nth-child(n+4){display:none} @keyframes galup{to{transform:translateY(calc(-50% - 4px))}} }
  @media (prefers-reduced-motion:reduce){ .gal-c{animation:none} .gal-dup{display:none} .gal-cols{height:auto;-webkit-mask-image:none;mask-image:none} }
  .lb{position:fixed;inset:0;z-index:100;background:rgba(17,17,17,.94);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out}
  .lb[hidden]{display:none}
  .lb img{max-width:92vw;max-height:90vh;object-fit:contain}
  .lb__x{position:absolute;top:14px;right:18px;background:none;border:0;color:#fff;font-size:36px;line-height:1;cursor:pointer}
  /* Portfólio: grade que troca no lugar + faixa pequena */
  .sw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:940px;margin:0 auto}
  .swc{position:relative;aspect-ratio:4/5;overflow:hidden;background:#ececec;border:0;padding:0;cursor:zoom-in}
  .swc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.4s ease}
  .swc img.on{opacity:1}
  .sw-strip{margin:46px calc(50% - 50vw) 0;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
  .sw-tk{display:flex;gap:10px;width:max-content;animation:swmq 110s linear infinite}
  .sws{flex:none;width:clamp(84px,8.5vw,118px);aspect-ratio:3/4;position:relative;overflow:hidden;background:#ececec}
  .sws img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  @keyframes swmq{to{transform:translateX(calc(-50% - 5px))}}
  @media (max-width:699px){ .sw-grid{gap:8px} .sw-strip{display:none} }
  @media (prefers-reduced-motion:reduce){ .sw-tk{animation:none} .sw-strip{display:none} }
  /* O método: acordeão */
  .metodo{background:var(--off)}
  .metodo__grid{display:grid;gap:44px}
  .metodo__head .title{max-width:13em}
  .mtd__bdg{display:inline-flex;align-items:center;gap:10px;margin-top:10px;border:1px solid var(--line);padding:9px 14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--gray);background:var(--white)}
  .mtd__bdg svg{width:12px;height:12px;flex:none;stroke:var(--black);fill:none;stroke-width:1}
  .mtd{border-bottom:1px solid var(--line)}
  .mtd__it{border-top:1px solid var(--line)}
  .mtd__hh{display:flex;align-items:baseline;gap:18px;width:100%;padding:24px 0;background:none;border:0;cursor:pointer;text-align:left;color:var(--black)}
  .mtd__n{font-family:var(--serif);font-style:italic;font-size:1.05rem;color:var(--gray);min-width:26px}
  .mtd__t{flex:1;font-family:var(--serif);font-size:1.5rem;line-height:1.2}
  .mtd__pl{font-family:var(--serif);font-size:1.7rem;line-height:1;color:var(--gray);transition:transform .4s var(--ease)}
  .mtd__it.on .mtd__pl{transform:rotate(45deg)}
  .mtd__hh:hover .mtd__t{opacity:.65}
  .mtd__bd{max-height:0;overflow:hidden;transition:max-height .6s var(--ease)}
  .mtd__bd p{margin:0;padding:0 34px 28px 44px;color:var(--text-soft);max-width:38em}
  @media (min-width:900px){ .metodo__grid{grid-template-columns:.85fr 1.35fr;gap:90px;align-items:start} .mtd__t{font-size:1.75rem} }
  @media (prefers-reduced-motion:reduce){ .mtd__bd{transition:none} }
  /* Amostras de maquiagem da Yara como decoração (no lugar das da Nina) */
  .deco--pincel,.deco--espatula{mix-blend-mode:multiply;opacity:.9}
  .deco--pincel{width:300px;top:-70px;left:-25px;transform:rotate(0deg)}
  .deco--espatula{width:200px;bottom:-80px;right:-20px;left:auto;top:auto;transform:rotate(150deg)}
  @media (min-width:1024px){ .deco--pincel{width:480px;top:-120px;left:-20px} .deco--espatula{width:330px;bottom:-130px;right:2%} }
  /* Como funciona: linha do tempo (horizontal no computador, vertical no celular) */
  .how .how__head{text-align:left}
  .how .how__cta{text-align:left}
  .how .steps.steps--5{position:relative;grid-template-columns:1fr;gap:0;padding-left:30px;margin-bottom:38px}
  .how .steps.steps--5::before{content:"";position:absolute;left:6px;top:8px;bottom:30px;width:1px;background:rgba(17,17,17,.35)}
  .how .steps--5 .step{position:relative;text-align:left;padding:0 0 30px 0}
  .how .steps--5 .step::before{content:"";position:absolute;left:-30px;top:5px;width:13px;height:13px;border-radius:50%;background:var(--off);border:1px solid var(--black)}
  .how .steps--5 .step__num{font-size:1.3rem;font-style:italic;margin-bottom:4px;color:var(--gray)}
  .how .steps--5 .step h3{font-size:1.4rem}
  .how .steps--5 .step p{margin:0;max-width:24em}
  @media (min-width:1100px){
    .how .steps.steps--5{grid-template-columns:repeat(5,1fr);gap:26px;padding-left:0}
    .how .steps.steps--5::before{left:0;right:0;top:6px;bottom:auto;width:auto;height:1px}
    .how .steps--5 .step{padding:36px 0 0 0}
    .how .steps--5 .step::before{left:0;top:0}
  }
  /* Depoimento: faixa centralizada com amostra de blush */
  .depo{position:relative;overflow:hidden;text-align:center;padding:84px 0;background:var(--white)}
  .depo__in{position:relative;z-index:1}
  .depo__q{margin:0 auto;font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.45rem,3.2vw,2.2rem);line-height:1.38;color:var(--black);max-width:27em}
  .depo__who{margin:26px 0 0;font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--gray)}
  .depo__sw{position:absolute;width:210px;right:-90px;top:50%;transform:translateY(-50%) rotate(20deg);mix-blend-mode:multiply;opacity:.35;pointer-events:none;z-index:0}
  @media (min-width:900px){ .depo{padding:120px 0} .depo__sw{width:clamp(300px,30vw,400px);right:-60px;opacity:.95} }
  /* botão na primeira tela */
  .hero__cta{margin-top:30px;text-shadow:none;backdrop-filter:blur(2px)}
  @media (max-width:699px){ .hero__cta{margin-top:24px;padding:14px 26px} }
  /* celular: amostras menores e mais para fora, sem cobrir títulos */
  @media (max-width:699px){ .deco--pincel{width:150px;top:-26px;left:4px} .deco--blush1{width:190px;top:-96px;right:-95px} .deco--blush2{width:230px;bottom:-120px} }
  /* Estrela: constelação no logo e brilho nos detalhes */
  .brands__list li::after{width:10px;height:10px;border-radius:0;margin-top:-5px;right:-5px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M10 1C10.6 7 13 9.4 19 10 13 10.6 10.6 13 10 19 9.4 13 7 10.6 1 10 7 9.4 9.4 7 10 1Z' fill='%23111111'/%3E%3C/svg%3E") center/contain no-repeat}
  .how .steps--5 .step::before{width:15px;height:15px;border:0;border-radius:0;background:var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M10 1C10.6 7 13 9.4 19 10 13 10.6 10.6 13 10 19 9.4 13 7 10.6 1 10 7 9.4 9.4 7 10 1Z' fill='%23111111'/%3E%3C/svg%3E") center/contain no-repeat}
  .how .steps--5 .step:last-child::before{width:23px;height:23px}
  .how .steps.steps--5::before{background:rgba(17,17,17,.3)}
  .how .steps--5 .step::before{left:-31px;top:4px}
  .how .steps--5 .step:last-child::before{left:-35px;top:0}
  @media (min-width:1100px){ .how .steps--5 .step::before{left:0;top:-1px} .how .steps--5 .step:last-child::before{left:0;top:-5px} }
  .mtd__pl svg{width:18px;height:18px;display:block;fill:currentColor}
  .mtd__pl{line-height:0}
  .star-div{display:flex;align-items:center;gap:18px;max-width:360px;margin:0 auto;padding:6px 24px}
  .star-div::before,.star-div::after{content:"";flex:1;height:1px;background:var(--line)}
  .star-div svg{width:14px;height:14px;fill:var(--black);flex:none}
  .hero .hero__mono{width:62px;height:82px;margin:0 auto 10px}
  @media (max-width:699px){ .hero .hero__mono{width:52px;height:70px} }
  /* Chamado final: cartão de convite */
  .convite{background:var(--off);padding:92px 0 84px}
  .convite__card{position:relative;max-width:660px;margin:0 auto;background:var(--white);border:1px solid var(--line);padding:50px 26px 56px;text-align:center}
  .convite__card::before{content:"";position:absolute;inset:8px;border:1px solid var(--line);pointer-events:none}
  .convite .convite__mono{display:block;margin:0 auto 14px;width:50px;height:66px;color:var(--black)}
  .convite h2{font-size:clamp(2rem,6.4vw,2.9rem);font-weight:300;line-height:1.12;margin:0 0 16px}
  .convite h2 em{font-style:italic}
  .convite__p{max-width:30em;margin:0 auto 4px;color:var(--text-soft)}
  .convite .signature{margin:14px 0 26px}
  @media (max-width:520px){ .convite__card{padding:42px 18px 44px} }
  /* títulos dos cards no celular: quebram em duas linhas em vez de cortar */
  @media (max-width:699px){ .svc-card h3{white-space:normal;font-size:.98rem;line-height:1.2;letter-spacing:.06em;margin-bottom:10px} .svc-card__t{padding:60px 12px 14px} }
  .steps--3{gap:40px}
  @media (min-width:700px){ .steps--3{grid-template-columns:repeat(3,1fr)} }
  .steps--3 .step p{max-width:26em}
`;
css = css.replace('</style>', extra + '</style>');

// Remove do CSS as regras de componentes que não existem mais no site (herdadas do projeto original)
const DEAD = /(^|[\s>+~,(])\.(opening|soft|final|testi|testimonials|team|lang|vph|sticker|mtd|metodo|gal-|gallery__head p|steps--3|nav|burger|drawer|pf-grid|pf--big|pf__img|pf:|pf |deco--blush2|svc-card__link|brand__text|brand__sub)/;
const DEAD_EXACT = /^\.pf\s*$/;
function stripDead(css) {
  let out = '', i = 0;
  while (i < css.length) {
    const ob = css.indexOf('{', i);
    if (ob < 0) { out += css.slice(i); break; }
    const head = css.slice(i, ob);
    let depth = 1, j = ob + 1;
    while (j < css.length && depth) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
    const body = css.slice(ob + 1, j - 1);
    const sel = head.trim();
    if (/^@media/.test(sel)) {
      const inner = stripDead(body).trim();
      if (inner) out += head + '{' + inner + '}\n';
    } else if (/^@keyframes/.test(sel) || /^@font-face/.test(sel)) {
      out += head + '{' + body + '}\n';
    } else {
      const sels = sel.split(',').map(x => x.trim()).filter(Boolean);
      const keep = sels.filter(x => !(DEAD.test(x) || DEAD_EXACT.test(x)));
      if (keep.length) out += (keep.length === sels.length ? head : keep.join(',')) + '{' + body + '}\n';
    }
    i = j;
  }
  return out;
}

css = css.replace(/(<style>)([\s\S]*?)(<\/style>)/, (m, a, b, c) => a + '\n' + stripDead(b) + c);

// Recorte com zoom centrado no rosto: (fx,fy) = ponto do rosto na foto (0-1), z = zoom,
// a = largura/altura da foto, b = largura/altura da caixa, py = object-position vertical (0-1)
const zoomAt = (fx, fy, z, a, b, py = 0.4) => {
  const hb = 1 / b;
  let posx, posy;
  if (a <= b) { const hi = 1 / a; posx = fx; posy = fy * hi - (hi - hb) * py; }
  else { const wi = a * hb; posx = fx * wi - (wi - 1) * 0.5; posy = fy * hb; }
  const clamp = (v) => Math.max((1 - z) * 100, Math.min(0, v));
  const tx = clamp((0.5 - z * posx) * 100), ty = clamp((hb / 2 - z * posy) / hb * 100);
  return `object-position:50% ${py * 100}%;transform-origin:0 0;transform:translate(${tx.toFixed(1)}%,${ty.toFixed(1)}%) scale(${z})`;
};
const ph = (file, desc, alt, pos = '50% 30%', style = '') =>
  `<img src="fotos/${file}" alt="${alt}" loading="lazy" style="${style || `object-position:${pos}`}" onerror="this.remove()"><span class="ph-l">${file} — ${desc}</span>`;
// onerror remove => sem foto, o rótulo (irmão seguinte) deixa de ser escondido por "img + .ph-l"

const card = (i, file, t, p, desc, pos) => `      <article class="svc-card reveal${['', ' d1', ' d2'][i % 3]}">
        ${ph(file, desc, desc, pos)}
        <div class="svc-card__t"><h3>${t}</h3><p>${p}</p></div>
      </article>`;
const pf = (cls, file, cap, desc) => `<figure class="pf${cls}"><div class="pf__img">${ph(file, desc, desc)}</div><figcaption>${cap}</figcaption></figure>`;
const faq = (q, a) => `      <details>\n        <summary>${q}</summary>\n        <p>${a}</p>\n      </details>`;

const cards = [
  ['servico-teste.webp', 'Teste prévio', 'Testamos a maquiagem e o penteado antes do casamento.', 'Noiva sorrindo enquanto recebe blush com pincel'],
  ['servico-orientacao.webp', 'Orientação', 'Te ajudo a combinar tudo com o vestido, o horário e o estilo da festa.', 'Noiva de cabelo solto e vestido de cetim, sentada em cadeira dourada', '50% 62%'],
  ['servico-dia.webp', 'Maquiagem e penteado', 'No dia, eu faço os dois, um combinando com o outro.', 'Noiva de cabelo ruivo preso, com brinco de pérola'],
  ['servico-cilios.webp', 'Cílios e spa', 'Cílios e um spa de olhos e lábios antes da cerimônia.', 'Noiva de perfil, com cílios e pele iluminada'],
  ['servico-blindagem.webp', 'Blindagem', 'Aplico blindagem para a maquiagem durar a festa toda.', 'Noiva de coque baixo e maquiagem em tons quentes'],
  ['servico-sala-noivos.webp', 'Sala dos noivos', 'Fico com você para retocar, trocar o penteado e tirar o véu.', 'Noiva de robe de renda e cabelo em ondas'],
].map((c, i) => card(i, c[0], c[1], c[2], c[3], c[4])).join('\n');

const bl = ['Bridal Guide Constance Zahn', '7 anos dedicados a noivas', 'Embaixadora e Visagista Master · método C. Juillard', 'Maquiagem e penteado', 'Atendimento em todo o Brasil']
  .map(x => `<li>${x}</li>`).join('');

// Hero em loop só no trecho maquiado: o vídeo volta para data-start em vez de 0
const jsCfg2 = jsCfg
  .replace('v.loop = true;', 'v.loop = !v.dataset.start;')
  .replace(/v\.currentTime = 0/g, 'v.currentTime = +(v.dataset.start || 0)')
  .replace("v.addEventListener('ended'", "const prep = () => { const s = +(v.dataset.start || 0); if (v.readyState >= 1 && v.currentTime < s - 0.05) { try { v.currentTime = s; } catch (e) {} } };\n    v.addEventListener('loadedmetadata', prep); v.addEventListener('playing', prep); prep();\n    const ready = () => { if (v.readyState >= 3 && v.currentTime >= +(v.dataset.start || 0) - 0.05) v.classList.add('is-ready'); };\n    ['seeked', 'playing', 'timeupdate'].forEach(ev => v.addEventListener(ev, ready));\n    // loop por código (o nativo volta ao 0, onde a noiva ainda está sem make): reinicia no data-start antes do fim\n    const tick = () => { if (v.duration && v.currentTime > v.duration - 0.15) reiniciar(v); requestAnimationFrame(tick); };\n    tick();\n    v.addEventListener('ended'");

// Galeria de noivas: colunas que sobem e descem (loop contínuo); a segunda cópia é só para o loop
const GAL = {
  'noiva-01': ['9/16', '50% 40%', 'Yara maquiando uma noiva junto à janela, em luz natural'],
  'noiva-02': ['9/16', '50% 30%', 'Noiva de coque baixo e vestido de cetim, olhando por cima do ombro'],
  'noiva-03': ['3/4', '50% 30%', 'Noiva de coque alto e echarpe de tule branca'],
  'noiva-04': ['9/16', '50% 25%', 'Noiva de véu de renda, cabelo solto em ondas e pele luminosa'],
  'noiva-05': ['4/5', '50% 30%', 'Noiva de cabelo semipreso e brinco de pérola, com as mãos no rosto'],
  'noiva-06': ['9/16', '50% 40%', 'Coque baixo com grampos de flores, visto de costas'],
  'noiva-07': ['3/4', '50% 30%', 'Noiva de olhos fechados e brinco de pérola, com sombra dourada'],
  'noiva-08': ['9/16', '50% 40%', 'Coque desfeito com mechas soltas, visto de costas'],
  'novas-01': ['9/16', '50% 30%', 'Noiva sentada numa cadeira de madeira, de coque desfeito e vestido de cetim, com luz de janela'],
  'novas-02': ['9/16', '50% 40%', 'Penteado semipreso de costas, com ondas longas castanhas e robe branco'],
  'novas-03': ['9/16', '50% 28%', 'Noiva sorrindo, de cabelo em ondas, brinco de pérola e manga de renda bordada'],
  'novas-04': ['9/16', '50% 38%', 'Noiva de coque liso e brinco de pérola, com laço no vestido'],
  'novas-05': ['3/4', '50% 30%', 'Noiva com a mão no rosto, brinco de brilhantes e luz quente'],
  'novas-06': ['9/16', '50% 40%', 'Coque dourado enrolado, visto de costas'],
  'novas-07': ['3/4', '50% 35%', 'Noiva de véu segurando um copo-de-leite diante do rosto'],
  'servico-teste': ['9/16', '50% 30%', 'Noiva sorrindo enquanto recebe blush com pincel'],
  'servico-orientacao': ['9/16', '50% 40%', 'Noiva de cabelo solto em ondas e vestido de cetim, sentada em cadeira dourada'],
  'servico-dia': ['9/16', '50% 30%', 'Noiva de cabelo ruivo preso, com brinco de pérola e luz suave'],
  'servico-cilios': ['24/25', '50% 40%', 'Noiva de perfil, com cílios, pele iluminada e brinco de pérola'],
  'servico-blindagem': ['9/16', '50% 30%', 'Noiva de coque baixo com fios soltos e maquiagem quente'],
  'servico-sala-noivos': ['9/16', '50% 30%', 'Noiva de robe de renda, cabelo em ondas e pele luminosa'],
  'hero-noiva-perfil': ['9/16', '50% 30%', 'Noiva de cabelo solto em ondas e vestido de cetim marfim'],
};
// 5 colunas x 3 fotos, todas diferentes entre si
const GAL_COLS = [
  ['noiva-01', 'servico-dia', 'noiva-06'],
  ['noiva-04', 'servico-teste', 'noiva-03'],
  ['noiva-07', 'hero-noiva-perfil', 'servico-sala-noivos'],
  ['noiva-02', 'servico-blindagem', 'noiva-08'],
  ['noiva-05', 'servico-cilios', 'servico-orientacao'],
];
const galCols = () => GAL_COLS.map(col => {
  const card = (k, dup) => { const g = GAL[k]; return `<button type="button" class="gal-i" style="aspect-ratio:${g[0]}" ${dup ? 'tabindex="-1" aria-hidden="true"' : ''} data-full="fotos/${k}.webp" data-alt="${g[2]}"><img src="fotos/${k}.webp" alt="${dup ? '' : g[2]}" loading="lazy" style="object-position:${g[1]}"></button>`; };
  return `<div class="gal-c">${col.map(k => card(k, false)).join('')}<span class="gal-dup" aria-hidden="true">${col.map(k => card(k, true)).join('')}</span></div>`;
}).join('');

// Portfólio: grade 3x2 em que as fotos trocam no lugar + faixa pequena deslizando
const SW_POOL = ['noiva-04', 'novas-03', 'noiva-02', 'novas-05', 'noiva-05', 'novas-07', 'novas-04', 'noiva-07', 'novas-01', 'noiva-03', 'novas-02', 'noiva-06'];
const swGrid = () => [0, 1, 2, 3, 4, 5].map(i => '<button type="button" class="swc" aria-label="Ampliar foto de noiva">' + SW_POOL.map((k, j) => '<img class="' + (j === i ? 'on' : '') + '" src="fotos/' + k + '.webp" alt="" loading="' + (j === i ? 'eager' : 'lazy') + '" style="object-position:' + GAL[k][1] + '">').join('') + '</button>').join('');
const swStrip = () => { const ks = Object.keys(GAL).filter(k => /^(noiva|novas)-/.test(k)); const one = ks.map(k => '<span class="sws"><img src="fotos/' + k + '.webp" alt="" loading="lazy" style="object-position:' + GAL[k][1] + '"></span>').join(''); return one + one; };

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- PRÉVIA para a cliente: remover a linha abaixo ao publicar no domínio definitivo -->
<meta name="robots" content="noindex, nofollow">
<title>Yara Estrela | Maquiagem e Penteado para Noivas em São Paulo</title>
<meta name="description" content="Maquiadora de noivas em São Paulo. Maquiagem e penteado elegantes e atemporais por Yara Estrela, do Bridal Guide Constance Zahn. Atendimento em todo o Brasil.">
<!-- CONFIRMAR: trocar pelo domínio definitivo -->
<link rel="canonical" href="https://victorialamour.github.io/yaraestrela/">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23111111'/%3E%3Cg transform='translate(9.6 9.6) scale(1.6)' fill='%23ffffff'%3E%3Cpath d='M11 3C11.6 10 14 12.4 21 13 14 13.6 11.6 16 11 23 10.4 16 8 13.6 1 13 8 12.4 10.4 10 11 3Z'/%3E%3Cpath d='M22 1.5C22.2 4 23 4.8 25.5 5 23 5.2 22.2 6 22 8.5 21.8 6 21 5.2 18.5 5 21 4.8 21.8 4 22 1.5Z'/%3E%3Cpath d='M21.5 17.5C21.8 20.4 22.8 21.4 25.7 21.7 22.8 22 21.8 23 21.5 25.9 21.2 23 20.2 22 17.3 21.7 20.2 21.4 21.2 20.4 21.5 17.5Z'/%3E%3C/g%3E%3C/svg%3E">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Yara Estrela">
<meta property="og:title" content="Yara Estrela | Maquiagem e Penteado para Noivas em São Paulo">
<meta property="og:description" content="A elegância de uma beleza que não esconde a noiva.">
<meta property="og:url" content="https://victorialamour.github.io/yaraestrela/">
<meta property="og:image" content="https://victorialamour.github.io/yaraestrela/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Yara Estrela, maquiagem e penteado para noivas">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Yara Estrela",
  "description": "Maquiagem e penteado para noivas em São Paulo, com atendimento em todo o Brasil.",
  "url": "https://victorialamour.github.io/yaraestrela/",
  "image": "https://victorialamour.github.io/yaraestrela/og-image.jpg",
  "address": { "@type": "PostalAddress", "addressRegion": "SP", "addressCountry": "BR" },
  "areaServed": "Brasil",
  "telephone": "+5511970803436",
  "sameAs": ["https://www.instagram.com/yaraestrelamakeup/"]
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&family=Ms+Madi&family=Pinyon+Script&family=Homemade+Apple&family=Nothing+You+Could+Do&display=swap" rel="stylesheet">

${css}
</head>
<body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="mono" viewBox="0 0 60 80"><!-- constelação de estrelas (marca da Yara) --><g transform="translate(6 16) scale(1.7)" fill="currentColor"><path d="M11 3C11.6 10 14 12.4 21 13 14 13.6 11.6 16 11 23 10.4 16 8 13.6 1 13 8 12.4 10.4 10 11 3Z"/><path d="M22 1.5C22.2 4 23 4.8 25.5 5 23 5.2 22.2 6 22 8.5 21.8 6 21 5.2 18.5 5 21 4.8 21.8 4 22 1.5Z"/><path d="M21.5 17.5C21.8 20.4 22.8 21.4 25.7 21.7 22.8 22 21.8 23 21.5 25.9 21.2 23 20.2 22 17.3 21.7 20.2 21.4 21.2 20.4 21.5 17.5Z"/></g></symbol>
</svg>

<!--
  ANTES DE MOSTRAR
  1. Procure por "CONFIRMAR" neste arquivo (trechos em amarelo no site).
  2. WhatsApp: número da Yara em WHATSAPP_NUMERO, no fim do arquivo.
  3. Fotos: veja fotos/LEIA-ME.txt. Sem a foto, aparece um bloco cinza com o nome do arquivo.
  4. Não usar o logo da Constance Zahn sem autorização (aqui só aparece como texto).
-->

<main id="topo">

<!-- ================= TOPO ================= -->
<section class="hero">
  <div class="split">
    <figure class="split__half split__half--noiva">
      <video autoplay muted playsinline webkit-playsinline disablepictureinpicture preload="auto" poster="fotos/hero-noiva-perfil.webp" data-start="2.4" aria-label="Vídeo: noiva com maquiagem e penteado finalizados, em luz suave">
        <source src="video/clip-01.mp4" type="video/mp4">
      </video>
    </figure>
  </div>
  <div class="hero__brand">
    <svg class="mono hero__mono" aria-hidden="true"><use href="#mono"/></svg>
    <h1 class="hero__name">
      <span class="sr-only">Yara Estrela, maquiagem e penteado para noivas em São Paulo. A elegância de uma beleza que não esconde a noiva.</span>
      <span aria-hidden="true"><span class="swash">Y</span>ara <span class="swash">E</span>strela</span>
    </h1>
    <p class="hero__beauty">Noivas</p>
    <p class="hero__place">A elegância de uma beleza que não esconde a noiva</p>
    ${wa('Consultar agenda', 'btn btn--light hero__cta')}
  </div>
</section>

<!-- ================= AUTORIDADE ================= -->
<div class="brands">
  <p class="brands__label">Yara Estrela</p>
  <div class="brands__track"><ul class="brands__list">${bl}</ul><ul class="brands__list" aria-hidden="true">${bl}</ul></div>
</div>

<!-- ================= A PROPOSTA (colagem à esquerda + texto) ================= -->
<section class="prop">
  <div class="wrap prop__grid">
    <div class="prop__col">
      <div class="ph prop__a reveal">${ph('manifesto-01.webp', 'retrato 3:4: noiva de perfil ou três-quartos', 'Noiva de perfil com maquiagem e penteado elegantes', '50% 25%')}</div>
      <div class="ph prop__b reveal d1">${ph('manifesto-02.webp', 'retrato 4:5: noiva de cabelo em ondas, maquiagem visível', 'Noiva de cabelo solto em ondas, com maquiagem luminosa e batom nude', '50% 53%')}</div>
      <div class="ph prop__c reveal d2">${ph('manifesto-03.webp', 'retrato 4:5: cabeça e ombros, maquiagem visível', 'Close do rosto de noiva com sombra dourada e batom nude', '50% 30%')}</div>
      <svg class="seal prop__seal" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width=".6"/>
        <text font-family="Jost, sans-serif" font-size="7.6" fill="currentColor"><textPath href="#seal-circle" textLength="274" lengthAdjust="spacing">YARA ESTRELA · NOIVAS · YARA ESTRELA · NOIVAS · </textPath></text>
        <use href="#mono" x="34" y="27" width="52" height="69"/>
      </svg>
    </div>
    <div class="prop__txt">
      <span class="label reveal">A proposta</span>
      <h2 class="title prop__title reveal d1">“Quero me reconhecer <em>no espelho.</em>”</h2>
      <p class="muted reveal d2">É o que as noivas me dizem antes de tudo. Por isso eu não sigo tendência: faço a maquiagem e o penteado de cada uma pensando em quem ela é.</p>
      <p class="muted reveal d2">A foto do casamento vai ser vista por muitos anos, então escolho tudo com calma. A maquiagem pode ser leve ou mais marcante, do jeito que você preferir.</p>
      <div class="prop__actions reveal d2">
        ${wa('Consultar agenda')}
        <a class="link" href="#como-funciona">Ver como funciona</a>
      </div>
    </div>
  </div>
</section>

<div class="star-div" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 1C10.6 7 13 9.4 19 10 13 10.6 10.6 13 10 19 9.4 13 7 10.6 1 10 7 9.4 9.4 7 10 1Z"/></svg></div>

<!-- ================= NOIVAS (grade que troca + faixa) ================= -->
<section class="gallery" id="noivas">
  <div class="wrap">
    <div class="gallery__head">
      <span class="label reveal">Noivas</span>
      <h2 class="gallery__quote reveal d1">Cada uma, do seu jeito</h2>
    </div>
    <div class="sw-grid reveal" id="sw">${swGrid()}</div>
    <div class="pf-more reveal">
      <a class="link" href="https://www.instagram.com/yaraestrelamakeup/" target="_blank" rel="noopener">Ver mais no Instagram @yaraestrelamakeup</a>
    </div>
  </div>
</section>
<div class="lb" id="lb" hidden><button type="button" class="lb__x" aria-label="Fechar">×</button><img alt=""></div>

<!-- ================= O QUE ESTÁ INCLUÍDO ================= -->
<section class="services" id="atendimento">
  <img class="deco deco--pincel" src="fotos/pincel-base.webp" alt="" aria-hidden="true" loading="lazy">
  <div class="wrap">
    <div class="svc__intro">
      <span class="label reveal">O que está incluído</span>
      <h2 class="title reveal d1">Do teste à <em>entrada na festa</em></h2>
      <p class="muted reveal d2">Atendo em casa ou no hotel. Sua mãe, suas madrinhas e outras convidadas também podem ser atendidas pela minha equipe.</p>
    </div>
    <div class="svc-cards svc-cards--6">
${cards}
    </div>
  </div>
</section>

<!-- ================= COMO FUNCIONA ================= -->
<section class="how" id="como-funciona" style="background:var(--white)">
  <img class="deco deco--blush1" src="fotos/amostra-blush-po.webp" alt="" aria-hidden="true" loading="lazy">
  <div class="wrap">
    <div class="how__head">
      <span class="label reveal">Como funciona</span>
      <h2 class="title reveal d1">Do primeiro contato <em>até a festa</em></h2>
    </div>
    <ol class="steps steps--5">
      <li class="step reveal"><span class="step__num">01</span><h3>Consulta da data</h3><p>Você me conta sobre o casamento pelo WhatsApp.</p></li>
      <li class="step reveal d1"><span class="step__num">02</span><h3>Reserva</h3><p>A data fica reservada com o contrato.</p></li>
      <li class="step reveal d2"><span class="step__num">03</span><h3>Teste e orientação</h3><p>Escolhemos juntas a maquiagem e o penteado, combinando com o vestido.</p></li>
      <li class="step reveal"><span class="step__num">04</span><h3>O dia</h3><p>Te arrumo com calma, sem correria.</p></li>
      <li class="step reveal d1"><span class="step__num">05</span><h3>Depois do sim</h3><p>Fico com você até a festa começar.</p></li>
    </ol>
    <div class="how__cta reveal">${wa('Consultar disponibilidade')}</div>
  </div>
</section>

<!-- ================= DEPOIMENTO (faixa com amostra de blush) ================= -->
<!-- Comentário público real do Instagram @yaraestrelamakeup (texto original, corte marcado com [...]). CONFIRMAR: autorização da Jussara antes de publicar. -->
<section class="depo" id="depoimentos">
  <img class="depo__sw" src="fotos/amostra-blush-po.webp" alt="" aria-hidden="true" loading="lazy">
  <div class="wrap depo__in">
    <blockquote class="depo__q reveal">“Obrigada, Ya! Por cuidar tão bem de tudo (absolutamente todos os detalhes) - desde os acessórios, penteado e a make impecável [...] amei todo o cuidado que recebi, obrigada por fazer parte disso e me deixar em minha melhor versão para meu grande dia.”</blockquote>
    <p class="depo__who reveal d1">Jussara · noiva</p>
  </div>
</section>

<!-- ================= SOBRE ================= -->
<section class="about" id="sobre">
  <div class="wrap about__grid">
    <div class="about__photo reveal">
      <div class="ph about__main">${ph('yara-retrato.webp', 'retrato 3:4 da Yara sorrindo, blazer claro', 'Retrato de Yara Estrela sorrindo, de blazer claro', '50% 30%')}</div>
    </div>
    <div>
      <span class="label reveal">Quem assina</span>
      <h2 class="title about__hello reveal d1">Prazer, eu sou a <span class="pencil-g">Y</span>ara</h2>
      <div class="about__text reveal d2">
        <p>Faço maquiagem e penteado de noivas há sete anos. Sou Embaixadora e Visagista Master pelo método C. Juillard (Visagismo Total Look®), com certificação concedida em Lisboa, em 2025.</p>
        <p>Gosto de uma beleza equilibrada, que combine com a sua personalidade e com o seu gosto. No dia do casamento eu cuido da maquiagem e do cabelo e fico com você até a festa.</p>
        <p>Antes de começar, olho o seu rosto de frente, de perfil e a parte de trás da cabeça, junto com o penteado. Assim decido a textura, a intensidade e a luz da maquiagem, valorizo o que você mais gosta em você e suavizo o que prefere não destacar.</p>
        <p>Eu desisti da Odontologia para fazer o que me deixa feliz: realçar a beleza das mulheres no dia mais especial da vida delas. Estudo e treino sempre, porque quero atender cada noiva com técnica e com cuidado. Quando uma noiva realiza o sonho dela, eu realizo o meu.</p>
      </div>
      <ul class="facts reveal">
        <li><b>7 anos</b><small>dedicados a noivas</small></li>
        <li><b>Visagismo</b><small>método C. Juillard</small></li>
        <li><b>Make + cabelo</b><small>uma pessoa só</small></li>
        <li><b>Constance Zahn</b><small>Bridal Guide</small></li>
      </ul>
      <p class="signature reveal">com carinho, <span class="pencil-g">Y</span>á</p>
      ${wa('Falar com a Yara', 'btn btn--line about__cta reveal')}
    </div>
  </div>
</section>

<!-- ================= DÚVIDAS ================= -->
<section class="faq" id="duvidas">
  <img class="deco deco--espatula" src="fotos/amostra-gloss-pessego.webp" alt="" aria-hidden="true" loading="lazy">
  <div class="wrap">
    <div class="faq__head">
      <span class="label reveal">Dúvidas</span>
      <h2 class="title reveal d1">Perguntas que <em>eu mais recebo</em></h2>
    </div>
    <div class="faq__list reveal">
${faq('Com quanta antecedência devo reservar?', 'O ideal é reservar até um ano antes, principalmente para as datas de mais procura. Atendo uma noiva por data. <span class="todo">[CONFIRMAR "uma noiva por data" com a Yara]</span>')}
${faq('Você faz maquiagem e penteado?', 'Faço os dois. Como o penteado muda o jeito de ver o rosto, eu penso nos dois juntos.')}
${faq('O teste está incluído?', 'Está. É no teste que escolhemos juntas a maquiagem e o penteado, combinando com o vestido e o horário da cerimônia.')}
${faq('A maquiagem vai durar a festa inteira?', 'Vai. Aplico uma blindagem e fico com você depois da cerimônia para retocar.')}
${faq('Minha maquiagem vai ficar pesada?', 'Não precisa. Você escolhe a intensidade, do bem leve ao mais marcante. A ideia é sempre realçar você, sem esconder quem você é.')}
${faq('Você atende mãe e madrinhas?', 'Sim, a minha equipe atende. Quando entrar em contato, me diga quantas pessoas serão.')}
${faq('Atende fora de São Paulo?', 'Sim, em todo o Brasil. Minha base é em São Paulo; se o casamento for em outra cidade ou for destination wedding, combinamos a agenda e o deslocamento de acordo com o local.')}
${faq('Qual o valor?', 'Depende da data, do local e de quantas pessoas vou atender. Me chame no WhatsApp que eu envio a proposta.')}
    </div>
  </div>
</section>

<!-- ================= CHAMADO FINAL (convite) ================= -->
<section class="convite" id="contato">
  <div class="wrap">
    <div class="convite__card reveal">
      <svg class="mono convite__mono" aria-hidden="true"><use href="#mono"/></svg>
      <h2>Sua data ainda está <em>disponível?</em></h2>
      <p class="convite__p">As datas fecham com bastante antecedência. Me conte sobre o seu casamento que eu respondo pessoalmente.</p>
      <p class="signature">com carinho, <span class="pencil-g">Y</span>á</p>
      ${wa('Consultar minha data no WhatsApp', 'btn')}
    </div>
  </div>
</section>

</main>

<footer>
  <div class="wrap">
    <svg class="mono" aria-hidden="true"><use href="#mono"/></svg>
    <span class="brand__name">Yara Estrela</span>
    <p class="footer__beauty">Noivas</p>
    <p>Maquiagem e penteado para noivas · São Paulo, interior e todo o Brasil</p>
    <p>Bridal Guide Constance Zahn</p>
    <p>
      <a href="https://www.instagram.com/yaraestrelamakeup/" target="_blank" rel="noopener">Instagram @yaraestrelamakeup</a>
      ·
      ${wa('WhatsApp', '')}
    </p>
    <small>© 2026 Yara Estrela</small>
  </div>
</footer>

<a class="wa-float" href="${WA}" target="_blank" rel="noopener" aria-label="Consultar data pelo WhatsApp" data-wa>
  ${waIcon}
</a>

${jsCfg2}

  // O método: acordeão (um pilar aberto por vez)
  (function () {
    const box = document.getElementById('mtd'); if (!box) return;
    const items = [...box.querySelectorAll('.mtd__it')];
    const set = (it, open) => {
      it.classList.toggle('on', open);
      it.querySelector('.mtd__hh').setAttribute('aria-expanded', open);
      const bd = it.querySelector('.mtd__bd'); bd.style.maxHeight = open ? bd.scrollHeight + 'px' : '0px';
    };
    items.forEach(it => { it.querySelector('.mtd__hh').addEventListener('click', () => { const was = it.classList.contains('on'); items.forEach(o => set(o, false)); if (!was) set(it, true); }); });
    items.forEach(it => set(it, it.classList.contains('on')));
    addEventListener('resize', () => items.forEach(it => { if (it.classList.contains('on')) { const bd = it.querySelector('.mtd__bd'); bd.style.maxHeight = bd.scrollHeight + 'px'; } }));
  })();

  // Portfólio: fotos trocam no lugar; clique abre a foto grande
  (function () {
    const cells = [...document.querySelectorAll('#sw .swc')];
    const lb = document.getElementById('lb'), big = lb.querySelector('img');
    const close = () => { lb.hidden = true; };
    cells.forEach(c => c.addEventListener('click', () => { const on = c.querySelector('img.on'); if (!on) return; big.src = on.getAttribute('src'); big.alt = 'Noiva, maquiagem e penteado por Yara Estrela'; lb.hidden = false; }));
    lb.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    if (reduzMovimento || !cells.length) return;
    const shown = () => new Set(cells.map(c => [...c.children].findIndex(i => i.classList.contains('on'))));
    setInterval(() => {
      if (document.hidden) return;
      const c = cells[Math.floor(Math.random() * cells.length)], ims = [...c.children];
      const cur = ims.findIndex(i => i.classList.contains('on'));
      const used = shown(), free = ims.map((_, i) => i).filter(i => !used.has(i));
      if (!free.length) return;
      ims[cur].classList.remove('on'); ims[free[Math.floor(Math.random() * free.length)]].classList.add('on');
    }, 2200);
  })();
</script>
</body>
</html>
`
  .replace("const WHATSAPP_NUMERO = '5511900000000'; // CONFIRMAR: número provisório (DDD 11)",
           "const WHATSAPP_NUMERO = '5511970803436'; // número da Yara: +55 11 97080-3436 (DDI+DDD+número, só dígitos)")
  .replace("const WHATSAPP_MENSAGEM = 'Oi, Nina! Vim pelo seu site. Meu casamento é no dia ___, em ___.';",
           "const WHATSAPP_MENSAGEM = 'Oi Yara! Vi seu site e quero consultar a disponibilidade da minha data de casamento.';");

fs.writeFileSync(base + 'yara-estrela/index.html', html, 'utf8');
console.log('ok', html.length);
