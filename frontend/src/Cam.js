import React from 'react'
import * as plotly from 'plotly.js'

/*


plot class activation map correctly 





*/





const reshape = (x,rows,cols)=>{
	let cpy = x
	let ret = []

	for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      let i = r * cols + c;
      if (i < cpy.length) {
        row.push(cpy[i]);
      }
    }
    ret.push(row);
  }
	return ret
}

export function drawconv_map(x,elements_name,reshape_x,reshape_y,width_plot,height_plot){
  
 // x.reshape(reshape_x,reshape_y);
	x = reshape(x,reshape_x,reshape_y)
  const data = [
  {
    z: x,
    type: 'heatmap',
    colorscale: 'YlGnBu',
    showlegend: false,
    showarrow: false,
    showscale: false,
    showgrid : false
  }
  ];

  const layout = {
    autosize: false,
    width: width_plot,
    height: height_plot,
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 10,
      pad: 4
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: false,
    xaxis: {visible: false},
    yaxis: {visible: false},

  };

  plotly.newPlot(elements_name, data , layout);
}

export function destroyPlot(name){
	plotly.purge(name)
}

export function Cam(props){
  return (
    <div id="components" style={{float:'right'}}>
	  
		<div className="pure-u-1-32" id = "tc_0"></div>
		
		</div>
	
  )
}