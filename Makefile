.PHONY: test watch coverage open-coverage start prod-restart bootstrap

test:
	./node_modules/.bin/mocha

start:
	nodemon app/app.js

prod-restart:
	mkdir -p tmp && touch tmp/restart.txt

coverage: clean
	mocha -R html-cov > reports/coverage.html

open-coverage: coverage
	open reports/coverage.html

watch:
	mocha -w

clean:
	rm -rf reports
	mkdir reports

bootstrap:
	npm install

build:
	./node_modules/.bin/grunt build