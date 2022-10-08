import React, { useState } from "react";
import twsiService from "../Service/twsi.service";

const Continuation = () => {
    const[transactionId,setTransactionId] = useState('');
    const[chasino, setChasiNo] = useState('');
    const[fncrCode, setFncrCode] = useState('');
    const[hpa_from, setHpa_from] = useState('');
    const[hpa_upto, setHpa_upto] = useState('');
    const[docurl, setDocUrl] = useState('');
    const[regnno, setRegnNo] = useState('');
    const [hasError, setHasError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

    const processContinuation = (e) => {
        e.preventDefault();
        
        const continuation = {transactionId,chasino, fncrCode, hpa_from,hpa_upto,docurl,regnno};
        try {
            twsiService.continuation(continuation)
              .then(response => {
                console.log("HPA continued successfully", response.data);
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
            <h3>Hypothetication Continuation</h3>
            <hr/>
            <form>
            <table>
            <tr>
                      <td>Transaction ID : </td>
                      <td>
                        <div className="form-group">
                <input 
                        type="text" 
                        className="form-control col-4"
                        id="transactionId"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Transaction Id"
                    />

                </div></td>
                    </tr>
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
                      <td>FNCR Code : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="fncrCode"
                        value={fncrCode}
                        onChange={(e) => setFncrCode(e.target.value)}
                        placeholder="Enter FNCR Code"
                    />

                </div></td>
                    </tr>
                    <tr>
                      <td>HPA From : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="hpaFrom"
                        value={hpa_from}
                        onChange={(e) => setHpa_from(e.target.value)}
                        placeholder="Date (YYYY-MM-DD)"
                    />

                </div></td>
                    </tr>
                    <tr>
                      <td>HPA Upto : </td>
                      <td>
                      <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="hpaupto"
                        value={hpa_upto}
                        onChange={(e) => setHpa_upto(e.target.value)}
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
                        placeholder="Document URL"
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
                        placeholder="Registration Number"
                    />

                </div>
                </td>
                    </tr>
                    
                  </table>
                  <div >
            <hr />
            <button onClick={(e) => processContinuation(e)} className="button">Submit
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

export default Continuation;


