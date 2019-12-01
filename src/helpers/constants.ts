export interface IStatusBarItem {
  text: string;
  tooltip: string;
  command: string;
}

export const strings = {
  terminalFontSize: 'terminal.integrated.fontSize',
  quickPickPlaceholder: 'Select a font-size for your terminal:',
  customInputLabel: `$(pencil) Input custom size`,
  customSizePrompt: 'Enter font-size '
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
