#!/bin/sh
set -e
#
# This script is meant for quick & easy install via:
#   'curl -sSL https://wilon.github.io/static/vim.sh | sh'
# or:
#   'wget -qO- https://wilon.github.io/static/vim.sh | sh'
#

git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim

cat > ~/.vimrc << EOF
" ***** vundle插件 *****
filetype off
set rtp+=~/.vim/bundle/Vundle.vim/
call vundle#rc()
Plugin 'VundleVim/Vundle.vim'
Bundle 'kien/ctrlp.vim'
Plugin 'ervandew/supertab'
Plugin 'wilon/vim-tips'
Plugin 'wilon/vim-myvimrc'
filetype plugin indent on
EOF

vim +PluginInstall +qall
