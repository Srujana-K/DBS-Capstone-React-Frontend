import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
        client_id: "DBS001",
        total_buy_value: 40000,
        total_sell_value: 24000
    },
    {
        client_id: "DBS002",
        total_buy_value: 20000,
        total_sell_value: 25000
    },
    {
        client_id: "DBS003",
        total_buy_value: 30000,
        total_sell_value: 20000
    },
    {
        client_id: "DBS004",
        total_buy_value: 50000,
        total_sell_value: 24000
    }

];

export default function Dashboard() {
    return (
        <>
            <div>
                <h1>Client wise total Buy value</h1>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="client_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_buy_value" fill="#8884d8" />
                    <Bar dataKey="total_sell_value" fill="#82ca9d" />
                </BarChart>
            </div>
        </>
    );
}
