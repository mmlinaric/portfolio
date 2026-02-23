const COMMANDS = {
    help: () => [
        'available commands:',
        '  whoami       — who is this guy',
        '  ls           — list pages',
        '  skills       — technical skills',
        '  contact      — how to reach me',
        '  cd <page>    — change directory (navigate to page)',
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
        'languages:   Python, Java, Bash, PHP',
        'devops:      Docker, Ansible, GitLab CI',
        'systems:     Linux, Nginx, PostgreSQL, Redis',
        'networking:  MikroTik, DNS, HTTP, SSL/TLS, load balancing, firewalls',
        'tools:       Git, vim, Intellij, tmux'
    ],
    contact: () => [
        'email:    mario@mariomlinaric.xyz',
        'github:   github.com/mmlinaric',
    ],
    cd: (page) => {
        const pages = {
            'home': '/',
            'about': '/about/',
            'skills': '/skills/',
            'projects': '/projects/',
            'blog': '/posts/',
            'contact': '/contact/',
            'root': '/',
            '/': '/'
        };
        
        if (!page) {
            return ['usage: cd <page>', 'available pages: home, about, skills, projects, blog, contact'];
        }
        
        const target = pages[page.toLowerCase()];
        if (target) {
            window.location.href = target;
            return '__EXIT__';
        } else {
            return [`cd: no such directory: ${page}`];
        }
    },
    clear: () => '__CLEAR__',
    exit: () => '__EXIT__',
};

const UNKNOWN = (cmd) => [`command not found: ${cmd}`, `type 'help' for available commands`];

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
    if (!statusBar) console.error('Status bar element not found. Terminal will not work.');

    const overlay = document.getElementById('term-overlay');
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

            const parts = raw.toLowerCase().split(' ');
            const cmd = parts[0];
            const args = parts.slice(1);
            const handler = COMMANDS[cmd];

            if (handler) {
                const result = handler(args.length > 0 ? args[0] : undefined);
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

// Navigation toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
      
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
});