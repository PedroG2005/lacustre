"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitContactForm } from "./actions";

export default function FormContact() {
  const [state, setState] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [phone, setPhone] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      setShowSuccessModal(true);
    } else if (state?.error) {
      setShowErrorModal(true);
    }
  }, [state]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2})/, "($1");
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    // Se estivermos em produção (build estática para cPanel), usamos o PHP Bridge.
    // Em desenvolvimento local (Docker), continuamos usando o Server Action original.
    if (process.env.NODE_ENV === 'production') {
      try {
        const data = Object.fromEntries(formData.entries());
        const res = await fetch('/send-email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        setState(result);
      } catch (err) {
        setState({ success: false, error: "Erro ao conectar com o serviço de e-mail no cPanel." });
      }
    } else {
      const result = await submitContactForm(null, formData);
      setState(result);
    }

    setIsPending(false);
  };



  return (
    <div className="w-full relative z-20" style={{ marginTop: '0.25rem' }}>

      {/* MODAL DE SUCESSO PREMIUM */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            className="bg-[#162116] border border-[#d4ba94]/30 px-8 max-w-sm w-full rounded-[2.5rem] text-center shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] relative flex flex-col items-center gap-8 overflow-hidden"
            style={{ paddingTop: '5rem', paddingBottom: '4.5rem' }}
          >

            {/* Efeitos de Luz no Fundo */}
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#d4ba94]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#d4ba94]/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Ícone Estático */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#d4ba94] to-[#B38A6A] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-[#162116]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Textos no Centro */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-[#d4ba94] font-medium tracking-wide m-0">Mensagem Enviada!</h3>
                <p className="text-[#e2cbb0]/80 text-[14px] leading-[1.6] font-light max-w-[250px] mx-auto m-0">
                  Agradecemos o seu contato.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[#d4ba94]/90 text-[13px] font-medium m-0">
                  Para atendimento imediato, <br /> converse conosco via WhatsApp:
                </p>

                <a
                  href="https://api.whatsapp.com/send/?phone=5561999497879&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full max-w-[260px] h-[56px] bg-[#d4ba94] hover:bg-[#c2a984] text-[#162116] font-bold rounded-xl transition-all duration-300 text-[13px] shadow-lg tracking-wider flex items-center justify-center gap-2 relative uppercase mx-auto"
                >
                  CONVERSAR AGORA
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ERRO PREMIUM */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            className="bg-[#162116] border border-red-900/40 px-8 max-w-sm w-full rounded-[2.5rem] text-center shadow-[0_40px_90px_-10px_rgba(0,0,0,0.8)] relative flex flex-col items-center gap-6 overflow-hidden"
            style={{ paddingTop: '5rem', paddingBottom: '4.5rem' }}
          >

            <div className="absolute -top-10 -left-10 w-28 h-28 bg-red-900/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Ícone Erro */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-[#fcfaf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-2xl text-red-500 font-medium tracking-wide m-0">Algo deu errado...</h3>
              <p className="text-[#e2cbb0]/70 text-[14px] leading-[1.6] font-light m-0">
                Houve um erro no envio. <br /> tente novamente.
              </p>
            </div>

            {state?.error && (
              <div className="w-full bg-red-950/40 border border-red-900/30 px-3 py-2 rounded-xl text-red-500 text-[11px] font-medium max-w-[220px] break-words">
                {state.error}
              </div>
            )}

            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full max-w-[220px] h-[56px] bg-[#222] border border-[#d4ba94]/20 hover:bg-[#c2a984] hover:text-[#162116] text-[#d4ba94] font-bold rounded-xl transition-all duration-300 shadow-sm tracking-wider flex items-center justify-center text-[12px] uppercase"
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {state?.error && (
          <div className="bg-red-50 p-4 text-red-700 text-sm font-bold text-center border border-red-200 rounded-xl">
            {state.error}
          </div>
        )}

        {/* Campo Nome */}
        <div>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-[#fcfaf6]/50 border border-[#d2b893] text-[#333] !pl-6 !pr-5 !py-[14px] lg:!py-3.5 outline-none rounded-xl focus:border-[#a8825c] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.015)] transition-all font-medium placeholder-[#7d7d7d]"
            placeholder="Nome Completo"
          />
        </div>

        {/* Campo E-mail */}
        <div>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-[#fcfaf6]/50 border border-[#d2b893] text-[#333] !pl-6 !pr-5 !py-[14px] lg:!py-3.5 outline-none rounded-xl focus:border-[#a8825c] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.015)] transition-all font-medium placeholder-[#7d7d7d]"
            placeholder="E-mail Principal"
          />
        </div>

        {/* Campo Telefone com Máscara e Apenas Números */}
        <div>
          <input
            type="tel"
            name="phone"
            value={phone || ""}
            onChange={handlePhoneChange}
            required
            maxLength={15}
            className="w-full bg-[#fcfaf6]/50 border border-[#d2b893] text-[#333] !pl-6 !pr-5 !py-[14px] lg:!py-3.5 outline-none rounded-xl focus:border-[#a8825c] focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.015)] transition-all font-medium placeholder-[#7d7d7d]"
            placeholder="Telefone (com DDD)"
          />
        </div>

        {/* NO LUGAR DO EVENTO: reCAPTCHA Alinhado à Esquerda s/ Ampliação */}
        <div className="w-full flex justify-start py-2">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <div
              className="g-recaptcha"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              data-theme="light"
            ></div>
          ) : (
            <div className="w-full bg-[#fcfaf6]/50 border border-[#d2b893] text-[#cf1b1b] px-6 py-4 rounded-xl font-medium text-center text-sm">
              Recaptcha Desativado (.env)
            </div>
          )}
        </div>

        {/* Botão Cobre Sólido da Referência */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            backgroundColor: '#B38A6A',
            color: '#1a2b1a',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderRadius: '1.25rem'
          }}
          className="group w-full font-bold px-6 shadow-md hover:shadow-xl active:scale-[0.98] hover:!bg-[#1a2b1a] hover:!text-[#B38A6A] disabled:opacity-70 text-[15px] mt-6 mb-3 relative transition-all duration-300 uppercase tracking-widest border border-[#916E53]/30 cursor-pointer"
        >
          {/* Efeito Brilho que acende um pouco mais no hover */}
          <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[1.25rem]"></div>

          {isPending ? "PROCESSANDO..." : "SOLICITAR PROPOSTA PERSONALIZADA"}
        </button>

        {/* Mensagem Rodapé do Formulário */}
        <p className="text-[12px] text-[#5b6b5b] font-medium text-center">
          Respeitamos sua privacidade. Seus dados estão seguros.
        </p>
      </form>
    </div>
  );
}
