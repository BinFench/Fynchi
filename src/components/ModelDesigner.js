import React from 'react';
import Model from '../utils/Model';
import Layer from '../utils/Layer';

export default class ModelDesigner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        zoomPerc: 1.0,
        width: props.width,
        height: props.height,
        ratio: props.width/props.height,
        zoomheight: props.height,
        x: 0,
        y: 0,
        model: new Model([new Layer({
          type: 'input',
          units: 4
        })], [new Layer({
          type: 'dense',
          units: 4
        })]),

        canvas: null,
        ctx: null
      };
    }

    initialDraw() {
      const toDraw = this.state.model;
      toDraw.render();

      this.setState({
        model: toDraw
      });

      let width = toDraw.renderOrder.length;
      let height = 0;
      toDraw.renderOrder.forEach(item => {
        if (item.length > height) {
          height = item.length;
        }
      });

      height = 100*(2*height - 1); //100 units per layer + 100 between each layer
      width = 50*(2*width - 1); //50 units per layer + 50 between each layer

      const ratio = width/height;
      if (ratio >= 1) {
        this.setState({
          zoomheight: width/this.state.ratio
        });
      } else {
        this.setState({
          zoomheight: height
        })
      }
    }

    componentDidMount() {
      const canvas = this.refs.modelView;
      const ctx = canvas.getContext('2d');
      this.setState({
        canvas: canvas,
        ctx: ctx
      });
      this.initialDraw();
    }

    componentDidUpdate() {
    }

    render() {
      return (
        <canvas ref='modelView' 
                width={this.state.width} 
                height={this.state.height} 
        />
      );
    }
  }
