const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/courses.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

if (!content.includes('price: number;')) {
    content = content.replace(
        '  image?: string;\n}',
        '  image?: string;\n  price: number;\n}'
    );
    
    // We add price: 499, right after title: "..."
    content = content.replace(/title: "([^"]+)",/g, 'title: "$1",\n    price: 499,');
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Successfully updated courses.tsx with price fields.');
} else {
    console.log('Price already added.');
}
