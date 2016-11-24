
### 修改提交信息
```bash
    git commit --amend
```

### 初始新仓库流程
```bash
    # 1. 新建项目
    git clone https://github.com/wilon/wilon.github.io.git    # 代码copy进来，直接push
    # 2. 已有项目
    git init
    git remote add origin https://github.com/wilon/wilon.github.io.git
    git pull
    git merge origin/master
    git push --set-upstream origin master
```

### 分支
```shell
    # 分支的增删改查
    git branch -a    # 查看所有分支
    git branch test    # 创建分支
    git checkout test    # 切换到分支
    git branch -d gh-pages    # 删除一个本地分支
    git push origin :gh-pages    # 删除一个远程分支，其实是推送一个空分支给远程
    # 修改默认HEAD指向分支
    vim .git/refs/remotes/origin/HEAD
    `ref: refs/remotes/origin/master`
```

### 私钥与公钥
```shell
    TortoiseGit 使用 id_rsa
    1. 生成Putty key：puttygen工具，Conversions -> Import key -> Save private key；
    2. clone时使用
```

### 新模块工作流程
```shell
    # 主分支master下
    git add mynewsfile/*    # 添加文件
    git commit [-a] -m '说明'    # 提交到本地库，-a所有改动
    git pull    # 从远程库拉取
    git push [origin master]    # 提交到远程库，默认master
```

### 小改动工作流程
```shell
    # 主分支master下
    git add file/*    # 添加文件
    git commit [-a] -m '说明'    # 提交到本地库，-a所有改动
    git pull    # 从远程库拉取
    # 解决冲突
    git push [origin master]    # 提交到远程库，默认master
```

### 查看一些东西
```shell
    vim .git/config    # 查看项目皮配置
    git status    # 项目目录里
    git branch -a    # 查看所有分支，*代表本地
    git diff 文件    # 当期文件修改
    git log    # 查看提交日志
    git log -p    # 查看提交日志，包含代码
    git log --graph    # 以图表形式查看分支提交日志
    git show    # 查看最近一次提交代码
    git show commit_id   # 查看某一次提交代码
```

### 配置一些东西
```shell
    # 1. 命令配置
    git config --global color.diff auto  && git config --global color.status auto && git config --global color.branch auto    # git配置颜色
    git config --global alias.st status    # git配置别名
    git config --global user.name wilon && git config --global user.email wilonx@163.com    # git配置用户名邮箱
    # 2. 修改配置文件 ~/.gitconfig，若修改部分则打开连接copy
    wget <a href="http://ocfxac0k9.bkt.clouddn.com/static/f/gitconfig.txt" target="_blank">http://ocfxac0k9.bkt.clouddn.com/static/f/gitconfig.txt</a> -O ~/.gitconfig
```

### 其他
```shell
    git clone https://github.com/Wilon/mynote.git    # 克隆一个项目
    git reset --hard HEAD~1    # 回退所有内容到上N个版本，数字可变
```
