import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
const disposable = vscode.commands.registerCommand('codeStats.analyzeFile', async () => {
const editor = vscode.window.activeTextEditor;
if (!editor) {
vscode.window.showErrorMessage('There is no open file for analysis.');
return;
}


const text = editor.document.getText();


const functionRegex = /\b[\w:<>\~]+\s+[\w:~]+\s*\([^)]*\)\s*(?=\{)/g;
const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
const emptyLineRegex = /^\s*$/gm;


const functionCount = (text.match(functionRegex) || []).length;
const commentCount = (text.match(commentRegex) || []).length;
const emptyLines = (text.match(emptyLineRegex) || []).length;


vscode.window.showInformationMessage(
`File Analysis:\nFunctions: ${functionCount}\nComments: ${commentCount}\nEmpty lines: ${emptyLines}`
);
});


context.subscriptions.push(disposable);
}


export function deactivate() {}