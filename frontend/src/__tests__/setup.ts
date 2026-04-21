import '@testing-library/jest-dom';

// Silence les warnings React Router dans les tests
global.console.warn = (msg: string, ...args: unknown[]) => {
  if (typeof msg === 'string' && msg.includes('React Router')) return;
  console.warn(msg, ...args);
};
