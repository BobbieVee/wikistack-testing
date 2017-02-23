// const mocha = require('mocha');
const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

// describe('Testing functionality', ()=>{
// 	it('confirms basic functionality', ()=> {
// 		expect(2+2).to.equal(4);
// 	});

// 	it('it tests timeout\'s accuracy', (done)=> {
// 		const start = new Date();
// 		console.log('start = ', start);
// 		setTimeout( ()=> {
// 			const duration = new Date() - start;	
// 			expect(duration).to.be.closeTo(1000, 50);
// 			done();
// 		}, 1000);
// 	});

// 	it('Will invoke a function once per element', ()=> {
// 		const arr = ['x', 'y', 'z'];
// 		let logNth = (val, idx) => {
// 			console.log('value at idx: '+idx+' = '+ val);
// 		};
// 		logNth = chai.spy(logNth);
// 		arr.forEach(logNth);
// 		expect(logNth).to.have.been.called.exactly(arr.length);	
// 	});


	
// });