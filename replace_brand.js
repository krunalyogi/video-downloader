const fs = require('fs');
const path = require('path');

const directories = ['frontend', 'backend'];
const fileExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === 'node_modules' || file === '.next' || file === 'dist') continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fileExtensions.some(ext => fullPath.endsWith(ext))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // 1. Replace domain strings first
            newContent = newContent.replace(/klipto\.vercel\.app/g, 'kliptify.com');
            newContent = newContent.replace(/klipto\.com/g, 'kliptify.com');
            newContent = newContent.replace(/klipto\.app/g, 'kliptify.com');
            newContent = newContent.replace(/twitter\.com\/klipto/g, 'twitter.com/kliptify');
            newContent = newContent.replace(/instagram\.com\/klipto/g, 'instagram.com/kliptify');
            newContent = newContent.replace(/github\.com\/klipto/g, 'github.com/kliptify');

            // 2. Case-sensitive text replacements
            newContent = newContent.replace(/Klipto/g, 'Kliptify');
            newContent = newContent.replace(/klipto/g, 'kliptify');
            newContent = newContent.replace(/KLIPTO/g, 'KLIPTIFY');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Rebranded ${fullPath}`);
            }
        }
    }
}

directories.forEach(dir => {
    processDirectory(path.join(__dirname, dir));
});
console.log('Rebranding complete.');
