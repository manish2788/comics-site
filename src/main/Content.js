import React from "react";

class Content extends React.Component {
  clearFilters() {
    this.props.callback([],[]);
  }
  render() {
    return  <section className="cs-comics-listContainer cs-global-padding">
              <header>
                <h4>
                  Explore &nbsp;
                  {
                     this.props.selectedCharacters.length !== 0 ? this.props.selectedCharacters.map((character, index) => {
                        return <span>{index === 0 ? '' : ' , '}{character}</span>
                     }) : ''
                  }
                </h4>
                <button onClick={this.clearFilters.bind(this)}>Clear all filters</button>
              </header>
              <ul className="cs-comics-list">
              {
                this.props.value.length !== 0 ? this.props.value.map((comic, index) => {
                  return  <li key={comic.id}>
                            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}/>
                            <div className="cs-comics-listTitle">{comic.title}</div>
                          </li>
                }) : <li>No Data Found!!</li>
              }
              </ul>
            </section> ;
  }
}

export default Content;