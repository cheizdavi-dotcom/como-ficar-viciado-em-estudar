import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { checkoutSchema, type CheckoutForm, type UpsellProduct } from "@shared/schema";
import { CheckCircle2, BookOpen, AlertCircle, Gem, Clock, Shield } from "lucide-react";

const upsellProducts: UpsellProduct[] = [
  {
    id: "1",
    title: "CAMINHO PARA APROVAÇÃO",
    description: "Você estuda, mas sente que ainda não está evoluindo como deveria? Este guia mostra o passo a passo comprovado para transformar seus estudos em resultados reais. Aprenda como aumentar o foco, reter mais conteúdo e estudar com estratégia — não com sorte! Com técnicas práticas e diretas, você vai entender como os aprovados realmente estudam. Se quer sair da estagnação e ver progresso de verdade, este é o seu atalho para a aprovação!",
    price: 97.00,
    image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=64/nHlMdy4d48qvmiF/CONCURSO---SEGREDOS-PARA-APROVACAO_a7c4786c3c9e4a7688061843bc0081f5.png"
  },
  {
    id: "2",
    title: "PEQUENOS GÊNIOS",
    description: "PEQUENOS GÊNIOS: Desperte o Potencial Ilimitado do Seu Filho! Você sabia que os primeiros anos de vida são decisivos para o desenvolvimento da inteligência e da criatividade das crianças? Com o método Pequenos Gênios, você vai aprender estratégias práticas e atividades simples que estimulam o raciocínio, a memória e o amor pelo aprendizado desde os primeiros passos! Transforme a curiosidade natural do seu filho em um verdadeiro superpoder!",
    price: 67.00,
    image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=64/nHlMdy4d48qvmiF/Como-Vender-Ebook-na-Gringa-2_2f6ff139ab1f4b78b82eeb28d2e8de97.png"
  },
  {
    id: "3",
    title: "MEMÓRIA DE OURO",
    description: "Estratégias para Gravar e Relembrar Tudo! Desperte Sua Memória de Ouro! Quer melhorar sua capacidade de lembrar de tudo com facilidade? Descubra técnicas comprovadas para uma memória afiada e duradoura. Transforme Sua Memória com Dicas de Ouro! Não deixe a falta de memória atrapalhar seu desempenho. Aprenda estratégias para potencializar sua capacidade de lembrar de detalhes importantes. Veja como agora!",
    price: 47.00,
    image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=64/nHlMdy4d48qvmiF/MEMORIA-DE-OURO_f143c7d32c054e3ab6bd5f633bf94474.png"
  },
  {
    id: "4",
    title: "COMO MANTER UMA ROTINA DE ESTUDOS",
    description: "Como Manter uma Rotina de Estudos de Sucesso? Se você já começou a estudar e desistiu no meio do caminho, saiba que o problema não é falta de tempo, mas de organização! Neste guia prático, você vai aprender técnicas simples para criar hábitos poderosos, se manter motivado(a) e alcançar seus objetivos sem sofrimento. Transforme seus estudos em resultados reais!",
    price: 127.00,
    image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=64/nHlMdy4d48qvmiF/ROTINA-DE-ESTUDOS_19a9a4f14bb14fe4bef99daa69847565.png"
  },
  {
    id: "5",
    title: "Como Memorizar Absolutamente Tudo",
    description: "Você já sonhou em ter uma memória incrível? Imagine poder se lembrar de cada detalhe, cada informação, e cada evento com clareza cristalina. Agora, isso é possível! O que você vai aprender: Técnicas Infalíveis: Métodos comprovados para aumentar sua capacidade de memorização. Estratégias Eficientes: Dicas e truques para reter informações de forma rápida e duradoura. Ferramentas Exclusivas: Recursos que potencializam sua memória e tornam o aprendizado mais eficaz.",
    price: 87.00,
    image: "https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=64/nHlMdy4d48qvmiF/Como-Memorizar-Tudo_0ec6d11fee2d44aea665695a72617aee.png"
  }
];

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function Home() {
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
      phone: "",
      state: "",
      cardNumber: "",
      cardName: "",
      cardMonth: "",
      cardYear: "",
      cardCvc: "",
      upsellProducts: [],
    },
  });

  const toggleUpsell = (productId: string) => {
    setSelectedUpsells(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const calculateTotal = () => {
    const basePrice = 147.00;
    const upsellTotal = selectedUpsells.reduce((sum, id) => {
      const product = upsellProducts.find(p => p.id === id);
      return sum + (product?.price || 0);
    }, 0);
    return (basePrice + upsellTotal).toFixed(2);
  };

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    data.upsellProducts = selectedUpsells;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Pedido processado com sucesso!",
          description: `ID do pedido: ${result.orderId}. Obrigado pela compra!`,
        });
        form.reset();
        setSelectedUpsells([]);
      } else {
        toast({
          title: "Erro no processamento",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      toast({
        title: "Erro ao processar pedido",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8" data-testid="text-hero-title">
            Diga Adeus à Procrastinação e Transforme Sua Vida!
          </h1>
          
          <div className="space-y-4">
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_2e0f6c13-abe4-41d0-9526-eebafb1d9ef0_97b5fe79918347d2998b56e85b407c11.png"
              alt="Banner 1"
              className="w-full rounded-md"
              data-testid="img-hero-1"
            />
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_8263248a-5fa1-4d2a-9f40-2d169e775969_d2445e7765cf40019a6d0760f1bdf990.png"
              alt="Banner 2"
              className="w-full rounded-md"
              data-testid="img-hero-2"
            />
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_033a5755-67ec-4c24-a2a8-d43f9f22610a_57ecd894e132484ca887dd6b224265ff.png"
              alt="Banner 3"
              className="w-full rounded-md"
              data-testid="img-hero-3"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-3">
            {[
              "CONTEÚDO PREMIUM, com preço popular!",
              "TUDO SOBRE PROCRASTINAÇÃO",
              "TÉCNICAS DE ESTUDOS AVANÇADÍSSIMAS",
              "Vídeos Educativos",
              "Ebooks PDF com técnicas reais",
              "Palestras Educativas",
              "Brindes Extraordinários",
              "Atualizações Frequentes",
              "Suporte por E-MAIL",
              "SEM DÚVIDA ALGUMA, é o MATERIAL mais completo do BRASIL",
              "EM nossa PLATAFORMA, vocês poderão ver vídeos, ler livros de diversos assuntos, se aprofundar em PROCRASTINAÇÃO e também em TÉCNICAS DE ESTUDOS.",
              "JÁ SÃO MAIS DE 2.300 ALUNOS"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`benefit-item-${index}`}>
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-base font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Overview Image */}
      <section className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <img 
            src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_ac997f20-aec3-4ff2-b97f-387cbe232ced_6528e17fee6f4ec1be7395152b45501e.png"
            alt="Estrutura do Material"
            className="w-full rounded-md"
            data-testid="img-content-overview"
          />
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-orange-50 border-2 border-orange-400 rounded-md p-6 mb-8 flex items-center justify-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <p className="text-center text-lg font-bold text-foreground">
              Você vai receber: NÃO SÓ UM MATERIAL, mas uma ESTRUTURA de apoio com VÍDEOS, DICAS, TÉCNICAS, EBOOKS, PALESTRAS com os principais nomes de referência a nível mundial
            </p>
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
          </div>

          <div className="space-y-3">
            {[
              "COMO FICAR VICIADO EM ESTUDAR",
              "1.200 TÉCNICAS para se livrar da PROCRASTINAÇÃO",
              "DICAS E ESTRATÉGIAS para superar a procrastinação",
              "Como criar uma rotina de estudos e produtividade e acabar de uma vez por todas com a procrastinação e ter mais disciplina."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`content-item-${index}`}>
                <BookOpen className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-base font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-2">
            {[
              "Você se considera uma pessoa procrastinadora?",
              "Acha que está dormindo pouco por causa dos estudos?",
              "Você se distrai muito por causa das redes sociais?",
              "Está tentando estudar, mas não consegue se concentrar?",
              "Acha que já perdeu muito tempo por causa da procrastinação?",
              "Já se arrependeu por não ter tido sucesso por ser o rei ou a rainha da procrastinação?",
              "Seus estudos parecem chatos?",
              "Já tentou várias técnicas de concentração, estudo ou leitura, mas nenhuma funcionou?",
              "Já tentou usar a técnica Pomodoro e não deu certo?",
              "Quer estudar de forma saudável?",
              "Está se desviando muito da sua rotina de estudos?",
              "Está se preparando para entrar na universidade ou passar em um concurso?",
              "Sente preguiça de estudar?",
              "Quer melhorar seu aprendizado e criar bons hábitos?",
              "Tem dificuldade para estudar alguma matéria em específico?",
              "Tem TDAH ou acha que tem porque não consegue se concentrar?",
              "Já se arrependeu de decisões erradas?",
              "Acha que seus amigos são mais inteligentes que você?",
              "Acha que nunca vai conseguir passar no vestibular ou em um concurso?"
            ].map((question, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`question-item-${index}`}>
                <BookOpen className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-base">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Images */}
      <section className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <img 
            src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_801396c7-f0fe-4b67-be47-e4c4d1105b17_00c6e7d76bab43d3be70b1e395619dbe.png"
            alt="Transformação 1"
            className="w-full rounded-md"
            data-testid="img-transformation-1"
          />
          <img 
            src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_a11a7214-7427-485f-9069-d1960672b4e3_21ed257d64914f50ad00d4e032cdc84a.png"
            alt="Transformação 2"
            className="w-full rounded-md"
            data-testid="img-transformation-2"
          />
        </div>
      </section>

      {/* Main Pitch */}
      <section className="w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6" data-testid="text-pitch-title">
            Destrua a Procrastinação e Torne-se um Estudante Viciado no Sucesso!
          </h2>
          
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8 text-primary">
            Apresentamos: 1.200 Técnicas Infalíveis para Vencer a Procrastinação e Ficar Viciado em Estudar!
          </h3>

          <p className="text-lg font-semibold mb-4 text-center">
            Você já se pegou adiando tarefas importantes, perdendo prazos ou deixando seus sonhos para depois?
          </p>

          <p className="text-lg font-bold mb-6 text-center">
            Chega disso! Imagine se você pudesse:
          </p>

          <div className="space-y-3 mb-8">
            {[
              "Eliminar a procrastinação de uma vez por todas.",
              "Desenvolver uma disciplina extrema para estudar sem parar.",
              "Aumentar seu foco e melhorar sua produtividade em poucos dias.",
              "Transformar o estudo em um hábito viciante que te coloque no topo do seu campo."
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`pitch-benefit-${index}`}>
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-base">{benefit}</p>
              </div>
            ))}
          </div>

          <p className="text-base mb-6 text-center">
            Com o nosso método comprovado, você terá em mãos <strong>1.200 técnicas inéditas</strong> para mudar sua mentalidade, eliminar distrações e se tornar uma verdadeira máquina de estudos. Essas técnicas já ajudaram milhares de pessoas a vencer a procrastinação e conquistar o sucesso em provas, concursos e no trabalho.
          </p>

          <div className="text-center space-y-4 mb-8">
            <p className="text-2xl font-bold">Oferta Exclusiva</p>
            <p className="text-xl font-bold">Garantia de Transformação</p>
            <p className="text-xl font-bold">O que está esperando?</p>
          </div>

          <p className="text-lg font-bold text-center mb-8">
            Assuma o controle da sua vida agora mesmo e se transforme no estudante viciado no sucesso que você sempre quis ser!
          </p>
        </div>
      </section>

      {/* Testimonials Gallery */}
      <section className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_19bbf906-7ddd-4735-a5a4-0b77f7f600a1_d63a1c40b9f9414fafad0754d25523d9.png"
              alt="Depoimento 1"
              className="w-full rounded-md"
              data-testid="img-testimonial-1"
            />
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_bc2224e1-5142-4bee-80d7-1619ff23bfcd_dcbc0bb684384a1fac6801b46829c061.png"
              alt="Depoimento 2"
              className="w-full rounded-md"
              data-testid="img-testimonial-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_7c7460ec-6bd5-42bc-9d10-ce0a279bf4a2_954b833658054de4912a80fae01365ea.png"
              alt="Depoimento 3"
              className="w-full rounded-md"
              data-testid="img-testimonial-3"
            />
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_47dd5f94-b149-4448-84be-b8792066897a_068b607248bb4c03ad727d2d9ed4d407.png"
              alt="Depoimento 4"
              className="w-full rounded-md"
              data-testid="img-testimonial-4"
            />
            <img 
              src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=700/nHlMdy4d48qvmiF/img_builder_68123501-dc1d-421e-a904-afce61c59a06_0b1d203d2c324df7a51042525898ed73.png"
              alt="Depoimento 5"
              className="w-full rounded-md"
              data-testid="img-testimonial-5"
            />
          </div>
        </div>
      </section>

      {/* Urgency Alert */}
      <section className="w-full bg-red-50 border-y-4 border-red-500 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-red-600" />
              Atenção
              <AlertCircle className="w-6 h-6 text-red-600" />
            </p>
            <p className="text-lg font-semibold text-foreground">
              Esse preço é temporário e pode sair do ar a qualquer momento!
            </p>
            <p className="text-base font-medium text-foreground">
              Os ingressos desse lote esgotaram! Estamos redirecionando você para o próximo lote agora!
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="w-full bg-white py-12" id="checkout">
        <div className="max-w-2xl mx-auto px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-confirm-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+55 (11) 98765-4321" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-state">
                          <SelectValue placeholder="Selecione seu estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brazilianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Cartão de Crédito</h3>
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Cartão</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" maxLength={19} {...field} data-testid="input-card-number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Nome no Cartão</FormLabel>
                      <FormControl>
                        <Input placeholder="NOME COMPLETO" {...field} data-testid="input-card-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="cardMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mês</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-card-month">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, '0');
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ano</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-card-year">
                              <SelectValue placeholder="AAAA" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => {
                              const year = (2025 + i).toString();
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardCvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" maxLength={4} {...field} data-testid="input-card-cvc" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Protegemos seus dados de pagamento com criptografia para garantir segurança de nível bancário.
                </p>
              </div>

              {/* Upsell Products */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-6 text-center text-purple-700 flex items-center justify-center gap-2">
                  <Gem className="w-6 h-6" />
                  PRODUTOS EXCLUSIVOS - SÓ AQUI
                </h3>
                
                <div className="space-y-4">
                  {upsellProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="border rounded-md p-4 hover-elevate"
                      data-testid={`upsell-product-${product.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedUpsells.includes(product.id)}
                          onCheckedChange={() => toggleUpsell(product.id)}
                          data-testid={`checkbox-upsell-${product.id}`}
                        />
                        
                        <img 
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 rounded-md flex-shrink-0"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-base mb-2">{product.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg h-14 bg-green-600 hover:bg-green-700 text-white font-bold"
                disabled={isSubmitting}
                data-testid="button-pay"
              >
                {isSubmitting ? "Processando..." : `Pagar $${calculateTotal()}`}
              </Button>

              <div className="text-center">
                <img 
                  src="https://aws-assets.kiwify.com.br/cdn-cgi/image/fit=scale-down,width=300/nHlMdy4d48qvmiF/img_builder_d665e82f-c36c-4d52-b2b6-15e1da065d8f_2c6918e6a3d74d9888b7641aef5392c7.png"
                  alt="7 Dias de Garantia"
                  className="mx-auto mb-4 max-w-xs"
                  data-testid="img-guarantee"
                />
              </div>
            </form>
          </Form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-8 border-t">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <img 
              src="https://assets.kiwify.com.br/extra/footer-kiwify-gray.png"
              alt="Kiwify"
              className="mx-auto mb-4 h-8 opacity-60"
              data-testid="img-kiwify-logo"
            />
          </div>

          <p className="text-xs text-muted-foreground text-center mb-4">
            Ao clicar em 'Pagar ${calculateTotal()}', declaro que (i) estou ciente de que minha compra está sendo feita da Kiwify, que é o varejista e cuida de pagamentos, reembolsos, faturamento, impostos e atendimento de pedidos, e que o criador do produto é <strong>LUIZ CLAUDIO RODRIGUES DE ABREU</strong>; (ii) que li e concordo com os Termos de Compra, Termos de Uso e Política de Privacidade.
          </p>

          <div className="flex justify-center gap-4 text-xs text-muted-foreground mb-6">
            <a href="#" className="hover:underline">Denunciar este produto</a>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Este site é protegido pelo Google reCAPTCHA.
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
            <a href="https://policies.google.com/privacy" className="hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
            <a href="https://policies.google.com/terms" className="hover:underline" target="_blank" rel="noopener noreferrer">Termos de Serviço</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
