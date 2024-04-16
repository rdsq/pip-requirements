import * as vscode from 'vscode';
import { browseRow, freezeCmd, freezeManual, installCmd, installManual, installRow } from './commands';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		installCmd,
		freezeCmd,
		installManual,
		freezeManual,
		installRow,
		browseRow,
	);
}

export function deactivate() {}
