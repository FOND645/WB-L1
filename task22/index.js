const { writeFileSync } = require("fs")
const path = require("path")

function addDocWrt(count) {
    if (!count) return '<p>End level</p>'
    return `<div>
        <p>Level ${count}</p>
        <script>documnet.write(
            \`${addDocWrt(count - 1)}\`
        )</script>
    </div>`
}


writeFileSync(path.resolve(__dirname, 'N.html'), addDocWrt(5))