# Backtic-log

Add Log to Next Line VSCode Extension
This VSCode extension allows you to insert a custom log statement to the next line of your code, making it easier to debug or trace variable values. It automatically grabs the filename, current function name, and selected text to generate the log.

---

## Features

Insert Log to Next Line: Automatically adds a log statement to the next line of code.
Formatted Log: Inserts a formatted log in the format:

`fileName ~ functionName ~ selectedText`

---

## Keybindings

Windows: Ctrl + Alt + L
macOS: Cmd + Alt + L
Linux: Ctrl + Alt + L

---

## Installation

Open VSCode.
Navigate to the Extensions Marketplace (Ctrl + Shift + X or Cmd + Shift + X on macOS).
Search for Add Log to Next Line and click Install.
Alternatively, you can clone this repository and install it manually.

---

## Usage

Select the text or place the cursor where you want to insert a log.
Press the defined keybinding for your platform (Ctrl + Alt + L on Windows/Linux or Cmd + Alt + L on macOS).
A log statement will be inserted on the next line in the following format:

`filename ~ functionName ~ selectedText`

Your cursor will automatically move to the end of the log.

---

## License

This extension is licensed under the MIT License. See LICENSE for details.
