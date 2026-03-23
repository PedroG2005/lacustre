"use client";

import { useActionState, useState } from "react";
import { submitContactForm } from "./actions";

export default function FormContact() {
  const [state, action, isPending] = useActionState(submitContactForm, null);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    if (value.length > 10) {
      // Formato (99) 99999-9999
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      // Formato (99) 9999-9999 (Fixos)
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      // Formato (99) 9
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      // Formato (9
      value = value.replace(/^(\d{0,2})/, "($1");
    }
    
    setPhone(value);
  };

  return (
    <div className="w-full relative z-20" style={{ marginTop: '0.25rem' }}>
      {state?.success ? (
        <div className="bg-[#f0eadd] p-6 text-[#213320] font-medium text-center border border-[#d2b893] rounded-2xl shadow-sm">
          {state.message}
        </div>
      ) : (
        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
      )}
    </div>
  );
}
