export interface IStatusBarItem {
  id: string;
  text: string;
  tooltip: string;
  command: string;
}

export const strings = {
  terminalFontSize: 'terminal.integrated.fontSize',
  quickPickPlaceholder: 'Select terminal font-size:',
  customInputLabel: `$(pencil) Input custom size`,
  customSizePrompt: 'Enter font-size ',
  current: '(current)'
};

export const cmds = {
  increaseSize: 'terminalFontSize.increase',
  decreaseSize: 'terminalFontSize.decrease',
  setSize: 'terminalFontSize.openQuickPick'
};

export const tooltips = {
  increase: 'Increase Terminal Font Size',
  set: 'Set Terminal Font Size',
  decrease: 'Decrease Terminal Font Size'
};

export const icons = {
  typography: `$(text-size)`
};
