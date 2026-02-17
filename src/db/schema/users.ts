import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { rolesEnum } from "../helpers/enums";

// Enum 制約、　rolesという名前で、配列内のどれかに該当するように選択する。


// usersテーブル。const 以降にtsでの名前、
// 第一引数にデータベースのテーブル名、(users)
// 第二引数にデータベースにテーブルに入れ込むカラムのオブジェクトを入れ込む。
// 第三引数は 「テーブル全体にかかる制約やインデックス」 を定義する場所です
export const usersTable = table("users", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(), // ok
    firstName: t.varchar("first_name", { length: 256 }), // ok
    lastName: t.varchar("last_name", { length: 256 }), // ok
    email: t.varchar().notNull(), // ok
    // 自己参照しているけどanypgcolumnがないとtsの循環参照に引っかかる。。
    invitee: t.integer().references((): AnyPgColumn => usersTable.id),
    role: rolesEnum().default("guest"), // ok
  }, // この第三引数は何を表しているのかわからない。
  (table) => [
    // uniqueIndex(一意制約)
    t.uniqueIndex("email_idx").on(table.email)
  ]
);