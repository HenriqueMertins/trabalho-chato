'use client'
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Geolocalização",
};

export default function OriginalChart() {
  const [busca, setBusca] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3004/filmes");
        const data = await response.json();
        setBusca(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <h2>Quartos de Hotel</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    );
  }

  // Criar os dados para o gráfico com base nos dados obtidos do backend
  const chartData = [["Local", "Quantidade"]];
  const dataCount = {};

  // Contar a quantidade de cada tipo de local
  busca.forEach((item) => {
    const local = item.classif;
    if (dataCount[local]) {
      dataCount[local] += 1;
    } else {
      dataCount[local] = 1;
    }
  });
  // Preencher os dados do gráfico
  Object.keys(dataCount).forEach((local) => {
    chartData.push([local, dataCount[local]]);
  });

  console.log(dataCount)
  console.log("***********")
  console.log(chartData)

  return (
    <div className="py-10">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}
