
### 多行添加、删除注释
```shell
    # 添加
    ctrl+v j    #　选中多行
    Ｉ    # 插入模式，进行输入
    esc    # 多行起作用
    # 删除
    ctrl+v j    #　选中多行
    d [x]    # 删除模式
```

### 配置安装.vimrc
```shell
    git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    wget http://wilon.github.io/static/vimrc.txt -O ~/.vimrc
    vim +PluginInstall +qall
```

### 浏览文件netrw
```shell
    <cr>    # netrw 进入目录或读入文件 |netrw-cr|
    i    # 在瘦、长、宽和树形的各种列表方式间切换 |netrw-i|
    t    # 在新标签页里打开光标所在的文件/目录 |netrw-t|
```

### 基本的设置
```shell
    :set encoding=utf-8     # 更改编码
    :set nu!        # 显示行号
    :set wrap       # 自动换行
    :set no|nc      # 忽略大小写，[no]ignorecase，
    # 如果只是想在搜索或者替换的时候偶尔忽略大小写，而不更改全局变量，加 \c即可： /nancy\c
```

### 单字母动作
```shell
    ma    # 设定标记a
    `a    # 跳到标记a
    ``    # 跳转前的位置
    `[    # 最后修改的位置的开头
    `]    # 最后修改的位置的结尾
    :delmarks a    # 删除标签a；
    :delmarks!    # 删除所有标签，不包括[A-Z]和[0-9]标签。
```

### 单字母动作
```shell
    c 删除后插入动作；d 删除动作；y 复制动作；v 选择动作；
    r 单字母替换动作；m 标记动作；z 折叠动作；p 粘贴动作
    i 光标前；I 行首；a 光标后；A行尾；C 删除至行尾
    o 光标下一行；O 光标上一行；s 删光标后一个字符；S 清除全行
```

### 移动move
```shell
    [num] t [character]    # 匹配到单个字符光标前；f光标后
    [num] w|b    # 上[下]N个单词
    /string    # 匹配到string（不包含）
    H|M|L    # 匹配到窗口的顶部、中间、和底部
    [num](    # 匹配到句首  )句尾 {段首 }段尾 ]]下一个方法名 [[上一个方法名
```
### 括号匹配bracket
```shell
    ci{    # 删除{}内容，为插入模式
    di]    # 删除[]内容
    di(    # 删除()内容
    yi'    # 复制''内容
    vi"    # 选中""内容
```

### 删除和替换
```shell
    [num]dd    # 向下删除[num]1行
    :g[v]/INSERT.*99cms_news\c/d    # 删除包含[不包含]字串‘INSERT.*99cms_news\c’的行  \c忽略大小写
    :n,$s/vivian/sky/g    # 替换第 n 行开始到最后一行中每一行所有 vivian 为 sky
    :%s/,/\r/g
```

### 标签页功能
```shell
    :tabe /file    # 新标签打开文件，不输入file则打开空标签
    gt    # 切换到下一个标签
    gT    # 切换到上一个标签
    :tabfir    # 切换到第一个标签
    :tabl    # 切换到最后一个标签
    Ngt    # 切换到N号标签
```

### 剪切板-寄存器
```shell
    :di    # 查看所有寄存器信息
    "Ny    # 将匹配内容放入N号寄存器
    "Np    # 粘贴N号寄存器信息
```

### 切换文件
```shell
    ctrl+o    # 上一个编辑位置
    ctrl+i    # 下一个编辑位置
    ctrl+w gf    # 新标签打开光标所在文件
    :marks    # 可以查看有哪些标记文件
    'N    # 打开N号标记文件
    :ls    # 查看缓冲区文件，同buffers、files
    :bn    # 打开n号缓冲区文件
```
