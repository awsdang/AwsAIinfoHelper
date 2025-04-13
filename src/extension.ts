import * as vscode from 'vscode';

// Optional: Declare status bar item if you are using it
// let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

    console.log('Extension "AwsAIinfoHelper" active - configured for clipboard copy.');

    const commandId = 'AwsAIinfoHelper.getFileInfo'; // Use the same command ID as in package.json

    // Register the command
    let disposable = vscode.commands.registerCommand(commandId, async () => { // Make the callback async to use await
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const fullPathUri = document.uri;

            // 1. Get the relative path
            const relativePath = vscode.workspace.asRelativePath(fullPathUri, false);

            // 2. Get the whole text in the file
            const fileContent = document.getText();

            // --- Prepare the text for the clipboard ---
            // You can format this string however you like
            const clipboardText = `Relative Path: ${relativePath}\n\n---\n\n${fileContent}`;

            // --- Copy to Clipboard ---
            try {
                // Use await to wait for the clipboard operation to complete
                await vscode.env.clipboard.writeText(clipboardText);

                // Show a brief, non-modal confirmation message in the status bar area
                vscode.window.showInformationMessage('File path and content copied to clipboard!');

            } catch (err) {
                // Log the error to the console (Help -> Toggle Developer Tools -> Console)
                console.error('Failed to copy to clipboard:', err);
                // Show an error message to the user
                vscode.window.showErrorMessage('Failed to copy file info to clipboard.');
            }

        } else {
            vscode.window.showWarningMessage('No active text editor found. Open a file first.');
        }
    });

    context.subscriptions.push(disposable);

    // --- Optional: Status Bar Item Setup ---
    // If you want the status bar button, include this setup.
    // Make sure to call setupStatusBarItem(context, commandId);
    /*
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    myStatusBarItem.command = commandId;
    myStatusBarItem.text = `$(clippy) Copy Info`; // Using a clipboard icon
    myStatusBarItem.tooltip = "Copy Relative Path & Content of Active File";
    context.subscriptions.push(myStatusBarItem);

    // Update visibility based on active editor
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
    updateStatusBarItem(); // Initial update
    */
}

// --- Optional: Status Bar Update Function ---
/*
function updateStatusBarItem(): void {
    if (myStatusBarItem) { // Check if it's initialized
        if (vscode.window.activeTextEditor) {
            myStatusBarItem.show();
        } else {
            myStatusBarItem.hide();
        }
    }
}
*/

// This method is called when your extension is deactivated
export function deactivate() {
    // Optional: Dispose status bar item if created
    // if (myStatusBarItem) {
    //     myStatusBarItem.dispose();
    // }
}