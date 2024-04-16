import * as vscode from 'vscode';
import { defaultPath, extName } from './general';

function runPipCommand(path: string, command: string) {
    const terminal = vscode.window.createTerminal();
    terminal.sendText(`python -m pip ${command} "${path}"`);
    terminal.show();
}

export function focusTemplate(event: any, command: string, commandName: string) {
    if (event) {
        runPipCommand(event.fsPath, command);
    } else {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            runPipCommand(editor.document.uri.fsPath, command);
        } else {
            vscode.commands.executeCommand(`${extName}.${commandName}-manual`);
        }
    }
}

export function manualTemplate(command: string) {
    const ignoreFocusOutSetting: boolean = vscode.workspace.getConfiguration(
        'pip-requirements'
    ).get('ignoreFocusOut')!;
    vscode.window.showInputBox({
        title: 'Path to the requirements.txt file',
        value: defaultPath,
        placeHolder: defaultPath,
        ignoreFocusOut: ignoreFocusOutSetting
    }).then(path => {
        if (path !== undefined) {
            if (path === '') {
                path = defaultPath;
            }
            runPipCommand(path, command);
        }
    });
}

// reexport templates with web support
export { contextTemplate } from './web/templates';
