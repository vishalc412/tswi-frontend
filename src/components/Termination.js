import React, { useState } from "react";
import twsiService from "../Service/twsi.service";

const Termination = () => {
    const[chassisNo, setChassisNo] = useState('');
    const[terminationDt, setTerminationDt] = useState('');
    const[docUrl, setDocUrl] = useState('');
    const[regnNo, setRegnNo] = useState('');
    const [hasError, setHasError] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    const processTermination = (e) => {
        e.preventDefault();
        
        const termination = {chassisNo, terminationDt, docUrl,regnNo};
        try {
            twsiService.termination(termination)
              .then(response => {
                console.log("HPA termination successfully", response.data);
                console.log("Status "+response.status+" respoinse"+response.data);
                console.log("Sttus text"+response.statusText);
                if (response.data.status === "ok") {
                  // check if the internal status is ok
                  // then pass on the data
                  
                  setIsSuccess(response.data.statusText);
                } else {
                  // if internally there are errors
                  // pass on the error, in a correct implementation
                  // such errors should throw an HTTP 4xx or 5xx error
                  // so that it directs straight to the catch block
                  setHasError(response.data.statusText);
                }
              })
              .catch(error => {
                setHasError("Error : Check input parameter");
                console.log("something went wrong", error);
              })
          }
          catch (error) {
            setHasError("Error : Exception occured while processing the data");
          }
    }
    return(
        <div className="container">
            <h3>Hypothetication Termination</h3>
            <hr/>
            <form>
            <table>
                    <tr>
                      <td>Chasis No. : </td>
                      <td>
                        <div className="form-group">
                <input 
                        type="text" 
                        className="form-control col-4"
                        id="chassisNo"
                        value={chassisNo}
                        onChange={(e) => setChassisNo(e.target.value)}
                        placeholder="Chasis Number"
                    />

                </div></td>
                    </tr>
                    <tr>
                      <td>Termination Date : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="terminationDate"
                        value={terminationDt}
                        onChange={(e) => setTerminationDt(e.target.value)}
                        placeholder="Date (YYYY-MM-DD)"
                    />

                </div></td>
                    </tr>
                    <tr>
                      <td>Document Url : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="docUrl"
                        value={docUrl}
                        onChange={(e) => setDocUrl(e.target.value)}
                        placeholder="Document Url"
                    />

                </div></td>
                    </tr>
                    <tr>
                      <td>Registration No. : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="regnNo"
                        value={regnNo}
                        onChange={(e) => setRegnNo(e.target.value)}
                        placeholder="Registration No."
                    />

                </div>
                </td>
                    </tr>
                    
                  </table>
                  <div >
            <hr />
            <button onClick={(e) => processTermination(e)} className="button">Submit
            </button>
          </div>
          <div class="fancy-error-class" >
            <span >{hasError}</span>
          </div>
          <div class="fancy-success-class" >
            <span >{isSuccess}</span>
          </div>
            </form>
            <hr/>
        </div>
    )
}

export default Termination;


