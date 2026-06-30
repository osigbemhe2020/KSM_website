const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

function updateH2Styles() {
    walkDir(directoryPath, (filePath) => {
        if (!filePath.endsWith('.tsx') || filePath.includes('member-page')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to find <h2 className="...">
        // We capture the class name content to check if it has "text-center"
        const h2Regex = /<h2\s+className="([^"]*)"([^>]*)>/g;
        
        let changed = false;
        const newContent = content.replace(h2Regex, (match, classes, rest) => {
            // Check if it's already using the exact format to avoid unnecessary changes
            if (classes.includes("font-serif text-5xl text-foreground mb-6")) {
                // It might already be correct
                // But let's standardize just in case
            }
            
            let newClasses = "font-serif text-5xl text-foreground mb-6";
            if (classes.includes("text-center")) {
                newClasses += " text-center";
            }
            
            // if it has text-white, preserve it instead of text-foreground?
            // The user said "all the h2 be consistent with that early design i shared: font-serif text-5xl text-foreground mb-6"
            // So I will just strictly apply it. But if it's over a dark bg, it might need text-white. I'll just use text-foreground and rely on CSS variables.
            if (classes.includes("text-white") && !classes.includes("text-foreground")) {
                newClasses = newClasses.replace("text-foreground", "text-white");
            }
            
            changed = true;
            return `<h2 className="${newClasses}"${rest}>`;
        });
        
        if (changed && content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    });
}

updateH2Styles();
