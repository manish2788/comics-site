import React from "react";

class Carousel extends React.Component {
  constructor() {
    super();
    this.selectedTitleArray = [];
    this.comicsData = {};
  }

  async updateComicsList(characterId, characterName, index) {
    const targetThumbnail = document.querySelectorAll('.cs-carousel-thumbnail')[index];
    targetThumbnail.classList.toggle('selected');

    if(targetThumbnail.classList.contains('selected')) {
      this.selectedTitleArray.push(characterName);

      if(!this.comicsData[characterName]) {
        let api = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=dee19f81c421b12242d4d8760eb81a49&ts=thesoer&hash=81d56f4b846843b2681af05eaab6248a`;
        const response = await fetch(api);
        const json = await response.json();
  
        this.comicsData[characterName] = {};
        this.comicsData[characterName].data = json.data.results
      }
      this.comicsData[characterName].selected = true;
    }
    else {
      this.comicsData[characterName].selected = false;
      let itemIndex = this.selectedTitleArray.indexOf(characterName);
      this.selectedTitleArray.splice(itemIndex, 1);
    }

    let dataCollection = [];
    Object.keys(this.comicsData).forEach(item => {
      if(this.comicsData[item].selected) {
        dataCollection = dataCollection.concat(this.comicsData[item].data);
      }
    });
    this.props.callback(dataCollection, this.selectedTitleArray);
  }

  render() {
    return <section className="cs-carousel-container">
            <ul className="cs-carousel">
            {
              this.props.value.length !== 0 ? this.props.value.map((character, index) => {
                return <li key={character.id} className="cs-carousel-thumbnail">
                          <button className="cs-clear-button" onClick={this.updateComicsList.bind(this,character.id, character.name, index)}>
                            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>
                          </button>
                        </li>
              }) : <li>Loading..</li>
            }
            </ul>
            </section>;
  }
}

export default Carousel;