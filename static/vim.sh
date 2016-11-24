wget -nH -P /tmp/vim http://ocfxac0k9.bkt.clouddn.com/static/f/php_funclist.txt
echo 'au FileType php call PHPFuncList()' >> ~/.vimrc
echo 'function PHPFuncList()' >> ~/.vimrc
echo 'set dictionary-=/etc/vim/php_funclist.txt dictionary+=/etc/vim/php_funclist.txt' >> ~/.vimrc
echo 'set complete-=k complete+=k' >> ~/.vimrc
echo 'endfunction' >> ~/.vimrc
