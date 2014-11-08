.PHONY: test watch coverage open-coverage start

test:
	mocha

start:
	nodemon app/app.js

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