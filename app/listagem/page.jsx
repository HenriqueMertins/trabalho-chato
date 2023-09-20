'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
  const [filmes, setFilmes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getFilmes() {
      const response = await fetch("http://localhost:3004/filmes")
      const dados = await response.json()
      setFilmes(dados)
      setIsLoading(false)
    }
    getFilmes()
  }, [])

  async function excluiFilme(id) {
    const response = await fetch("http://localhost:3004/filmes/" + id, {
      method: "DELETE"
    })
    const novosDados = filmes.filter(filme => filme.id != id)
    setFilmes(novosDados)
  }

  async function destacaFilme(id, status_atual) {
    await fetch("http://localhost:3004/filmes/" + id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = filmes.findIndex(filme => filme.id == id)
    const novosDados = [...filmes]
    novosDados[indiceAlterado].destaque = !status_atual
    setFilmes(novosDados)
  }

  const listaFilmes = filmes.map(filme => (
    <ItemLista key={filme.id}
      filme={filme}
      exclui={() => excluiFilme(filme.id)}
      altera={() => router.push('altera/' + filme.id)}
      consulta={() => router.push('consulta/' + filme.id)}
      destaca={() => destacaFilme(filme.id, filme.destaque)}
    />
  ))

  async function filtraDados(data) {
    console.log("componente " + data.orderby)
    if (data.pesq.length < 2) {
      Swal.fire("Digite, no mínimo, 2 caracteres")
      return
    }

    // busca todos os dados e aplica o filtro no vetor
    // -----------------------------------------------
    const pesquisa = data.pesq.toUpperCase()

    const response = await fetch("http://localhost:3004/filmes")
    const dados = await response.json()

    const novosDados = dados.filter(filme =>
      filme.titulo.toUpperCase().includes(pesquisa) || filme.promocao.toUpperCase().includes(pesquisa)
    )
    
    if (novosDados.length == 0) {
      Swal.fire("Não há filmes com a palavra chave informada...")
      return
    }

    setFilmes(novosDados)

    // busca os dados da API já com o filtro
    // --------------------------------------
    // const response = await fetch("http://localhost:3004/filmes?titulo="+data.pesq)
    // const dados = await response.json()
    // setFilmes(dados)
  }

  async function mostraTodos(data) {
    console.log("componente " + data)
    const response = await fetch("http://localhost:3004/filmes")
    //http://localhost:3004/filmes?_sort=diaria&_order=asc

    const dados = await response.json()
    setFilmes(dados)
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Quartos de Hotel</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2">Quartos de Hotel</h2>
        </div>
        <div className="col-sm-5">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Hotel</th>
            <th>Diaria</th>
            <th>Pessoas</th>
            <th>check-in</th>
            <th>check-out</th>
            <th>Geo Localização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaFilmes}
        </tbody>
      </table>
    </div>
  )
}