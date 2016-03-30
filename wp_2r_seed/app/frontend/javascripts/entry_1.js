import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import World from './components/world';
require('expose?$!expose?jQuery!jquery');

_.times(5, function(i) {
  console.log(i);
});

$(function(){
  ReactDOM.render(<World/>, document.getElementById('world'));
});
