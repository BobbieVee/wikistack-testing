const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const db = require('../models');
const Page = db.Page;

describe('Page model', function () {
  describe('Virtuals', function () {
  	var page;
  	beforeEach(()=> {
  		page = Page.build();
 	});
    describe('route', function () {
	  it('returns the url_name prepended by "/wiki/"', (()=> {
      	page.urlTitle = "sailing_sailing";
      	expect(page.route).to.equal('/wiki/sailing_sailing');
      }));
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML',()=> {
      	page.content = 'Foo on Moe';
      	expect(page.renderedContent).to.equal('<p>Foo on Moe</p>\n')
      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
    	before((done)=> {
    		Page.create({
    			title: "Are ya with me?",
    			content: "Well???",
    			tags: ['question', 'shy']

    		})
    		.then(()=> {
    			done();
    		})
    		.catch((err)=> {
    			done(err);
    		});
    	});

      it('gets pages with the search tag', (done)=> {
      	Page.findByTag('shy')
      	.then((page)=> {
      		expect(page[0].title).to.equal("Are ya with me?");
      		done()
   		})
  		.catch((err)=> {
  			done(err);
      	});
      });
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});