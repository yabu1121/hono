Using hono and claudflare workers


学習したこと
prettyJSON()

エンドポイントの動的取得は
const id = c.req.param("id");

findメソッド 
調査対象の配列.find((配列の要素) => 条件)

basicAuth

process.env <= npm i dotenv

### drizzle 
どっちかで実行する
npx drizzle-kit push

npx drizzle-kit generate
npx drizzle-kit migrate

### schema 
schema
### normalization


### データベース遊び

### pokemon image generator
pokemon api => ランダムでポケモンを取得
gemini api => pokemon api で取得したポケモンのデータ()を加工し、プロンプトを作成してもらうプロンプトをたたく。
```
{
  "name": "ニダンギル",
  "en_name": "doublade",
  "image_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/680.png",
  "shiny_image_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/680.png",
  "types": "steel, ghost",
  "habitat": "unknown",
  "features": "When Honedge evolves, it divides into two swords, which cooperate via telepathy to coordinate attacks and slash their enemies to ribbons."
}
```

未実装　gemini api => そのプロンプトから画像を生成する。