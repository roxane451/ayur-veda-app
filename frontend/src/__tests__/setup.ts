import '@testing-library/jest-dom';

// Silence les warnings React Router dans les tests
const warnOriginal = console.warn.bind(console);
global.console.warn = (msg: string, ...args: unknown[]) => {
  if (typeof msg === 'string' && msg.includes('React Router')) return;
  warnOriginal(msg, ...args);
};

// jsdom ne sait pas défiler
window.scrollTo = (() => {}) as typeof window.scrollTo;
