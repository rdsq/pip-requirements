import * as vscode from 'vscode';
import { defaultPath } from './general';

const extensionTerminalName = 'pip requirements';

export function getExtensionTerminal(): vscode.Terminal {
    for (const terminal of vscode.window.terminals) {
        if (terminal.name === extensionTerminalName) {
            return terminal;
        }
    }
    return vscode.window.createTerminal({
        name: extensionTerminalName,
    });
}

export function runPipCommand(path: string, command: string) {
    const terminal = getExtensionTerminal();
    terminal.sendText(`python -m pip ${command} "${path}"`);
    terminal.show();
}

export function focusTemplate(event: any, command: string) {
    const runThat = (path: string) => runPipCommand(path, command);
    if (event) {
        runThat(event.fsPath);
    } else {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            runThat(editor.document.uri.fsPath);
        } else {
            runCommandManually(command);
        }
    }
}

async function runCommandManually(command: string) {
    const ignoreFocusOutSetting: boolean = vscode.workspace.getConfiguration(
        'pip-requirements'
    ).get('ignoreFocusOut') || false;
    let pathResponse = await vscode.window.showInputBox({
        title: 'Path to the requirements.txt file',
        value: defaultPath,
        placeHolder: defaultPath,
        ignoreFocusOut: ignoreFocusOutSetting
    });
    if (pathResponse !== undefined) {
        if (pathResponse === '') {
            pathResponse = defaultPath;
        }
        runPipCommand(pathResponse, command);
    }
}

// reexport templates with web support
export { contextTemplate } from './web/templates';
