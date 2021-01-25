@echo off
rem наполняем переменную пробелом, но похоже это не работает, если после TAB нет слов
set TAB=  
set /p fileName=What page would you create?
rem если убрать атрибут /p то в fileName запишется строка What would you create, а так туда запишется ввод пользователя
mkdir %fileName%
set styleSCSS=%fileName%.scss
set PUG=%fileName%.pug
rem copy create_block.bat %fileName%
rem
rem
rem Создаём новый файл.scss и тут же наполняем его нужным содержимым
cd %fileName%
(
echo .%fileName% {}
)>%styleSCSS%
rem создаём pug
(
echo mixin %fileName%^(modifier^)
echo %TAB%.%fileName%^&attributes^(attributes^)
)>%PUG%
rem Ну и создаём js файлик
echo.>%fileName%.js
rem
rem
rem Создаём новый bat файл для элементов или модификаторов