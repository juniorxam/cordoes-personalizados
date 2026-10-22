"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Download, Plus, Search, ShieldAlert, Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  active: boolean;
  referenceImage: string;
};

const initialProducts: Product[] = [
  { id: "ct-ambesp", name: "AMBESP azul", category: "Cores&Ton - Inspire-se", description: "Modelo azul para inspiração de cores e acabamento.", price: "", active: true, referenceImage: "AMBESP azul" },
  { id: "ct-roxo-lilas", name: "Roxo e lilás", category: "Cores&Ton - Inspire-se", description: "Combinação de cores roxo e lilás.", price: "", active: true, referenceImage: "Roxo e lilás" },
  { id: "ct-preto", name: "Preto", category: "Cores&Ton - Inspire-se", description: "Modelo preto.", price: "", active: true, referenceImage: "Preto" },
  { id: "ct-sus-rosa", name: "SUS rosa", category: "Cores&Ton - Inspire-se", description: "Modelo rosa com identificação SUS.", price: "", active: true, referenceImage: "SUS rosa" },
  { id: "ct-vermelho", name: "Vermelho", category: "Cores&Ton - Inspire-se", description: "Modelo vermelho.", price: "", active: true, referenceImage: "Vermelho" },
  { id: "ct-hgp", name: "HGP azul-marinho", category: "Cores&Ton - Inspire-se", description: "Modelo azul-marinho HGP.", price: "", active: true, referenceImage: "HGP azul-marinho" },
  { id: "ct-rosa-pink", name: "Rosa e pink", category: "Cores&Ton - Inspire-se", description: "Combinação rosa e pink.", price: "", active: true, referenceImage: "Rosa e pink" },
  { id: "ct-sus-tricolor", name: "SUS tricolor", category: "Cores&Ton - Inspire-se", description: "Modelo tricolor com identificação SUS.", price: "", active: true, referenceImage: "SUS tricolor" },
  { id: "ct-mix-cores", name: "Cordões e porta-crachás rosa, preto e azul royal", category: "Cores&Ton - Inspire-se", description: "Combinações de cordões e suportes em três cores.", price: "", active: true, referenceImage: "Rosa, preto e azul royal" },
  { id: "ct-tocantins", name: "Kits Tocantins branco e azul-marinho", category: "Cores&Ton - Inspire-se", description: "Kit nas cores branco e azul-marinho com tema Tocantins.", price: "", active: true, referenceImage: "Kits Tocantins branco e azul-marinho" },
  { id: "ct-lisos-roller", name: "Cordões lisos com roller — 12 mm e 15 mm", category: "Cores&Ton - Inspire-se", description: "Cordões lisos em 12 mm e 15 mm com roller.", price: "", active: true, referenceImage: "Cordões lisos com roller — 12 mm e 15 mm" },
  { id: "ct-hemoto", name: "Hemoto — branco e vermelho", category: "Cores&Ton - Inspire-se", description: "Modelo branco e vermelho Hemoto.", price: "", active: true, referenceImage: "Hemoto — branco e vermelho" },
  { id: "ct-prateado", name: "Prateado — cordão e suportes com rollers SUS e Tocantins", category: "Cores&Ton - Inspire-se", description: "Cordão e suportes prateados com rollers temáticos SUS e Tocantins.", price: "", active: true, referenceImage: "Prateado — cordão e suportes com rollers SUS e Tocantins" },
  { id: "cat-kit-personalizado", name: "Kits personalizados", category: "Kits - Personalizados", description: "Kit personalizado sob consulta.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-tirante-personalizado", name: "Tirantes personalizados avulsos", category: "Avulsos - Tirantes Personalizados", description: "Tirantes personalizados avulsos.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-roller", name: "Roller / clipe retrátil", category: "Roller Clipe retrátil", description: "Acessórios retráteis para crachá.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-suporte", name: "Suporte para crachá", category: "Suporte para crachá", description: "Suportes para crachá.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-pins", name: "Pins", category: "Pins", description: "Pins e acessórios.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-kit-sem-personalizacao", name: "Kits sem personalização", category: "Kits - Sem personalização", description: "Kits sem personalização.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-tirante-sem-personalizacao", name: "Tirantes sem personalização", category: "Avulsos - Tirantes s/ personalização", description: "Cordões avulsos sem personalização; roller e porta-crachá vendidos separadamente.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-diversidade", name: "Kits e acessórios Diversidade", category: "Kits e acessórios Diversidade", description: "Kits e acessórios temáticos de diversidade.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-inclusao", name: "Kits — doenças ocultas e inclusão", category: "Kits - Doenças ocultas e inclusão", description: "Kits relacionados a doenças ocultas e inclusão.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
  { id: "cat-brasil", name: "Tirantes e acessórios Brasil", category: "Tirantes e acessórios Brasil", description: "Tirantes e acessórios com tema Brasil.", price: "", active: true, referenceImage: "Imagem do catálogo original a vincular" },
];

const money = (value: string) => {
  if (!value.trim()) return "Não informado";
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) ? n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : value;
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [showInactive, setShowInactive] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cordoes-personalizados-products-v1");
      if (saved) setProducts(JSON.parse(saved) as Product[]);
    } catch { /* use initial catalog */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("cordoes-personalizados-products-v1", JSON.stringify(products));
  }, [products, ready]);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const visible = useMemo(() => products.filter(p => (showInactive || p.active) && (category === "Todas" || p.category === category) && (p.name + " " + p.category).toLowerCase().includes(search.toLowerCase())), [products, showInactive, category, search]);
  const update = (id: string, patch: Partial<Product>) => setProducts(current => current.map(p => p.id === id ? { ...p, ...patch } : p));
  const addProduct = () => setProducts(current => [...current, { id: "novo-" + Date.now(), name: "Novo produto", category: "Nova categoria", description: "", price: "", active: true, referenceImage: "" }]);
  const exportCsv = () => {
    const rows = [["Produto", "Categoria", "Descrição", "Preço (R$)", "Ativo", "Referência da imagem"], ...products.map(p => [p.name, p.category, p.description, p.price, p.active ? "Sim" : "Não", p.referenceImage])];
    const csv = "\uFEFF" + rows.map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = "catalogo-cordoes-personalizados.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return <main className="manage-page">
    <header className="manage-top"><Link href="/" className="manage-back"><ArrowLeft size={17}/> Voltar à loja</Link><span className="manage-brand">CORDÕES PERSONALIZADOS <b>GESTÃO</b></span></header>
    <section className="manage-intro"><div className="manage-eyebrow">CATÁLOGO DE PRODUTOS</div><h1>Produtos e preços</h1><p>O catálogo público foi organizado a partir das categorias e dos nomes visíveis no site de referência. Preencha os preços somente após confirmá-los com a tabela original.</p><div className="manage-warning"><ShieldAlert size={19}/><span><strong>Importante:</strong> esta primeira versão salva as alterações apenas neste navegador. Ainda não está conectada a um banco de dados nem protegida por login de administrador.</span></div></section>
    <section className="manage-toolbar"><div className="manage-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar produto ou categoria"/></div><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filtrar categoria">{categories.map(c=><option key={c}>{c}</option>)}</select><label className="manage-check"><input type="checkbox" checked={showInactive} onChange={e=>setShowInactive(e.target.checked)}/> Mostrar inativos</label><button className="manage-secondary" onClick={exportCsv}><Download size={16}/> Exportar CSV</button><button className="manage-primary" onClick={addProduct}><Plus size={16}/> Novo produto</button></section>
    <div className="manage-summary"><strong>{visible.length} produtos exibidos</strong><span>Preços em branco significam que o valor não foi confirmado na fonte pública.</span></div>
    <section className="manage-table-wrap"><table className="manage-table"><thead><tr><th>Produto</th><th>Categoria</th><th>Descrição</th><th>Preço unitário (R$)</th><th>Status</th><th>Imagem / referência</th><th></th></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><input className="manage-cell manage-name" value={p.name} onChange={e=>update(p.id,{name:e.target.value})} aria-label="Nome do produto"/></td><td><input className="manage-cell" value={p.category} onChange={e=>update(p.id,{category:e.target.value})} aria-label="Categoria"/></td><td><textarea className="manage-cell manage-desc" value={p.description} onChange={e=>update(p.id,{description:e.target.value})} aria-label="Descrição"/></td><td><div className="manage-price"><span>R$</span><input type="number" min="0" step="0.01" value={p.price} onChange={e=>update(p.id,{price:e.target.value})} placeholder="A confirmar" aria-label="Preço unitário"/></div><small className="manage-price-preview">{money(p.price)}</small></td><td><label className="manage-status"><input type="checkbox" checked={p.active} onChange={e=>update(p.id,{active:e.target.checked})}/>{p.active ? "Ativo" : "Inativo"}</label></td><td><input className="manage-cell" value={p.referenceImage} onChange={e=>update(p.id,{referenceImage:e.target.value})} placeholder="URL ou nome da imagem" aria-label="Imagem do produto"/></td><td><button className="manage-delete" onClick={()=>{setProducts(current=>current.filter(item=>item.id!==p.id));setNotice("Produto removido deste navegador.")}} aria-label={"Remover " + p.name}><Trash2 size={16}/></button></td></tr>)}</tbody></table></section>
    <footer className="manage-footer"><button className="manage-primary" onClick={()=>{localStorage.setItem("cordoes-personalizados-products-v1",JSON.stringify(products));setNotice("Alterações guardadas neste navegador.");}}><Check size={16}/> Guardar alterações</button>{notice && <span role="status">{notice}</span>}<p>Catálogo inicial baseado na página pública <a href="https://cordoes-acessorios-personalizados.browncarp128.chatgpt.site/" target="_blank" rel="noreferrer">Fio do Cerrado — site de referência</a>. Os preços não estavam visíveis no conteúdo público consultado; não foram inventados.</p></footer>
  </main>;
}
