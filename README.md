# LAN-Auth

[![Build Status](https://travis-ci.org/LSUCS/LAN-Auth.svg)](https://travis-ci.org/LSUCS/LAN-Auth)

This app is responsible for authenticating users at the LSUCS LAN parties. It is designed to run on Wheatley, a server sitting inside the LAN with access to the internet. It is made up of two parts:

1. A UI where users can enter their login credentials and seat number
2. A background process that uploads the IP addresses of authenticated users into the ACLs of configured Cisco devices.


## Commands

#### Installation
```make bootstrap```

#### Start app
```make start```

#### Run tests
```make test```

#### Continually run tests
```make watch```

#### Open code coverage report
```make open-coverage```


## Deploying

The app is managed by Phusion Passenger running on Wheatley behind Nginx. Static files are served by Nginx.

Deployment is done using TJs [deploy](https://github.com/tj/deploy) shell script. How to install ```deploy``` globally (since the documentation is terrible):

```
cd ~
git clone git@github.com:visionmedia/deploy.git
cd deploy
make install
```

You can then deploy the app to Wheatley by typing ```deploy production```. Remember you must be inside the LAN network in order to deploy. The deploy script can be found in _deploy.conf_.


## Production Setup

If the app ever needs reconfiguring for production (either a new server or a fresh install on Wheatley) the following needs to be done:

1. Install Phusion Passenger (for Nginx - not standalone), NVM (NodeJS Version Manager) and Git
1. Install NodeJS using NVM and set the default version
1. Configure Passenger + Nginx like so:
  ```
  server {
    # Basic configuration
    listen 80;
    server_name 192.168.0.25;

    # lan-auth static files
    location / {
      root /var/www/lan-auth/current/public/build;
      error_page 404 = /index.html;
    }
    # lan-auth app
    location /api {
      passenger_app_root /var/www/lan-auth/current;
      passenger_enabled on;
      passenger_app_type node;
      passenger_startup_file app/app.js;
    }

    # phpMyAdmin static files
    location /phpmyadmin {
      root /var/www;
      try_files $uri $uri/ =404;

      index index.php index.html index.htm;
    }

    # PHP files
    location ~ \.php$ {
      # Set root if loading phpMyAdmin
      if ($request_uri ~* /phpmyadmin) {
        root /var/www;
      }
      try_files $uri =404;
      fastcgi_split_path_info ^(.+\.php)(/.+)$;
      fastcgi_pass unix:/var/run/php5-fpm.sock;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      include fastcgi_params;
    }

  }
  ```
1. Create the folder /var/www/lan-auth and ensure the www-data user has full access
1. Ensure your user account is in the www-data group
1. __From your computer__: Run ```deploy production setup```
1. If all goes well this should setup the app on the server. You can then deploy as normal (```deploy production```)