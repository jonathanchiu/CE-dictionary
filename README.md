# ZhongEngDict

## Install
1. Make sure you have [nodejs](https://nodejs.org/en/) installed
2. By default `npm` will be installed as part of `nodejs`
3. Run the included SQL install script by going to MySQLWorkBench, `File` -> `Run SQL Script` (do not go another route that involves actually opening the file as your computer will experience painful lag)
4. Clone this repository and `cd` to the repository directory
5. Run `npm install` which will install all dependencies of this project, as specified in `package.json`
6. Ensure that the MySQL credentials in `index.js` match up with your own
6. Run `node index.js` which will start the web server
7. Navigate to `http://localhost:3000`
8. Enjoy!

## Features
* Create, read, update, delete vocabulary (pinyin, simplified, traditional, translation)
* Favorite words
* Restore deleted words

## Info
A Chinese/English dictionary project for CS3200 (Database Design)

We tentatively plan doing a web interface describing a bilingual Chinese and English Dictionary. It will provide information regarding translations, Chinese pinyin equivalents, and traditional or simplified Chinese characters. Thus, these features of our program will also be a part of our data domain as attributes in the dictionary. Users will be able to lookup words in Chinese and get their English meanings, and vice-versa. Users will be able to search by pinyin, Chinese, or by the English definition. We plan to largely mimic the functionality of popular Chinese/English dictionaries on the web. In our dictionary project, we will be able to create and insert new Chinese or English vocabularies. The users will be able to read and see that data. In addition, we will be able to update vocabulary and even delete vocabulary in our database, all through a front-facing interface.

We plan on using SQL storage, specifically utilizing MySQL.

Tentatively, in terms of software, apps and libraries we plan on using web languages and frameworks such as HTML, CSS, and jQuery (Javascript). We also plan on using a backend framework like Node.js (Javascript) to facilitate a connection to our MySQL database. The final product will tie all of this together to function as a full-fledged online dictionary.

This project and the data associated with it interests us because languages in general are not just a form of communication between people, but it also holds within it a lot of historical and cultural information about the country the language originates from. By making a rich foreign language such as Chinese more accessible to English users, we hope to bring to light the historical and cultural information Chinese has. On a much simpler note, we just hope to provide a useful service to users who are trying to learn Chinese. 
