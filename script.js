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
let check = 0;


//ATRIBUI OS VALORES DOS FATORES DE PONDERAÇÃO F1(PONTA) E F2(LATERAL) PARA O TIPO DE ESTACA  ==== não esta puxando a estaca ====
function recebeEstaca() {
  let check = true
  while (check) {
    if (est == 'F' || est == 'M' || est == 'RHO' || est == 'E') {
      let estesc = estaca[est]
      f1 = estesc[0]
      f2 = 2 * f1
      check = false
    } else if (est == 'PM') {
      f1 = 1 + (diam / 0.8)
      f2 = 2 * f1
      check = false
    };
  };
  console.log('Valor F1 = ' + f1 + ' Valor F2 = ' + f2);
};

//ATRIBUI OS VALORES DE K E RAZÃO DE ATRITO α PARA O TIPO DE SOLO
function recebeSolo() {
  let check = true
  while (check) {
    if (solo_escolha == 'A' ||
      solo_escolha == 'AS' ||
      solo_escolha == 'ASA' ||
      solo_escolha == 'AA' ||
      solo_escolha == 'AAS' ||
      solo_escolha == 'S' ||
      solo_escolha == 'SA' ||
      solo_escolha == 'SAA' ||
      solo_escolha == 'SC' ||
      solo_escolha == 'SCA' ||
      solo_escolha == 'C' ||
      solo_escolha == 'CA' ||
      solo_escolha == 'CAS' ||
      solo_escolha == 'CS' ||
      solo_escolha == 'CSA') {
      se = solo[solo_escolha]
      k = se[0]
      alfa = se[1]
      check = false
    }
  };
  console.log('Solo Escolhido = ' + solo_escolha);
  console.log('k = ' + k);
  console.log('alfa = ' + alfa);
}

//REALIZA O CALCULO DE RESISTENCIA
function calculo() {
  ap = (Math.PI * (Math.pow(diam, 2))) / 4;
  u = Math.PI * (diam / 2);
  rl = (u / f2) * (k * alfa * nl * prof);
  rp = (k * np * ap) / f1;
  rt = rl + rp;
  ta = rt / 2;
  tatf = ta / 10;

  calc_est = carga / tatf;

};

//Captura os valores do form
function capturando() {
  diam = document.getElementById('diametro').value;
  prof = document.getElementById('profundidade').value;
  nl = document.getElementById('nsptlat').value;
  np = document.getElementById('nsptpont').value;
  carga = document.getElementById('carga').value;
  solo_escolha = document.getElementById('solo').value;
  est = document.getElementById('est').value;

  if (diam <= 0) {
    alert('O diâmetro tem que ser maior do que 0');
  } else if (prof <= 0) {
    alert('A profundidade tem que ser maior do que 0');
  } else if (nl <= 0) {
    alert('O valor do NSPT tem que ser maior do que 0');
  } else if (np <= 0) {
    alert('O valor do NSPT tem que ser maior do que 0');
  } else if (carga <= 0) {
    alert('A carga tem que ser maior do que 0');
  } else if (solo_escolha === '') {
    alert('Selecione um Solo');
  } else if (est === '') {
    alert('Selecione uma Estaca');
  } else {
    alert('Dados inseridos corretamente')
    console.log('Diametro = ' + diam);
    console.log('Profundidade = ' + prof);
    console.log('NSPT camada = ' + nl);
    console.log('NSPT ponta = ' + np);
    console.log('Carga solicitada = ' + carga);
    console.log('Solo escolhido = ' + solo_escolha);
    console.log('Estaca Escolhida = ' + est);
    check = true;
  };
};


//FUNÇÃO PRINCIPAL DO SISTEMA
function main() {
  capturando();
  if (check === true) {
    window.location.replace('resultados.html');
    recebeEstaca();
    recebeSolo();
    calculo();

    if (calc_est == 1) {
      console.log('Cada estaca suporta ' + tatf.toFixed(2) + ', Desse modo, será necessária ' + Math.ceil(calc_est) + ' estaca para a carga solicitada');
      check = false;
    } else {
      console.log('Cada estaca suporta ' + tatf.toFixed(2) + ', Desse modo, Serão necessárias ' + Math.ceil(calc_est) + ' estacas para a carga solicitada');
    };
    alert('Obrigado por usar :)');
  };
  // document.getElementById("enviar").addEventListener("click", function(event){
  //   console.log('fui executado')
  //   event.preventDefault()
  // });
};

function backToMain() {
  alert('Clicado')
  window.location.href ='index.html';
}


