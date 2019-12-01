import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode';
import { cmds, IStatusBarItem, strings, tooltips } from './constants';

export function getCurrentSize(): number {
  const config = workspace.getConfiguration();
  return config.get<number>(strings.terminalFontSize) || 12;
}

function _createStatusBarItem({ text, tooltip, command }: IStatusBarItem): StatusBarItem {
  const item = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  item.text = text;
  item.tooltip = tooltip;
  item.command = command;

  return item;
}

export const statusBarItems = [
  _createStatusBarItem({
    text: '+',
    tooltip: tooltips.increase,
    command: cmds.increaseSize
  }),
  _createStatusBarItem({
    text: `Terminal ${getCurrentSize()}-pt`,
    tooltip: tooltips.set,
    command: cmds.setSize
  }),
  _createStatusBarItem({
    text: '-',
    tooltip: tooltips.decrease,
    command: cmds.decreaseSize
  })
];

export function updateStatusBar() {
  statusBarItems[1].text = `Terminal ${getCurrentSize()}-pt`;
}
