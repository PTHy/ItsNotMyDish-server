const path = require('path');
const fs = require('fs-extra');

exports.checkImage = (file) => {
  const fileRegular = /image\/*/;

  console.log('file type: ', file.type);

  if (!fileRegular.test(file.type)) {
    return false;
  }

  return true;
};

exports.upload = async (file) => {
  try {
    console.log(file.path);
    const data = await fs.readFile(file.path);
    const fileName = file.name + path.extname(file.name);
    const filePath = path.join('public', file.type, fileName);

    await fs.ensureDir(path.dirname(filePath));
    await fs.outputFile(filePath, data);

  } catch (error) {
    console.log('파일 업로드 에러 발생함');
    console.log(error.message);

    throw error;
  }
};
