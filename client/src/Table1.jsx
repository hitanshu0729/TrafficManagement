import React, { useState, useEffect } from "react";
import Circle from "./Circle";

const Table = ({ data }) => {
  const [totals, setTotals] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [prefix, setPrefix] = useState([0]);
  const [curtime, setCurtime] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      const newTotals = [];
      for (const key in data) {
        const total = data[key].Total;
        newTotals.push(total);
      }
      setTotals(newTotals);
    };
    if (data) {
      calculateTotals();
    }
  }, [data]);

  useEffect(() => {
    const t = [];
    let maxN = Math.max(...totals);
    for (let i = 0; i < totals.length; i++) {
      t.push(Math.floor((totals[i] / maxN) * 5));
    }
    setTimeArray(t);
  }, [totals]);

  useEffect(() => {
    if (timeArray.length > 0) {
      let sum = 0;
      let arr = [];
      for (let i = 0; i < timeArray.length; i++) {
        sum += timeArray[i];
        arr.push(sum);
      }
      setPrefix([0, ...arr]);
    }
  }, [timeArray]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurtime(
        (prevCurtime) => (prevCurtime + 1) % (prefix[prefix.length - 1] || 1)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [prefix]);
  console.log(prefix);
  console.log(timeArray);
  console.log(totals);
  return (
    <table className="border-collapse border border-gray-400 max-w-screen">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-4 py-2">Camera ID</th>
          <th className="border border-gray-400 px-4 py-2">Bicycle</th>
          <th className="border border-gray-400 px-4 py-2">Buses</th>
          <th className="border border-gray-400 px-4 py-2">Cars</th>
          <th className="border border-gray-400 px-4 py-2">Motorcycles</th>
          <th className="border border-gray-400 px-4 py-2">Trucks</th>
          <th className="border border-gray-400 px-4 py-2">Total</th>
          <th className="border border-gray-400 px-4 py-2">Signal</th>
          <th className="border border-gray-400 px-4 py-2">Time remaining</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          Object.entries(data).map(([key, value], indexMap) => {
            return (
              <tr key={key}>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {key}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.vehiclecount.bicycle}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.vehiclecount.bus}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.vehiclecount.car}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.vehiclecount.motorcycle}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2 ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.vehiclecount.truck}
                </td>
                <td
                  className={`border border-gray-400 px-4 py-2  ${
                    value.alertStatus === "Warn"
                      ? "text-red-600 bg-red-100"
                      : ""
                  }`}
                >
                  {value.Total === "" ? "  " : value.Total}
                </td>
                <td>
                  <Circle
                    color={
                      curtime >= prefix[indexMap] &&
                      curtime < prefix[indexMap + 1]
                        ? "green"
                        : "red"
                    }
                  />
                </td>
                <td>
                  {curtime < prefix[indexMap]
                    ? prefix[indexMap] - curtime
                    : curtime > prefix[indexMap + 1]
                    ? prefix[indexMap] + 17 - curtime
                    : prefix[indexMap + 1] - curtime}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
