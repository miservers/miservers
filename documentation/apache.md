**Table of content:**
- [Apache Web Server Basics]
- [Modules & Directives]
- [htaccess Files](#htaccess-files)
- [Virtual Hosts](#virtual-hosts) 
- [MIME Types]
- [URL Mapping]
- [Directory Indexing]
- [Performance Tuning]
- [Handlers and Filters]
- [SSI]
- [Security]
	- [HTTPS](#https)
- [Known Errors](#known-errors)

## Apache Web Server Basics
----------------------------------
Environment : Apache 2.4 , Ubuntu 20.04
### Stop/Start
### apachectl
### Configuration  Files
Directory:

	/etc/apache2/

### Check Syntax

	/apache/bin/httpd -f httpd.conf -t
	/apache/bin/httpd -f httpd.conf -S

### Logs

## Modules & Directives
---------------------------------
Enable/disable a module(Debian)

	a2enmod ssl
	a2dismod ssl

## htaccess Files
----------------------------------
.htaccess files are generaly used to configure the Web Server when we don't have access to the httpd.conf. However they slow the Web Server.

Disable Directory Listings in Apache using **.htaccess**:

1. Add directive **AllowOverride All** to the Site Directory 

		<Directory /www/safar>
			Options Indexes FollowSymLinks
			AllowOverride All
			Require all granted
		</Directory>

2. Create the file **.htaccess** under /www/safar with contents

		Options -Indexes

3. Access to http://www.safar.com/images/ will be then forbidden


## Virtual Hosts
---------------------------------
### Name-Based VHosts
Name-based Vhosts use  ServerName and ServerAlias  directives to determine the Vhost to serve. 

### IP-Based VHosts
IP-based VHosts use the IP to determine the correct VHost to serve. 

## Security
---------------------------------
### HTTPS

LoadModule ssl_module modules/mod_ssl.so

Include conf/safar.com-ssl.conf

<ins>safar.com-ssl.conf:</ins>

	Listen safar192:443
	<VirtualHost *:443>
	    ServerName ar.safar.com
	    SSLEngine on
	    SSLCertificateFile "/path/to/www.mysafar.com.pem"
	    SSLCertificateKeyFile "/path/to/www.mysafar.com.key"
	</VirtualHost>



### Rediriger HTTP vers HTTPS 
#### Using HSTS
```
	LoadModule headers_module modules/mod_headers.so

	<VirtualHost 10.0.0.45:443>
		Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains;"
	</VirtualHost>

	<VirtualHost *:80>
		[...]
		ServerName safarmeit.com
		Redirect permanent / https://safarmeit.com/
	</VirtualHost>
```

#### Using rewrite rule: less secure /!\ MIM vulnerability
```sh
Activate le mod_rewrite
On Debian
 $ a2enmod rewrite
On others:
 LoadModule rewrite_module modules/mod_rewrite.so



<VirtualHost *:80>
  ServerName www.mysafar.com

  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301] 
</VirtualHost>

ar.safar.com_ssl.conf:
<VirtualHost *:443>
  ServerName www.mysafar.com
  ...
</VirtualHost>

Ou bien si plusieurs domaines

```


### Page de Maintenance
Ajouter un virtual host de maintenance. En remplacement le VHost d'origine.

vhost_mnt.conf
```
<VirtualHost 10.0.0.35>
    ServerName www.mysafar.com
    DocumentRoot /www/data/html
    RewriteEngine on
    RewriteCond %{REQUEST_URI} !.*(npg|gif|jpg)$
    RewriteRule ^/.* /maintenance_mysafar.html
    ErrorLog /logs/maintenance_error_log
    CustomLog /logs/maintenance_access_log combined
</VirtualHost>
```

Puis recharger la conf:
	
	mv vhost_app.conf vhost_app.conf.ORIGIN
	cp vhost_mnt.conf vhost_app.conf
    apachectl reload

### Virtual Host pour Weblogic
	<VirtualHost x.x.x.x>
    ServerName www.application.domaine.fr
     <IfModule mod_weblogic.c>
        WebLogicCluster
               wls1.application.domaine.fr:port,wls2.application.domaine.fr:port
        <Location />
                SetHandler weblogic-handler
        </Location>
    </IfModule>
    ErrorLog /appli/log/application_error_log
    CustomLog /appli/log/application_access_log combined
	</VirtualHost>

	
## Known Errors
------------------------
### Forbidden - You don't have permission to access this resource
Error 403.

We assume this VHost:

	<VirtualHost *:80>
	    DocumentRoot "/www/safar/"
	    ServerName www.safar.com

	</VirtualHost>

To resolve this access error, do the following:

1. Grand access to /wwww directory

		<Directory /www/>
			Options Indexes FollowSymLinks
			AllowOverride None
			Require all granted
		</Directory>

2. Allow EXECUTE access to /www/safar

		chmod a+x /www/safar

3. Adjust the directory ownership (www-data OR apache)

		chown -R www-data:www-data /www/safar
		
4. Check .htaccess files

### Erreur: [warn] VirtualHost overlaps with VirtualHost , the first has precedence
Ajouter:

	NameVirtualHost 10.168.1.10:80
	NameVirtualHost 10.168.1.10:443

	<VirtualHost 10.168.1.10:80>
	....
	
	<VirtualHost 10.168.1.10:443>
	....
