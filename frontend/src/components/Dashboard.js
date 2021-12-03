import * as React from "react";
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import HeathMap from '../components/HeathMap'

import '../media/video-react.css';

import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const COLORS = ['#e6bd00', '#da6193', '#8564fe', '#3054cc', '#09b3fe', '#82c41d', '#ee9b26', '#ff4e37'];

const Dashboard = () => {
    return (
        <div style={{padding: '16px'}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
                        <HeathMap />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Заполненность баков" />
                        <CardContent style={{ width: '100%', height: 400, boxSizing: 'border-box' }}>
                            <ResponsiveContainer>
                                <BarChart width={'100%'} height={'100%'} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default Dashboard;