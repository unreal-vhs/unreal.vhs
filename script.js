// ===== BOOT SEQUENCE =====
const bootLines = [
    '',
    '  ██╗   ██╗███╗   ██╗██████╗ ███████╗ █████╗ ██╗     ██╗   ██╗██╗  ██╗███████╗',
    '  ██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██║     ██║   ██║██║  ██║██╔════╝',
    '  ██║   ██║██╔██╗ ██║██████╔╝█████╗  ███████║██║     ██║   ██║███████║███████╗',
    '  ██║   ██║██║╚██╗██║██╔══██╗██╔══╝  ██╔══██║██║     ██║   ██║██╔══██║╚════██║',
    '  ╚██████╔╝██║ ╚████║██║  ██║███████╗██║  ██║███████╗╚██████╔╝██║  ██║███████║',
    '   ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝',
    '',
    '  VHS SYSTEMS v2.0.26',
    '  ███████████████████████████████████░░░░░░  LOADING...',
    '',
    '  [OK] BIOS initialized',
    '  [OK] CRT phosphor warm-up complete',
    '  [OK] VHS tracking aligned',
    '  [OK] Signal acquired',
    '',
    '  > SOMETHING IS PREPARING...',
    '',
];

const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('input');

async function typeLine(text, delay = 15) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            bootText.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                bootText.textContent += '\n';
                resolve();
            }
        }, delay);
    });
}

async function runBoot() {
    for (const line of bootLines) {
        const delay = line.includes('████') ? 2 : (line.includes('[OK]') ? 30 : 12);
        await typeLine(line, delay);
    }
    
    // Glitch transition
    await sleep(800);
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 0.5s';
    await sleep(500);
    bootScreen.classList.add('hidden');
    terminal.classList.remove('hidden');
    input.focus();
    
    // Welcome message
    print('');
    print('  Welcome to UNREAL.VHS', 'bright');
    '  AI-generated stories from the liminal void'.split('').forEach(() => {});
    print('  AI-generated stories from the liminal void', 'dim');
    print('');
    print('  Type "help" to begin.');
    print('');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== TERMINAL =====
function print(text, className = '') {
    const line = document.createElement('div');
    line.className = 'line' + (className ? ' ' + className : '');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function printHTML(html, className = '') {
    const line = document.createElement('div');
    line.className = 'line' + (className ? ' ' + className : '');
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// Commands
const commands = {
    help: () => {
        print('');
        print('  AVAILABLE COMMANDS', 'bright');
        print('  ─────────────────────────────');
        print('  help        Show this menu');
        print('  about       What is UNREAL.VHS?');
        print('  work        View creations');
        print('  shop        Browse the shop');
        print('  contact     Get in touch');
        print('  clear       Clear the terminal');
        print('  secret      ???');
        print('');
    },

    about: () => {
        print('');
        print('  > ABOUT UNREAL.VHS', 'bright');
        print('  ─────────────────────────────');
        print('  AI artist. Storyteller. Void explorer.');
        print('');
        print('  I create visual stories at the intersection');
        print('  of nostalgia, mythology, and liminal spaces.');
        print('  Every piece is generated with AI,');
        print('  curated with soul.');
        print('');
        print('  This is not AI slop.');
        print('  This is UNREAL.', 'bright');
        print('');
    },

    work: () => {
        print('');
        print('  > WORK', 'bright');
        print('  ─────────────────────────────');
        print('');
        print('  [01] THE LAST CORRIDOR      [LIMINAL]');
        print('  [02] NEON MEMORIES          [NOSTALGIC]');
        print('  [03] VOID TEMPLE            [MYTHIC]');
        print('  [04] STATIC DREAMS          [ETHEREAL]');
        print('  [05] MIDNIGHT POOL          [LIMINAL]');
        print('  [06] RITUAL GLOW            [MYTHIC]');
        print('');
        print('  Follow on Instagram for full gallery.', 'dim');
        print('');
    },

    shop: () => {
        print('');
        print('  > SHOP', 'bright');
        print('  ─────────────────────────────');
        print('');
        print('  PROMPTS          $5+    The void behind the art');
        print('  PRESETS/PDF      $10+   Guides & workflows');
        print('  PRINTS           $25+   Liminal art for your walls');
        print('  GOODIES          $15+   Merch for void dwellers');
        print('');
        print('  > STATUS: PREPARING...', 'dim');
        print('');
    },

    contact: () => {
        print('');
        print('  > CONTACT', 'bright');
        print('  ─────────────────────────────');
        print('  Instagram:  @unreal.vhs');
        print('  Email:      unreal@vhs.art');
        print('');
    },

    clear: () => {
        output.innerHTML = '';
    },

    secret: () => {
        print('');
        print('  > SIGNAL DETECTED...', 'bright');
        print('');
        print('  You found the void.');
        print('  Something is watching.');
        print('  Stay tuned.');
        print('');
        print('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░', 'dim');
        print('  ░░░ SIGNAL INCOMING ░░░░░░░░░', 'dim');
        print('  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░', 'dim');
        print('');
    },
};

// Input handling
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        print(`unreal@vhs:~$ ${input.value}`);
        input.value = '';
        
        if (cmd === '') return;
        
        if (commands[cmd]) {
            commands[cmd]();
        } else {
            print(`  Command not found: "${cmd}"`);
            print('  Type "help" for available commands.', 'dim');
            print('');
        }
    }
});

// Keep focus on input
document.addEventListener('click', () => input.focus());

// ===== START =====
runBoot();
