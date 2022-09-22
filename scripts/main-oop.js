const pratos = [
  {
    nome: "Estrombelete de Frango",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 14.9,
  },
  {
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
  },
  {
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
  },
];

const bebidas = [
  {
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
  },
  {
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
  },
  {
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
  },
];

const sobremesas = [
  {
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
  },
  {
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
  },
  {
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
  },
];

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Pedido {
  constructor() {
    this.pratoSelecionado;
    this.bebidaSelecionada;
    this.sobremesaSelecionada;
  }
  verificarPedido() {
    if (
      this.pratoSelecionado &&
      this.bebidaSelecionada &&
      this.sobremesaSelecionada
    ) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }

  getPrecoTotal() {
    return (
      this.pratoSelecionado.preco +
      this.bebidaSelecionada.preco +
      this.sobremesaSelecionada.preco
    );
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
      this.pratoSelecionado.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
      this.pratoSelecionado.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
      this.bebidaSelecionada.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
      this.bebidaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
      this.sobremesaSelecionada.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
      this.sobremesaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.getPrecoTotal().toFixed(2);
  }
  cancelarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }

  enviarZap() {
    const telefoneRestaurante = 553299999999;
    console.log(this.pratoSelecionado.nome);
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.pratoSelecionado.nome
      } \n- Bebida: ${this.bebidaSelecionada.nome} \n- Sobremesa: ${
        this.sobremesaSelecionada.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
}
const pedido = new Pedido();

class Prato {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.selecionado = false;
    this.elemento = document.createElement("div");
  }

  __addOnScreen() {
    const pratosContainer = document.querySelector(".opcoes.prato");
    this.elemento.classList.add("opcao");
    this.elemento.addEventListener("click", () => {
      const selecionado = document.querySelector(".prato .selecionado");
      if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
      }
      this.elemento.classList.add("selecionado");

      pedido.pratoSelecionado = {
        nome: this.nome,
        preco: this.preco,
      };
      pedido.verificarPedido();
    });
    this.elemento.innerHTML = `
            <img src="${this.imagem}" />
            <div class="titulo">${this.nome}</div>
            <div class="descricao">${this.descricao}</div>
            <div class="fundo">
                <div class="preco">R$ ${this.preco.toFixed(2)}</div>
                <div class="check">
                    <ion-icon name="checkmark-circle"></ion-icon>
                </div>
            </div>
        `;
    pratosContainer.appendChild(this.elemento);
  }
}
class Bebida {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.selecionado = false;
    this.elemento = document.createElement("div");
  }

  __addOnScreen() {
    const pratosContainer = document.querySelector(".opcoes.bebida");
    this.elemento.classList.add("opcao");
    this.elemento.addEventListener("click", () => {
      const selecionado = document.querySelector(".bebida .selecionado");
      if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
      }
      this.elemento.classList.add("selecionado");

      pedido.bebidaSelecionada = {
        nome: this.nome,
        preco: this.preco,
      };
      pedido.verificarPedido();
    });
    this.elemento.innerHTML = `
              <img src="${this.imagem}" />
              <div class="titulo">${this.nome}</div>
              <div class="descricao">${this.descricao}</div>
              <div class="fundo">
                  <div class="preco">R$ ${this.preco.toFixed(2)}</div>
                  <div class="check">
                      <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
              </div>
          `;
    pratosContainer.appendChild(this.elemento);
  }
}
class Sobremesa {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.selecionado = false;
    this.elemento = document.createElement("div");
  }

  __addOnScreen() {
    const pratosContainer = document.querySelector(".opcoes.sobremesa");
    this.elemento.classList.add("opcao");
    this.elemento.addEventListener("click", () => {
      const selecionado = document.querySelector(".sobremesa .selecionado");
      if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
      }
      this.elemento.classList.add("selecionado");

      pedido.sobremesaSelecionada = {
        nome: this.nome,
        preco: this.preco,
      };
      pedido.verificarPedido();
    });
    this.elemento.innerHTML = `
              <img src="${this.imagem}" />
              <div class="titulo">${this.nome}</div>
              <div class="descricao">${this.descricao}</div>
              <div class="fundo">
                  <div class="preco">R$ ${this.preco.toFixed(2)}</div>
                  <div class="check">
                      <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
              </div>
          `;
    pratosContainer.appendChild(this.elemento);
  }
}
pratos.forEach((elemento) => {
  const prato = new Prato(
    elemento.nome,
    elemento.imagem,
    elemento.descricao,
    elemento.preco
  );
  prato.__addOnScreen();
});

bebidas.forEach((elemento) => {
  const bebida = new Bebida(
    elemento.nome,
    elemento.imagem,
    elemento.descricao,
    elemento.preco
  );
  bebida.__addOnScreen();
});

sobremesas.forEach((elemento) => {
  const sobremesa = new Sobremesa(
    elemento.nome,
    elemento.imagem,
    elemento.descricao,
    elemento.preco
  );
  sobremesa.__addOnScreen();
});

btnConfirmar.addEventListener("click", () => {
  pedido.enviarZap();
});

btnCancelar.addEventListener("click", () => {
  pedido.cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  pedido.confirmarPedido();
});
