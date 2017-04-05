<?php

// 注意重复加双杠 (\d)\\1

// 正则?与U会都是拒绝贪婪，冲突
    echo $str = '000abcd333abcd444abscd888';<br> $res1 = preg_replace('/ab(.*)d/iU', '123', $str);<br> $res2 = preg_replace('/ab(.*?)d/iU', '123', $str);  // 有？恢复贪婪<br> preg_match_all('/ab(.*?)d/i', $str, $res3);    // ?与U只能有一个<br> preg_match_all('/ab(.*?)d/iU', $str, $res4);<br>

/*有一串手机号码，按需匹配*/
    $str = '13141078884 83161143334 13263362224 18511925554 18612623450 13141102288 13161146662 13263370884 18513608884 18612625555 13141108580 13161146667 13263389994 13264459992 18600004038 18612932626';
    // 后四位匹配ABAB
    preg_match_all('/\d{7}(?!(\d)\\1)(\d\d)\\2/', $str, $res);
    // 匹配手机号至少有一个8
    preg_match_all('/(?![^8]{11})\d{11}/', $str, $res1);
    preg_match_all('/(?=\d*8)\d{11}/', $str, $res2);

// html
    /<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>/

/**
 * 正则基础
 */
1. 原子是组成正则表达式的基本单位,在分析正则表达式时，应作为一个整体。
   原子包括以下内容:
    > 单个字符、数字，如a-z，A-Z，0-9。
    > 模式单元，如（ABC）可以理解为由多个原子组成的大的原子。
    > 原子表，如 [ABC]。
    > 重新使用的模式单元，如：\\1
    > 普通转义字符，如：\d， \D， \w
    > 转义元字符，如：\*，\.
    *> 元字符

*2. 元字符（具有特殊意义字符）：
    [] 表示单个字符的原子表
        例如：[aoeiu] 表示任意一个元音字母
              [0-9] 表示任意一位数字
              [a-z][0-9]表示小写字和一位数字构成的两位字符
              [a-zA-Z0-9] 表示任意一位大小字母或数字
    [^] 表示除中括号内原子之外的任何字符 是[]的取反
        例如：[^0-9] 表示任意一位非数字字符
              [^a-z] 表示任意一位非小写字母

    {m} 表示对前面原子的数量控制，表示是m次
        例如：[0-9]{4} 表示4为数字
              [1][3-8][0-9]{9} 手机号码
    {m,} 表示对前面原子的数量控制，表示是至少m次
        例如： [0-9]{2,} 表示两位及以上的数字

    {m,n}表示对前面原子的数量控制，表示是m到n次
        例如： [a-z]{6,8} 表示6到8位的小写字母

    * 表示对前面原子的数量控制，表示是任意次，等价于{0,}
    + 表示对前面原子的数量控制，表示至少1次，等价于{1,}
    ? 表示对前面原子的数量控制，表示0次或1次（可有可无） 等价于{0,1}
        例如：正整数：[1-9][0-9]*
                整数：[\-]?[0-9]+
                email:

    () 表示一个整体原子。
            也可以使用?:来拒绝子存储。 （?:.*?）
        例如：（red） 字串red
               (red|blue) 字串red或blue
               (abc){2} 表示两个abc
        【还有一个子存储单元的作用】
            \1 读取第一个子存储单元
            \2 读取第二个子存储单元
            ...
            php里preg函数需要\\1
            例：匹配ABAB格式数字  (\d\d)\\1|(\d)\\2(\d)\\3

    |  表示或的意思
            (rea|blue) 字串red或blue

    ^  用在正则单元块的开头处，表示必须以指定的开头

    $  用在正则单元块的结尾处，表示必须以指定的结尾

    .  表示任意一个除换行符之外的字符
            常用组合： .*? 或 .+? 表示最小匹配所有字符（拒绝贪婪匹配）

3. 普通转义字符:
    *\d     匹配一个数字；等价于[0-9]
    *\D     匹配除数字以外任何一个字符；等价于[^0-9]
    *\w     匹配一个英文字母、数字或下划线；等价于[0-9a-zA-Z_]
    *\W     匹配除英文字母、数字和下划线以外任何一个字符；等价于[^0-9a-zA-Z_]
    *\s     匹配一个空白字符；等价于[\f\n\r\t\v]
    *\S     匹配除空白字符以外任何一个字符；等价于[^\f\n\r\t\v]

    \f      匹配一个换页符等价于 \x0c 或 \cL
    *\n     匹配一个换行符；等价于 \x0a 或 \cJ
    *\r     匹配一个回车符等价于\x0d 或 \cM
    *\t     匹配一个制表符；等价于 \x09\或\cl
    \v      匹配一个垂直制表符；等价于\x0b或\ck
    \oNN    匹配一个八进制数字
    \xNN    匹配一个十六进制数字
    \cC     匹配一个控制字符

    \bhello\b      匹配一个单词


    /^-?\d+$|^-?0[xX][\da-fA-F]+$/   表示十进制和十六进制的一个数字

    ^-?\d+$    ^-?0[xX][\da-fA-F]+$

    //表示一个邮箱地址
    /^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+){0,3}$/
    /^[\w-]+@[\w-]+(\.[\w-]+){0,3}$/

