MOCHA_OPTS=--recursive
MOCHA_REPORTER=dot
ISTANBUL_REPORTER=html
ISTANBUL_DIR=_coverage

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		$(MOCHA_OPTS)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		$(MOCHA_OPTS) \
		--watch

test-cov: clean
	@mkdir $(ISTANBUL_DIR)
	@istanbul \
	  cover ./test-runner.js \
	  --default-excludes \
	  --report $(ISTANBUL_REPORTER) \
	  --dir $(ISTANBUL_DIR)

clean:
	@rm -rf $(ISTANBUL_DIR)

.PHONY: test test-w test-cov clean