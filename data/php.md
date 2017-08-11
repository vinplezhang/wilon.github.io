
### 记住一些常量、常用函数
```php
    date_default_timezone_set('PRC');    // 同php.ini设置 date.timezone = PRC
    file_put_contents(dirname(__FILE__) . '/params.log', json_encode($data), FILE_APPEND);
```

### Composer 版本约束表达式的使用
```
    *           # 根据 minimum-stability 的值情况来决定安装最新的 dev 
    dev-master  # 指定分支下最新代码
    ~1.2        # ~ 的作用是允许表达式中最后一位变到最大值，1.0 - 1.99
    ~0.2.3      #  ~ 表示最后一位可变，0.2.0 - 0.2.99
    ^1.2        # ^ 锁定不允许变的第一位，1.xx - 1.99.99
    >= 1.3 <1.6、>=1.3 | >=1.7 、3.0|4.0    # 版本控制在某些范围
    =1.2.34 或者 1.2.34    # 指定了具体的版本号
```

### 微信资源搜集
```php
    <a href="https://mp.weixin.qq.com/wiki/8/f9a0b8382e0b77d87b3bcc1ce6fbc104.html">公众号验证token方法</a>
    头像地址（大）：http://wx.qlogo.cn/mmopen/PZI7pLaVibDOjmMHibk6NialWiaLru5XVlTfV207cH6bszhHHicE1Tr4tkF3wyZTvnYdbB2bbhtHxeN77icDalTJ1fOgfye44UUw7a/0
    头像地址（小）：http://wx.qlogo.cn/mmopen/PZI7pLaVibDOjmMHibk6NialWiaLru5XVlTfV207cH6bszhHHicE1Tr4tkF3wyZTvnYdbB2bbhtHxeN77icDalTJ1fOgfye44UUw7a/46
```

### 比较好的密码存储处理
```php
    // sha1/md5都行
    $salt = sha1(uniqid(mt_rand(), true));
    $pwdDb = sha1($salt . sha1($pwdUser) . KEY);
```

### PHP time() date() strtotime()日期函数总结
```php
    // 返回时间戳
    echo time();    // int(1392192781)
    将其他格式解析为 Unix 时间戳
    echo strtotime($str);    // 将其他格式解析为 Unix 时间戳
        /*下括号内格式例：
             ( "10 September 2000" )
             ( "+1 day" )   明天
             ( "+1 days" )  明天
             ( "+1 week" )
             ( "+1 week 2 days 4 hours 2 seconds" )
             ( "next Thursday" )    下周二
             ( "last Monday" )
             ( "2011-5-19 14:07" );
        */
    echo mktime(12, 0, 0, 12, 30, 2012);     // mktime(时[,分[,秒[,月[,日[,年]]]]]); 都可以超出自然范围，如27月，超出向高位加；若整体数值超出计算机能力范围，返回false。
    echo microtime();    // 返回微秒精度的时间戳字符串。
    // 返回一个数组
    $today = getdate();
        /* 输出数组： array(11) {
               ["seconds"]=>int(32)
               ["minutes"]=>int(27)
               ["hours"]=>int(8)
               ["mday"]=>int(12)
               ["wday"]=>int(3)
               ["mon"]=>int(2)
               ["year"]=>int(2014)
               ["yday"]=>int(42)
               ["weekday"]=>string(9) "Wednesday"
               ["month"]=>string(8) "February"
               [0]=>int(1392193652)
         } */
    // 格式化输出时间
    echo date("Y-m-d H:i:s", 1391919385);    // string(19) "2014-02-09 04:16:25"
        /*string format 常用：
            Y：四位数年   m：月01-12   n:月1-12      d：天01-31  j：天1-31
            H：时24时制   h：小时12制  i：分钟00-59  s：秒00-59  w：星期几0-6
            A：上午AM或下午PM          a：上午am或下午pm。
        */
    // 修改默认时区
    date.timezone = PRC    # 修php.ini配置文件
    date_default_timezone_set("PRC");    // 设置当前脚本时区为中国时区
    date_default_timezone_get();    // 获取当前时区
```

### 字符串函数 string function
```php
    // 截取
    substr('我是王伟龙', -3);    // 取最后一个汉字
    // 小数处理
```

### 数组函数函数 array function
```php
    max(array_keys($descArr));    // 获取数组最大的key
    array_filter([1, 0, 2, null, 3, 6, 7]);    // 去取数组( == false )的值，保留键值
    array_unique([1, 0, 2, true, '1', false, null, 2, 7]);    // - 去除数组中重复的元素值 res: [0]=> int(1) [1]=> int(0) [2]=> int(2) [5]=> bool(false) [8]=> int(7)
    shuffle(array);    # 打乱数组排序
```

