const funcionarios = []

class Salarios {
    static horasTrabalhadas = 42 // Considerando 14 dias de aula no mês * 3 horas por aula
    static salarioProfClt = 2500
    static salarioProfPJ = 70 * this.horasTrabalhadas
    static salarioProfAuxClt = 1000
    static salarioProfAuxPJ = 30 * this.horasTrabalhadas
    static salarioPsic = 3000
    static salarioCoord = 3500
    static salarioDir = 4000
}

class Funcionario {
  constructor(nome, sobrenome, email, telefone, cargo, tipoContratacao, salario) {
    this.nome = nome
    this.sobrenome = sobrenome
    this.email = email
    this.telefone = telefone
    this.cargo = cargo
    this.tipoContratacao = tipoContratacao
    this.salario = salario
  }

  // Create
  cadastrarFuncionario() {
    const nome = document.getElementById('nome')
    const sobrenome = document.getElementById('sobrenome')
    const email = document.getElementById('email')
    const telefone = document.getElementById('telefone')
    const cargo = document.getElementById('cargo')
    const tipoContratacao = document.querySelector('input[name="tipoC"]:checked')
    let salario = 0
    const selecao = document.getElementById('selecao')

    if (nome.value == '' || sobrenome.value == '' || email.value == '' || telefone.value == '' || cargo.value == 'Selecione') {
      alert('Preencha todos os campos')
      return
    }

    if ((cargo.value == 'Psicólogo' || cargo.value == 'Coordenador' || cargo.value == 'Diretor') && tipoContratacao.value == 'PJ') {
      alert('Somente professor pode ser contratado com PJ, por favor selecione CLT para outros cargos.')
      return
    }

    if (cargo.value == 'Professor' && tipoContratacao.value == 'CLT') {
      salario = Salarios.salarioProfClt
    } else if (cargo.value == 'Professor' && tipoContratacao.value == 'PJ') {
      salario = Salarios.salarioProfPJ
    } else if (cargo.value == 'Professor Auxiliar' && tipoContratacao.value == 'CLT') {
      salario = Salarios.salarioProfAuxClt
    } else if (cargo.value == 'Professor Auxiliar' && tipoContratacao.value == 'PJ') {
      salario = Salarios.salarioProfAuxPJ
    } else if (cargo.value == 'Psicólogo') {
      salario = Salarios.salarioPsic
    } else if (cargo.value == 'Coordenador') {
      salario = Salarios.salarioCoord
    } else {
      salario = Salarios.salarioDir
    }

    const funcionario = new Funcionario(nome.value, sobrenome.value, email.value, telefone.value, cargo.value, tipoContratacao.value, salario)
    funcionarios.push(funcionario)

    // Limpar os campos depois de cadastrar
    nome.value = ''
    sobrenome.value = ''
    email.value = ''
    telefone.value = ''
    cargo.value = 'Selecione'
    document.getElementById('clt').checked = true

    colocarSelecao('selecao')
  }

  // Read
  consultarFuncionario() {
    for (let func of funcionarios) {
      if (`${func.nome} ${func.sobrenome}` == selecao.value) {
        document.getElementById('retorno-menu').innerHTML = `<p>
        <strong>Nome:</strong> ${func.nome} ${func.sobrenome} </p>
        <p><strong>E-mail:</strong> ${func.email} </p>
        <p><strong>Telefone:</strong> ${func.telefone} </p>
        <p><strong>Cargo:</strong> ${func.cargo} </p>
        <p><strong>Tipo Constratação:</strong> ${func.tipoContratacao} </p>
        <p><strong>Salário:</strong> R$ ${func.salario.toFixed(2)} </p>`
      } 
    }
    if (selecao.value == 'Selecione') {
      alert('Nenhum funcionário selecionado.')
      return
    }
    selecao.value = 'Selecione'
  }

