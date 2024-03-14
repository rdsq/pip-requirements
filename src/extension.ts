import * as vscode from 'vscode';
import { contextTemplate, focusTemplate, manualTemplate } from './templates';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install', (event) => {
		focusTemplate(event, 'install -r');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze', (event) => {
		focusTemplate(event, 'freeze >');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install-manual', () => {
		manualTemplate('install -r');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze-manual', () => {
		manualTemplate('freeze >');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install-row', () => {
		contextTemplate((parsed) => {
			let query = parsed.name;
			if (parsed.version !== null) {
				query += `==${parsed.version}`;
			}
			const terminal = vscode.window.createTerminal();
            terminal.sendText(`python -m pip install ${query}`);
            terminal.show();
		});
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.browse-row', () => {
		contextTemplate((parsed) => {
			vscode.env.openExternal(vscode.Uri.parse(`https://pypi.org/project/${parsed.name}/`));
		});
	}));
}

export function deactivate() {}
