import * as vscode from 'vscode';
import { focusTemplate, contextTemplate, runPipCommand } from './templates';
import { extName } from './general';
import * as path from 'path';
import { writeFileSync } from 'fs';

export const installCmd = vscode.commands.registerCommand(`${extName}.install`, (event) => {
    focusTemplate(event, 'install -r');
});

export const freezeCmd = vscode.commands.registerCommand(`${extName}.freeze`, (event) => {
    focusTemplate(event, 'freeze >');
});

export const installRow = vscode.commands.registerCommand(`${extName}.install-row`, () => {
    contextTemplate((parsed) => {
        let query = parsed.name;
        if (parsed.version !== null) {
            query += `==${parsed.version}`;
        }
        const terminal = vscode.window.createTerminal();
        terminal.sendText(`python -m pip install ${query}`);
        terminal.show();
    });
});

export const createRequirements = vscode.commands.registerCommand(`${extName}.create-requirements`, () => {
    const workspaces = vscode.workspace.workspaceFolders;
    if (!workspaces) {
        vscode.window.showErrorMessage('No workspaces open');
        return;
    }
    const workspaceUri = workspaces[0].uri;
    const filePath = path.join(workspaceUri.fsPath, "requirements.txt",);
    writeFileSync(filePath, '');
    runPipCommand(filePath, 'freeze >');
});

// reexport commands with web support
export { browseRow } from './web/commands';
