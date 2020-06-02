
var Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer;


var inputLayer = new Layer(60);
var hiddenLayer = new Layer(20);
var outputLayer = new Layer(10);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer,
});

const trainer = new Trainer(myNetwork);
trainer.train(trainingSet1, {
  iterations: 1000,
  shuffle: true,
  log: false,
  cost: Trainer.cost.CROSS_ENTROPY,
});

function runIa(lienzo) {
  var output,
    maximum,
    denominator,
    nominators,
    softmax,
    maxIndex = 0,
    result = [],
    nnDigit = 0,
    nnDigit = 0;
  output = myNetwork.activate(lienzo);
  console.log("output", output);
  maximum = output.reduce(function (p, c) {
    return p > c ? p : c;
  });
  nominators = output.map(function (e) {
    return Math.exp(e - maximum);
  });
  denominator = nominators.reduce(function (p, c) {
    return p + c;
  });
  softmax = nominators.map(function (e) {
    return e / denominator;
  });

  softmax.reduce(function (p, c, i) {
    if (p < c) {
      maxIndex = i;
      return c;
    } else return p;
  });

  for (var i = 0; i < output.length; i++) {
    if (i == maxIndex) result.push(1);
    else result.push(0);
  }

  for (var i = 0; i <= 9; i++) {
    if (result[i] == 1) {
      nnDigit = i;
      console.log("entro");
      break;
    }
  }

  for (var i = 0; i <= 9; i++) {
    if (trainingSet1[0].output[i] == 1) {
      testDigit = i;
      break;
    }
  }

  res.push(testDigit, nnDigit);
  return res;
  
}
