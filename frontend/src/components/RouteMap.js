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

    drawRouteFunc = (map, maps) => {

        //You can calculate directions (using a variety of methods of transportation) by using the DirectionsService object.
        let directionsService = new maps.DirectionsService();

        //Define a DirectionsRenderer variable.
        let _directionsRenderer = '';

        //InitializeMap() function is used to initialize google map on page load.

        //DirectionsRenderer() is a used to render the direction
        _directionsRenderer = new maps.DirectionsRenderer();

        //Set the map for directionsRenderer
        _directionsRenderer.setMap(map);
        //Set different options for DirectionsRenderer mehtods.
        //draggable option will used to drag the route.
        _directionsRenderer.setOptions({
            draggable: true
        });


        let MyLitleArray = [
            {lat: 55.77020638055987, lng: 49.17510922726046},
            {lat: 55.78838508991145, lng: 49.121758371436925},
            {lat: 55.791449469787665, lng: 49.116988923754434}
        ];
        drawRouteFromArray(MyLitleArray);
        function drawRouteFromArray(arr) {
            let _mapPoints = arr;
            let _waypoints = new Array();
            if (_mapPoints.length > 2) //Waypoints will be come.
            {
                for (let j = 1; j < _mapPoints.length - 1; j++) {
                    let address = _mapPoints[j];
                    if (address !== "") {
                        _waypoints.push({
                            location: address,
                            stopover: true //stopover is used to show marker on map for waypoints
                        });
                    }
                }

                //Call a drawRoute() function
                drawRoute(_mapPoints[0], _mapPoints[_mapPoints.length - 1], _waypoints);
            } else if (_mapPoints.length > 1) {
                //Call a drawRoute() function only for start and end locations
                drawRoute(_mapPoints[_mapPoints.length - 2], _mapPoints[_mapPoints.length - 1], _waypoints);
            } else {
                //Call a drawRoute() function only for one point as start and end locations.
                drawRoute(_mapPoints[_mapPoints.length - 1], _mapPoints[_mapPoints.length - 1], _waypoints);
            }
        }

        //drawRoute() will help actual draw the route on map.
        function drawRoute(originAddress, destinationAddress, _waypoints) {
            //Define a request variable for route .
            let _request = '';
            //This is for more then two locatins
            if (_waypoints.length > 0) {
                _request = {
                    origin: originAddress,
                    destination: destinationAddress,
                    waypoints: _waypoints, //an array of waypoints
                    optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
                    travelMode: maps.DirectionsTravelMode.DRIVING
                };
            } else {
                //This is for one or two locations. Here noway point is used.
                _request = {
                    origin: originAddress,
                    destination: destinationAddress,
                    travelMode: maps.DirectionsTravelMode.DRIVING
                };
            }
            //This will take the request and draw the route and return response and status as output
            directionsService.route(_request, function (_response, _status) {
                if (_status == maps.DirectionsStatus.OK) {
                    _directionsRenderer.setDirections(_response);
                }
            });
        }

    };


    routeListData = [
        { count: 1, title: 'База ООО УК ПЖКХ', subtitle: 'Начало маршрута 13:00'},
        { count: 3, title: 'ул. Профсоюзная, 48-50', subtitle: 'Через 35 минут'},
        { count: 2, title: 'ул. Профсоюзная, 17в', subtitle: 'Через 10 минут'},
    ];


    render() {
        return (
            <div className="map-page">
                <h1 className="map-page__title">Построение маршрутного листа</h1>
                <div className="map-page__wrap">
                    <div className="map-page__route-list">
                        {this.routeListData.map((item, index) => {
                            return <RouteList key={index} data={item} />
                        })}
                    </div>
                    <div className="map-page__map" style={{ height: '100%', width: '100%' }}>
                        <GoogleMapReact
                            ref={(el) => this._googleMap = el}
                            bootstrapURLKeys={{ key: 'AIzaSyB39clvbhoblZD0LSI8lhGfZzEIctwz8_c', region: 'RU', language: 'ru' }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            heatmapLibrary={true}
                            heatmap={MapData}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => this.drawRouteFunc(map, maps)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const RouteList = ({data}) => {
        return (
            <div className="route-list__item">
                <span className="route-list__count">{data.count}</span>
                <div className="route-list__flex-wrap">
                    <span className="route-list__title">{data.title}</span>
                    <span className="route-list__sub-title">{data.subtitle}</span>
                </div>
            </div>
        )
    };

export default HeathMap;