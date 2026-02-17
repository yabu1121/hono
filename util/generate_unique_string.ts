
// 12桁のランダムな文字列を作成する関数。返り値をstringとtsで宣言している。
// 引数はlengthとして受け取り、tsで型はnumber, デフォルト値12と宣言している。
export const generateUniqueString = (length: number = 12): string =>  {
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