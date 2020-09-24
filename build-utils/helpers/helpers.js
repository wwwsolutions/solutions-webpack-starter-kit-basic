// import fs from 'fs';
// import path from 'path';

const fs = require('fs')
const path = require('path')


const appDirectory = fs.realpathSync(process.cwd());

// export const resolveAbs = relativePath => path.resolve(appDirectory, relativePath);
const resolveAbs = relativePath => path.resolve(appDirectory, relativePath);

module.exports = resolveAbs;

