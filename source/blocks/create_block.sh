#!/bin/sh
#наполняем переменную пробелом, но похоже это не работает, если после TAB нет слов
TAB='  '
lcb='${'
rcb='}'
dollar='$'
#запоминаем имя блока, элемента или модификатора /p - означает pause аверное
read -p "What would you create : " fileName
mkdir -p ${fileName}
styleSCSS=${fileName}.scss
PUG=${fileName}.pug
# Создаём новый файл.scss и тут же наполняем его нужным содержимым
cd ${fileName}
cat > ${styleSCSS} << end 
.${fileName} {}
end
# создаём pug
cat > ${PUG} << end 
mixin ${fileName}(modifier)
${TAB}.${fileName}&attributes(attributes)
end
# Ну и создаём js файлик
cat >${fileName}.js << end
${dollar}(document).ready(function(){
})
end
#
#
# Создаём новый bat файл для элементов или модификаторов
cat > create_elemeficator.sh << end
#!/bin/sh
parentName=${fileName}
read -p "What would you create : " fileName
mkdir ${lcb}fileName${rcb}
isThereNeedPugFile=1
zero=0
TAB='  '
# если нужен pug file то условный оператор всё обработает
read -p "Do you need pug file? (1/0) : " isThereNeedPugFile
if [ "${dollar}isThereNeedPugFile" -gt "${dollar}zero" ]; then 
# подключаем инклуды в начало pug файла у нашего блока, для этого создаём новый файл в него записываем инклуд, затем добавляем содержимое нашего PUG файла и затем копируем содержимое нового файла в PUG с замещением а новый файл удаляем к чертям собачьим
cat > newFile.pug << end1
include ${lcb}fileName${rcb}/${dollar}{parentName}${lcb}fileName${rcb}.pug
end1
cat ${PUG} >> newFile.pug
mv -f newFile.pug  ${PUG}
cat > ${lcb}fileName${rcb}/${lcb}parentName${rcb}${lcb}fileName${rcb}.pug << end2
mixin ${lcb}parentName${rcb}${lcb}fileName${rcb}(modifier)
${dollar}{TAB}.${lcb}parentName${rcb}${lcb}fileName${rcb}&attributes(attributes)
end2
fi
# модернизируем scss файл родителя и создаём scss файл для элемента/модификатора
cat > newFile.scss << end3
@import '${dollar}{fileName}/${dollar}{parentName}${dollar}{fileName}';
end3
cat ${styleSCSS} >> newFile.scss
mv -f newFile.scss ${styleSCSS}
cd ${dollar}{fileName}
cat >> ${dollar}{parentName}${dollar}{fileName}.scss << end4
.${dollar}{parentName}${dollar}{fileName} {}
end4
end
# Записываем только что созданный scss файл блока в список всех стилей 
cd ../../styles
cat >>allBlocksStyles.scss << end
@import '../blocks/${fileName}/${fileName}';
end