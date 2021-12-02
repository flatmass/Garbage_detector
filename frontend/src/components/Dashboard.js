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
                    <Card>
                        <CardHeader title="Переполненные мусорные баки" />
                        <CardContent style={{ width: '100%', height: 500, boxSizing: 'border-box' }}>
                            <HeathMap />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Среднее время закрытия вопроса" />
                        <CardContent style={{ width: '100%', height: 500, boxSizing: 'border-box' }}>
                            <ResponsiveContainer>
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="pv" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Заполненность баков" />
                        <CardContent style={{ width: '100%', height: 300, boxSizing: 'border-box' }}>
                            <ResponsiveContainer>
                                <BarChart width={400} height={250} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title="Замусоренность улиц" />
                        <CardContent style={{ width: '100%', height: 300, boxSizing: 'border-box' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={data} dataKey="pv" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default Dashboard;