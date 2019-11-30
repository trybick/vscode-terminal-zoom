import { StatusBarAlignment, window, workspace } from 'vscode';
import { cmds, IStatusBarItem, strings, tooltips } from './constants';

export function getCurrentSize(): number {
  const config = workspace.getConfiguration();
  return config.get<number>(strings.terminalFontSize) || 12;
}

function _createStatusBarItem({ text, tooltip, command }: IStatusBarItem) {
  const item = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  item.text = text;
  item.tooltip = tooltip;
  item.command = command;
  item.show();
  return item;
}

const _increase = _createStatusBarItem({
  text: '+',
  tooltip: tooltips.increase,
  command: cmds.increaseSize
});

const _title = _createStatusBarItem({
  text: `Terminal ${getCurrentSize()}-pt`,
  tooltip: tooltips.set,
  command: cmds.setSize
});

const _decrease = _createStatusBarItem({
  text: '-',
  tooltip: tooltips.decrease,
  command: cmds.decreaseSize
});

export const statusBarItems = [_increase, _title, _decrease];

export function updateStatusBar() {
  statusBarItems.forEach(i => {
    i.hide();
  });

  _title.text = `Terminal ${getCurrentSize()}-pt`;

  statusBarItems.forEach(i => {
    i.show();
  });
}
