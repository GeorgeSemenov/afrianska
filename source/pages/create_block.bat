@echo off
rem наполняем переменную пробелом, но похоже это не работает, если после TAB нет слов
set TAB=  
set projectPath=D:\share\
set projectName=BEM_project
set style=\code\src\styles\style.scss
set blocks=\code\src\templates\blocks.pug
set blocksPUG=%projectPath%%projectName%%blocks%
rem запоминаем имя блока, элемента или модификатора /p - означает pause аверное
set /p fileName=What would you create?
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
(
echo @echo off
echo set parentName=%fileName%
echo set /p fileName=What would you create?
echo mkdir %%fileName%%
echo rem Создаём пятёрку балванок, первая будет указывать был ли в цепи блок элемент модификатор создан элемент, а вторая будет содержать символ с которым будут сравнивать,
echo rem ну а третья будет содержать интерисующий нас символ в имени елементофикатора из fileName ,будет скопированная строка начиная со второго символа, т.к. счёт симоволов начинается с 0, а у тебя указанно 1 и длинной в 1 символ
echo rem и ещё для сравнения создадим переменную True которая будет содержать строку true, дело в том, что cmd повзваляет сравнивать только пременные, и у него нет булевых, поэтому приходится извращяться
echo set isThereElement=false
echo set ans=_
echo set zero=0
echo set secondSymbol=%%fileName:~1,1%%
echo set True=true
echo rem /I означает что не будет сравниваться по регистру
echo rem если второй символ fileName является нижним подчёркиванием, значит создаётся элеменет
echo rem Похоже если я создаю условие внутри условия то оно начинает работать некорректно, точнее незапуститься, поэтому приходиться разбивать условия
echo set isThereNeedPugFile=0
echo if /I %%secondSymbol%% == %%ans%% ^(
	echo set isThereElement=true
	echo set /p isThereNeedPugFile=Do you need a pug file one or zero
echo ^)
echo rem если нужен pug file то условный оператор всё обработает
echo rem NEQ - значит неравное, просто тут нет оператора != поэтому приходится использовать это
echo if /I %%isThereNeedPugFile%% NEQ %%zero%% ^(
	echo rem подключаем инклуды в начало pug файла у нашего блока, для этого создаём новый файл в него записываем инклуд, затем добавляем содержимое нашего PUG файла и затем копируем содержимое нового файла в PUG с замещением а новый файл удаляем к чертям собачьим
	echo ^(
	echo echo include %%filename%%/%fileName%%%filename%%.pug
	echo ^)^> newFile.pug
	echo type %PUG% ^>^> newFile.pug
	echo move /Y newFile.pug  %PUG%
	echo ^(
	echo echo mixin %%parentName%%%%fileName%%^^^(modifier^^^)
	echo echo %TAB%.%%parentName%%%%fileName%%^^^&attributes^^^(attributes^^^)
	echo ^)^>%%fileName%%/%%parentName%%%%fileName%%.pug
echo ^)
echo ^(
echo echo @import '%%fileName%%/%fileName%%%fileName%%'^;
echo ^)^>^>%styleSCSS%
echo cd %%fileName%%
echo ^(
echo echo .%%parentName%%%%fileName%% {}
echo ^)^>%%parentName%%%%fileName%%.scss
echo if  /I %%isThereElement%% == %%True%% ^(
	echo ^(
	echo echo @echo off
	echo echo set grandParentName=%fileName%
	echo echo set parentName=%%fileName%%
	echo echo set /p fileName=What would you create?
	echo echo set newStyleSCSS=%fileName%%%fileName%%.scss
	echo echo mkdir %%%%fileName%%%%
	echo echo ^^^(
	echo echo echo @import '%%%%fileName%%%%/%fileName%%%fileName%%%%%%fileName%%%%'^;
	echo echo ^^^)^^^>^^^>%%%%newStyleSCSS%%%%
	echo echo cd %%%%fileName%%%%
	echo echo ^^^(
	echo echo echo .%%%%grandParentName%%%%%%%%parentName%%%%%%%%fileName%%%% {}
	echo echo ^^^)^^^>%%%%grandParentName%%%%%%%%parentName%%%%%%%%fileName%%%%.scss
	echo ^)^>^>create_modificator.bat
echo ^)
)>create_elemeficator.bat