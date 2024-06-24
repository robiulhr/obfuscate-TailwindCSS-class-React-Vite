import fs from 'fs'

function findAndReplaceInIndexFiles(rootDir, replacements) {
    fs.readdirSync(rootDir).forEach(fileName => {
        if (fileName.startsWith('index') && fileName.endsWith(".js") && fs.statSync(`${rootDir}/${fileName}`).isFile()) {
            const filePath = `${rootDir}/${fileName}`;
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let updatedContent = fileContent;
            updatedContent = updatedContent.replace(/className(.{1,4}\w+(\s|-)\w+)+"/g, matchedClasses => {
                let changedClasses = matchedClasses;
                for (let key in replacements) {
                    if (matchedClasses.match(key)) {
                        changedClasses = changedClasses.replace(key, replacements[key]);
                    }
                }
                console.log(changedClasses, "changedClasses")
                return changedClasses;
            })
            if (updatedContent !== fileContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated file: ${filePath}`);
            }
        }
    }
    );
}

fs.readFile('classesMap.json', 'utf-8', (err, data) => {
    if (err) console.log("someting went wrong reading the classesMap.json")
    findAndReplaceInIndexFiles('./dist/assets', JSON.parse(data));
})