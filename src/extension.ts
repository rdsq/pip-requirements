import * as vscode from 'vscode';
import { browseRow, freezeCmd, freezeManual, installCmd, installManual, installRow } from './commands';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(installCmd);
	context.subscriptions.push(freezeCmd);
	context.subscriptions.push(installManual);
	context.subscriptions.push(freezeManual);
	context.subscriptions.push(installRow);
	context.subscriptions.push(browseRow);
}

export function deactivate() {}
