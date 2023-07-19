const express = require("express");
const multer = require("multer");
const app=express();
const mongoose=require("mongoose");
// Configure Multer for file upload
const upload = multer({ dest: "uploads/" });


const dbURL ="mongodb+srv://rayhon:samo@cluster0.dunl99r.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(dbURL);
} catch (err) {
  console.log(err);
}
const Photo = mongoose.model("Photo", { image: String });

// Route for file upload
app.post("/api/upload", upload.single("photo"), async (req, res) => {
  try {
    // Create a new photo document and save it to the database
    const newPhoto = new Photo({ image: req.file.filename });
    await newPhoto.save();

    res.status(201).json({ message: "Photo uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading photo" });
  }
});

app.listen(3001,()=>{
    console.log("listen on 3001");
})