import React, {useState} from "react";

export default class UserTable extends React.Component {
    constructor() {
        super();
        this.state = {jwt: localStorage.getItem('jwt'), data: [], field: "", inputText: "" }
    }

    fetchData() {
      fetch(`http://localhost:3000/users/locations`, {
        headers:{
            'Authorization': `Bearer ${this.state.jwt}`
        }
      })
      .then(res => res.json())
      .then(res => {    
        this.setState({data: res}) 
      })
    }

    logout() {
      localStorage.removeItem('jwt')
    }
  

    TempCsort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.temp_c < sortedData[min].weather.temp_c) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "temp_c"});
    }

    WindKphsort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.wind_kph < sortedData[min].weather.wind_kph) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "wind_kph"});
    }
/*
    WindDirsort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.wind_dir < sortedData[min].weather.wind_dir) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "wind_dir"});
    }
*/

    Humiditysort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.humidity < sortedData[min].weather.humidity) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "humidity"});
    }

    PrecipMmsort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.precip_mm < sortedData[min].weather.precip_mm) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "precip_mm"});
    }

    VisKmsort() {
      const sortedData = this.state.data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.vis_km < sortedData[min].weather.vis_km) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        this.setState({data: sortedData, field: "vis_km"});
    }

    inputHandler(e) {
      this.setState({inputText: e.target.value});
    }

    searchField() {
      const data = this.state.data;
      const field = this.state.field;
      const inputText = this.state.inputText;
      let result = [];

      if (field === "temp_c") {
        result = checkTempCInput();
      }

      if (field === "wind_kph") {
        result = checkWindKphInput();
      }
/*
      if (field === "wind_dir") {
        result = checkWindDirInput();
      }
*/

      if (field === "humidity") {
        result = checkHumidityInput();
      }

      if (field === "precip_mm") {
        result = checkPrecipMmInput();
      }

      if (field === "vis_km") {
        result = checkVisKmInput();
      }
      
      function checkTempCInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.temp_c.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkWindKphInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.wind_kph.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      /*
      function checkWindDirInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.wind_dir.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }
      */
      
      function checkHumidityInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.humidity.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkPrecipMmInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.precip_mm.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkVisKmInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.vis_km.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      if (result !== []) {
        return (
          <div>
          <table className="table table-sm">
            {result.map(size => (
                          <tr><td>{size}</td></tr>
                        ))}
          </table>
          </div>
        )
      }
      
    }

    render() {
        return (
            <>
            <div>
              <button onClick={() => this.fetchData()}>Fetch Live Weather</button>
              <button onClick={() => this.logout()}>Logout</button>
                    <div>
                          <span onClick={() => this.TempCsort()} scope="row"> temp_c&nbsp;&nbsp;&nbsp; </span>
                          <span onClick={() => this.WindKphsort()} scope="row"> wind_kph&nbsp;&nbsp;&nbsp; </span>
                          {/* <th onClick={() => this.WindDirsort()} scope="row"> wind_dir&nbsp;&nbsp;&nbsp; </th> */}
                          <span onClick={() => this.Humiditysort()} scope="row"> humidity&nbsp;&nbsp;&nbsp; </span>
                          <span onClick={() => this.PrecipMmsort()} scope="row"> precip_mm&nbsp;&nbsp;&nbsp; </span>
                          <span onClick={() => this.VisKmsort()} scope="row"> vis_km&nbsp;&nbsp;&nbsp; </span>
                    </div>
                    <table className="table table-striped" >
                    <tbody>
                        {this.state.data.map(size => (
                          <tr><td>{size.info.name}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
              <label htmlFor="field">Enter keyword:</label>
              <input type="search" name="field" id="field" onChange={(e) => this.inputHandler(e)}/>
            </div>
              {this.searchField()}
            </>
        );
    }
}