### 创建新的空对象
```php
    $var1 = new stdClass();
    $var2 = (object)[];
    $var3 = json_decode('{}');
```

### 类的笔记
```php
    // 静态方法没有实例化类，没有$this，没有调用 function __construct()
    static function someFunc(){
        echo self::$country;
        // echo $this->name;  ❌错误
    }
    // const 一旦定义不能更改
    // 静态变量魔术方法不起作用
```

### 一行代码实现两个值交换，不引入第三个变量
```php
    $a = 3;
    $b = 4;
    list($b, $a) = array($a, $b);
    $a = $a + $b && $b = $a - $b && $a = $a - $b;
    $a = $a ^ $b && $b = $b ^ $a && $a = $a ^ $b;
```

### 得到多维数组所有key
```php
    function array_all_keys($array) {
        foreach ($array as $k => $v) {
            $keys[] = $k;
            if (is_array($v)) $keys = array_merge($keys, array_all_keys($v));
        }
        return $keys;
    }
```

### 数组按内部值重新排序
```php
    // usort更新索引为0123，uasort为保持索引
    $arr['a'] = ['name' => 'weilong', 'num' => 3, 'volume' => 98];
    $arr['b'] = ['name' => 'weimong', 'num' => 2, 'volume' => 88];
    $arr['c'] = ['name' => 'weicong', 'num' => 1, 'volume' => 77];
    uasort($arr, function($a, $b) {
        if ($a['num'] == $b['num']) return 0;
        return ($a['num'] > $b['num']) ? 1 : -1;
    });
```

### printf sprintf 高级用法
```php
    printf("%b", 250);    //将250转成二进制： 11111010
    printf("%o", 250);    //将250转成八进制： 0372
    printf("%x", 250);    //将250转成十六进制： 0xfa
    sprintf("%04d", 13);    // 补全4位：0013
```

### 编码问题
```php
    /**
     *|————————————————————————————————————————————————————————————|
     *|            |   a     |        王伟龙                        |
     *| ASCII      |   97    | 231 142 139 228 188 159 233 190 153 |
     *| Unicode    | \\u0061 | \\u738b\\u4f1f\\u9f99               |
     *| UrlEncode  |   a     | %e7%8e%8b%e4%bc%9f%e9%be%99         |
     *|————————————————————————————————————————————————————————————|
     */
    // 函数
    string chr ( int $ascii )    // 返回相对应于 ASCII 所指定的单个字符
    int ord ( string $string )   // 返回第一个字符的ASCII码值
```

### 比较有用的命令
```shell
    php -i | grep -i xxxx  // 查看xxxx信息
    php -i | grep -i php.ini  // 查看php.ini信息
    php -i | grep -i extension  // 查看php扩展信息
```

### simple curl
```php
    /**
     * simple curl
     * @param  string $url
     * @param  array  $param = [
     *                   'method' => 'get',    // post
     *                   'data' => [],    // get/post data
     *                   'header' = 'chrome 查看到的' or [],    // string or array
     *                   'cookie' => 'chrome 查看到的' or [],    // string or array
     *                   'return' => 'body',    // all or header
     *               ]
     * @return mix
     */
    function simpleCurl($url = '', $param = [])
    {
        if (!$url) return false;
        $parseUrl = parse_url($url);
        // 初始化
        if (!isset($param['method'])) $param['method'] = 'get';
        $ch = curl_init();
        if ($param['method'] == 'get' && $param['data']) {
            $joint = $parseUrl['query'] ? '&' : '?';
            $url .= $joint . http_build_query($param['data']);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        // https支持
        if ($parseUrl['scheme'] == 'https') {
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        }
        // header
        $header = [];
        if (strpos(json_encode($param['header']), 'User-Agent') === false) {
            $header[] = 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36';
        }
        if (is_string($param['header'])) {
            foreach (explode("\n", $param['header']) as $v) {
                $header[] = trim($v);
            }
        } else if (is_array($param['header'])) {
            $header = array_merge($header, $param['header']);
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        // cookie保持，session实现
        if (!isset($_SESSION)) session_start();
        $curloptCookie = '';
        $sessionKey = md5($parseUrl['host'] . 'wilon');
        // $sessionCookie = &$_SESSION[$sessionKey]['cookie'];
        if (is_string($param['cookie'])) {
            $curloptCookie .= $param['cookie'];
        } else if (is_array($param['cookie']) && is_array($sessionCookie)) {
            $sessionCookie = array_merge($sessionCookie, $param['cookie']);
        }
        if ($sessionCookie) {
            foreach ($sessionCookie as $k => $v) {
                $curloptCookie .= "$k=$v;";
            }
        }
        curl_setopt($ch, CURLOPT_COOKIE, $curloptCookie);
        // post
        if ($param['method'] == 'post') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $param['data']);
        }
        // response
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = trim(substr($response, 0, $headerSize));
        $body = trim(substr($response, $headerSize));
        curl_close($ch);
        // 更新cookie
        preg_match_all('/Set-Cookie:(.*?)\n/', $header, $matchesCookie);
        foreach ($matchesCookie[1] as $setCookie) {
            foreach (explode(';', $setCookie) as $cookieStr) {
                list($key, $value) = explode('=', trim($cookieStr));
                $sessionCookie[$key] = $value;
            }
        }
        // 返回
        $return = $param['return'] == 'header' ? $header :
            ($param['return'] == 'all' ? [$header, $body] : $body);
        return $return;
    }
```

