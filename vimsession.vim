let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/.config/gdlauncher_next/instances/Fabric\ builders/config/jsMacros/Macros
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
edit WEScreen/InitiateWEScreen.js
set splitbelow splitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
9
normal! zo
10
normal! zo
12
normal! zo
22
normal! zo
34
normal! zo
38
normal! zo
42
normal! zo
49
normal! zo
53
normal! zo
58
normal! zo
74
normal! zo
75
normal! zo
34
normal! zo
38
normal! zo
42
normal! zo
50
normal! zo
56
normal! zo
57
normal! zo
75
normal! zo
76
normal! zo
57
normal! zo
62
normal! zo
76
normal! zo
77
normal! zo
76
normal! zo
77
normal! zo
let s:l = 61 - ((60 * winheight(0) + 40) / 81)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
61
normal! 0
tabnext 1
badd +55 WEScreen/InitiateWEScreen.js
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOS
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
