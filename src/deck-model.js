export const ENVIRONMENTS = Object.freeze(['Desktop', 'Web', 'API']);
export const REASONING_LEVELS = Object.freeze(['Low', 'Medium', 'High', 'XHigh', 'Ultra']);

export const STICKERS = Object.freeze([
  { id: 'context', label: 'Context', tone: 'violet', symbol: '◎', action: 'context', hint: 'Captures fresh context' },
  { id: 'builder', label: 'Builder', tone: 'blue', symbol: '◇', action: 'builder', hint: 'Creates one bounded candidate' },
  { id: 'critic', label: 'Critic', tone: 'amber', symbol: '⌕', action: 'critic', hint: 'Evaluates the candidate' },
  { id: 'review', label: 'Review', tone: 'rose', symbol: '✓', action: 'review', hint: 'Opens Human Review' },
  { id: 'version', label: 'Version', tone: 'green', symbol: '↶', action: 'version', hint: 'Shows restorable versions' },
  { id: 'run', label: 'Run', tone: 'blue', symbol: '▶', action: 'run', hint: 'Runs one bounded iteration' },
  { id: 'flow', label: 'Flow', tone: 'cyan', symbol: '⑂', action: 'flow', hint: 'Shows the agent flow' },
  { id: 'task', label: 'Task', tone: 'amber', symbol: 'ϟ', action: 'task', hint: 'Creates the next small task' },
  { id: 'allow', label: 'Allow', tone: 'green', symbol: '●', action: 'approve', hint: 'Approves a reviewed candidate' },
  { id: 'reject', label: 'Reject', tone: 'rose', symbol: '×', action: 'reject', hint: 'Rejects a reviewed candidate' },
  { id: 'terminal', label: 'Terminal', tone: 'slate', symbol: '›_', action: 'terminal', hint: 'Opens terminal actions' },
  { id: 'export', label: 'Export', tone: 'cyan', symbol: '⇩', action: 'export', hint: 'Exports the safe version' },
  { id: 'reset', label: 'Reset', tone: 'rose', symbol: '⌫', action: 'reset', hint: 'Resets the project' },
  { id: 'improve', label: 'Improve', tone: 'violet', symbol: '✦', action: 'improve', hint: 'Improves one coherent area' },
  { id: 'brief', label: 'New brief', tone: 'blue', symbol: '＋', action: 'brief', hint: 'Starts a new brief' },
  { id: 'split', label: 'Split', tone: 'cyan', symbol: '⑂', action: 'split', hint: 'Splits independent branches' },
  { id: 'retry', label: 'Retry', tone: 'amber', symbol: '↻', action: 'retry', hint: 'Retries the failed step' },
  { id: 'merge', label: 'Merge', tone: 'green', symbol: '⋈', action: 'merge', hint: 'Merges validated branches' },
  { id: 'style', label: 'Style', tone: 'violet', symbol: '✎', action: 'style', hint: 'Reviews the visual system' },
  { id: 'experiment', label: 'Test', tone: 'amber', symbol: '△', action: 'experiment', hint: 'Runs one UX experiment' },
  { id: 'schedule', label: 'Schedule', tone: 'slate', symbol: '◷', action: 'schedule', hint: 'Prepares a bounded follow-up' },
  { id: 'think', label: 'Think', tone: 'blue', symbol: '◉', action: 'think', hint: 'Analyzes the next action' },
  { id: 'deep-think', label: 'Deep think', tone: 'violet', symbol: '◉', action: 'deep-think', hint: 'Runs a deeper critic pass' },
  { id: 'upload', label: 'Upload', tone: 'cyan', symbol: '⇧', action: 'upload', hint: 'Adds file context' },
  { id: 'yolo', label: 'YOLO', tone: 'amber', symbol: 'ϟ', action: 'yolo', hint: 'Runs one autonomous bounded iteration' },
  { id: 'yeet', label: 'YEET', tone: 'rose', symbol: '➜', action: 'yeet', hint: 'Delivers the latest safe version' },
  {
    id: 'environment-control',
    label: 'Desktop',
    controlLabel: 'ENVIRONMENT',
    tone: 'violet',
    symbol: '▣',
    action: 'environment',
    hint: 'Cycles Desktop, Web, and API',
  },
  {
    id: 'reasoning-control',
    label: 'XHigh',
    controlLabel: 'REASONING',
    tone: 'violet',
    symbol: '◌',
    action: 'reasoning',
    hint: 'Changes reasoning level',
  },
  { id: 'prompt', label: 'Prompt', tone: 'violet', symbol: '✎', action: 'prompt', hint: 'Opens the prompt composer' },
  { id: 'stop', label: 'Stop', tone: 'rose', symbol: '■', action: 'stop', hint: 'Stops the current branch safely' },
  { id: 'active-agent', label: 'Codex', controlLabel: 'ACTIVE AGENT', tone: 'cyan', symbol: '⌬', action: 'agent', hint: 'Switches active agent' },
]);

export const FIXED_STICKERS = new Set([
  'environment-control',
  'reasoning-control',
  'prompt',
  'active-agent',
]);

export const INITIAL_PLACEMENTS = Object.freeze([
  'environment-control',
  'context',
  'builder',
  'reasoning-control',
  'critic',
  'review',
  'version',
  'run',
  'flow',
  'task',
  'allow',
  'reject',
  'prompt',
  'stop',
  'active-agent',
]);

export function stickerById(id) {
  return STICKERS.find((sticker) => sticker.id === id);
}
