import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
const appScriptPath = resolve(process.cwd(), 'js/app.js');
const appScript = readFileSync(appScriptPath, 'utf8')
  + '\n//# sourceURL=' + pathToFileURL(appScriptPath).href;

function createSite(sourceHtml = html) {
  const dom = new JSDOM(sourceHtml, {
    url: 'https://example.test/',
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });

  const { window } = dom;
  window.scrollTo = vi.fn();
  window.open = vi.fn();
  window.eval(appScript);

  return dom;
}

describe('Integração do site de terapias', () => {
  let dom;

  afterEach(() => {
    if (dom) {
      dom.window.close();
      dom = undefined;
    }
    vi.restoreAllMocks();
  });

  it('seleciona uma terapia e apresenta os dados correspondentes', () => {
    dom = createSite();

    const { document } = dom.window;
    const card = document.querySelector('.therapy-card');

    expect(card).not.toBeNull();

    const therapyName = card.dataset.therapy;
    const therapyPrice = card.dataset.price;

    card.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

    expect(document.querySelector('#resultTitle').textContent).toContain(therapyName);
    expect(document.querySelector('#resultMessage').textContent).toContain(therapyPrice);
    expect(document.querySelector('#result').classList.contains('active')).toBe(true);
    expect(document.querySelector('#toast').textContent).toContain(therapyName);
  });

  it('permite selecionar uma terapia sem o botão de seta', () => {
    const modifiedHtml = html.replace(
      /<button\b[^>]*class="[^"]*card-arrow[^"]*"[^>]*>[\s\S]*?<\/button>/i,
      ''
    );

    dom = createSite(modifiedHtml);

    const { document, MouseEvent } = dom.window;
    const card = document.querySelector('.therapy-card');

    expect(card).not.toBeNull();
    expect(card.querySelector('.card-arrow')).toBeNull();

    card.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(document.querySelector('#result').classList.contains('active')).toBe(true);
  });

  it('abre e fecha o menu e atualiza os atributos de acessibilidade', () => {
    dom = createSite();

    const { document, KeyboardEvent, MouseEvent } = dom.window;
    const toggle = document.querySelector('#menuToggle');
    const panel = document.querySelector('#menuPanel');

    expect(toggle).not.toBeNull();
    expect(panel).not.toBeNull();

    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(panel.classList.contains('open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true
    }));

    expect(panel.classList.contains('open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('abre o WhatsApp com a mensagem geral de contato', () => {
    dom = createSite();

    const { document, open } = dom.window;
    const contactButton = document.querySelector('[data-contact]');

    expect(contactButton).not.toBeNull();

    contactButton.dispatchEvent(
      new dom.window.MouseEvent('click', { bubbles: true })
    );

    expect(open).toHaveBeenCalledTimes(1);

    const [url, target, features] = open.mock.calls[0];

    expect(url).toContain('https://wa.me/5519995759720?text=');
    expect(decodeURIComponent(url)).toContain('gostaria de saber mais informações');
    expect(target).toBe('_blank');
    expect(features).toContain('noopener');
  });

  it('inclui a terapia selecionada na mensagem do WhatsApp', () => {
    dom = createSite();

    const { document, open } = dom.window;
    const card = document.querySelector('.therapy-card');
    const contactButton = document.querySelector('[data-contact]');

    expect(card).not.toBeNull();
    expect(contactButton).not.toBeNull();

    const therapyName = card.dataset.therapy;

    card.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    contactButton.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

    expect(open).toHaveBeenCalledTimes(1);

    const [url] = open.mock.calls[0];

    expect(url).toContain('https://wa.me/5519995759720?text=');
    expect(decodeURIComponent(url)).toContain(therapyName);
  });
});
