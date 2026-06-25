import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Highcharts from "highcharts";
import HighchartsReactModule from "highcharts-react-official";
import Highcharts3DModule from "highcharts/highcharts-3d";

const HighchartsReact =
  HighchartsReactModule.default || HighchartsReactModule;

const Highcharts3D =
  Highcharts3DModule.default || Highcharts3DModule;

if (typeof Highcharts3D === "function") {
  Highcharts3D(Highcharts);
}

const complianceData = [
  { name: "Helmet", value: 72, color: "#16c784" },
  { name: "Vest", value: 55, color: "#f59e0b" },
  { name: "Not OK", value: 30, color: "#ef4444" },
];

const detectionData = [
  { name: "Helmet", value: 100, color: "#16c784" },
  { name: "Vest", value: 80, color: "#f59e0b" },
  { name: "Overall", value: 70, color: "#2563eb" },
];

const chartOptions = [
  { value: "pie", label: "Pie" },
  { value: "donut", label: "Donut" },
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "pie3d", label: "3D Pie" },
];

function ChartDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="shrink-0 rounded border border-[#1d4ed8] bg-[#07182a] px-1.5 py-0.5 text-[10px] text-white outline-none"
    >
      {chartOptions.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

function Pie3DChart({ data }) {
  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 170,
      spacing: [0, 0, 0, 0],
      options3d: {
        enabled: true,
        alpha: 55,
        beta: 0,
        depth: 45,
        viewDistance: 25,
      },
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: false },
    tooltip: {
      pointFormat: "<b>{point.percentage:.0f}%</b>",
    },
    plotOptions: {
      pie: {
        depth: 38,
        size: "90%",
        center: ["50%", "48%"],
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          distance: -35,
          crop: false,
          overflow: "allow",
          style: {
            color: "#ffffff",
            fontSize: "10px",
            fontWeight: "600",
            textOutline: "none",
          },
          format: "{point.name}<br/>{point.percentage:.0f}%",
        },
      },
    },
    series: [
      {
        name: "Value",
        data: data.map((item) => ({
          name: item.name,
          y: item.value,
          color: item.color,
        })),
      },
    ],
  };

  return (
    <div className="h-[170px] w-full min-w-0 overflow-hidden">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: {
            width: "100%",
            height: "170px",
          },
        }}
      />
    </div>
  );
}

function ChartRenderer({ type, data }) {
  if (type === "pie3d") {
    return <Pie3DChart data={data} />;
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -16, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#aaa" fontSize={10} tickMargin={6} />
          <YAxis stroke="#aaa" fontSize={10} width={30} />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -16, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#aaa" fontSize={10} tickMargin={6} />
          <YAxis stroke="#aaa" fontSize={10} width={30} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={type === "donut" ? "45%" : 0}
          outerRadius="74%"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>

        {type === "donut" && (
          <>
            <text
              x="50%"
              y="46%"
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
            >
              70%
            </text>
            <text x="50%" y="60%" textAnchor="middle" fill="#cbd5e1" fontSize="10">
              Compliant
            </text>
          </>
        )}

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function ChartCard({ title, data, defaultType = "donut" }) {
  const [type, setType] = useState(defaultType);

  return (
    <div className="glass-card min-w-0 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="truncate text-sm font-semibold">{title}</h3>
        <ChartDropdown value={type} onChange={setType} />
      </div>

      <div className="h-[170px] min-w-0">
        <ChartRenderer type={type} data={data} />
      </div>
    </div>
  );
}

export default function ChartsPanel() {
  return (
    <div className="min-w-0 space-y-2">
      <ChartCard title="PPE Compliance" data={complianceData} defaultType="donut" />
      <ChartCard title="Detection Stats" data={detectionData} defaultType="bar" />
    </div>
  );
}