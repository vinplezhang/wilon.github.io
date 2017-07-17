
### 分配权限 GRANT
```sql
    GRANT ALL PRIVILEGES ON *.* TO 'weilong'@'192.168.3.94' IDENTIFIED BY 'mypwd' WITH GRANT OPTION;
    GRANT Select ON *.* TO 'weilong'@'172.30.%' IDENTIFIED BY "Wwl_Jumpbox_666";
    flush privileges;
```

### 更改用户密码
```sql
    mysql -u root
    mysql> use mysql;
    mysql> UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';
    mysql> FLUSH PRIVILEGES;
```

### 更改用户可访问HOST
```sql
    mysql> use mysql;
    mysql> UPDATE user SET host='%' WHERE user='root';
    mysql> FLUSH PRIVILEGES;
```
