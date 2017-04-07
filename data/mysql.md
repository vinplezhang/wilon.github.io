
### 分配权限 GRANT
```shell
    GRANT ALL PRIVILEGES ON *.* TO 'weilong'@'192.168.3.94' IDENTIFIED BY 'mypwd' WITH GRANT OPTION;
    GRANT Select ON *.* TO 'weilong'@'172.30.%' IDENTIFIED BY "Wwl_Jumpbox_666";
    flush privileges;
```

### 更改用户可访问HOST
```shell
    mysql> use mysql;
    mysql> update user set host='%' where user='root';
    mysql> flush privileges;
```
