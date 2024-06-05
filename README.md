# TodoList 前端專案

用 Angular 框架練習前端開發。目前實作了以下模組：

- 登入模組
    - 輸入帳號密碼並驗證
- 待辦事項模組
    - 新增、完成、刪除待辦事項

為了方便開發，本專案暫時使用Node.js環境的JSON Server作為後端(port:4000)提供REST API。

## 專案介紹
實作一個簡單的 TodoList 應用程式來學習 Angular 框架。使用者可以新增待辦事項、標記待辦事項為已完成以及刪除待辦事項。
目前未建立註冊模組，僅用預設帳號測試多帳戶功能。

- 登入模組：
    - 具有帳號驗證機制，以顏色提醒使用者輸入正確長度的帳號與密碼

    ![image](https://github.com/Alan-Cheng/Angular-TodoList/blob/master/login.png)

    - 帳號密碼錯誤會有提示

    ![image](https://github.com/Alan-Cheng/Angular-TodoList/blob/master/login_fail.png)

- 待辦事項模組：
    - 獨立的代辦事項清單，且可用下方過濾器篩選「全部、已完成、未完成」等待辦
    - 可清除全部代辦事項
    
    ![image](https://github.com/Alan-Cheng/Angular-TodoList/blob/master/todolist.png)
