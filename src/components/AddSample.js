import React, { useState } from "react";
import twsiService from "../Service/twsi.service";


const AddSample = () => {
    const[chasino, setChasiNo] = useState('');
    const[eng_no, setEng_no] = useState('');
    const[hpa_from, setHpa_from] = useState('');
    const[hpa_upto, setHpa_upto] = useState('');
    const[docurl, setDocUrl] = useState('');
    const[regnno, setRegnNo] = useState('');

    const processAddition = (e) => {
        e.preventDefault();
        
        const addition = {chasino, eng_no, hpa_from,hpa_upto,docurl,regnno};
        twsiService.addition(addition)
        .then(response => {
            console.log("HPA added successfully", response.data);
        })
        .catch(error => {
            console.log("something went wrong", error);
        })
    }
    return(
        <div className="container">
            <h3>HPA Addition</h3>
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
                        placeholder="Enter Chasis Number"
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
                        placeholder="Enter Engine Number"
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
                        placeholder="Enter HPA From Date"
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
                        placeholder="Enter HPA upto Date"
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
                        placeholder="Enter Engine Number"
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
                        placeholder="Enter Engine Number"
                    />

                </div>
                </td>
                    </tr>
                    <tr>
                      <td>
                        <dev/><div >
                    <button onClick={(e) => processAddition(e)} className="btn btn-primary" type="Submit">Submit</button>
                </div> </td>
                    
                    </tr>
                  </table>
                
            </form>
            <hr/>
        </div>
    )
}

export default AddSample;


