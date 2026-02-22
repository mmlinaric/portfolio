// terminal.js — fake interactive terminal for status bar
// Place this file in your Hugo static/js/ folder
// Add <script src="/js/terminal.js"></script> before </body>

const COMMANDS = {
    help: () => [
        'available commands:',
        '  whoami       — who is this guy',
        '  ls           — list pages',
        '  skills       — technical skills',
        '  contact      — how to reach me',
        '  clear        — clear terminal',
        '  exit         — close terminal',
    ],
    whoami: () => [
        'mario — college student',
        'specializing in backend development, DevOps, and Linux administration',
        'currently building cool things and drinking too much coffee',
    ],
    ls: () => [
        'drwxr-xr-x  home/',
        'drwxr-xr-x  about/',
        'drwxr-xr-x  skills/',
        'drwxr-xr-x  projects/',
        'drwxr-xr-x  blog/',
        'drwxr-xr-x  contact/',
    ],
    skills: () => [
        'languages:   python, go, bash, javascript',
        'devops:      docker, kubernetes, ansible, terraform',
        'systems:     linux, nginx, postgresql, redis',
        'tools:       git, vim, tmux',
    ],
    contact: () => [
        'email:    mario@example.com',
        'github:   github.com/mario',
        'linkedin: linkedin.com/in/mario',
    ],
    clear: () => '__CLEAR__',
    exit: () => '__EXIT__',
};

const UNKNOWN = (cmd) => [`command not found: ${cmd}`, `type 'help' for available commands`];

// --- build the terminal overlay ---
function createTerminal() {
    const overlay = document.createElement('div');
    overlay.id = 'term-overlay';
    overlay.innerHTML = `
        <div id="term-output"></div>
        <div id="term-input-line">
            <span id="term-prompt">mario@portfolio:~$</span>
            <input id="term-input" type="text" autocomplete="off" spellcheck="false" autofocus />
        </div>
    `;
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
        #term-overlay {
            display: none;
            position: fixed;
            bottom: 26px; /* sits just above status bar */
            left: 0;
            width: 100%;
            max-height: 260px;
            background: #0d0d0d;
            border-top: 1px solid #333;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
            color: #e0e0e0;
            box-sizing: border-box;
            flex-direction: column;
            z-index: 999;
        }
        #term-overlay.open {
            display: flex;
        }
        #term-output {
            flex: 1;
            overflow-y: auto;
            padding: 10px 12px 4px;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .term-line {
            white-space: pre;
            line-height: 1.5;
        }
        .term-line.cmd {
            color: #569cd6;
        }
        .term-line.out {
            color: #aaa;
        }
        .term-line.err {
            color: #f48771;
        }
        #term-input-line {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-top: 1px solid #222;
        }
        #term-prompt {
            color: #569cd6;
            white-space: nowrap;
            flex-shrink: 0;
        }
        #term-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #e0e0e0;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
            caret-color: #e0e0e0;
        }
    `;
    document.head.appendChild(style);

    return overlay;
}

function printLines(output, lines, type = 'out') {
    lines.forEach(text => {
        const div = document.createElement('div');
        div.className = `term-line ${type}`;
        div.textContent = text;
        output.appendChild(div);
    });
    output.scrollTop = output.scrollHeight;
}

function initTerminal() {
    const statusBar = document.querySelector('.status-bar');
    if (!statusBar) return;

    const overlay = createTerminal();
    const output = document.getElementById('term-output');
    const input = document.getElementById('term-input');
    const history = [];
    let historyIndex = -1;

    // clicking status bar opens/focuses terminal
    statusBar.style.cursor = 'pointer';
    statusBar.addEventListener('click', () => {
        overlay.classList.toggle('open');
        if (overlay.classList.contains('open')) {
            input.focus();
            if (output.children.length === 0) {
                printLines(output, ["welcome. type 'help' for available commands."], 'out');
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = input.value.trim();
            input.value = '';
            historyIndex = -1;

            if (!raw) return;
            history.unshift(raw);

            // echo the command
            printLines(output, [`mario@portfolio:~$ ${raw}`], 'cmd');

            const cmd = raw.toLowerCase().split(' ')[0];
            const handler = COMMANDS[cmd];

            if (handler) {
                const result = handler();
                if (result === '__CLEAR__') {
                    output.innerHTML = '';
                } else if (result === '__EXIT__') {
                    overlay.classList.remove('open');
                } else {
                    printLines(output, result, 'out');
                }
            } else {
                printLines(output, UNKNOWN(raw), 'err');
            }
        }

        // arrow up/down for history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) historyIndex++;
            input.value = history[historyIndex] || '';
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) historyIndex--;
            else { historyIndex = -1; input.value = ''; }
            input.value = historyIndex >= 0 ? history[historyIndex] : '';
        }

        // escape closes
        if (e.key === 'Escape') {
            overlay.classList.remove('open');
        }
    });
}

document.addEventListener('DOMContentLoaded', initTerminal);