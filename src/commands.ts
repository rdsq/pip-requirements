import * as vscode from 'vscode';
import { focusTemplate, manualTemplate, contextTemplate, ProgressMessages } from './templates';
import { extName } from './general';

const installMessages: ProgressMessages = {
    process: 'Installing Pip packages...',
    success: 'The Pip packages were installed successfully'
};

const freezeMessages: ProgressMessages = {
    process: 'Freezing Pip packages...',
    success: 'The Pip packages were freezed successfully'
};

export const installCmd = vscode.commands.registerCommand(`${extName}.install`, (event) => {
    focusTemplate(event, 'install -r', 'install', installMessages);
});

export const freezeCmd = vscode.commands.registerCommand(`${extName}.freeze`, (event) => {
    focusTemplate(event, 'freeze >', 'freeze', freezeMessages);
});

export const installManual = vscode.commands.registerCommand(`${extName}.install-manual`, () => {
    manualTemplate('install -r', installMessages);
});

export const freezeManual = vscode.commands.registerCommand(`${extName}.freeze-manual`, () => {
    manualTemplate('freeze >', freezeMessages);
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
