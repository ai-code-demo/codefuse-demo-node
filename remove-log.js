/**
 * @title remove log
 * @description Remove console.log statements from your project
 * @author liufu.lf
 * @todo 选中某段函数，右键点击 解释代码/添加注释/生成单测/优化代码等按钮 尝试试用插件功能
 */
const fs = require("fs");
const path = require("path");

// The root directory to be processed.
const rootDirectory = "/path/to/your/project";

/**
 *
 * @param {string} dir
 * @description Recursively traverse directories, search and replace console.log statements in files.
 */
const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (stat.isFile() && file.endsWith(".js")) {
      processFile(filePath);
    }
  }
};

/**
 * @param {string} filePath
 * @description Search and replace console.log statements.
 */
const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(/console\.log\(.+?\);?/g, "");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Removed console.log statements from: ${filePath}`);
};

// Start process
processDirectory(rootDirectory);
