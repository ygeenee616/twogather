import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Label,
  Bar,
} from "recharts";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

async function getData() {
  const url = "/chartMockData.json";
  const mockdata = await axios.get(url);

  console.log(mockdata.data);
  return mockdata;
}

function Chart() {
  const [chartData, setChartData] = useState([]);
  const url = "/chartMockData.json";

  useEffect(() => {
    async function getData() {
      const response = await axios.get(url);
      const data = response.data;
      setChartData(data);
    }
    getData();
  }, []);

  return (
    <Box>
      <Title>일별 매출 수</Title>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={chartData} barSize={(35, 35)} barGap={10}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="roomName"></XAxis>
          <YAxis type="number" domain={[0, "dataMax+50"]}></YAxis>
          <Tooltip />
          <Legend type="diamond" />
          <Bar dataKey="beforeCount" fill="#8884d8">
            <LabelList dataKey="beforeCount" position="top" />
          </Bar>
          <Bar dataKey="count" fill="#82ca9d">
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

const Title = styled.span`
  font-size: 1.2rem;
`;

const Box = styled.div`
  z-index: 1000;
  width: 100%;
  height: 500px;
`;
export default Chart;
