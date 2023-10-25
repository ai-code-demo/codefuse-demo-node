/**
 * @title copy files
 * @description Copy the files from the source directory to the target directory
 * @example node copy-files.js build dist
 * @author liufu.lf
 * @todo 选中某段函数,右键点击 解释代码/添加注释/生成单测/优化代码等按钮 尝试试用插件功能
 */
const fs = require("fs");
const path = require("path");
const arg = process.argv.splice(2);
const source = arg[0] || "/path/to/source";
const target = arg[1] || "/path/to/target";

const sourceDir = path.resolve(__dirname, source);
const targetDir = path.resolve(__dirname, target);

/**
 * @param {string} src
 * @param {string} dest
 * @param {function} callback
 * @description
 */
const copyDirectory = (src, dest, callback) => {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, files) => {
      if (err) {
        callback(err);
        return;
      }
      files.forEach((item) => {
        const currentPath = path.resolve(copySrc, item);
        fs.stat(currentPath, (error, stat) => {
          if (error) {
            callback(error);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);
            if (stat.isFile()) {
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
            } else if (stat.isDirectory()) {
              // If it is directory, recursively
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};

copyDirectory(sourceDir, targetDir, (err) => {
  console.error(err);
});
