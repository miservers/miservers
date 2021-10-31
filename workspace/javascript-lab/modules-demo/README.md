## Modules Javascripts
#### run this module one NodeJS
    node --experimental-modules Index.mjs

#### Import a module into HTML
    <head>
      ...
      <script type=”module” src=Selling.mjs”></script>

Remarquer que le type *module* est indispensable pour charger un module dans du html.


#### Importants
 - Impossible de tester les modules en local(quoi que!), il faudra un web server. ceci pour une raison de securite des navigateurs.
 - Les modules sont charges et executes en mode "defer", c-a-d sans attendre que le html soit completement charge.

