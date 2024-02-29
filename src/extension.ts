import * as vscode from 'vscode';

const defaultPath = 'requirements.txt';

export function activate(context: vscode.ExtensionContext) {
	function fromTemplate(textEditor: any, command: string) {
		function runCommand(path: string) {
			const terminal = vscode.window.createTerminal();
			terminal.sendText(`python -m pip ${command} "${path}"`);
			terminal.show();
		}
		if (textEditor) {
			runCommand(textEditor.fsPath);
		} else {
			vscode.window.showInputBox({
				title: 'Path to the requirements.txt file',
				value: defaultPath,
				placeHolder: defaultPath
			}).then(path => {
				if (path !== undefined) {
					if (path === '') {
						path = defaultPath;
					}
					runCommand(path);
				}
			});
		}
	}
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install', (textEditor, edit) => {
		fromTemplate(textEditor, 'install -r');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze', (textEditor, edit) => {
		fromTemplate(textEditor, 'freeze >');
	}));
}

export function deactivate() {}
