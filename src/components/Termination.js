import React, { useState } from "react";
import twsiService from "../Service/twsi.service";

const Termination = () => {
    const[chasino, setChasiNo] = useState('');
    const[terminationDt, setTerminationDt] = useState('');
    const[docurl, setDocUrl] = useState('');
    const[regnno, setRegnNo] = useState('');
    const [hasError, setHasError] = useState('');
    const [isSuccess, setIsSuccess] = useState('');

    const processTermination = (e) => {
        e.preventDefault();
        
        const termination = {chasino, terminationDt, docurl,regnno};
        try {
            twsiService.termination(termination)
              .then(response => {
                console.log("HPA termination successfully", response.data);
                if (response.status === "ok") {
                  // check if the internal status is ok
                  // then pass on the data
                  setIsSuccess("Success");
                } else {
                  // if internally there are errors
                  // pass on the error, in a correct implementation
                  // such errors should throw an HTTP 4xx or 5xx error
                  // so that it directs straight to the catch block
                  setHasError("Error: Failure due to credential issue");
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
                        id="chasino"
                        value={chasino}
                        onChange={(e) => setChasiNo(e.target.value)}
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
                        id="docurl"
                        value={docurl}
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
                        id="regnno"
                        value={regnno}
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


