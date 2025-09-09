const vscode = require('vscode')

const activate = async (context) => {
    let disposable = vscode.commands.registerCommand('extension.addLog', async () => {
        const editor = vscode.window.activeTextEditor
        if (!editor) return

        const fileName = editor.document.fileName.split('/').pop()
        const functionName = getFunctionName(editor, editor.selection.start)

        // Loop through all selections
        const selections = editor.selections
        let selectionsString = selections
            .map((selection) => {
                const text = editor.document.getText(selection)
                return `${text}: \${${text}}`
            })
            .join(' || ')

        const logString = `console.log(\`${fileName} ~ ${functionName} ~ ${selectionsString}\`)`

        const position = editor.selection.end
        // Move to the next line after the selection
        const nextLinePosition = position.translate(1, 0)

        // Insert the log string at the beginning of the next line
        await editor.edit((editBuilder) => {
            // Insert the log string at the beginning of the next line
            editBuilder.insert(nextLinePosition, `\n${logString}\n`)
        })

        // Move the cursor to the newly inserted log
        const newCursorPosition = nextLinePosition.translate(0, logString.length + 1) // Move to the end of the log
        editor.selection = new vscode.Selection(newCursorPosition, newCursorPosition)
        editor.revealRange(new vscode.Range(newCursorPosition, newCursorPosition))
    })

    context.subscriptions.push(disposable)
}

const getFunctionName = (editor, position) => {
    const line = editor.document.lineAt(position.line).text

    // Combined regex for both regular and arrow functions
    const functionRegex = /(?:function\s+(\w+)|(\w+)\s*=\s*\(\s*\)\s*=>)/

    const match = line.match(functionRegex)
    if (match) {
        // Check which capturing group matched
        return match[1] || match[2]
    }

    // Fallback: Look back through the document for function declarations
    const lines = editor.document.getText().split('\n')
    for (let i = position.line; i >= 0; i--) {
        const match = lines[i].match(functionRegex)
        if (match) {
            return match[1] || match[2] // Return the function name (from either regular or arrow function)
        }
    }

    return ''
}

const deactivate = () => {}

module.exports = {
    activate,
    deactivate,
}
