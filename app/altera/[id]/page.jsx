'use client'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
  const params = useParams()
  //  console.log(params)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    async function getFilme() {
      const response = await fetch("http://localhost:3004/filmes/"+params.id)
      const dado = await response.json()
      reset({
        titulo: dado.titulo,
        promocao: dado.promocao,
        diaria: dado.diaria,
        pessoa: dado.pessoa,
        dataEntrada: dado.dataEntrada,
        data: dado.data,
        classif: dado.classif,
        endereco: dado.endereco,
        capa: dado.capa,
        sinopse: dado.sinopse,
        destaque: dado.destaque        
      })
    }
    getFilme()
  }, [])

  async function alteraDados(data) {    
    const filme = await fetch("http://localhost:3004/filmes/"+params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (filme.status == 200) {
      // alert("Ok! Filme cadastrado com sucesso")
      toast.success("Ok! Filme alterado com sucesso")
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir a alteração")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Alteração de Hoteis</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Nome do Hotel</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="promocao" className="form-label">Promoções</label>
            <input type="text" className="form-control" id="promocao" {...register("promocao")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="diaria" className="form-label">Diária R$</label>
            <input type="number" step="0.10" className="form-control" id="diaria" {...register("diaria")} required />
          </div>
        </div>
        <div className="col-sm-4">
            <label htmlFor="classif" className="form-label">Geo Localização</label>
            <select id="classif" className="form-select" {...register("classif")} required>
              <option>Livre</option>
              <option>Cidade</option>
              <option>Montanhoso</option>
              <option>Praia</option>
              <option>Campo</option>
            </select>
          </div>
        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="pessoa" className="form-label">check-in</label>
            <input type="text" className="form-control" id="checkin" {...register("pessoa")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="pessoa" className="form-label">check-out</label>
            <input type="text" className="form-control" id="checkout" {...register("pessoa")} required />
          </div>
          <div className="col-sm-2">
            <p>Disponível:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                {...register("destaque")} />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="endereco" className="form-label">Endereço</label>
            <input type="text" className="form-control" id="endereco" {...register("endereco")} required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="capa" className="form-label">Foto</label>
            <input type="url" className="form-control" id="capa" {...register("capa")} required />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="sinopse" className="form-label">Sinopse</label>
          <textarea className="form-control" id="sinopse" rows="3" {...register("sinopse")} required></textarea>
        </div>

        <input type="submit" value="Alterar" className="btn btn-success me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />

      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}