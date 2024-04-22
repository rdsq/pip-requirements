import * as vscode from 'vscode';
import { browseRow, freezeCmd, installCmd, installRow } from './commands';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		installCmd,
		freezeCmd,
		installRow,
		browseRow,
	);
}

export function deactivate() {}
