const express = require("express");
const path = require("path");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

const imagesLength = 10;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// widthとheightを1~4桁で取る
app.get("/:width([0-9]{1,4})/:height([0-9]{1,4})", async (req, res) => {
  const width = Math.min(Number(req.params.width), 1920);
  const height = Math.min(Number(req.params.height), 1080);

  let fileName = Math.floor(Math.random() * imagesLength) + 1 + ".jpg";
  let filepath = path.join(__dirname, `images/${fileName}`);

  try {
    const resizedBuffer = await sharp(filepath)
      .resize(width, height, { fit: "cover" })
      .toBuffer();

    const encodedBuffer = resizedBuffer.toString("base64");

    var img = Buffer.from(encodedBuffer, "base64");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (e) {
    res.status(404).send("<h1>404 page not found</h1>");
  }
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 page not found</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listen on port:", port));
