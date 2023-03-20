const express = require("express");
const path = require("path");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

// 画像の数を入れる定数
const imagesLength = 10;

// 他のサービスで利用する場合にCORSエラーが起きないようにするやつ（ローカルだけならいらない）
app.use(cors());

// indexページの生成
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// widthとheightを1~4桁で取ってランダムな画像をトリミングして表示
app.get("/:width([0-9]{1,3})/:height([0-9]{1,3})", async (req, res) => {
  const width = Math.min(Number(req.params.width), 512);
  const height = Math.min(Number(req.params.height), 512);

  let fileName = Math.floor(Math.random() * imagesLength) + 1 + ".png";
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
