async function getResolvedPromises(myObject) {
    const promises = await Object.keys(myObject).map(async (k) => {
        switch (k) {
            case '1':
                const firstPromise = await asyncCallNumber1()
                return firstPromise
            case '2':
                const secondPromise = await asyncCallNumber1()
                return secondPromise
            case '3':
                const thirdPromise = await asyncCallNumber1()
                return thirdPromise
            default:
                return
        }
    })

    const data = await Promise.all(promises)
    return data
}

var res = getResolvedPromises({test1: '1', test2: '2', 1: 'haha'});
console.log('here: ', res);

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCallNumber1() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}