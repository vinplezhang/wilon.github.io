<?php
/////////////
// Vim命令合集 //
/////////////

// 基本的设置
    :set encoding=utf-8     // 更改编码
    :set nu!        // 显示行号
    :set wrap       // 自动换行
    :set no|nc      // 忽略大小写，[no]ignorecase，
    如果只是想在搜索或者替换的时候偶尔忽略大小写，而不更改全局变量，加 \c即可： /nancy\c
    在Vim中，很多命令都可以配合数字使用，比如删除10个字符10x

// 移动命令
    [595]h|j|k|l    // 左下上右
    [595]gg|G   // [到595行]首行|尾行 第一个字符
    [595]w|b|e|ge    // 按单词右左至单词首，右左至单词首尾
    [595]0|^|$    // 行第一个字符、行首、行尾
    0|$     // 到行首|行尾
    {|}     // 到整体头部|尾部

// 删除
    [595]dd     // 向下删除N行
    :g[v]/INSERT.*99cms_news\c/d  // 删除包含[不包含]字串‘INSERT.*99cms_news\c’的行  \c忽略大小写
    x          // 删除一个字符
    dw         // d跟移动命令结合
// 替换
   :n,$s/vivian/sky/g // 替换第 n 行开始到最后一行中每一行所有 vivian 为 sky
   :%s/,/\r/g

// 复制粘贴
    yy      // 命令复制当前整行的内容到vi缓冲区
    yw    // 复制当前光标所在位置到单词尾字符的内容到vi缓存区，相当于复制一个单词
    y$    // 复制光标所在位置到行尾内容到缓存区
    y^    // 复制光标所在位置到行首内容到缓存区
    [324]yy   // 向下复制N行
    [324]yw   // 向下复制N个单词

　　如果要复制第m行到第n行之间的内容，可以在末行模式中输入m，ny例如：3，5y复制第三行到第五行内容到缓存区。

// 多行操作
    <ctrl-v>  jk  I  inputsomething  <esc>

// 文件操作
    :e 文档名 打开文档，多文档编辑，不跟文档名即刷新
    e# 或 Ctrl+ˆ      编辑上一个文档,用于两个文档相互交换编辑时使用。?# 代表的是编辑前一次编辑的文档
    :files 或 :buffers 或 :ls     可以列出目前 缓冲区 中的所有文档。加号 + 表示 缓冲区已经被修改过了。＃代表上一次编辑的文档，%是目前正在编辑中的文档
    :b 文档名或编号      移至该文档。
    :sp 文档名      在新窗口中打开文档
        Ctrl + w + w     可以切换窗口
    vim -d 文档1 文档2        diff两个文件


// NERDTree提供了丰富的键盘操作方式来浏览和打开文件，我简单介绍一些常用的快捷键：
    和编辑文件一样，通过h j k l移动光标定位
    o 打开关闭文件或者目录，如果是文件的话，光标出现在打开的文件中
    go 效果同上，不过光标保持在文件目录里，类似预览文件内容的功能
    i和s可以水平分割或纵向分割窗口打开文件，前面加g类似go的功能
    t 在标签页中打开
    T 在后台标签页中打开
    p 到上层目录
    P 到根目录
    K 到同目录第一个节点
    J 到同目录最后一个节点
    m 显示文件系统菜单（添加、删除、移动操作）
    ? 帮助
    q 关闭