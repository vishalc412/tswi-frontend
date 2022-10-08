import './Addition.css';
import React, { useState } from "react";
import twsiService from "../Service/twsi.service";
import validator from 'validator'

const Addition = () => {
  const [chasino, setChasiNo] = useState('');
  const [eng_no, setEng_no] = useState('');
  const [hpa_from, setHpa_from] = useState('');
  const [hpa_upto, setHpa_upto] = useState('');
  const [docurl, setDocUrl] = useState('');
  const [regnno, setRegnNo] = useState('');
  const [hasError, setHasError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const validateDate = (value) => {
      
    if (validator.isDate(value)) {
      setErrorMessage('Valid Date :)')
    } else {
      setErrorMessage('Enter Valid Date!')
    }
  }
  const processAddition = (e) => {

    e.preventDefault();

    const addition = { chasino, eng_no, hpa_from, hpa_upto, docurl, regnno };
    
    
    
    try {
      twsiService.addition(addition)
        .then(response => {
          console.log("HPA added successfully", response.data);
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
  return (
    <div>
      <div className="container centered" >
        <h3>Hypothetication Addition</h3>
        <hr />
        <form >

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
              <td>Engine No. : </td>
              <td>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control col-4"

                    id="engNo"
                    value={eng_no}
                    onChange={(e) => setEng_no(e.target.value)}
                    placeholder="Engine Number"
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
                    //onChange={(e) =>validateDate(e.target.value)}
                    onChange={(e) => setHpa_from(e.target.value)}
                    placeholder="Date(YYYY-MM-DD)"
                  />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
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
                    placeholder="Date(YYYY-MM-DD)"
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
                    placeholder="Registration Number"
                  />

                </div>
              </td>
            </tr>

          </table>
          <div >
            <hr />
            <button onClick={(e) => processAddition(e)} className="button">Submit
            </button>
          </div>
          <div class="fancy-error-class" >
            <span >{hasError}</span>
          </div>
          <div class="fancy-success-class" >
            <span >{isSuccess}</span>
          </div>

        </form>

        <hr />
      </div>

    </div>
  )
}


export default Addition;


