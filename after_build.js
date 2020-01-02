const fs = require('fs');
const path = require('path');
const util = require('util');

const target = './dist';
const dest = './done';
const enc = 'utf8';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);
const readdirAsync = util.promisify(fs.readdir);
const copyFileAsync = util.promisify(fs.copyFile);

const cssFileRegExp = /^main\.[a-z0-9A-Z]{8}\.css$/;
const srcPathRegExp = /\.[a-z0-9A-Z]{8}\./;
const fontSrcRegExp = /url\('(\/[a-zA-Z]+\.[a-z0-9]{8}\.(svg|ttf|woff2?))'\)/g;
const fontSrcNeedle = '/';
const fontSrcTarget = 'theme/';
const imgSrcTarget = 'theme/img/';

const deleteFolderRecursive = function(src) {
  if (fs.existsSync(src)) {
    fs.readdirSync(src).forEach((file, index) => {
      const curPath = path.join(src, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(src);
  }
};

async function run() {
  try {
    console.log('Searching for files...');
    const dir = await readdirAsync(target);
    deleteFolderRecursive(dest);
    await mkdirAsync(dest);
    console.log(`${dir.length} files found. Processing...`);
    await Promise.all(
      dir.map(async file => {
        const destPath = path.join(dest, file.replace(srcPathRegExp, '.'));
        if (cssFileRegExp.test(file)) {
          console.log('Css file found. Processing font paths...');
          const cssFile = await readFileAsync(path.join(target, file), enc);
          const fixedFile = cssFile.replace(fontSrcRegExp, match => {
            console.log(match);
            const replacement = match.indexOf('.svg') >= 0 ? imgSrcTarget : fontSrcTarget;
            return match.replace(srcPathRegExp, '.').replace(fontSrcNeedle, replacement);
          });
          console.log(`File processed, saving to ${destPath} ...`);
          const promise = await writeFileAsync(destPath, fixedFile, enc);
          console.log('Done');
          return promise;
        } else if (file.indexOf('.svg') < 0) {
          console.log(`File ${file}`);
          console.log(`Copying contents to: ${destPath} ...`);
          const promise = await copyFileAsync(path.join(target, file), destPath);
          return promise;
        }
      })
    );
    console.log('All files done');
  } catch (err) {
    console.error(err);
  }
}

run();
