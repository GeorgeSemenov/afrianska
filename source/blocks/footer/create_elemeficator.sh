#!/bin/sh
parentName=footer
read -p "What would you create : " fileName
mkdir ${fileName}
isThereNeedPugFile=1
zero=0
TAB='  '
# если нужен pug file то условный оператор всё обработает
read -p "Do you need pug file? (1/0) : " isThereNeedPugFile
if [ "$isThereNeedPugFile" -gt "$zero" ]; then 
# подключаем инклуды в начало pug файла у нашего блока, для этого создаём новый файл в него записываем инклуд, затем добавляем содержимое нашего PUG файла и затем копируем содержимое нового файла в PUG с замещением а новый файл удаляем к чертям собачьим
cat > newFile.pug << end1
include ${fileName}/${parentName}${fileName}.pug
end1
cat footer.pug >> newFile.pug
mv -f newFile.pug  footer.pug
cat > ${fileName}/${parentName}${fileName}.pug << end2
mixin ${parentName}${fileName}(modifier)
${TAB}.${parentName}${fileName}&attributes(attributes)
end2
fi
# модернизируем scss файл родителя и создаём scss файл для элемента/модификатора
cat > newFile.scss << end3
@import '${fileName}/${parentName}${fileName}';
end3
cat footer.scss >> newFile.scss
mv -f newFile.scss footer.scss
cd ${fileName}
cat >> ${parentName}${fileName}.scss << end4
.${parentName}${fileName} {}
end4
