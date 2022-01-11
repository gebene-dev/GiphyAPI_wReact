import { React, Component } from "react";
import Gif from "./components/Gif";
import "./css/app.css";

class App extends Component {

  /* 
  Defino constructor. 
  Defino un estado inicial para los gifs cargados.
  Inicializo al array con la clave 'gifs' en vacio y luego montarlo.
  */

  constructor() {
    super();
    this.state = {
      gifs: [],
    };
  }
  
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              Giphy App
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="nav ml-auto">
              <li className="nav-item">
                {/* Agrego evento en button para cargar gifs aleatorios. */}
                <button className="btn btn-success" onClick={() => this.addGif()}>Cargar random</button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <div className="row text-center">
            {/* 
            Recorro el objeto this.state con un iterador map.
            Retorno un componente Gif con sus respec. Props. 
            Retorna la cdad. de componentes Gif en relación a cuantos gifs me de la API de Giphy.
            */}
            {this.state.gifs.map((g, index) => {
              return <Gif key={g.title + index} title={g.title} url={g.url} />;
            })}
          </div>
        </div>
      </>
    );
  }
  /* 
    Defino metodo randomGif().
    Obj: Llamar a la API de Giphy, convertirla a JSON y luego manejar el error.
  */
  async randomGif() {
    try {
      let response = await fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=0jo77Q4agSQHgCmZjce5eblqOXD9SaqU&tag=&rating=g"
      );
      let result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  /* 
    Defino metodo addGif().
    Obj: Añade gifs nuevos sumado a los ya montados. (Spread Operator)
  */
  async addGif(){
    let newGif = await this.randomGif();
    this.setState({
      gifs: [
        ...this.state.gifs,
        {
          title: newGif.data.title,
          url: newGif.data.images.original.url,
        },
      ],
    })
  }

  /* 
  Monto el componente con un estado inicial.
  */
  async componentDidMount() {
    console.log('First mount')
    let firstGif = await this.randomGif();
    this.setState({
      gifs: [
        {
          title: firstGif.data.title,
          url: firstGif.data.images.original.url,
        },
      ],
    })
  }
  /* 
  
  Actualiza el componente
  
  */
  async componentDidUpdate(){
    console.log('Actualizado')
  }
}

export default App;
