# Cordões Personalizados

Loja em desenvolvimento para cordões e acessórios personalizados destinados a empresas, hospitais, escolas e órgãos públicos.

## Primeira versão
- Página institucional responsiva e catálogo de produtos.
- Configurador inicial para modelo, quantidade, largura, impressão, cor e acabamento.
- Formulário de solicitação de orçamento com encaminhamento dos detalhes ao WhatsApp.
- Estimativa exibida apenas como referência ilustrativa; preço final deve ser confirmado pela equipe.

## Rodar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar na Vercel
1. Importe `juniorxam/cordoes-personalizados` na Vercel.
2. Use as configurações padrão do Next.js.
3. Configure variáveis de ambiente apenas quando o projeto Supabase exclusivo da loja for criado.

## Próximas etapas
- Criar projeto Supabase independente e migrações SQL com políticas RLS.
- Implementar autenticação e painel administrativo protegido.
- Persistir pedidos, orçamentos, clientes e anexos de arte.
- Configurar número oficial de WhatsApp, regras reais de preço, política de privacidade e prazos comerciais.

## Observações
Esta versão inicial ainda não persiste pedidos em banco de dados. O formulário abre uma conversa do WhatsApp para envio manual. A estimativa de valor é demonstrativa e não constitui proposta comercial.
