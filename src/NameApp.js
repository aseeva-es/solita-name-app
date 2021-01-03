import { useState } from "react";
import { names } from "./data/names.json"
import './NameApp.css';

function byAmountAcc(a, b) {
  return a.amount - b.amount;
}

function byAmountDec(a, b) {
  return b.amount - a.amount;
}

function byNameAcc(a, b) {
  if (a.name > b.name) return 1;
  if (a.name === b.name) return 0;
  if (a.name < b.name) return -1;
}

function byNameDec(a, b) {
  if (b.name > a.name) return 1;
  if (b.name === a.name) return 0;
  if (b.name < a.name) return -1;
}

function NameApp() {
  let [sortBy, setSortBy] = useState({ func: byAmountDec });
  let [namesList, setNamesList] = useState(names);

  function sortByAmount() {
    if (sortBy.func === byAmountDec) {
      setSortBy({ func: byAmountAcc });
    }
    else {
      setSortBy({ func: byAmountDec });
    }
  }

  function sortByName() {
    if (sortBy.func === byNameDec) {
      setSortBy({ func: byNameAcc });
    }
    else {
      setSortBy({ func: byNameDec });
    }
  }

  function filterChange(e) {
    // console.warn(e.target.value);

    let filtered = names.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setNamesList(filtered);
  }
 
  let nameArrowClasses = "arrow";
  if(sortBy.func === byNameAcc) {
    nameArrowClasses = nameArrowClasses + " arrow--up";
  } 
  else if(sortBy.func === byNameDec) {
    nameArrowClasses = nameArrowClasses + " arrow--down";
  }
  else {
    nameArrowClasses = nameArrowClasses + " arrow--hidden";
  }

  let amountArrowClasses = "arrow";
  if(sortBy.func === byAmountAcc) {
    amountArrowClasses = amountArrowClasses + " arrow--up";
  } 
  else if(sortBy.func === byAmountDec) {
    amountArrowClasses = amountArrowClasses + " arrow--down";
  }
  else {
    amountArrowClasses = amountArrowClasses + " arrow--hidden";
  }


  return (
    <section className="app-main">
      <div className="app-main-in container">
        <h2 className="app-title mb30">Solita Names App</h2>
        <div className="app-names-table">
          <div className="app-names-table-row app-names-table-row--header fwb">
            <div className="app-names-table-icon">
              <div className="app-names-table-icon__letter"></div>
            </div>
            <button className="app-names-table-name app-names-btn tal" onClick={() => sortByName()}>
              Name <i className={nameArrowClasses}></i>
            </button>
            <button className="app-names-table-amount app-names-btn" onClick={() => sortByAmount()}>
              Amount <i className={amountArrowClasses}></i>
            </button>
          </div>

          <div className="app-names-table-row app-names-table-row--header">
            <div className="app-names-table-icon">
              <div className="app-names-table-icon__letter">
                <div className="app-names-table-filter"></div>
              </div>
            </div>
            <div className="app-names-table-name tal">
              <input placeholder="Filter by name" onChange={filterChange}></input>
            </div>
            <div className="app-names-table-amount tar">
            Total: {namesList.reduce((sum, cur)=> sum + cur.amount ,0)}
            </div>
          </div>

          <div className="app-names-table-names">
            {
              namesList.sort(sortBy.func).map((item) => {
                return (
                  <div key={item.name} className="app-names-table-row mb10">
                    <div className="app-names-table-icon">
                      <div className="app-names-table-icon__letter">{item.name[0]}</div>
                    </div>
                    <div className="app-names-table-name">{item.name}</div>
                    <div className="app-names-table-amount">{item.amount}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

    </section>
  );
}

export default NameApp;
