import React from "react";

class Carousel extends React.Component {
  constructor() {
    super();
    this.selectedTitleArray = [];
  }

  async getComicsList(characterId, characterName, index) {
    let api = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=dee19f81c421b12242d4d8760eb81a49&ts=thesoer&hash=81d56f4b846843b2681af05eaab6248a`;
    const response = await fetch(api);
    const json = await response.json();
    this.props.callback(json.data.results, this.selectedTitleArray);

    const targetThumbnail = document.querySelectorAll('.cs-carousel-thumbnail')[index];
    targetThumbnail.classList.toggle('selected');

    let itemIndex = this.selectedTitleArray.indexOf(characterName);
    if(itemIndex > -1) {
      this.selectedTitleArray.splice(itemIndex, 1);
    }
    else {
      this.selectedTitleArray.push(characterName)
    }
  }

  render() {
    return <ul className="cs-carousel cs-global-padding">
           {
            this.props.value.length !== 0 ? this.props.value.map((character, index) => {
              return <li key={character.id} className="cs-carousel-thumbnail">
                        <button className="cs-clear-button" onClick={this.getComicsList.bind(this,character.id, character.name, index)}>
                          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>
                        </button>
                      </li>
            }) : <li>Loading..</li>
           }
           </ul>;
  }
}

export default Carousel;