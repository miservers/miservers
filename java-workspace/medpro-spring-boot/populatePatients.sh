#!/bin/bash

# generate a data.sql that you may use to populate database


sql='INSERT INTO patient 
                    (id, 
                    FIRST_NAME,  
                    LAST_NAME, 
                    GENDER,  
                    ADDRESS,        
                    CITY,        
                    COUNTRY, 
                    CELL_PHONE ) VALUES '

max=70;
for ((i=20;i<=max;i++));
do
  value="(1000$i,  'souad$i',     'frhan$i',   'FEMME', '$i cite anam', 'El jadida', 'maroc', '06666766$i')";
  sql+=$value;
  if [ $i -lt $max ]; then
    sql+=",";
  fi
done

sql+=";";


echo $sql>>./src/main/resources/data.sql