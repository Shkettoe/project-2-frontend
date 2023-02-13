import './App.css';
import { eColours } from './assets/Vars';
import { Button } from './components/Button';
import { InputB } from './components/Input';
import { Place } from './components/Place';

function App() {
  return (
    <div className="App">
      <Button fgColour={eColours.primaryBlue} bgColour='#ffffff' borderWidth={'1px'} height='40px' width='140px' type='button'>fjoiaejfoisfo</Button>
      <InputB height='46px' width='420px'></InputB>
      <div style={{"width": "50px", "margin": "auto"}}>
      <Place index={0}>0</Place>
      <Place index={1}>1</Place>
      <Place index={2}>2</Place>
      <Place index={3}>3</Place>
      </div>
    </div>
  );
}

export default App;
