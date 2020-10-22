const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post("/save", (req, res) => {
  const base64Data = req.body.imageFile.replace(/^data:image\/png;base64,/, "");
  const fileName = `img-${Date.now()}.png`;
  fs.writeFile(`uploads/${fileName}`, base64Data, 'base64', (err) => {
    if(err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ success: "File saved successfully" });
    }
  });
});

router.get("/allFiles", (req, res) => {
  const directoryPath = path.join(__dirname, '../../uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
    
      //listing all files using forEach
      files.reverse();
      let fileList = [];
      files.forEach(function (file) {
        const filePath = `${req.protocol}://${req.headers.host}/uploads/${file}`;
        fileList.push(filePath);
      });
      res.status(200).json(fileList);
    }
  });
});

module.exports = router;
