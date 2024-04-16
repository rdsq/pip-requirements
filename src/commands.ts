import * as vscode from 'vscode';
import { focusTemplate, manualTemplate, contextTemplate } from './templates';
import { extName } from './general';

export const installCmd = vscode.commands.registerCommand(`${extName}.install`, (event) => {
    focusTemplate(event, 'install -r', 'install');
});

export const freezeCmd = vscode.commands.registerCommand(`${extName}.freeze`, (event) => {
    focusTemplate(event, 'freeze >', 'freeze');
});

export const installManual = vscode.commands.registerCommand(`${extName}.install-manual`, () => {
    manualTemplate('install -r');
});

export const freezeManual = vscode.commands.registerCommand(`${extName}.freeze-manual`, () => {
    manualTemplate('freeze >');
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

// reexport commands with web support
export { browseRow } from './web/commands';
