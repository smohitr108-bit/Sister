# The Secret Gift — Nandu Edition

A mobile-friendly, futuristic sister-surprise website featuring the message “Nandani is the best sister 💜✨” built with plain HTML, CSS, and JavaScript. No npm packages, API key, or internet connection is required.

## Run it in VS Code

1. Extract `The_Secret_Gift.zip`.
2. Open VS Code.
3. Select **File → Open Folder...** and choose the extracted `The_Secret_Gift` folder.
4. Open `index.html`.
5. Easiest option: install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.
6. Or open `index.html` directly in your browser. Most features work without a local server.

## PowerShell commands

If you extracted the ZIP to your Desktop:

```powershell
cd "$env:USERPROFILE\Desktop\The_Secret_Gift"
code .
```

If `code .` is not recognized, open VS Code manually and choose **File → Open Folder...**.

## Secret code and hint

Open `script.js` and change these lines near the top:

```javascript
const SECRET_CODE = "nandu";
const HINT = "the name of this special person";
```

The default passcode is `nandu` (capital letters also work). Change both values to your own. This is only a front-end surprise lock: anyone who can inspect the JavaScript can find the passcode. Do not use it to protect private or sensitive information.

## Personalise the letter

In `script.js`, edit the four strings inside `LETTER_PARAGRAPHS`. The page also has a button to edit the letter temporarily during the current visit; that temporary edit resets after refreshing.

## Background music

Click **Sound off** in the top-right corner. The website generates a gentle original ambient melody in the browser using the Web Audio API, so there is no separate music file. Browsers require a user click before sound can play.

## Files

- `index.html` — page structure and content
- `style.css` — futuristic design, responsive layout, animations
- `script.js` — passcode, surprise messages, letter editor, stars, and original audio

## Run it again later

Open PowerShell and run:

```powershell
cd "$env:USERPROFILE\Desktop\The_Secret_Gift"
code .
```

Then right-click `index.html` → **Open with Live Server**. If you use a different extraction folder, replace the path with that folder's actual path.
