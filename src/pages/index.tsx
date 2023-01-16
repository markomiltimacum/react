import * as React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { usePrepareContractWrite,useWaitForTransaction } from 'wagmi'
import { useContractRead,useContractWrite } from 'wagmi'
import { Account } from '../components'
import { useState } from 'react'



const { ethers } = require("ethers"); 


function Page() {
  const { connector, activeConnector, isConnected } = useAccount()
  const { connect, connectors, pendingConnector } =
    useConnect()
    const { disconnect } = useDisconnect()
    

   
    const [imeauta, setImeauta] = useState('');
    const [boja, setBoja] = useState('');
    const [godina, setGodina] = useState('');

    
    
    const {config}  = usePrepareContractWrite({
      address: '0x863464aa8D3db0A7A92216De54A75d9D47c46241',
      abi:[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"brojAuta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"carowner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cars","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"color","type":"string"},{"internalType":"uint256","name":"year","type":"uint256"},{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_color","type":"string"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_year","type":"uint256"}],"name":"createCar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_color","type":"string"}],"name":"menjajBoju","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"proveriAuto","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"registerCar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        functionName: 'createCar' ,
        args: [boja,imeauta,godina],
        overrides: {
          value: ethers.utils.parseEther('0.01'),
        }
    })

    const { data, error, write } = useContractWrite(config)

    const { isLoading, isSuccess, isError } = useWaitForTransaction({
      hash: data?.hash,
    })


    

let deoforme;
 if (isConnected) 
      {
                if(isLoading)
                deoforme=<div id="dugme" >
                Registered: <br></br> <input type="checkbox" checked={true} id="myCheck"/>
                <input id="disabled" disabled={true} type="button" value="CREATE CAR"/>  
              </div>
              ;

                else 
                deoforme=<div id="dugme" >
                Registered: <br></br> <input type="checkbox" checked={true} id="myCheck"/>
                <input id="btn" type="button" value="CREATE CAR"  onClick={() => write?.()} />
              </div>
              ;
      }

else  {
              deoforme=<div> <div id="dugme" >
              Registered: <br></br> <input type="checkbox" checked={false} id="myCheck"/>
              <input id="disabled" disabled={true} type="button" value="CREATE CAR"/>
            </div> 
              </div>;
      }


  return (
    <>
    
              <div>
                  <div id="log">

                          {isConnected    ?  
                          <input   id="log" type="submit" value="LOGOUT"
                          onClick={() => disconnect()}/> 

                          :

                          connectors.map((connector) => (
                          <input   id="log" type="submit" value="LOGIN"
                          onClick={() => connect({ connector })}/>
                          ))}
              
                  </div>
              </div>


                    {isConnected ? 
                            <div id="pnot">
                                <p> Public adress:    <Account /> </p>
                            </div>
                      : 
                            <div id="p">
                                <p> Public adress: undefined  <Account /> </p>
                            </div>
                     }
          
         

      <div id="container">
    
    

             <form id="forma">
                  <div id="polje">
                        <label for="ime">Name</label><br></br>
                        <input id="ime" type="text" required value={imeauta} onChange={(e) => setImeauta(e.target.value)} /><br></br>
                        
                        <label for="color">Color</label><br></br>
                        <input id="ime" type="text" required value={boja} onChange={(e) => setBoja(e.target.value)}  /><br></br>
                        
                        <label for="number">Year</label><br></br>
                        <input id="ime" type="number" required value={godina} onChange={(e) => setGodina(e.target.value)} min="0"  name="ye"/><br></br>
                  </div>   



                  {deoforme}
            


                  {isLoading && ( <div id="creatin">
                  Creating car...
                  </div>
                  )}
              


                  {isSuccess && (
                  <div id="succ">
                  Successfully created new car
                  </div>
                  )}



                  {isError && (
                  <div id="err">
                  Error creating new car 
                  </div>
                  )}

             </form>
        </div>


              <div id="dole">
                      <p >Total number of cars: </p>             
              </div>

      
    </>
  )
}

export default Page
