'use client'
import 'react-toastify/dist/ReactToastify.css'
import { Chart } from 'react-google-charts';
import { useEffect, useState } from "react"


var groupBy = require('json-groupby')

export const data = [
    ["Local", "Quantidade"],
    ["Campo", 11],
    ["Praia", 2],
    ["Montanhoso", 2],
    ["Cidade", 2],
    ["Livre", 2],
];

export const options = {
    title: "GeolocalizaçAo",
};

export default function App() {
    const [busca, setBusca] = useState([])
    const [group, setGroup] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getGroup() {
            const response = await fetch("http://localhost:3004/filmes")
            var buscaTemp = await response.json()
            var groupTemp = groupBy(buscaTemp, ["classif"], ["id"])
            setGroup(groupTemp)
            setBusca(buscaTemp)
            setIsLoading(false)
        }
        getGroup()
    }, [])
    if (isLoading) {
        return (
            <div className="container">
                <h2>Quartos de Hotel</h2>
                <h5>Aguarde... Carregando os dados</h5>
            </div>
        )
    }

    console.log(busca)

    console.log("******")
    console.log(group)

    return (
        <div className='py-10'>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    )
}
