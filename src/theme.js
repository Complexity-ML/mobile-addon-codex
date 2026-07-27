export const colors = Object.freeze({
  canvas: '#111c2e',
  panel: '#19273c',
  panelStrong: '#1e2e45',
  line: '#3a4a64',
  lineBright: '#60708b',
  ink: '#eef4ff',
  muted: '#9eacc2',
  violet: '#786cff',
  blue: '#48a7ff',
  cyan: '#28d7ce',
  green: '#2bd17e',
  amber: '#f0ab42',
  rose: '#ff627a',
  slate: '#a9b6ca',
});

export const toneColor = (tone) => colors[tone] ?? colors.slate;

export const sharedStyles = {
  eyebrow: {
    color: '#8f9db3',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  pressed: {
    opacity: 0.72,
  },
};
