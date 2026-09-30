# Yara Estrela · landing page

Página única (HTML + CSS + JS, sem build pesado) para Yara Estrela, maquiagem e penteado para noivas em São Paulo. Objetivo: levar a noiva a consultar a data pelo WhatsApp.

## Como mexer
- `index.html` é **gerado** por `build.js`. Edite textos, fotos e estilos no `build.js` e rode:

  ```bash
  node build.js
  ```

  (o gerador lê o CSS-base do projeto `nina-costa`, que fica numa pasta ao lado; se essa pasta sumir, o `index.html` atual continua funcionando e pode ser editado à mão.)
- Para ver no navegador: `node serve.js` e abra http://localhost:4173
- Fotos em `fotos/` (WebP). Lista do que a Yara precisa enviar: `fotos/LEIA-ME.txt`.
- Vídeo do topo: `video/clip-01.mp4` (toca só a partir de 2,4 s, já com a noiva maquiada).
- `layout-opcoes-*.html` são as páginas de escolha de layout usadas durante o projeto (não vão ao ar).

## Antes de publicar
- [ ] Trocar o domínio `exemplo.com.br` (canonical, og:url, og:image e dados estruturados) no `build.js`.
- [ ] Autorização da Jussara (depoimento) e das noivas/fotógrafos (fotos).
- [ ] Confirmar "atendo uma noiva por data" (dúvidas).
- [ ] Testar em celular de verdade.
- WhatsApp já configurado: +55 11 97080-3436 (`WHATSAPP_NUMERO`, no fim do `build.js`).

> **Prévia pública.** As fotos e o vídeo usados no site estão neste repositório só para a cliente ver o site funcionando; a página está marcada como `noindex` (buscadores não indexam). As fotos das noivas ainda dependem de autorização. Ao publicar no domínio definitivo: trocar a URL no `build.js` e remover a linha `noindex`.

## O que sobe para o ar
`index.html`, `og-image.jpg`, `fotos/*.webp` usadas e `video/clip-01.mp4`.
