const should = require('should');
const fs = require('fs');
const path = require('path');
let Call;

// faço a leitura da classe Call e crio uma cópia adicionando o module.exports pois não consegui
// fazer o teste funcionar de outra maneira

fs.readFile(path.join(__dirname, '../src/js/app-es6/Call.js'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    fs.writeFile('test/Call.copy.js', data, function (err) {
        if (err) {
          return console.log(err);
        }

        fs.appendFile('test/Call.copy.js', 'module.exports = Call', function (err) {
            if (err) throw err;
            Call = require('./Call.copy.js');

            describe('Calls instance Unit Testing', () => {

                it('should return object typeof', (done) => {
                    const call = new Call();
                    call.should.type('object');
                    done();
                  });

                it('should return dddOrigin after insert', (done) => {
                    const call = new Call();
                    const dddOrigin = Math.floor(Math.random() * 100);
                    call.dddOrigin = dddOrigin;
                    call.dddOrigin.should.equal(dddOrigin);
                    done();
                  });

                it('should return dddDestination after insert', (done) => {
                    const call = new Call();
                    const dddDestination = Math.floor(Math.random() * 100);
                    call.dddDestination = dddDestination;
                    call.dddDestination.should.equal(dddDestination);
                    done();
                  });

                it('should return time after insert', (done) => {
                    const call = new Call();
                    const time = Math.floor(Math.random() * 100);
                    call.time = time;
                    call.time.should.equal(time);
                    done();
                  });

                it('should return plan after insert', (done) => {
                    const call = new Call();
                    const plan = Math.floor(Math.random() * 100);
                    call.plan = plan;
                    call.plan.should.equal(plan);
                    done();
                  });

                it('should return tax after insert', (done) => {
                    const call = new Call();
                    const tax = Math.random();
                    call.tax = tax;
                    call.tax.should.equal(tax);
                    done();
                  });

                it('should return pricePerMinute after insert', (done) => {
                    const call = new Call();
                    const pricePerMinute = Math.random() * 10;
                    call.pricePerMinute = pricePerMinute;
                    call.pricePerMinute.should.equal(pricePerMinute);
                    done();
                  });

                it('should return the price over a time and the price per minute without a FaleMais plan', (done) => {
                    const call = new Call();
                    const time = Math.floor(Math.random() * 100);
                    const price = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.pricePerMinute = price;
                    call.defaultPrice.should.equal(time * price);
                    done();
                  });

                it('should return 0 for a time lower than the plan FaleMais30', (done) => {
                    const call = new Call();
                    const time = 29;
                    const price = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.pricePerMinute = price;
                    call.plan = 30;
                    call.faleMaisPrice.should.equal(0);
                    done();
                  });

                it('should return 0 for a time equal to the plan FaleMais60', (done) => {
                    const call = new Call();
                    const time = 60;
                    const price = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.pricePerMinute = price;
                    call.plan = 60;
                    call.faleMaisPrice.should.equal(0);
                    done();
                  });

                it('should return 0 for a time lower than the plan FaleMais120', (done) => {
                    const call = new Call();
                    const time = 110;
                    const price = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.pricePerMinute = price;
                    call.plan = 120;
                    call.faleMaisPrice.should.equal(0);
                    done();
                  });

                it('should return the price using the plan FaleMais30', (done) => {
                    const call = new Call();
                    const time = 35;
                    let price = Math.floor(Math.random() * 10);
                    const tax = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.tax = tax;
                    call.pricePerMinute = price;
                    call.plan = 30;
                    call.faleMaisPrice.should.equal(5 * (price += (price * tax)));
                    done();
                  });

                it('should return the price using the plan FaleMais60', (done) => {
                    const call = new Call();
                    const time = 70;
                    let price = Math.floor(Math.random() * 10);
                    const tax = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.tax = tax;
                    call.pricePerMinute = price;
                    call.plan = 60;
                    call.faleMaisPrice.should.equal(10 * (price += (price * tax)));
                    done();
                  });

                it('should return the price using the plan FaleMais120', (done) => {
                    const call = new Call();
                    const time = 150;
                    let price = Math.floor(Math.random() * 10);
                    const tax = Math.floor(Math.random() * 10);
                    call.time = time;
                    call.tax = tax;
                    call.pricePerMinute = price;
                    call.plan = 120;
                    call.faleMaisPrice.should.equal(30 * (price += (price * tax)));
                    done();
                  });
              });

            fs.unlink('test/Call.copy.js');
          });
      });
  });
