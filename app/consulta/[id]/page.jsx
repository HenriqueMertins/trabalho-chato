import Link from "next/link"

async function getFilme(id) {
  const response = await fetch("http://localhost:3004/filmes/"+id)
  const dado = await response.json()
  // console.log("=".repeat(40))
  // console.log(dado)
  // console.log("=".repeat(40))
  return dado
}

export default async function Consulta({params}) {

  const filme = await getFilme(params.id)
  
  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Hoteis</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Nome do Hotel</label>
            <input type="text" className="form-control" id="titulo" value={filme.titulo} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="promocao" className="form-label">Promoções</label>
            <input type="text" className="form-control" id="promocao" value={filme.promocao} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="diaria" className="form-label">Diária R$</label>
            <input type="number" step="0.10" className="form-control" id="diaria" value={filme.diaria} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data check-in</label>
            <input type="text" className="form-control" id="data" value={filme.data} readOnly />
          </div>
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data check-out</label>
            <input type="text" className="form-control" id="data" value={filme.data} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="classif" className="form-label">Geo Localização</label>
            <input id="classif" className="form-select" value={filme.classif} readOnly />
          </div>
          <div className="col-sm-2">
            <p>Status do Filme:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                checked={filme.destaque}
                readOnly
                />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="endereco" className="form-label">Endereço</label>
            <input type="text" className="form-control" id="endereco" value={filme.endereco} readOnly />
          </div>
          <div className="col-sm-6">
            <p className="form-label">Foto</p>
            <img src={filme.capa} alt={`Capa do filme ${filme.capa}`} width={150} height={210} className="mx-auto d-block"/>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" value={filme.sinopse} readOnly></textarea>
        </div>

        <Link className="btn btn-success float-end" href="/listagem">Voltar</Link>

      </form>
    </div>
  )
}