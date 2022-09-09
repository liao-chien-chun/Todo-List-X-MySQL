# Todo-List x sequelize
使用Node.js 和express、sequelize，搭配MySQL 打造的Todo-List

&nbsp;
## 功能介紹

* 使用者可以使用email 註冊
* 註冊失敗給與提示訊息
* 使用者必須登入之後 才能使用以下功能
* 使用者可以使用 facebook 登入
* 登入失敗、註冊失敗都有提示訊息
* 使用者可以新增自己的Todo
* 使用者可以修改自己的Todo
* 使用者可以刪除自己的Todo
* 使用者只能看到自己的Todo

## 如何使用(安裝與執行)
1. 確認有安裝node.js 與npm，有安裝MySQL 與 MySQLWorkbench
2. 將專案clone到本地
3. 在本地端開啟後透過終端機進入資料夾中
4. 在終端機輸入
   ```bash
   npm init
   ```
5. 參考 .env.exanple 建立 env檔案，並填入自己的資訊
6. 開啟伺服器
   ```bash
   npm run dev
   ```
7. 當 terminal 出現以下字樣，表示伺服器已啟動完成
   ```bash
   server is running on localhost:3000
   ```
8. 打開瀏覽器網址列輸入 http://localhost:3000/ 可以看到本專案的網頁呈現
