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

The app is managed by Phusion Passenger running on Wheatley behind Nginx.

Deployment is done using TJs [deploy](https://github.com/tj/deploy) shell script. How to install ```deploy``` globally (since the documentation is terrible):

```
cd ~
git clone git@github.com:visionmedia/deploy.git
cd deploy
make install
```

You can then deploy the app to Wheatley by typing ```deploy production```. Remember you must be inside the LAN network in order to deploy. The deploy script can be found in _deploy.conf_.