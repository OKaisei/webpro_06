const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let starwars = [
  { id: 1, name_en: "Millennium Falcon", name_jp: "ミレニアム・ファルコン", type: "軽貨物船(改造型)", affiliation: "反乱軍，レジスタンス", appearance: "Episode IV: A New Hope", owners_pilots: "ハン・ソロ" },
  { id: 2, name_en: "X-wing Starfighter", name_jp: "Xウィング・スターファイター", type: "星間戦闘機", affiliation: "反乱軍", appearance: "Episode IV: A New Hope", owners_pilots: "ルーク・スカイウォーカー" },
  { id: 3, name_en: "Imperial Star Destroyer", name_jp: "スター・デストロイヤー", type: "主力艦", affiliation: "銀河帝国軍", appearance: "Episode IV: A New Hope", owners_pilots: "ダース・ベイダー" },
  { id: 4, name_en: "TIE Advanced x1", name_jp: "TIEアドバンストx1", type: "試作戦闘機", affiliation: "銀河帝国軍", appearance: "Episode IV: A New Hope", owners_pilots: "ダース・ベイダー" },
  { id: 5, name_en: "Slave I", name_jp: "スレーヴI", type: "パトロール攻撃艇", affiliation: "賞金稼ぎ", appearance: "Episode V: The Empire Strikes Back", owners_pilots: "ボバ・フェット" }
];

let cars = [
  { id: 1, manufacturer: "Toyota", model_en: "Supra", model_jp: "スープラ", driver: "ブライアン・オコナー", color: "オレンジ", appearance: "ワイルド・スピード" },
  { id: 2, manufacturer: "Dodge", model_en: "Charger", model_jp: "チャージャー", driver: "ドミニク・トレット", color: "黒", appearance: "ワイルド・スピード" },
  { id: 3, manufacturer: "Nissan", model_en: "Skyline GT-R R34", model_jp: "スカイライン GT-R", driver: "ブライアン・オコナー", color: "シルバー/ブルー", appearance: "ワイルド・スピード X2" },
  { id: 4, manufacturer: "Mazda", model_en: "RX-7 Fortune", model_jp: "RX-7", driver: "ハン", color: "オレンジ/黒", appearance: "ワイルド・スピード X3 TOKYO DRIFT" },
  { id: 5, manufacturer: "Mitsubishi", model_en: "Eclipse", model_jp: "エクリプス", driver: "ブライアン・オコナー", color: "緑", appearance: "ワイルド・スピード" }
];

let transformers = [
  { id: 1, name_en: "Optimus Prime", name_jp: "オプティマス・プライム", faction: "オートボット", alt_mode: "トレーラートラック", appearance: "トランスフォーマー(2007)", rank: "総司令官" },
  { id: 2, name_en: "Megatron", name_jp: "メガトロン", faction: "ディセプティコン", alt_mode: "エイリアン・ジェット", appearance: "トランスフォーマー(2007)", rank: "破壊大帝" },
  { id: 3, name_en: "Bumblebee", name_jp: "バンブルビー", faction: "オートボット", alt_mode: "シボレー・カマロ", appearance: "トランスフォーマー(2007)", rank: "情報員" },
  { id: 4, name_en: "Starscream", name_jp: "スタースクリーム", faction: "ディセプティコン", alt_mode: "F-22 ラプター", appearance: "トランスフォーマー(2007)", rank: "航空参謀" },
  { id: 5, name_en: "Ironhide", name_jp: "アイアンハイド", faction: "オートボット", alt_mode: "GMC・トップキック", appearance: "トランスフォーマー(2007)", rank: "武器担当" }
];

// 一覧表示
app.get("/starwars", (req, res) => {
  res.render('starwars_list', { data: starwars });
});

// 詳細表示
app.get("/starwars/:id", (req, res) => {
  const i = req.params.id;
  res.render('starwars_detail', { data: starwars[i] });
});

// 編集画面
app.get("/starwars/edit/:id", (req, res) => {
  const i = req.params.id;
  res.render('starwars_edit', { data: starwars[i] });
});

// 更新処理
app.post("/starwars/update/:id", (req, res) => {
  const i = req.params.id;
  starwars[i].name_en = req.body.name_en;
  starwars[i].name_jp = req.body.name_jp;
  starwars[i].type = req.body.type;
  starwars[i].affiliation = req.body.affiliation;
  starwars[i].appearance = req.body.appearance;
  starwars[i].owners_pilots = req.body.owners_pilots;
  res.redirect('/starwars');
});

// 追加処理
app.get("/starwars_add", (req, res) => {
  let newdata = {
    id: starwars.length + 1,
    name_en: req.query.name_en,
    name_jp: req.query.name_jp,
    type: req.query.type,
    affiliation: req.query.affiliation,
    appearance: req.query.appearance,
    owners_pilots: req.query.owners_pilots
  };
  starwars.push(newdata);
  res.redirect('/starwars');
});



// 一覧表示
app.get("/cars", (req, res) => {
  res.render('cars_list', { data: cars });
});

// 詳細表示
app.get("/cars/:id", (req, res) => {
  const i = req.params.id;
  res.render('cars_detail', { data: cars[i] });
});

// 編集画面
app.get("/cars/edit/:id", (req, res) => {
  const i = req.params.id;
  res.render('cars_edit', { data: cars[i] });
});

// 更新処理
app.post("/cars/update/:id", (req, res) => {
  const i = req.params.id;
  cars[i].manufacturer = req.body.manufacturer;
  cars[i].model_en = req.body.model_en;
  cars[i].model_jp = req.body.model_jp;
  cars[i].driver = req.body.driver;
  cars[i].color = req.body.color;
  cars[i].appearance = req.body.appearance;
  res.redirect('/cars');
});

// 追加処理
app.get("/cars_add", (req, res) => {
  let newdata = {
    id: cars.length + 1,
    manufacturer: req.query.manufacturer,
    model_en: req.query.model_en,
    model_jp: req.query.model_jp,
    driver: req.query.driver,
    color: req.query.color,
    appearance: req.query.appearance
  };
  cars.push(newdata);
  res.redirect('/cars');
});


// 一覧表示
app.get("/transformers", (req, res) => {
  res.render('tf_list', { data: transformers });
});

// 詳細表示
app.get("/transformers/:id", (req, res) => {
  const i = req.params.id;
  res.render('tf_detail', { data: transformers[i] });
});

// 編集画面
app.get("/transformers/edit/:id", (req, res) => {
  const i = req.params.id;
  res.render('tf_edit', { data: transformers[i] });
});

// 更新処理 (POSTメソッドを使用)
app.post("/transformers/update/:id", (req, res) => {
  const i = req.params.id;
  transformers[i].name_en = req.body.name_en;
  transformers[i].name_jp = req.body.name_jp;
  transformers[i].faction = req.body.faction;
  transformers[i].alt_mode = req.body.alt_mode;
  transformers[i].appearance = req.body.appearance;
  transformers[i].rank = req.body.rank;
  res.redirect('/transformers');
});

// 追加処理 (GETメソッドのクエリパラメータを使用)
app.get("/transformers_add", (req, res) => {
  let newdata = {
    id: transformers.length + 1,
    name_en: req.query.name_en,
    name_jp: req.query.name_jp,
    faction: req.query.faction,
    alt_mode: req.query.alt_mode,
    appearance: req.query.appearance,
    rank: req.query.rank
  };
  transformers.push(newdata);
  res.redirect('/transformers');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));

