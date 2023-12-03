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

setTimeout(() => document.write(addDocWrt(12)), 4000);
