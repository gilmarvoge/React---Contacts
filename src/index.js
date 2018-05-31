    import React from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter } from 'react-router-dom'
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    import './index.css';
    

//envolver todo o aplicativo no browser router(só é feito isso neste arquivo) 
//assim o router pode trabalhar com os componentes que irão ser importados,
//e ouve o URL e notifica os outros componentes quando o URL muda

    ReactDOM.render(
      <BrowserRouter><App /></BrowserRouter>,
      document.getElementById('root')
    );
    registerServiceWorker();