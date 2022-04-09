import React, { useEffect, useState } from "react";

function App() {
  
  let [statusCryptoOrder, setStatusCryptoOrder] = useState([]);
  let [providersStatus, setProvidersStatus] = useState([]);

  useEffect(() => {
    fetch('https://api.cryptosaurio.com/ar/status/btc,eth,dai,usdc,usdt,ust,busd,bnb,luna,cake,uni,ada,matic,ltc,sol,dot,link,xrp,axs,slp,aave,bat,chz,mana,ubi,bch,doge,nuars').then(response => response.json()).then(data => {
      setStatusCryptoOrder(Object.keys(data))
      setProvidersStatus(Object.values(data));
    });
  })

  return (
    <div className="dark:bg-dark">
      <header className="py-8 md:py-12 mb-8">
        <div
          className="container flex flex-col items-center md:flex-row justify-between"
        >
          <div className="logo mb-8 md:mb-0 text-gray-800 dark:text-gray-100">
            
          </div>
          <div
            className="links flex space-x-2 items-center leading-none font-medium"
          >
            <button
              type="button"
              className="inline-flex items-center p-2 border border-gray-300 dark:border-dark rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2"
             onClick={() => document.body.classList.toggle('dark')}>
              {document.body.classList.contains('dark') && <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg> || 
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>}
            </button>
          </div>
        </div>
        <div className="container">
          <div
            className={["flex items-center p-5 mt-8 md:mt-24 font-semibold", providersStatus.filter((p) => Object.values(p).filter((a)=> a.message).length > 0).length === 0 && 'status' || 'status-bad'].join(" ")}
          >
            {providersStatus.filter((p) => Object.values(p).filter((a)=> a.message).length > 0).length === 0 && 'All providers operational' || 'Some providers down'}
          </div>
        </div>
      </header>

      <main>
        <h2
          className="container text-xs tracking-wide text-gray-500 dark:text-gray-300 uppercase font-bold mb-8"
        >
          Providers
        </h2>
        <div>
              {statusCryptoOrder.map((crypto, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="py-8 mb-2 mt-2 bg-yellow-500 bg-opacity-10">
                      <div className="container flex items-center justify-between">
                        <h3 className="text-2xl text-gray-800 dark:text-gray-100">{crypto.toUpperCase()} providers</h3>
                      </div>
                    </div>
                    {Object.keys(providersStatus[index]).map((pKey, jndex) => {
                      return (
                        <div key={jndex} className={["bg-opacity-10", providersStatus[index][pKey].status === 'ok' ? 'bg-green-500' : 'bg-red-500'].join(" ")}>
                          <div className="container flex items-center justify-between">
                            <h3 className="text-md text-gray-800 dark:text-gray-100">{pKey}</h3>
                            <span className={["font-semibold", providersStatus[index][pKey].status === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'].join(" ")}>
                              {providersStatus[index][pKey].status === 'ok'? providersStatus[index][pKey].status : `Error: ${providersStatus[index][pKey].message}`}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                    
                  </React.Fragment>
                )
              })}
        </div>
      </main>

      <footer className="py-16 text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-800">
        <div className="container flex justify-between">
          <div>
            Powered by <span className="font-semibold text-black dark:text-white">Cryptosaurio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
