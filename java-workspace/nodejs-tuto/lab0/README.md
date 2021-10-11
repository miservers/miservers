## Steps to create a minimal node server
------------------------------------------
1. Create **minimalServer.js** file
2. Init **package.json** file.
    
       npm init --yes
3. Add start script to package.json

        "start": "node minimalServer.js"

4. Start you web node server

        npm run start
    you can start node server without npm, by calling command ``node minimalServer.js``. But It is preferred to use package manager ``npm``

5. Access to you application

    http://127.0.0.1:3000/

## NPM : node package manager
-------------------------------
`npm install` downloads a package and it's dependencies defined in a `package.json` file and generates a node_modules folder with the installed modules.

`npm install --global` installs the package globally. This means the package is installed in two places. The first is at the root directory where `package.json` is defined. The second is the global `node_modules` folder on the user system (`/usr/lib/node_modules`. use command `npm list -g | head -1`).
