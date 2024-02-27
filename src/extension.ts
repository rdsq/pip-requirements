import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install', (textEditor, edit) => {
		if (textEditor) {
			const terminal = vscode.window.createTerminal();
			terminal.sendText(`python -m pip install -r "${textEditor.fsPath}"`);
			terminal.show();
		} else {
			vscode.window.showInformationMessage('Cannot run this command. Try to use it by clicking on the icon in pip requirements');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze', (textEditor, edit) => {}));
}

export function deactivate() {}
