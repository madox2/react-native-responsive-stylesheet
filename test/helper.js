const M = require('module')

const reactNativeMock = {
  Dimensions: {
    get: dim => dim === 'window' ? ({
      width: 400,
      height: 200,
    }) : undefined
  }
}

const origLoad = M._load;
M._load = function(request, ...rest) {
  return request === 'react-native' ? reactNativeMock : origLoad.call(M, request, ...rest)
}
