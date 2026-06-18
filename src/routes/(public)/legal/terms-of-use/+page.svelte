<script lang="ts">
  import LegalCallout from "$lib/components/panel/legal-callout.svelte";
  import LegalFooterActions from "$lib/components/panel/legal-footer-actions.svelte";
  import LegalList from "$lib/components/panel/legal-list.svelte";
  import LegalPageLayout from "$lib/components/panel/legal-page-layout.svelte";
  import LegalParagraph from "$lib/components/panel/legal-paragraph.svelte";
  import LegalSection from "$lib/components/panel/legal-section.svelte";
</script>

<LegalPageLayout
  title="Termos e Condições de Uso"
  subtitle="Leia atentamente antes de utilizar a plataforma Negoreserva."
  updatedAt="18 de Junho de 2026"
>
  {#snippet footerActions()}
    <LegalFooterActions
      relatedHref="/legal/privacy-policy"
      relatedLabel="Política de Privacidade"
    />
  {/snippet}

  <LegalSection number="01" title="Aceitação dos Termos">
    <LegalParagraph>
      Ao aceder e utilizar a plataforma Negoreserva, declara ter lido,
      compreendido e concordado em estar vinculado por estes Termos e Condições
      de Uso. Este documento constitui um contrato legalmente vinculante entre o
      utilizador (doravante "Utilizador") e a Negoreserva.
    </LegalParagraph>
    <LegalParagraph>
      Se não concordar com qualquer parte destes termos, deve interromper
      imediatamente o uso da plataforma. O uso continuado após a publicação de
      alterações constitui aceitação tácita das novas condições.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="02" title="Descrição dos Serviços">
    <LegalParagraph>
      A Negoreserva é uma plataforma digital de reservas e gestão de serviços de
      hospitalidade e turismo, que permite a utilizadores e prestadores de
      serviços interagirem de forma segura e eficiente.
    </LegalParagraph>
    <LegalList>
      <li>Reservas de hotéis, restaurantes e eventos;</li>
      <li>
        Processamento de pagamentos via Multicaixa e outros gateways
        certificados;
      </li>
      <li>Sistema de avaliações e histórico de reservas;</li>
      <li>Suporte técnico e acompanhamento ao utilizador.</li>
    </LegalList>
  </LegalSection>

  <LegalSection number="03" title="Veracidade das Informações">
    <LegalCallout type="warning">
      <strong>Aviso importante:</strong> O fornecimento de informações falsas, inválidas
      ou enganosas é estritamente proibido e pode resultar no bloqueio imediato da
      conta, sem direito a reembolso de serviços já processados.
    </LegalCallout>
    <LegalParagraph>
      O Utilizador compromete-se a fornecer exclusivamente informações
      verdadeiras, precisas e atualizadas aquando do registo e da utilização da
      plataforma. São consideradas infrações graves:
    </LegalParagraph>
    <LegalList>
      <li>
        Registo com dados de identidade falsos ou pertencentes a terceiros;
      </li>
      <li>Criação de reservas com intenção fraudulenta ou de burla;</li>
      <li>
        Uso de documentos de pagamento inválidos, roubados ou não autorizados;
      </li>
      <li>
        Manipulação de avaliações ou do sistema de reputação da plataforma;
      </li>
      <li>
        Qualquer tentativa de contornar os mecanismos de segurança existentes.
      </li>
    </LegalList>
    <LegalCallout type="info">
      A Negoreserva colabora com as autoridades competentes de Angola em casos
      de suspeita de fraude, podendo partilhar dados relevantes conforme
      previsto por lei.
    </LegalCallout>
  </LegalSection>

  <LegalSection number="04" title="Responsabilidades da Negoreserva">
    <LegalParagraph>
      A Negoreserva compromete-se a:
    </LegalParagraph>
    <LegalList spacing="relaxed">
      <li>
        <strong class="font-semibold text-[#1a2e1c]"
          >Documentação completa:</strong
        > disponibilizar documentação técnica e funcional atualizada sobre todas
        as funcionalidades da plataforma, acessível a todos os utilizadores;
      </li>
      <li>
        <strong class="font-semibold text-[#1a2e1c]">Tutoriais e guias:</strong>
        fornecer materiais de apoio em formato de vídeo, artigos e guias passo-a-passo
        para facilitar a utilização da plataforma;
      </li>
      <li>
        <strong class="font-semibold text-[#1a2e1c]">Suporte técnico:</strong> garantir
        canais de suporte ativos para resolução de dúvidas, problemas técnicos e
        questões relacionadas com reservas;
      </li>
      <li>
        <strong class="font-semibold text-[#1a2e1c]"
          >Estabilidade e segurança:</strong
        > manter a plataforma operacional, proteger os dados dos utilizadores e implementar
        melhorias contínuas.
      </li>
    </LegalList>
    <LegalCallout type="success">
      <strong>Compromisso de acompanhamento:</strong> Nenhum utilizador será deixado
      sem assistência. O suporte está disponível para acompanhar desde o primeiro
      registo até à conclusão de qualquer reserva.
    </LegalCallout>
  </LegalSection>

  <LegalSection number="05" title="Responsabilidades do Utilizador">
    <LegalParagraph>
      O Utilizador é responsável por:
    </LegalParagraph>
    <LegalList>
      <li>Manter a confidencialidade das suas credenciais de acesso;</li>
      <li>
        Notificar imediatamente a Negoreserva em caso de acesso não autorizado à
        conta;
      </li>
      <li>
        Cumprir todas as leis locais aplicáveis ao comércio eletrónico em
        Angola;
      </li>
      <li>
        Respeitar os direitos dos prestadores de serviço listados na plataforma;
      </li>
      <li>
        Não utilizar a plataforma para fins ilegais, abusivos ou prejudiciais a
        terceiros.
      </li>
    </LegalList>
  </LegalSection>

  <LegalSection number="06" title="Suspensão e Bloqueio de Conta">
    <LegalParagraph>
      A Negoreserva reserva-se o direito de suspender ou bloquear
      permanentemente uma conta nas seguintes situações:
    </LegalParagraph>
    <LegalList>
      <li>Comprovação de informações falsas no perfil ou nas reservas;</li>
      <li>
        Tentativa de fraude ou burla a prestadores de serviço ou à plataforma;
      </li>
      <li>Violação repetida dos presentes Termos e Condições;</li>
      <li>
        Comportamento abusivo ou ameaçador para com outros utilizadores ou a
        equipa de suporte.
      </li>
    </LegalList>
    <LegalParagraph>
      O utilizador será notificado previamente sempre que possível, exceto em
      casos em que a gravidade da infração justifique bloqueio imediato.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="07" title="Propriedade Intelectual">
    <LegalParagraph>
      Todo o conteúdo da plataforma Negoreserva — incluindo logótipos, textos,
      elementos gráficos, interfaces e código-fonte — é propriedade exclusiva da
      Negoreserva ou dos seus licenciadores, protegido pela legislação angolana
      de direitos de autor.
    </LegalParagraph>
    <LegalParagraph>
      É estritamente proibida a reprodução, modificação ou distribuição de
      qualquer elemento da plataforma sem autorização prévia por escrito.
    </LegalParagraph>
  </LegalSection>

  <LegalSection number="08" title="Resolução de Disputas">
    <LegalParagraph>
      Qualquer disputa decorrente da utilização da plataforma será primeiramente
      submetida à nossa equipa de mediação interna através de
      <a
        href="mailto:suporte@negoreserva.com"
        class="font-semibold text-green-700 hover:underline"
      >
        suporte@negoreserva.com
      </a>.
    </LegalParagraph>
    <LegalParagraph>
      Caso não haja resolução em 30 dias, as partes elegem os tribunais
      competentes da República de Angola como foro para dirimir quaisquer
      questões legais.
    </LegalParagraph>
  </LegalSection>
</LegalPageLayout>