  // Updade
  atualizarFuncionario() {
    for (let func of funcionarios) {
      if (`${func.nome} ${func.sobrenome}` == selecao.value && document.getElementById('campo-escolha').innerHTML != '') {
        if (document.getElementById('dado-atualiza').value == 'E-mail') {
          func.email = document.getElementById('opcao-escolhida').value
          alert('Dados atualizados!')
        } else if (document.getElementById('dado-atualiza').value == 'Telefone') {
            func.telefone = document.getElementById('opcao-escolhida').value
            alert('Dados atualizados!')
        } else if (document.getElementById('dado-atualiza').value == 'Cargo') {
          if (document.getElementById('opcao-escolhida').value == 'Professor') {
            func.cargo = document.getElementById('opcao-escolhida').value
            alert('Dados atualizados!')
            if (func.tipoContratacao == 'CLT') {
              func.salario = Salarios.salarioProfClt
            } else {
              func.salario = Salarios.salarioProfPJ
            }
          } else if (document.getElementById('opcao-escolhida').value == 'Professor Auxiliar') {
              func.cargo = document.getElementById('opcao-escolhida').value
              alert('Dados atualizados!')
            if (func.tipoContratacao == 'CLT') {
              func.salario = Salarios.salarioProfAuxClt
            } else {
              func.salario = Salarios.salarioProfAuxPJ
            }
          } else if (document.getElementById('opcao-escolhida').value == 'Psicólogo') {
              func.cargo = document.getElementById('opcao-escolhida').value
              func.tipoContratacao = 'CLT'
              func.salario = Salarios.salarioPsic
              alert('Dados atualizados!')
          } else if (document.getElementById('opcao-escolhida').value == 'Coordenador') {
              func.cargo = document.getElementById('opcao-escolhida').value
              func.tipoContratacao = 'CLT'
              func.salario = Salarios.salarioCoord
              alert('Dados atualizados!')
          } else if (document.getElementById('opcao-escolhida').value == 'Diretor') {
              func.cargo = document.getElementById('opcao-escolhida').value
              func.tipoContratacao = 'CLT'
              func.salario = Salarios.salarioDir
              alert('Dados atualizados!')
          } else {
              alert('Selecione o cargo')
              return
            }
        } else if (document.getElementById('dado-atualiza').value == 'Tipo de Contratação') {
          if (func.cargo == 'Professor') {
            func.tipoContratacao = document.getElementById('opcao-escolhida').value
            if (func.tipoContratacao == 'CLT') {
              func.salario = Salarios.salarioProfClt
            } else if (func.tipoContratacao == 'PJ') {
              func.salario = Salarios.salarioProfPJ
            } else {
              alert ('Selecione o tipo de contratação')
              return
            }
            alert('Dados atualizados!')
          } else if (func.cargo == 'Professor Auxiliar') {
            func.tipoContratacao = document.getElementById('opcao-escolhida').value
            if (func.tipoContratacao == 'CLT') {
              func.salario = Salarios.salarioProfAuxClt
            } else if (func.tipoContratacao == 'PJ') {
              func.salario = Salarios.salarioProfAuxPJ
            } else {
              alert ('Selecione o tipo de contratação')
              return
            }
            alert('Dados atualizados!')
          } else {
            if (document.getElementById('opcao-escolhida').value == 'CLT') {
              alert('Dados atualizados!')
            } else if (document.getElementById('opcao-escolhida').value == 'PJ') {
              alert(`O cargo ${func.cargo} não aceita contratação PJ. Não foi possível atualizar`)
            }
            else {
              alert ('Selecione o tipo de contratação')
              return
            }
          }
        }
      }
      if (document.getElementById('dado-atualiza').value == 'Selecione') {
        alert('Selecione o dado a ser atualizado.')
        return
      }
      if (document.getElementById('campo-escolha').innerHTML == '') {
        alert('Antes de Atualizar, confirme a opção a ser alterada.')
        return
      }
    }

    selecao.value = 'Selecione'
    document.getElementById('retorno-menu').innerHTML = ''
  }

  // Delete
  apagarFuncionario() {
    if (selecao.value == 'Selecione') {
      alert('Nenhum funcionário selecionado.')
      return
    } else {
      if (confirm('Você tem certeza que deseja excluir permanentemente o funcionário do cadastro?')){

        const apaga = selecao.value

        retirarSelecao('selecao')

        for (let func of funcionarios) {
          if (`${func.nome} ${func.sobrenome}` == apaga) {
            const index = funcionarios.indexOf(func)
            funcionarios.splice(index, 1)
          }
        }
        alert('Funcionário removido do cadastro.')
        document.getElementById('retorno-menu').innerHTML = ''
      } else {
        selecao.value ='Selecione'
        return
      }    
    }
  }

  // Método para calcaular o bonus no salário de final do ano
  calculoBonificacao() {
    let bonificacao = 0
    let metas = 0
    let aprovacao = 0

    if (document.getElementById('porcentagem-aprov')) {
      aprovacao = document.getElementById('porcentagem-aprov').value
    } else {
      if (document.querySelector('input[name="meta"]:checked').value == 'sim') {
        metas = 1
      } else {
        metas = 0
      }
    }

    for (let func of funcionarios) {
      if (`${func.nome} ${func.sobrenome}` == selecao.value) {
        if (`${func.cargo}` == 'Professor' || `${func.cargo}` == 'Professor Auxiliar') {
          if (aprovacao > 100 || aprovacao < 0) {
            alert('Dado Inválido, informe a porcentagem entre 0 e 100')
            return
          } else {
            bonificacao = func.salario * (aprovacao / 100)
          }
        } else if (`${func.cargo}` == 'Psicólogo') {
          bonificacao = func.salario * metas
        } else if (`${func.cargo}` == 'Coordenador') {
          bonificacao = 1.5 * func.salario * metas
        } else {
          bonificacao = 3 * func.salario * metas
        }
      document.getElementById('retorno-menu').innerHTML = `<p>O funcionário <b>${selecao.value}</b> vai receber uma bonificação de <b>R$ ${bonificacao.toFixed(2)}</b> no final do ano.</p>`
      }
    }

    selecao.value = 'Selecione'
    return
  }
}

