
/*
  POST localhost:3000/upload
*/  

exports.imageUpload = async (req,res) => {
  console.log(req.file);

  res.json({
    status: 200,
    message: "사진이 업로드되었습니다",
    path: req.file.filename,
  })
};