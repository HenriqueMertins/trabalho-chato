import { useForm } from "react-hook-form"

export default function Pesquisa(props) {

  const { register, handleSubmit, reset } = useForm()

  async function limpa(data) {
    reset({
      pesq: ""
    })
    await props.mostra(props)
  }

  return (
    <form className="row row-cols-lg-auto g-3 align-items-center"
      onSubmit={handleSubmit(props.filtra)}
      onReset={limpa}>
      <div className="col-12">
        <input type="text" className="form-control"
          placeholder="Pesquisa hotel ou promoção"
          {...register("pesq")}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit">Pesquisar</button>
      </div>
      <div className="col-12">
        <button className="btn btn-warning" type="reset">Ver Todos</button>
      </div>
      <div className="col-12">
        <select className="form-select" {...register("orderby")}>
          <option value="lowerPrice">Menores Preços</option>
          <option value="higherPrice">Maiores Preços</option>
        </select>
      </div>

    </form>
  )
}
