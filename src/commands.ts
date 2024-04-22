import * as vscode from 'vscode';
import { focusTemplate, contextTemplate } from './templates';
import { extName } from './general';

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

// reexport commands with web support
export { browseRow } from './web/commands';
