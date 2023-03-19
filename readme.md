# placeImage
ダミー画像生成サービスの雛形

## 使い方
下記のように幅と高さを指定すれば画像を取得できます。

注意：幅1920px、高さ1080px以上の指定は、1920px、1080pxにそれぞれリサイズされますのでご注意下さい。
また、4桁以上の数字を入力した場合や数値以外の値を入力した場合は404エラーとなります。

```
http://localhost:3000/400/300
```