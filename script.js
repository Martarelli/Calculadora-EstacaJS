let solo = {
  'A': [1000, 0.014],
  'AS': [800, 0.02], 
  'ASA': [700, 0.024], 
  'AA': [600, 0.028], 
  'AAS': [500, 0.03],
  'S': [400, 0.03], 
  'SA': [550, 0.022], 
  'SAA': [450, 0.028], 
  'SC': [230, 0.034], 
  'SCA': [250, 0.03],
  'C': [200, 0.06], 
  'CA': [350, 0.024], 
  'CAS': [300, 0.028], 
  'CS': [220, 0.04], 
  'CSA': [300, 0.03]
};

let estaca = {
  'F': [2.50], 
  'M': [1.75], 
  'E': [3.00], 
  'RHO': [2]
};

let diam = 0;
let k = 0;
let alfa = 0;
let f1 = 0;
let f2 = 0;
let prof = 0;
let nl = 0;
let np = 0;
let carga = 0;


//ATRIBUI OS VALORES DOS FATORES DE PONDERAÇÃO F1(PONTA) E F2(LATERAL) PARA O TIPO DE ESTACA  ==== não esta puxando a estaca ====
function recebeEstaca(){
  let check = true
  while (check){
  
    let est = prompt('Franki (F)\nMetalica (M)\nPre Moldada (PM)\nEscavada (E)\nRaiz, Hélice Continua ou Ômega (RHO)\n'+ 'Qual o tipo de estaca a ser utilizada?: ').toUpperCase()
    
    if(est == 'F' || est == 'M' || est == 'RHO' || est == 'E'){ 
      let estesc = estaca[est]
      f1 = estesc[0]
      f2 = 2 * f1
      check = false
      alert('Estaca inserida com sucesso')
    } else if (est == 'PM'){
      f1 = 1 + (diam / 0.8)
      f2 = 2 * f1
      check = false
      alert('Estaca inserido com sucesso')
    } else {        
      alert('Entrada inválida!')
    };
  };
  console.log('Valor F1 = ' + f1 + ' Valor F2 = ' + f2);
};

//ATRIBUI OS VALORES DE K E RAZÃO DE ATRITO α PARA O TIPO DE SOLO
function recebeSolo(){
  let check = true
  while (check){
    solo_escolha =  prompt('-----AREIAS-----\nAreia (A)\nAreia Siltos (AS)\nAreia Silto Argilosa (ASA)\nAreia Argilosa (AA)\nAreia Argilo Siltosa (AAS)\n-----SILTES-----\nSilte (S)\nSilte Arenoso (SA)\nSilte Areno Argiloso (SAA)\nSilte Argiloso (SC)\nSilte Argilo Arenoso (SCA)\n-----ARGILAS-----\nArgila (C)\nArgila Arenosa (CA)\nArgila ArenoSiltosa (CAS)\nArgila Siltosa (CS)\nArgila Silto Arenosa (CSA)\nQual o tipo de solo do terreno?: ').toUpperCase();
    
    if(solo_escolha == 'A' || 
      solo_escolha == 'AS' || 
      solo_escolha == 'ASA' || 
      solo_escolha == 'AA' ||
      solo_escolha == 'AAS' || 
      solo_escolha == 'S' || 
      solo_escolha == 'SA' || 
      solo_escolha == 'SAA' ||
      solo_escolha == 'SC' || 
      solo_escolha == 'SCA'|| 
      solo_escolha == 'C' || 
      solo_escolha == 'CA' ||
      solo_escolha == 'CAS' || 
      solo_escolha == 'CS' || 
      solo_escolha == 'CSA'){
      se = solo[solo_escolha]
      k = se[0]
      alfa = se[1]
      check = false
      alert('Solo inserido com sucesso')
    }else{
      alert('Entrada inválida" Tente novamente')
    }
  };
  console.log('Solo Escolhido = ' + solo_escolha);
  console.log('k = ' + k);
  console.log('alfa = ' + alfa);
}

//REALIZA O CALCULO DE RESISTENCIA
function calculo(){
  ap = (Math.PI * (Math.pow(diam, 2))) / 4;
  u = Math.PI * (diam/2);
  rl = (u / f2) * (k * alfa * nl * prof);
  rp = (k * np * ap) / f1;
  rt = rl + rp;
  ta = rt / 2;
  tatf = ta / 10;

  calc_est = carga / tatf;

};

//Captura os valores do form
function capturando(){
  diam = document.getElementById('diametro').value;
  prof = document.getElementById('profundidade').value;
  nl = document.getElementById('nsptlat').value;
  np = document.getElementById('nsptpont').value;
  carga = document.getElementById('carga').value;
}


//FUNÇÃO PRINCIPAL DO SISTEMA
function main(){
  alert('SEJA BEM VINDO A CALCULADORA DE ESTACAS ELABORADA POR: RENAN MARTARELLI')
  let rodando = true;

  while (rodando){
    /*
    diam = prompt('Qual o diâmetro da estaca?(m): ')
    while (diam <= 0){
      diam = prompt('O diâmetro tem que ser maior do que 0!\nQual o diâmetro da estaca?(m): ');
    };
    console.log('Diametro = ' + diam);


    prof = prompt('Qual o a profundidade da estaca?(m): ')
    while (prof <= 0){
        prof = prompt('A profundidade tem que ser maior do que 0!\nQual o a profundidade da estaca?(m): ')
    };
    console.log('Profundidade = ' + prof);

    nl = prompt('Qual o valor do NSPT da camada a ser avaliada?: ')
    while (nl <= 0){
        nl = prompt('O valor do NSPT tem que ser maior do que 0!\nQual o valor do Nspt da camada a ser avaliada?: ')
    };
    console.log('NSPT camada = ' + nl);


    np = prompt('Qual o valor do NSPT da camada de apoio da ponta da estaca?: ')
    while (np <= 0){
        np = prompt('O valor do NSPT tem que ser maior do que 0!\nQual o valor do Nspt da camada de apoio da ponta da estaca?: ')
    };
    console.log('NSPT ponta = ' + np);

    carga = prompt('Qual carga solicitada na estaca?(tf): ')
    while (carga <= 0){
        carga = prompt('A carga tem que ser maior do que 0!\nQual a solicitada na estaca?(tf): ')
    };
    console.log('Carga solicitada = ' + carga); */

    capturando();
    
    recebeEstaca();    
    recebeSolo();
    calculo();

    if (calc_est == 1){
        console.log('Cada estaca suporta ' + tatf.toFixed(2) +', Desse modo, será necessária ' + Math.ceil(calc_est) + ' estaca para a carga solicitada')
    } else {
        console.log('Cada estaca suporta ' + tatf.toFixed(2) +', Desse modo, Serão necessárias ' + Math.ceil(calc_est) + ' estacas para a carga solicitada')
    };

        alert('Obrigado por usar :)');
        rodando = false;
    
  };
};




