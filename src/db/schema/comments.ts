import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { usersTable } from "./users";

// commentsテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(comments)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const commentsTable = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: t.varchar({ length: 256 }),
  postId: t.integer("post_id").references(() => postsTable.id),
  ownerId: t.integer("owner_id").references(() => usersTable.id),
});
