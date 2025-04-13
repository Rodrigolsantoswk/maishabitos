export type THabito = {
    id: string;
    nome_do_habito: string;
    user_id: string;
  };
  
  export class Habito implements THabito {
    id: string;
    nome_do_habito: string;
    user_id: string;
  
    constructor(nome: string, userId: string) {
      this.id = crypto.randomUUID();
      this.nome_do_habito = nome;
      this.user_id = userId;
    }
  
    get data(): THabito {
      return {
        id: this.id,
        nome_do_habito: this.nome_do_habito,
        user_id: this.user_id,
      };
    }
  }
  