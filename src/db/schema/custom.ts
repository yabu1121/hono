import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

// Enum 制約、　rolesという名前で、配列内のどれかに該当するように選択する。
export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);


// usersテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(users)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const users = table("users", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(), // ok
    firstName: t.varchar("first_name", { length: 256 }), // ok
    lastName: t.varchar("last_name", { length: 256 }), // ok
    email: t.varchar().notNull(), // ok
    // 自己参照しているけどanypgcolumnがないとtsの循環参照に引っかかる。。
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"), // ok
  }, // この第三引数は何を表しているのかわからない。
  (table) => [
    // uniqueIndex(一意制約)
    t.uniqueIndex("email_idx").on(table.email)
  ]
);

// postsテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(posts)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const posts = table("posts", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(), // ok
    // $はdrizzleの命名規則、実行時に動かす関数は$が多い。自作関数を動かすときはsqlのdefaultにしたい。
    // nowとかなら$いらないdrizzleのdefaultでいい？？
    slug: t.varchar().$default(() => generateUniqueString(16)), 
    title: t.varchar({ length: 256 }), // ok 
    ownerId: t.integer("owner_id").references(() => users.id), // owner_idとしてusersのidをfk参照している。
  },
  (table) => [
    // tableのslug内でindex被りを許さない。
    t.uniqueIndex("slug_idx").on(table.slug),
    // tableのtitleごとに1,2,3,,,とindexを与えておく。
    // これによりOrderをグンと下げることができる。検索機能をつけるときは置いておきたい。
    t.index("title_idx").on(table.title),
  ]
);


// commentsテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(comments)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: t.varchar({ length: 256 }),
  postId: t.integer("post_id").references(() => posts.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});


// 12桁のランダムな文字列を作成する関数。返り値をstringとtsで宣言している。
// 引数はlengthとして受け取り、tsで型はnumber, デフォルト値12と宣言している。
function generateUniqueString(length: number = 12): string {
  // charactersは使える文字をすべて列挙している文字列。
  // uniquestringで空の文字列を宣言し、今後この文字列にランダムな文字列を入れ込んでいく。
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";
  // lengthまで繰り返してランダムな数(0 ~ 1)が出力されるのでそれをcharacters.lengthとかけることで取得できる。
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}