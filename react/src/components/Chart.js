import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import '../index.css';

class Chart extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true
  }

  render() {

    var convertedPollData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
"Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen","AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
        ]
      }]
    };

    var convertPollData = this.props.chartData.map((prop, index) => {
      var optionsData = prop.options.map((items, index) => {
        convertedPollData.labels.push(items.name);
        convertedPollData.datasets[0].data.push(items.votes);
      })
    })


    return (
      <div className="chart">
        <Doughnut
          data={convertedPollData}
          width={320}
          height={320}
          options={{
            width: this.props.width,
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: this.props.displayTitle,
              text: this.props.chartTitle,
              fontSize: 25,
              fontColor: 'black',
              fontFamily: "'Open Sans', sans-serif"
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              labels: {
                fontFamily: "'Open Sans', sans-serif"
              }
            }
          }}
        />
      </div>
    )
  }

}

export default Chart;
