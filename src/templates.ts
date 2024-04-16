import * as vscode from 'vscode';
import { defaultPath, extName } from './general';
import * as cp from 'child_process';
import { SourceCode } from 'eslint';

const outputChannel = vscode.window.createOutputChannel('Pip Requirements');

export type ProgressMessages = {
    process: string,
    success: string
};

type CallbackFunc = (error: cp.ExecException | null, stdout: string, stderr: string) => void;

function runTerminalCommand(command: string, callback: CallbackFunc) {
    let workspacePath = undefined;
    if (vscode.workspace.workspaceFolders) {
        workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    cp.exec(command, {
        cwd: workspacePath
    }, callback).on('message', (message: cp.Serializable, sendHandle: cp.SendHandle) => {
        // logging
        outputChannel.appendLine(message.toString());
    });
}

function runPipCommand(query: string, messages: ProgressMessages) {
    const command = `python -m pip ${query}`;
    outputChannel.appendLine(`Running "${command}"`);
    vscode.window.withProgress({
        cancellable: false,
        location: vscode.ProgressLocation.Notification,
        title: messages.process
    }, (progress: vscode.Progress<{
        message?: string | undefined;
        increment?: number | undefined;
    }>, token: vscode.CancellationToken) => {
        return new Promise((resolve, reject) => {
            runTerminalCommand(command,
                (error: cp.ExecException | null, stdout: string, stderr: string) => {
                    outputChannel.appendLine(stdout+stderr);
                    if (error) {
                        outputChannel.appendLine('Execution failed');
                        throw new Error('The command resulted an error. Check the output');
                    }
                    // progress.report({
                    //     message: messages.success
                    // });
                    outputChannel.appendLine('Success');
                    return resolve(messages.success);
                }
            );
        });
    });
}

export function focusTemplate(event: any, command: string, commandName: string, messages: ProgressMessages) {
    function runIt(path: string) {
        runPipCommand(
            `${command} "${path}"`,
            messages
        );
    }
    if (event) {
        runIt(event.fsPath);
    } else {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            runIt(editor.document.uri.fsPath);
        } else {
            vscode.commands.executeCommand(`${extName}.${commandName}-manual`);
        }
    }
}

export function manualTemplate(command: string, messages: ProgressMessages) {
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
            runPipCommand(`${command} "${path}"`, messages);
        }
    });
}

// reexport templates with web support
export { contextTemplate } from './web/templates';