// Função para colocar os funcionários cadastrados no campo de seleção
function colocarSelecao(id) {
  let listaSelecionar = []
   for (let func of funcionarios) {
     listaSelecionar.splice(0, 1, `<option id="${id}-${func.nome}-${func.sobrenome}" value="${func.nome} ${func.sobrenome}">${func.nome} ${func.sobrenome}</option>`)
   }
   let adicionarSelecao = listaSelecionar.join('')
   document.getElementById(id).insertAdjacentHTML('beforeend', adicionarSelecao)
 }

 // Função para criar o menu de opções dos dados a serem atualizados
 function atualizar() {
  if (selecao.value == 'Selecione') {
    alert('Nenhum funcionário selecionado.')
    return
  }
  document.getElementById("retorno-menu").innerHTML = `<label for="dado-atualiza">Escolha o dado a ser atualizado:</label>
  <select id="dado-atualiza">
    <option value="Selecione" selected disabled>Selecione</option>
    <option value="E-mail">E-mail</option>
    <option value="Telefone">Telefone</option>
    <option value="Cargo">Cargo</option>
    <option value="Tipo de Contratação">Tipo de Contratação</option>
  </select>

  <button onclick="confirmarEscolha()">Confirmar</button>

  <div id="campo-escolha"></div>
  <br /><br />

  <button onclick="Funcionario.prototype.atualizarFuncionario()">Confirmar</button>`
 }

// Função do botão "Confirmar" para adicinar no HTML o campo/opções para inserir os dados a serem modificados no método "atualizarFuncionario()"
function confirmarEscolha() {
  const escolha = document.getElementById('dado-atualiza')
  if (escolha.value == 'E-mail') {
    document.getElementById('campo-escolha').innerHTML = `<br><label>Novo e-mail:</label> 
    <input id="opcao-escolhida" type="email" placeholder = "nome@email.com" required />`
  } else if (escolha.value == 'Telefone') {
      document.getElementById('campo-escolha').innerHTML = `<br><label>Novo telefone:</label> 
      <input id="opcao-escolhida" type="text" placeholder = "(99) 99999-9999" required />`
  } else if (escolha.value == 'Cargo') {
      document.getElementById('campo-escolha').innerHTML = `<br><label>Novo cargo:</label>
      <select id="opcao-escolhida">
        <option value="Selecione" selected disabled>Selecione</option>
        <option value="Professor">Professor</option>
        <option value="Professor Auxiliar">Professor Auxiliar</option>
        <option value="Psicólogo">Psicólogo</option>
        <option value="Coordenador">Coordenador</option>
        <option value="Diretor">Diretor</option>
      </select>`
  } else if (escolha.value == 'Tipo de Contratação') {
      document.getElementById('campo-escolha').innerHTML = `<br><label>Novo tipo de contratação:</label>
      <select id="opcao-escolhida">
        <option value="Selecione" selected disabled>Selecione</option>
        <option value="CLT">CLT</option>
        <option value="PJ">PJ</option>
      </select>`
  }
}

// Função para retirar do campo de seleção o nome do funcionário deletado do cadastro
function retirarSelecao(id) {
  for (let funcionario of funcionarios) {
    const elem = document.getElementById(`${id}-${funcionario.nome}-${funcionario.sobrenome}`)
    if (`${funcionario.nome} ${funcionario.sobrenome}` == selecao.value) {
      document.getElementById(id).removeChild(elem)
      selecao.value = 'Selecione'
    }
  }
}

// Função do botão "Confirmar" para adicinar no HTML o campo/opções para inserir os dados a serem informados no método "calculoBonificacao()"
function confirmarFuncionario() {
  for (let func of funcionarios) {
    if (`${func.nome} ${func.sobrenome}` == selecao.value) {
      if (`${func.cargo}` == 'Professor' || `${func.cargo}` == 'Professor Auxiliar') {
        document.getElementById('retorno-menu').innerHTML = `<label for="porcentagem-aprov">Qual a porcentagem de alunos do professor ${func.nome} ${func.sobrenome} aprovados neste ano?</label>
        <br><br>
        <input id="porcentagem-aprov" type="number" required />
        <br><br>
        <button onclick="Funcionario.prototype.calculoBonificacao()">Calcular</button>`
      } else {
        document.getElementById('retorno-menu').innerHTML = `<label>O funcionário ${func.nome} ${func.sobrenome} cumpriu a sua meta?</label>
        <label><input type="radio" name="meta" value="sim" id="sim" checked /> SIM</label>
        <label> <input type="radio" name="meta" value="nao" /> NÃO</label>
        <br><br>
        <button onclick="Funcionario.prototype.calculoBonificacao()">Calcular</button>`
      }
    }
  }
  if (selecao.value == 'Selecione') {
    alert('Nenhum funcionário selecionado.')
    return
  }
}
