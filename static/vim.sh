#!/bin/sh
set -e
#
# This script is meant for quick & easy install via:
#   'curl -sSL https://wilon.github.io/static/vim.sh | sh'
# or:
#   'wget -qO- https://wilon.github.io/static/vim.sh | sh'
#

VundlePath="~/.vim/bundle/Vundle.vim/"
if [ ! -x "$VundlePath"]; then
    git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
fi

cat > ~/.vimrc << EOF
" ***** vundle插件 *****
filetype off
set rtp+=~/.vim/bundle/Vundle.vim/
call vundle#rc()
Plugin 'VundleVim/Vundle.vim'
Plugin 'wilon/vim-myvimrc'
Plugin 'wilon/vim-auto-session'
Bundle 'kien/ctrlp.vim'
Plugin 'ervandew/supertab'
Plugin 'tpope/vim-surround'
Plugin 'jiangmiao/auto-pairs'
Plugin 'haya14busa/incsearch.vim'
Plugin 'wilon/vim-tips'
filetype plugin indent on
EOF

vim +PluginInstall +qall
