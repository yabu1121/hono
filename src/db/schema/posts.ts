import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { generateUniqueString } from "../../util/generate_unique_string";
import { usersTable } from "./users";

// postsテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(posts)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const postsTable = table("posts", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(), // ok
    // $はdrizzleの命名規則、実行時に動かす関数は$が多い。自作関数を動かすときはsqlのdefaultにしたい。
    // nowとかなら$いらないdrizzleのdefaultでいい？？
    slug: t.varchar().$default(() => generateUniqueString(16)), 
    title: t.varchar({ length: 256 }), // ok 
    ownerId: t.integer("owner_id").references(() => usersTable.id), // owner_idとしてusersのidをfk参照している。
  },
  (table) => [
    // tableのslug内でindex被りを許さない。
    t.uniqueIndex("slug_idx").on(table.slug),
    // tableのtitleごとに1,2,3,,,とindexを与えておく。
    // これによりOrderをグンと下げることができる。検索機能をつけるときは置いておきたい。
    t.index("title_idx").on(table.title),
  ]
);
