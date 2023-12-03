const { writeFileSync } = require('fs');
const path = require('path');

function addDocWrt(count) {
    if (!count) return '<p>End level</p>';
    return (
        `<div>
    <p>Level ${count}</p>
    <scr` +
        `ipt>documnet.write(\`${addDocWrt(count - 1)}\`)</<scr` +
        `ipt>
    </div>`
    );
}

writeFileSync(path.resolve(__dirname, 'N.html'), addDocWrt(5));
