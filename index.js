const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    fs.readdir("./files", (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.render("index", { files: files });
    });
});

app.post("/create", function (req, res) {
    const fileName = req.body.title.split(" ").join("_") + ".txt"; // Fix applied
    const filePath = path.join(__dirname, "files", fileName);

    fs.writeFile(filePath, req.body.details, function (err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error creating task");
        }
        res.redirect("/");
    });
});

app.listen(8000, () => console.log("Server running on port 8000"));
