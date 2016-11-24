### TIPS
```php
    注意重复加双杠 (\\d)\\\\1
```

### 模式修整符
```php
    i 表示不区分大小写
    s 表示匹配视为单行（就是可以让点.能支持换行）
    U 表示拒绝贪婪匹配（与?有冲突）
```

### 正则?与U会都是拒绝贪婪，且冲突
```php
    echo $str = '000abcd333abcd444abscd888';
    $res1 = preg_replace('/ab(.*)d/iU', '123', $str);
    $res2 = preg_replace('/ab(.*?)d/iU', '123', $str);    // 有？恢复贪婪
    preg_match_all('/ab(.*?)d/i', $str, $res3);    // ?与U只能有一个
    preg_match_all('/ab(.*?)d/iU', $str, $res4);
```