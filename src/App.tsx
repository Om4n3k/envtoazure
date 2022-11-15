import {useEffect, useState} from 'react'
import './App.css'

interface AzureConfig {
  name: string,
  value: string,
  slotSetting: boolean
}

function App() {
  const [env,setEnv] = useState<string>('')
  const [parsedConfig,setParsedConfig] = useState<AzureConfig[]>([]);
  const [coppied, setCoppied] = useState(false);

  useEffect(() => {
    if(!env) return;
    parseEnv();
  },[env])

  const parseEnv = () => {
    if(!env) return;
    const entries = env.split(/\r?\n/).filter(x => x !== '');
    let objPool: AzureConfig[] = [];
    for (const entry of entries) {
      const keyVal = entry.split('=');
      objPool.push({
        name: keyVal[0],
        value: keyVal[1],
        slotSetting: false
      });
    }
    setParsedConfig(objPool)
  }

  const copyConfig = async () => {
    await navigator.clipboard.writeText(JSON.stringify(parsedConfig,undefined,2));
    setCoppied(true);
    setTimeout(() => {
      setCoppied(false);
    },2000)
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <div className='flexify'>
          <h3>.env</h3>
        </div>
        <textarea value={env} onChange={(e) => setEnv(e.target.value)} name="envFile" id="envFile" cols={30} rows={30}/>
      </div>
      <div className='wrapper'>
        <div className='flexify'>
          <h3>Azure Web App Configuration</h3>
          <button onClick={copyConfig}>{coppied ? 'Koppiert' : 'Koppieren'}</button>
        </div>
        <textarea value={JSON.stringify(parsedConfig,undefined,2)} name="azureConfiguration" id="azureConfiguration" cols={30} disabled={true} rows={30}/>
      </div>
    </div>
  )
}

export default App
