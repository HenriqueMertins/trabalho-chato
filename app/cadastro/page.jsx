'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      pessoa: "4 pessoas",
      classif: "cidade",
      destaque: true
    }
  });

  async function enviaDados(data) {
    //    console.log(data);    
    const filme = await fetch("http://localhost:3004/filmes",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (filme.status == 201) {
      // alert("Ok! Hotel cadastrado com sucesso")
      toast.success("Ok! Hotel cadastrado com sucesso")
      reset()
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir o cadastro")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro de Hoteis</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Nome do Hotel</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="promocao" className="form-label">Promoção</label>
            <input type="text" className="form-control" id="promocao" {...register("promocao")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="diaria" className="form-label">Preço da Diária R$</label>
            <input type="number" step="0.10" className="form-control" id="diaria" {...register("diaria")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="pessoa" className="form-label">Pessoas</label>
            <input type="text" className="form-control" id="pessoa" {...register("pessoa")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="dataEntrada" className="form-label">Data Check-in:</label>
            <input type="date" className="form-control" id="dataEntrada" {...register("dataEntrada")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data Check-out:</label>
            <input type="date" className="form-control" id="data" {...register("data")} required />
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
          <div className="col-sm-2">
            <p>Disponibilidade:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                {...register("destaque")} />
              <label className="form-check-label" htmlFor="destaque">Disponível</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="endereco" className="form-label">Endereço:</label>
            <input type="text" className="form-control" id="endereco" {...register("endereco")} required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="capa" className="form-label">Foto</label>
            <input type="url" className="form-control" id="capa" {...register("capa")} required />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="sinopse" className="form-label">Sobre</label>
          <textarea className="form-control" id="sinopse" rows="3" {...register("sinopse")} required></textarea>
        </div>

        <input type="submit" value="Enviar" className="btn btn-primary me-3" />
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