### Windows安装php扩展
```php
    1. 查看phpinfo —— PHP Version、Architecture、PHP Extension Build
    2. 根据(1)的信息下载dll：http://pecl.php.net 搜索 <a target='_blank' href='http://pecl.php.net'>打开链接</a>
    3. dll放入 php\\ext\\ ，php.ini 添加 extension=php_xxx.dll
```

### html字符串处理
```php
    /**
    * html字符串处理
    *|———————————————————————————————————————|
    *| 字符 |  描述   |  html实体    |         |
    *|     |  空格   |  &amp;nbsp;  |         |
    *|  <  |  小于号 |  &amp;lt;    | special |
    *|  >  |  大于号 |  &amp;gt;    | special |
    *|  &  |  和号   |  &amp;amp;   | special |
    *|  \" |  引号   |  &amp;quot;  | special |
    *|  '  |  撇号   |  &amp;apos;  | special |
    *|  ￠ |  分     |  &amp;cent;  |         |
    *|  £  |  镑     |  &amp;pound; |         |
    *|  ¥  |  日圆   |  &amp;yen;   |         |
    *|  €  |  欧元   |  &amp;euro;  |         |
    *|  §  |  小节   |  &amp;sect;  |         |
    *|  ©  |  版权   |  &amp;copy;  |         |
    *|  ®  |  商标   |  &amp;reg;   |         |
    *|  ™  |  商标   |  &amp;trade; |         |
    *|  ×  |  乘号   |  &amp;times; |         |
    *|  ÷  |  除号   |  &amp;divide;|         |
    *|———————————————————————————————————————|
    */
    $str1 = html_entity_decode($str);       // html实体 --> 字符
    $str2 = htmlentities($str);             // 字符 --> html实体
    $str3 = htmlspecialchars_decode($str);  // special html实体 --> 字符
    $str4 = htmlspecialchars($str);         // special 字符 --> html实体
```

### 编码问题
```php
    // 1. PHP文件的编码格式， gbk->utf-8
    $content = iconv('GBK', 'UTF-8', $content);     // 推荐
    $content = mb_convert_encoding($content, 'UTF-8','GBK');
    $data = eval('return ' . iconv('GBK', 'UTF-8', var_export($data, true)) . ';');    // 数组
    2. PHP文件中：header('Content-type:text/html;Charset=utf-8');
    3. 浏览器的查看编码
    4. &lt;meta charset='utf-8'/&gt
    5. mysql_set_charset('utf8');
    6. mysql> set names utf8;
```

### PHP语言结构，非函数，比函数快
```php
    echo print die isset unset include require array list empty
    // 注意，include_once()是函数; 注意，require_once()是函数;
```

### empty与isset
```php
    empty($a['a']);  // 若$a['a']所等于的值是0或null,则为真！
    isset($b['b']);  // 若$b['b']存在'b'这个键，则为真！
```

### 版本需要注意的
```php
    $a = $b ?: $c;    // php-v >= 5.3
    $arr = [];    // php-v >= 5.4
    foo()[0];    // php-v >= 5.4
    function writeFileLog($file, ...$params) {}    // 动态参数 php-v >= 5.6
    // 正则修饰符e，自 PHP 5.5.0 起废弃。改用 preg_replace_callback
    namespace Foo\Bar\somenamespace;    // php-v >= 5.3
    // php匿名函数 php-v >= 5.3
    yield $output[$ln];    // 生成器 php-v >= 5.5
```

### 文件上传后print_r($_FILES);
```php
    Array (
        [pic] => Array (     //picname为前端表单name:&lt;input type=\"file\" name=\"pic\"/&gt;
            [name] => iphone5.jpg
            [type] => image/jpeg
            [tmp_name] => C:\\Windows\\Temp\\phpA6ED.tmp
            [error] => 0
            [size] => 89470
        )
    )
```

### 面试必知必会
```php
    · redis、memcached区别
    · cookie、session区别
    · 手写冒泡排序、快速排序
    · 手写单例模式、工厂模式
```