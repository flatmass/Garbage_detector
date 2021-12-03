import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapData =
    {
        positions: [
            {lat: 55.5, lng: 34.56},
            {lat: 34.7, lng: 28.4}
        ],
        options: {
            radius: 20,
            opacity: 0.6
        }
    };

class HeathMap extends Component {
    static defaultProps = {
        center: {
            lat: 55.787306154928686,
            lng: 49.12240089463772,
        },
        zoom: 12
    };

    componentDidMount() {

    }
    /*onMapClick({x, y, lat, lng, event}) {
      if (this._googleMap !== undefined) {
        const point = new google.maps.LatLng(lat, lng);
        this._googleMap.heatmap.data.push(point)
      }
    }*/
    toggleHeatMap() {
      this.setState({
        heatmapVisible: !this.state.heatmapVisible
      }, () => {
        if (this._googleMap !== undefined) {
          this._googleMap.heatmap.setMap(this.state.heatmapVisible ?
            this._googleMap.map_ : null)
        }
      })
    }
    handleApiLoaded = (map, maps) => {
        let heatmapData = [
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.792341664722045, 49.15313332708228),
            new maps.LatLng(55.79286915158392, 49.15017416387401),
            new maps.LatLng(55.79286915158392, 49.15017416387401),
            new maps.LatLng(55.79286915158392, 49.15017416387401),
            new maps.LatLng(55.793761805383696, 49.145771506417816),
            new maps.LatLng(55.79489788063075, 49.13992535471369),
            new maps.LatLng(55.794045827302305, 49.143750614470704),
            new maps.LatLng(55.794045827302305, 49.143750614470704),
            new maps.LatLng(55.794045827302305, 49.143750614470704),
            new maps.LatLng(55.794045827302305, 49.143750614470704),
            new maps.LatLng(55.794045827302305, 49.143750614470704),
            new maps.LatLng(55.79550647873829, 49.1331409317484),
        ];
        var heatmap = new maps.visualization.HeatmapLayer({
          data: heatmapData
        });
        heatmap.setMap(map);
    };

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    ref={(el) => this._googleMap = el}
                    bootstrapURLKeys={{ key: 'AIzaSyB39clvbhoblZD0LSI8lhGfZzEIctwz8_c', region: 'RU', language: 'ru' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    heatmapLibrary={true}
                    heatmap={MapData}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                />
            </div>
        )
    }
}

export default HeathMap;