import React from "react";
import './App.css';
import NavMenu from './header/NavMenu';
import Carousel from './header/Carousel';
import Content from './main/Content';

class App extends React.Component {
  constructor() {
    super();
    this.charactersDataURL = 'https://gateway.marvel.com:443/v1/public/characters?apikey=dee19f81c421b12242d4d8760eb81a49&ts=thesoer&hash=81d56f4b846843b2681af05eaab6248a';
    this.comicsDataURL = 'https://gateway.marvel.com:443/v1/public/comics?apikey=dee19f81c421b12242d4d8760eb81a49&ts=thesoer&hash=81d56f4b846843b2681af05eaab6248a';

    this.state = { 
      characterData: [],
      comicsData: [],
      selectedCharacters: []
    };
  }

  contentUpdateCallback(data, selectedTitleArray) {
    this.setState({
      comicsData: data,
      selectedCharacters: selectedTitleArray
    })
  }
  async getCharacterData() {
    const response = await fetch(this.charactersDataURL);
    const json = await response.json();
    this.setState({ characterData: json.data.results });
    console.log(this.state.characterData);
  }

  async getComicsData() {
    const response = await fetch(this.comicsDataURL);
    const json = await response.json();
    this.setState({ comicsData: json.data.results });
    console.log(this.state.comicsData);
  }

  async componentDidMount() {
    this.getCharacterData();
    this.getComicsData();
  }

  render() {
    return (
      <div >
        <header>
          <NavMenu />
          <Carousel value={this.state.characterData} callback={this.contentUpdateCallback.bind(this)}/>
        </header>
        <main>
          <Content value={this.state.comicsData} selectedCharacters={this.state.selectedCharacters}/>
        </main>
      </div>
    );
  }
}

export default App;
